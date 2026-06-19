const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 9876;
const SECRET_KEY = 'BahrainYouthCitySecret2026!';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// SQLite Database Setup
const dbFile = path.join(__dirname, 'games_data.db');
const db = new sqlite3.Database(dbFile, (err) => {
  if (err) {
    console.error('Error opening SQLite database:', err.message);
  } else {
    console.log('Connected to SQLite database:', dbFile);
    initializeDatabase();
  }
});

function initializeDatabase() {
  db.serialize(() => {
    // Create Leaderboard table
    db.run(`
      CREATE TABLE IF NOT EXISTS leaderboard (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        game_id TEXT NOT NULL,
        player_name TEXT NOT NULL,
        score INTEGER NOT NULL,
        time_spent INTEGER NOT NULL,
        difficulty TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create Telemetry table
    db.run(`
      CREATE TABLE IF NOT EXISTS telemetry (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        event_type TEXT NOT NULL,
        game_id TEXT,
        details TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Pre-populate with mock scores if leaderboard is empty
    db.get('SELECT COUNT(*) as count FROM leaderboard', (err, row) => {
      if (err) return console.error(err);
      if (row.count === 0) {
        console.log('Pre-populating mock high scores...');
        const stmt = db.prepare(`
          INSERT INTO leaderboard (game_id, player_name, score, time_spent, difficulty)
          VALUES (?, ?, ?, ?, ?)
        `);

        // Mock data for Game 1 (Spot the Difference - rakkiz)
        stmt.run('rakkiz', 'عبدالله', 600, 32, 'hard');
        stmt.run('rakkiz', 'Nasser', 500, 41, 'hard');
        stmt.run('rakkiz', 'فاطمة', 400, 25, 'easy');
        stmt.run('rakkiz', 'Ali', 300, 48, 'easy');

        // Mock data for Game 2 (Memory Values - memory)
        stmt.run('memory', 'سلمان', 800, 28, 'standard');
        stmt.run('memory', 'Noora', 750, 34, 'standard');
        stmt.run('memory', 'خالد', 600, 45, 'standard');
        stmt.run('memory', 'Sarah', 500, 52, 'standard');

        // Mock data for Game 3 (Landmark Mapping - mapping)
        stmt.run('mapping', 'حمد', 750, 48, 'hard');
        stmt.run('mapping', 'Mona', 600, 58, 'hard');
        stmt.run('mapping', 'جاسم', 300, 35, 'easy');
        stmt.run('mapping', 'Reem', 200, 42, 'easy');

        stmt.finalize();
        console.log('Mock high scores pre-populated.');
      }
    });
  });
}

// REST API Endpoints

// 1. GET leaderboard
app.get('/api/leaderboard', (req, res) => {
  const { gameId, limit = 10 } = req.query;

  if (!gameId) {
    return res.status(400).json({ success: false, error: 'gameId query parameter is required.' });
  }

  const query = `
    SELECT player_name, score, time_spent, difficulty, created_at
    FROM leaderboard
    WHERE game_id = ?
    ORDER BY score DESC, time_spent ASC, created_at ASC
    LIMIT ?
  `;

  db.all(query, [gameId, parseInt(limit)], (err, rows) => {
    if (err) {
      console.error('Database query error:', err.message);
      return res.status(500).json({ success: false, error: 'Database query error.' });
    }

    // Map rows to include dynamic rank index
    const records = rows.map((row, index) => ({
      rank: index + 1,
      name: row.player_name,
      score: row.score,
      time_spent_seconds: row.time_spent,
      difficulty: row.difficulty,
      date: row.created_at
    }));

    res.json({ success: true, gameId, records });
  });
});

// 2. POST score
app.post('/api/scores', (req, res) => {
  const { gameId, playerName, score, timeSpent, difficulty, signature } = req.body;

  // Validate fields
  if (!gameId || !playerName || score === undefined || timeSpent === undefined || !difficulty || !signature) {
    return res.status(400).json({ success: false, error: 'Missing required request body fields.' });
  }

  // Cryptographic validation to prevent fake manual high scores
  const message = `${gameId}:${playerName}:${score}:${timeSpent}:${difficulty}`;
  const computedSignature = crypto
    .createHmac('sha256', SECRET_KEY)
    .update(message)
    .digest('hex');

  if (computedSignature !== signature) {
    console.warn(`Tampered score signature detected for ${playerName}!`);
    return res.status(403).json({ success: false, error: 'Invalid score verification signature.' });
  }

  // Insert score
  const query = `
    INSERT INTO leaderboard (game_id, player_name, score, time_spent, difficulty)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(query, [gameId, playerName, score, timeSpent, difficulty], function(err) {
    if (err) {
      console.error('Database insertion error:', err.message);
      return res.status(500).json({ success: false, error: 'Failed to save score.' });
    }

    const insertedId = this.lastID;

    // Find the rank of the newly inserted score
    const rankQuery = `
      SELECT COUNT(*) as rank
      FROM leaderboard
      WHERE game_id = ? AND (score > ? OR (score = ? AND time_spent < ?))
    `;

    db.get(rankQuery, [gameId, score, score, timeSpent], (err, row) => {
      if (err) {
        console.error('Database rank query error:', err.message);
        return res.json({ success: true, message: 'Score saved, but rank calculation failed.' });
      }

      const rank = row.rank + 1;
      const isHighScore = rank <= 5;

      res.json({
        success: true,
        newRank: rank,
        isHighScore,
        message: 'Score submitted successfully!'
      });
    });
  });
});

// 3. POST telemetry
app.post('/api/telemetry', (req, res) => {
  const { eventType, gameId, details } = req.body;

  if (!eventType) {
    return res.status(400).json({ success: false, error: 'eventType is required.' });
  }

  const query = `
    INSERT INTO telemetry (event_type, game_id, details)
    VALUES (?, ?, ?)
  `;

  db.run(query, [eventType, gameId, details ? JSON.stringify(details) : null], (err) => {
    if (err) {
      console.error('Telemetry logging error:', err.message);
      return res.status(500).json({ success: false, error: 'Failed to record telemetry.' });
    }
    res.json({ success: true });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`Bahrain Youth City Kiosk Server running at:`);
  console.log(`http://localhost:${PORT}`);
  console.log(`====================================================`);
});
