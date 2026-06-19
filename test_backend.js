const http = require('http');
const crypto = require('crypto');

const SECRET_KEY = 'BahrainYouthCitySecret2026!';
const PORT = 9876;

function request(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const dataString = body ? JSON.stringify(body) : '';
    const options = {
      hostname: 'localhost',
      port: PORT,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(dataString)
      }
    };

    const req = http.request(options, (res) => {
      let responseBody = '';
      res.on('data', (chunk) => responseBody += chunk);
      res.on('end', () => {
        try {
          resolve({
            statusCode: res.statusCode,
            body: JSON.parse(responseBody)
          });
        } catch (e) {
          resolve({
            statusCode: res.statusCode,
            body: responseBody
          });
        }
      });
    });

    req.on('error', (err) => reject(err));
    if (body) req.write(dataString);
    req.end();
  });
}

async function runTests() {
  console.log('====================================================');
  console.log('RUNNING BACKEND VERIFICATION TESTS...');
  console.log('====================================================');
  
  let passed = 0;
  let failed = 0;

  // Helper assertions
  function assertEqual(actual, expected, message) {
    if (actual === expected) {
      console.log(`[PASS] ${message}`);
      passed++;
    } else {
      console.error(`[FAIL] ${message} (Expected: ${expected}, Got: ${actual})`);
      failed++;
    }
  }

  try {
    // Test 1: GET Leaderboard before insertions
    console.log('\n--- Test 1: GET Leaderboard ---');
    const t1 = await request('GET', '/api/leaderboard?gameId=rakkiz');
    assertEqual(t1.statusCode, 200, 'GET /api/leaderboard status is 200');
    assertEqual(t1.body.success, true, 'GET /api/leaderboard success is true');
    assertEqual(Array.isArray(t1.body.records), true, 'GET /api/leaderboard returns records array');

    // Test 2: POST Score with valid HMAC signature
    console.log('\n--- Test 2: POST Score (Valid Signature) ---');
    const scorePayload = {
      gameId: 'rakkiz',
      playerName: 'TestPlayer',
      score: 950,
      timeSpent: 22,
      difficulty: 'hard'
    };
    
    // Generate valid HMAC signature
    const msg = `${scorePayload.gameId}:${scorePayload.playerName}:${scorePayload.score}:${scorePayload.timeSpent}:${scorePayload.difficulty}`;
    const validSignature = crypto.createHmac('sha256', SECRET_KEY).update(msg).digest('hex');
    scorePayload.signature = validSignature;

    const t2 = await request('POST', '/api/scores', scorePayload);
    assertEqual(t2.statusCode, 200, 'POST /api/scores valid status is 200');
    assertEqual(t2.body.success, true, 'POST /api/scores response success is true');
    assertEqual(typeof t2.body.newRank, 'number', 'POST /api/scores returns rank index');

    // Test 3: POST Score with invalid signature (tampered score)
    console.log('\n--- Test 3: POST Score (Invalid Signature) ---');
    const tamperedPayload = { ...scorePayload, score: 9999 }; // altered score but same signature
    const t3 = await request('POST', '/api/scores', tamperedPayload);
    assertEqual(t3.statusCode, 403, 'POST /api/scores tampered status is 403 (Forbidden)');
    assertEqual(t3.body.success, false, 'POST /api/scores tampered success is false');

    // Test 4: POST Telemetry logging
    console.log('\n--- Test 4: POST Telemetry ---');
    const telemetryPayload = {
      eventType: 'game_start',
      gameId: 'memory',
      details: { resolution: '1920x1080', OS: 'Mac' }
    };
    const t4 = await request('POST', '/api/telemetry', telemetryPayload);
    assertEqual(t4.statusCode, 200, 'POST /api/telemetry status is 200');
    assertEqual(t4.body.success, true, 'POST /api/telemetry response success is true');

    console.log('\n====================================================');
    console.log(`TESTS SUMMARY: ${passed} Passed, ${failed} Failed`);
    console.log('====================================================');

    if (failed > 0) {
      process.exit(1);
    } else {
      process.exit(0);
    }

  } catch (err) {
    console.error('Test execution error:', err);
    process.exit(1);
  }
}

// Small delay to make sure server is spun up if run sequentially
setTimeout(runTests, 1000);
