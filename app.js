// Bahrain Youth City Games - Core JS Controller
// Architect By DOYTECH

const SECRET_KEY = 'BahrainYouthCitySecret2026!';
const API_URL = 'http://localhost:9876';

// Dynamic Educational Landmarks Content
const RAKKIZ_LANDMARKS = [
  {
    id: 'bab_al_bahrain',
    nameAr: 'باب البحرين',
    nameEn: 'Bab Al Bahrain',
    img: 'G1_Rakkiz.png',
    diffX: 47, // target x percent
    diffY: 53, // target y percent
    diffDescAr: 'تمت إضافة علم البحرين صغير على النافذة اليسرى لباب البحرين.',
    diffDescEn: 'A small Bahrain flag was added on the left window of Bab Al Bahrain.',
    factAr: 'باب البحرين هو مبنى تاريخي يقع في ساحة الجمارك بالمنامة، ويمثل البوابة التاريخية لوسط المدينة التجاري. صممه السير تشارلز بلغريف عام 1949 وتم تجديده لاحقاً بطابع بحريني أصيل.',
    factEn: 'Bab Al Bahrain is a historical building in Customs Square, Manama. It represents the historical gateway to the city\'s commercial center. Designed by Sir Charles Belgrave in 1949 and later renovated with an authentic Bahraini architectural style.'
  },
  {
    id: 'bahrain_fort',
    nameAr: 'قلعة البحرين',
    nameEn: 'Bahrain Fort',
    img: 'game1_spot_difference.png',
    diffX: 74,
    diffY: 34,
    diffDescAr: 'تمت إزالة أحد النتوءات الحجرية من السور الأيمن للقلعة.',
    diffDescEn: 'A stone crenellation was removed from the right wall of the fort.',
    factAr: 'قلعة البحرين أو قلعة البرتغال هي موقع أثري مسجل كإرث عالمي لدى اليونسكو. كانت القلعة عاصمة حضارة دلمون القديمة وتضم آثاراً تعود لآلاف السنين.',
    factEn: 'Bahrain Fort (Qal\'at al-Bahrain) is an archaeological UNESCO World Heritage site. The fort was once the capital of the ancient Dilmun civilization and contains ruins dating back thousands of years.'
  },
  {
    id: 'alfateh_mosque',
    nameAr: 'جامع أحمد الفاتح',
    nameEn: 'Al-Fateh Grand Mosque',
    img: 'G1_Rakkiz.png',
    diffX: 25,
    diffY: 18,
    diffDescAr: 'تم تعديل لون هلال مئذنة جامع الفاتح إلى اللون الذهبي اللامع.',
    diffDescEn: 'The color of the minaret crescent of Al-Fateh Mosque was changed to bright gold.',
    factAr: 'جامع أحمد الفاتح هو أحد أكبر المساجد في العالم، بمساحة 6,500 متر مربع، ويتسع لـ 7,000 مصلٍ. قبة الجامع الضخمة مصنوعة بالكامل من الألياف الزجاجية النقية.',
    factEn: 'Al-Fateh Grand Mosque is one of the largest mosques in the world, spanning 6,500 square meters and accommodating 7,000 worshippers. The mosque\'s massive dome is made entirely of pure fiberglass.'
  },
  {
    id: 'f1_circuit',
    nameAr: 'حلبة البحرين الدولية',
    nameEn: 'Bahrain International Circuit',
    img: 'G1_Rakkiz.png',
    diffX: 62,
    diffY: 78,
    diffDescAr: 'تمت إضافة سيارة فورمولا 1 حمراء إضافية في منطقة المنعطف الأول.',
    diffDescEn: 'An extra red Formula 1 car was added at the first turn area.',
    factAr: 'حلبة البحرين الدولية هي حلبة سباقات السيارات وتقع في منطقة الصخير. استضافت أول سباق فورمولا 1 في الشرق الأوسط عام 2004 وتشتهر بسباقاتها الليلية المثيرة.',
    factEn: 'Bahrain International BIC is a motorsport venue in the Sakhir desert. It hosted the first Formula 1 Grand Prix in the Middle East in 2004 and is famous for its spectacular night races under floodlights.'
  },
  {
    id: 'causeway',
    nameAr: 'جسر الملك فهد',
    nameEn: 'King Fahd Causeway',
    img: 'G1_Rakkiz.png',
    diffX: 85,
    diffY: 48,
    diffDescAr: 'تمت إضافة قارب شراعي تقليدي في مياه الخليج بجانب الجسر.',
    diffDescEn: 'A traditional dhow sailboat was added in the Gulf waters near the causeway.',
    factAr: 'جسر الملك فهد هو جسر بري يربط بين مملكة البحرين والمملكة العربية السعودية، افتتح عام 1986 بطول 25 كيلومتراً، ويسهم بشكل كبير في حركة النقل والتجارة والسياحة.',
    factEn: 'King Fahd Causeway is a series of bridges connecting the Kingdom of Bahrain and the Kingdom of Saudi Arabia. Opened in 1986 with a length of 25 kilometers, it facilitates travel, trade, and tourism.'
  }
];

const MEMORY_VALUES = [
  { id: 'citizen', nameAr: 'المواطنة', nameEn: 'Citizenship', icon: 'award' },
  { id: 'tolerance', nameAr: 'التسامح', nameEn: 'Tolerance', icon: 'heart' },
  { id: 'coexistence', nameAr: 'التعايش', nameEn: 'Coexistence', icon: 'users' },
  { id: 'peace', nameAr: 'السلام', nameEn: 'Peace', icon: 'globe' },
  { id: 'giving', nameAr: 'العطاء', nameEn: 'Giving', icon: 'hand-helping' },
  { id: 'solidarity', nameAr: 'التكافل', nameEn: 'Solidarity', icon: 'shield' },
  { id: 'cooperate', nameAr: 'التعاون', nameEn: 'Cooperation', icon: 'home' },
  { id: 'loyalty', nameAr: 'الولاء', nameEn: 'Loyalty', icon: 'smile' }
];

const MAPPING_LANDMARKS = [
  { id: 'fort', nameAr: 'قلعة البحرين', nameEn: 'Bahrain Fort', targetId: 'target-fort', x: 440, y: 280, icon: 'shield-alert' },
  { id: 'mosque', nameAr: 'جامع الفاتح', nameEn: 'Al-Fateh Mosque', targetId: 'target-mosque', x: 570, y: 260, icon: 'milestone' },
  { id: 'bab', nameAr: 'باب البحرين', nameEn: 'Bab Al Bahrain', targetId: 'target-bab', x: 520, y: 180, icon: 'landmark' },
  { id: 'f1', nameAr: 'حلبة الفورمولا 1', nameEn: 'F1 Circuit', targetId: 'target-f1', x: 470, y: 640, icon: 'zap' },
  { id: 'causeway', nameAr: 'جسر الملك فهد', nameEn: 'King Fahd Causeway', targetId: 'target-causeway', x: 150, y: 220, icon: 'navigation' }
];

// UI Dictionary Mappings
const UI_TRANSLATIONS = {
  ar: {
    title: 'منصة الألعاب التفاعلية',
    rakkiz: 'لعبة ركز',
    memory: 'بطاقات القيم',
    mapping: 'معالم بحريننا',
    exiting: 'خروج',
    score: 'النتيجة',
    time: 'الوقت',
    keyboardDel: 'مسح',
    rank: 'الترتيب',
    name: 'الاسم',
    difficulty: 'المستوى',
    points: 'النقاط'
  },
  en: {
    title: 'Interactive Games Platform',
    rakkiz: 'Spot Difference',
    memory: 'Memory Cards',
    mapping: 'Landmark Mapping',
    exiting: 'Exit',
    score: 'Score',
    time: 'Time',
    keyboardDel: 'Del',
    rank: 'Rank',
    name: 'Name',
    difficulty: 'Difficulty',
    points: 'Points'
  }
};

class KioskApp {
  constructor() {
    this.currentLanguage = 'ar';
    this.isMuted = false;
    this.currentScreen = 'cover';
    this.activeGame = null;
    this.difficulty = { rakkiz: 'easy', mapping: 'easy' };
    this.gameState = {
      score: 0,
      timeLeft: 0,
      timerInterval: null,
      timeElapsed: 0
    };
    
    // Web Audio API context placeholder
    this.audioCtx = null;
    
    // Specific Game states
    this.rakkizState = { currentIndex: 0, differencesFound: 0 };
    this.memoryState = { cards: [], selectedCards: [], matchesFound: 0, lockBoard: false };
    this.mappingState = { placedLandmarks: 0, activeDrag: null };

    // Keyboard buffer
    this.nameInputBuffer = '';
  }

  init() {
    // Set initial layout
    document.documentElement.setAttribute('lang', 'ar');
    document.documentElement.setAttribute('dir', 'rtl');
    
    // Render initial icons
    lucide.createIcons();
    
    // Virtual Keyboard hooks
    this.renderKeyboard();
    
    // Prevent zoom/right-click gestures in kiosk environment
    document.addEventListener('contextmenu', e => e.preventDefault());
    
    // Initialize leaderboard on local standalone cache
    if (!localStorage.getItem('rakkiz_leaderboard')) {
      localStorage.setItem('rakkiz_leaderboard', JSON.stringify([]));
    }
    if (!localStorage.getItem('memory_leaderboard')) {
      localStorage.setItem('memory_leaderboard', JSON.stringify([]));
    }
    if (!localStorage.getItem('mapping_leaderboard')) {
      localStorage.setItem('mapping_leaderboard', JSON.stringify([]));
    }
  }

  // Audio Synth Engine
  initAudio() {
    if (!this.audioCtx) {
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  beep(freq, duration, type = 'sine') {
    if (this.isMuted) return;
    this.initAudio();
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
      gain.gain.setValueAtTime(0.1, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch(e) {
      console.warn("Web Audio failed to synth beep:", e);
    }
  }

  playSelect() { this.beep(523.25, 0.15, 'sine'); } // C5
  playSuccess() {
    this.beep(523.25, 0.08, 'sine');
    setTimeout(() => this.beep(659.25, 0.18, 'sine'), 80); // E5
  }
  playFailure() {
    if (this.isMuted) return;
    this.initAudio();
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, this.audioCtx.currentTime);
      osc.frequency.linearRampToValueAtTime(80, this.audioCtx.currentTime + 0.35);
      gain.gain.setValueAtTime(0.12, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.35);
    } catch(e) {}
  }
  playGameOver() {
    const scale = [523.25, 587.33, 659.25, 698.46, 783.99]; // C E G scale
    scale.forEach((freq, idx) => {
      setTimeout(() => this.beep(freq, 0.25, 'triangle'), idx * 100);
    });
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    document.getElementById('volume-icon-on').classList.toggle('hidden', this.isMuted);
    document.getElementById('volume-icon-off').classList.toggle('hidden', !this.isMuted);
    this.playSelect();
  }

  toggleLanguage() {
    this.currentLanguage = this.currentLanguage === 'ar' ? 'en' : 'ar';
    const isAr = this.currentLanguage === 'ar';

    document.documentElement.setAttribute('lang', this.currentLanguage);
    document.documentElement.setAttribute('dir', isAr ? 'rtl' : 'ltr');

    // Language Toggle styling updates
    document.querySelectorAll('.ar').forEach(el => el.classList.toggle('hidden', !isAr));
    document.querySelectorAll('.en').forEach(el => el.classList.toggle('hidden', isAr));

    this.renderKeyboard();
    this.updateHeaderTitle();
    this.playSelect();
  }

  updateHeaderTitle() {
    const titleEl = document.getElementById('header-game-title');
    if (!titleEl) return;
    if (this.currentScreen === 'menu') {
      titleEl.textContent = UI_TRANSLATIONS[this.currentLanguage].title;
    } else if (this.activeGame) {
      titleEl.textContent = UI_TRANSLATIONS[this.currentLanguage][this.activeGame];
    }
  }

  transitionTo(screen) {
    // Clear any timers
    clearInterval(this.gameState.timerInterval);

    // Hide all sections
    document.querySelectorAll('.screen-section').forEach(sec => sec.classList.remove('active'));
    
    // Show target section
    const targetEl = document.getElementById(`screen-${screen}`);
    if (targetEl) targetEl.classList.add('active');

    this.currentScreen = screen;
    this.updateHeaderTitle();

    // Toggle header parts
    const commonHeader = document.getElementById('common-header');
    const exitBtn = document.getElementById('header-btn-exit');
    const exitDiv = document.getElementById('header-exit-divider');
    const indicators = document.getElementById('game-indicators');

    if (screen === 'cover') {
      commonHeader.classList.add('hidden');
    } else {
      commonHeader.classList.remove('hidden');
      if (screen === 'menu' || screen === 'leaderboard') {
        exitBtn.classList.add('hidden');
        exitDiv.classList.add('hidden');
        indicators.classList.add('hidden');
        this.activeGame = null;
      } else {
        exitBtn.classList.remove('hidden');
        exitDiv.classList.remove('hidden');
        indicators.classList.remove('hidden');
      }
    }

    lucide.createIcons();
  }

  confirmExit() {
    this.playSelect();
    if (confirm(this.currentLanguage === 'ar' ? 'هل تريد بالتأكيد العودة إلى القائمة الرئيسية؟' : 'Are you sure you want to exit to the main menu?')) {
      this.transitionTo('menu');
    }
  }

  setDifficulty(game, diff) {
    this.playSelect();
    this.difficulty[game] = diff;
    
    const easyBtn = document.getElementById(`g${game === 'rakkiz' ? '1' : '3'}-diff-easy`);
    const hardBtn = document.getElementById(`g${game === 'rakkiz' ? '1' : '3'}-diff-hard`);

    if (diff === 'easy') {
      easyBtn.classList.add('bg-bahrain', 'text-white');
      easyBtn.classList.remove('text-white/50');
      hardBtn.classList.add('text-white/50');
      hardBtn.classList.remove('bg-bahrain', 'text-white');
    } else {
      hardBtn.classList.add('bg-bahrain', 'text-white');
      hardBtn.classList.remove('text-white/50');
      easyBtn.classList.add('text-white/50');
      easyBtn.classList.remove('bg-bahrain', 'text-white');
    }
  }

  // Global game initiator
  startGame(game) {
    this.playSelect();
    this.activeGame = game;
    this.gameState.score = 0;
    this.gameState.timeElapsed = 0;
    document.getElementById('indicator-score').textContent = '0';

    if (game === 'rakkiz') {
      this.gameState.timeLeft = this.difficulty.rakkiz === 'easy' ? 60 : 45;
      this.rakkizState.currentIndex = 0;
      this.rakkizState.differencesFound = 0;
      this.transitionTo('rakkiz');
      this.loadRakkizRound();
    } else if (game === 'memory') {
      this.gameState.timeLeft = 60;
      this.memoryState.matchesFound = 0;
      this.memoryState.selectedCards = [];
      this.memoryState.lockBoard = true;
      this.transitionTo('memory');
      this.initMemoryGame();
    } else if (game === 'mapping') {
      this.gameState.timeLeft = 120;
      this.mappingState.placedLandmarks = 0;
      this.transitionTo('mapping');
      this.initMappingGame();
    }

    // Start ticker
    document.getElementById('indicator-timer').textContent = `${this.gameState.timeLeft}s`;
    this.gameState.timerInterval = setInterval(() => this.gameTick(), 1000);
  }

  gameTick() {
    this.gameState.timeLeft--;
    this.gameState.timeElapsed++;
    document.getElementById('indicator-timer').textContent = `${this.gameState.timeLeft}s`;

    if (this.gameState.timeLeft <= 0) {
      this.handleGameOver(false);
    }
  }

  handleGameOver(success = true) {
    clearInterval(this.gameState.timerInterval);
    this.playGameOver();

    if (success) {
      // Calculate speed score bonus
      let speedBonus = this.gameState.timeLeft * 3;
      this.gameState.score += speedBonus;
      document.getElementById('indicator-score').textContent = this.gameState.score;

      // Populate Score submit card
      document.getElementById('submit-score-value').textContent = this.gameState.score;
      document.getElementById('submit-time-value').textContent = `${this.gameState.timeElapsed}s`;
      document.getElementById('submit-name-input').value = '';
      this.nameInputBuffer = '';

      this.transitionTo('score-submit');
    } else {
      alert(this.currentLanguage === 'ar' ? 'انتهى الوقت! حاول مجدداً.' : 'Time out! Try again.');
      this.transitionTo('menu');
    }
  }

  // ═══════════════════════════════════════════ GAME 1: SPOT THE DIFFERENCE ═══════════════════════════════════════════
  loadRakkizRound() {
    const currentRound = RAKKIZ_LANDMARKS[this.rakkizState.currentIndex];
    
    // Set images
    const modImg = document.getElementById('rakkiz-modified-img');
    const origImg = document.getElementById('rakkiz-original-img');
    
    modImg.src = currentRound.img;
    origImg.src = currentRound.img;

    // Reset container targets
    const modContainer = document.getElementById('rakkiz-modified-container');
    // Clear old hotspots
    modContainer.querySelectorAll('.rakkiz-hotspot, .rakkiz-hotspot-found').forEach(el => el.remove());

    // Inject Programmatic Visual Difference so game is fully playable with mock assets
    const diffNode = document.createElement('div');
    diffNode.className = 'absolute bg-bahrain/80 border border-white/40 shadow-lg';
    diffNode.style.width = '16px';
    diffNode.style.height = '16px';
    diffNode.style.borderRadius = '50%';
    diffNode.style.left = `${currentRound.diffX}%`;
    diffNode.style.top = `${currentRound.diffY}%`;
    diffNode.style.transform = 'translate(-50%, -50%)';
    diffNode.style.zIndex = '10';
    diffNode.id = 'rakkiz-visual-difference';
    modContainer.appendChild(diffNode);

    // Create interactive click hotspot overlay
    const hs = document.createElement('div');
    hs.className = 'rakkiz-hotspot';
    hs.style.left = `${currentRound.diffX}%`;
    hs.style.top = `${currentRound.diffY}%`;
    
    // Scale hotspot target size based on difficulty
    const targetRadius = this.difficulty.rakkiz === 'easy' ? 90 : 55;
    hs.style.width = `${targetRadius}px`;
    hs.style.height = `${targetRadius}px`;

    hs.addEventListener('touchstart', (e) => { e.preventDefault(); this.onRakkizHotspotTouch(); });
    hs.addEventListener('click', () => this.onRakkizHotspotTouch());

    modContainer.appendChild(hs);

    // Add missed click listener to panel for penalties
    modContainer.onclick = (e) => {
      if (e.target.classList.contains('rakkiz-hotspot') || e.target.classList.contains('rakkiz-hotspot-found')) return;
      this.onRakkizMiss();
    };
  }

  onRakkizHotspotTouch() {
    this.playSuccess();
    const currentRound = RAKKIZ_LANDMARKS[this.rakkizState.currentIndex];

    // Remove difference
    const diffNode = document.getElementById('rakkiz-visual-difference');
    if (diffNode) diffNode.remove();

    // Show found indicator
    const modContainer = document.getElementById('rakkiz-modified-container');
    const indicator = document.createElement('div');
    indicator.className = 'rakkiz-hotspot-found';
    indicator.style.left = `${currentRound.diffX}%`;
    indicator.style.top = `${currentRound.diffY}%`;
    indicator.style.width = '70px';
    indicator.style.height = '70px';
    modContainer.appendChild(indicator);

    // Add score
    const roundScore = this.difficulty.rakkiz === 'easy' ? 100 : 150;
    this.gameState.score += roundScore;
    document.getElementById('indicator-score').textContent = this.gameState.score;

    // Show educational fact
    setTimeout(() => {
      this.showEducationalModal(
        this.currentLanguage === 'ar' ? currentRound.nameAr : currentRound.nameEn,
        currentRound.img,
        this.currentLanguage === 'ar' ? currentRound.factAr : currentRound.factEn,
        () => {
          // Callback when closing modal
          this.rakkizState.currentIndex++;
          if (this.rakkizState.currentIndex < RAKKIZ_LANDMARKS.length) {
            this.loadRakkizRound();
          } else {
            this.handleGameOver(true);
          }
        }
      );
    }, 600);
  }

  onRakkizMiss() {
    this.playFailure();
    // Reduce time penalty
    this.gameState.timeLeft = Math.max(0, this.gameState.timeLeft - 5);
    document.getElementById('indicator-timer').textContent = `${this.gameState.timeLeft}s`;
    
    // Visual flash error
    const modContainer = document.getElementById('rakkiz-modified-container');
    modContainer.style.borderColor = '#c8102e';
    setTimeout(() => modContainer.style.borderColor = 'rgba(255,255,255,0.08)', 200);
  }

  // ═══════════════════════════════════════════ GAME 2: MEMORY VALUES ═══════════════════════════════════════════
  initMemoryGame() {
    const board = document.getElementById('memory-board');
    board.innerHTML = '';

    // Create 8 double cards (16 cards total) from 8 items list
    let cardsData = [];
    MEMORY_VALUES.forEach(val => {
      cardsData.push({ ...val });
      cardsData.push({ ...val });
    });

    // Shuffle cards
    cardsData.sort(() => Math.random() - 0.5);
    this.memoryState.cards = cardsData;

    // Load Side Leaderboard
    this.loadSidebarLeaderboard();

    // Render cards
    cardsData.forEach((card, index) => {
      const cardContainer = document.createElement('div');
      cardContainer.className = 'memory-card flipped'; // Start flipped (face-up)
      cardContainer.dataset.index = index;

      cardContainer.innerHTML = `
        <div class="memory-card-face memory-card-back">
          <i data-lucide="help-circle" class="w-10 h-10 opacity-40"></i>
        </div>
        <div class="memory-card-face memory-card-front">
          <i data-lucide="${card.icon}" class="w-8 h-8 text-bahrain mb-3"></i>
          <span class="text-xs font-bold text-center tracking-wider font-ar-only ar">${card.nameAr}</span>
          <span class="text-xs font-bold text-center tracking-wider font-en-only en hidden">${card.nameEn}</span>
        </div>
      `;

      cardContainer.addEventListener('click', () => this.onMemoryCardClick(cardContainer));
      board.appendChild(cardContainer);
    });

    lucide.createIcons();

    // Show face-up preview for 5 seconds, then flip face-down
    setTimeout(() => {
      document.querySelectorAll('.memory-card').forEach(el => el.classList.remove('flipped'));
      this.memoryState.lockBoard = false;
      this.playSelect();
    }, 5000);
  }

  onMemoryCardClick(cardEl) {
    if (this.memoryState.lockBoard) return;
    if (cardEl.classList.contains('flipped')) return;

    this.playSelect();
    cardEl.classList.add('flipped');
    this.memoryState.selectedCards.push(cardEl);

    if (this.memoryState.selectedCards.length === 2) {
      this.memoryState.lockBoard = true;
      this.checkMemoryMatch();
    }
  }

  checkMemoryMatch() {
    const [card1, card2] = this.memoryState.selectedCards;
    const index1 = card1.dataset.index;
    const index2 = card2.dataset.index;
    
    const item1 = this.memoryState.cards[index1];
    const item2 = this.memoryState.cards[index2];

    if (item1.id === item2.id) {
      // Match found
      this.playSuccess();
      card1.querySelector('.memory-card-front').classList.add('matched');
      card2.querySelector('.memory-card-front').classList.add('matched');
      
      this.memoryState.matchesFound++;
      this.gameState.score += 150;
      document.getElementById('indicator-score').textContent = this.gameState.score;

      this.memoryState.selectedCards = [];
      this.memoryState.lockBoard = false;

      // Completed
      if (this.memoryState.matchesFound === 8) {
        setTimeout(() => this.handleGameOver(true), 600);
      }
    } else {
      // Mismatch
      setTimeout(() => {
        this.playFailure();
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        this.memoryState.selectedCards = [];
        this.memoryState.lockBoard = false;
      }, 900);
    }
  }

  loadSidebarLeaderboard() {
    const listContainer = document.getElementById('memory-sidebar-leaderboard');
    listContainer.innerHTML = '';

    // Load from local storage or mock backend
    let scores = [];
    try {
      const localData = localStorage.getItem('memory_leaderboard');
      scores = localData ? JSON.parse(localData) : [];
    } catch (e) {
      console.warn("Storage fetch fail:", e);
    }

    if (scores.length === 0) {
      scores = [
        { name: 'سلمان', score: 800, time: 28 },
        { name: 'Noora', score: 750, time: 34 },
        { name: 'خالد', score: 600, time: 45 }
      ];
    }

    scores.slice(0, 5).forEach((record, index) => {
      const row = document.createElement('div');
      row.className = 'glass-panel px-4 py-3 flex items-center justify-between border-white/5 bg-white/2';
      row.innerHTML = `
        <div class="flex items-center gap-3">
          <span class="text-xs font-bold ${index === 0 ? 'text-gold' : 'text-white/40'}">#${index + 1}</span>
          <span class="text-sm font-semibold text-white/80">${record.name}</span>
        </div>
        <div class="text-right">
          <span class="text-sm font-bold text-gold block leading-none">${record.score}</span>
          <span class="text-[9px] text-white/40 block mt-1">${record.time}s</span>
        </div>
      `;
      listContainer.appendChild(row);
    });
  }

  // ═══════════════════════════════════════════ GAME 3: LANDMARK MAPPING ═══════════════════════════════════════════
  initMappingGame() {
    const chipsContainer = document.getElementById('mapping-chips-container');
    const targetsContainer = document.getElementById('mapping-targets-container');
    
    chipsContainer.innerHTML = '';
    targetsContainer.innerHTML = '';

    // Set layout difficulty size (3 landmarks on easy, 5 on hard)
    const isEasy = this.difficulty.mapping === 'easy';
    const activeLandmarks = isEasy ? MAPPING_LANDMARKS.slice(0, 3) : MAPPING_LANDMARKS;

    // Create target drop circles on the map layout
    activeLandmarks.forEach(item => {
      const target = document.createElement('div');
      target.className = 'mapping-dropzone';
      target.id = item.targetId;
      target.style.left = `${item.x}px`;
      target.style.top = `${item.y}px`;
      target.dataset.id = item.id;
      target.innerHTML = `
        <i data-lucide="${item.icon}" class="w-6 h-6 text-white/30"></i>
      `;
      targetsContainer.appendChild(target);
    });

    // Create draggable source landmark inventory chips
    // Shuffle the chips so they aren't in geographical order
    const shuffledLandmarks = [...activeLandmarks].sort(() => Math.random() - 0.5);

    shuffledLandmarks.forEach(item => {
      const chip = document.createElement('div');
      chip.className = 'glass-panel border-white/10 px-5 py-4 flex items-center justify-between cursor-pointer hover:border-white/20 select-none bg-white/2 pointer-events-auto active:scale-95 transition-all';
      chip.id = `chip-${item.id}`;
      chip.dataset.id = item.id;
      
      chip.innerHTML = `
        <div class="flex items-center gap-3">
          <i data-lucide="${item.icon}" class="w-5 h-5 text-bahrain"></i>
          <span class="text-sm font-bold tracking-wide font-ar-only ar">${item.nameAr}</span>
          <span class="text-sm font-bold tracking-wide font-en-only en hidden">${item.nameEn}</span>
        </div>
        <i data-lucide="grip-vertical" class="w-4 h-4 text-white/20"></i>
      `;

      // Set up Pointer events for Drag and Drop (optimized for kiosks/touch)
      chip.addEventListener('pointerdown', (e) => this.onPointerDragStart(e, chip, item));
      chipsContainer.appendChild(chip);
    });

    lucide.createIcons();
  }

  // Pointer drag actions (Highly responsive to kiosk touchscreen gestures)
  onPointerDragStart(e, chip, landmarkItem) {
    e.preventDefault();
    this.playSelect();
    
    // Create floating clone representation
    const clone = chip.cloneNode(true);
    clone.style.position = 'absolute';
    clone.style.width = `${chip.offsetWidth}px`;
    clone.style.height = `${chip.offsetHeight}px`;
    clone.style.zIndex = '1000';
    clone.style.pointerEvents = 'none';
    clone.style.opacity = '0.9';
    clone.style.boxShadow = '0 10px 25px rgba(0,0,0,0.5)';
    document.body.appendChild(clone);

    const updatePosition = (px, py) => {
      clone.style.left = `${px - chip.offsetWidth / 2}px`;
      clone.style.top = `${py - chip.offsetHeight / 2}px`;
    };

    updatePosition(e.clientX, e.clientY);

    // Bounding target collision checking
    const moveHandler = (moveEvent) => {
      updatePosition(moveEvent.clientX, moveEvent.clientY);

      // Find dropzone under current pointer coordinate
      const dropzones = document.querySelectorAll('.mapping-dropzone');
      dropzones.forEach(dz => {
        const rect = dz.getBoundingClientRect();
        if (
          moveEvent.clientX >= rect.left &&
          moveEvent.clientX <= rect.right &&
          moveEvent.clientY >= rect.top &&
          moveEvent.clientY <= rect.bottom
        ) {
          dz.classList.add('dragover');
        } else {
          dz.classList.remove('dragover');
        }
      });
    };

    const upHandler = (upEvent) => {
      document.removeEventListener('pointermove', moveHandler);
      document.removeEventListener('pointerup', upHandler);

      let droppedCorrectly = false;
      let matchedZone = null;

      const dropzones = document.querySelectorAll('.mapping-dropzone');
      dropzones.forEach(dz => {
        dz.classList.remove('dragover');
        if (dz.classList.contains('locked')) return;

        const rect = dz.getBoundingClientRect();
        if (
          upEvent.clientX >= rect.left &&
          upEvent.clientX <= rect.right &&
          upEvent.clientY >= rect.top &&
          upEvent.clientY <= rect.bottom
        ) {
          if (dz.dataset.id === landmarkItem.id) {
            droppedCorrectly = true;
            matchedZone = dz;
          }
        }
      });

      if (droppedCorrectly && matchedZone) {
        this.playSuccess();
        matchedZone.classList.add('locked');
        
        // Remove old details and insert dynamic visual pin
        matchedZone.innerHTML = '';
        const pin = document.createElement('div');
        pin.className = 'mapping-pin';
        pin.style.left = `${landmarkItem.x}px`;
        pin.style.top = `${landmarkItem.y}px`;
        pin.innerHTML = `
          <div class="mapping-pin-head">
            <i data-lucide="${landmarkItem.icon}" class="w-6 h-6 text-gold"></i>
          </div>
          <div class="mapping-pin-stem"></div>
        `;
        document.getElementById('mapping-targets-container').appendChild(pin);
        lucide.createIcons();

        // Animate / Remove source chip element
        chip.style.opacity = '0.3';
        chip.style.pointerEvents = 'none';

        // Update score metric
        const itemScore = this.difficulty.mapping === 'easy' ? 100 : 150;
        this.gameState.score += itemScore;
        document.getElementById('indicator-score').textContent = this.gameState.score;

        // Show Educational details fact panel
        // Locate matching Game 1 fact sheet
        const staticFact = RAKKIZ_LANDMARKS.find(x => x.id === landmarkItem.id) || RAKKIZ_LANDMARKS[0];
        this.showEducationalModal(
          this.currentLanguage === 'ar' ? landmarkItem.nameAr : landmarkItem.nameEn,
          staticFact.img,
          this.currentLanguage === 'ar' ? staticFact.factAr : staticFact.factEn,
          () => {
            // Next turn checks
            this.mappingState.placedLandmarks++;
            const totalRequired = this.difficulty.mapping === 'easy' ? 3 : 5;
            if (this.mappingState.placedLandmarks === totalRequired) {
              this.handleGameOver(true);
            }
          }
        );

      } else {
        // Return animation / Failure trigger
        this.playFailure();
        // Visual penalty timer reduction
        this.gameState.timeLeft = Math.max(0, this.gameState.timeLeft - 5);
        document.getElementById('indicator-timer').textContent = `${this.gameState.timeLeft}s`;

        // Bounce back animation
        const chipRect = chip.getBoundingClientRect();
        clone.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        clone.style.left = `${chipRect.left}px`;
        clone.style.top = `${chipRect.top}px`;
        setTimeout(() => clone.remove(), 400);
        return;
      }

      clone.remove();
    };

    document.addEventListener('pointermove', moveHandler);
    document.addEventListener('pointerup', upHandler);
  }

  // ═══════════════════════════════════════════ EDUCATIONAL MODAL ═══════════════════════════════════════════
  showEducationalModal(title, image, desc, closeCallback) {
    document.getElementById('edu-modal-title').textContent = title;
    document.getElementById('edu-modal-img').src = image;
    document.getElementById('edu-modal-desc').textContent = desc;

    const modal = document.getElementById('educational-modal');
    modal.classList.add('active');

    this.modalCloseCallback = closeCallback;
  }

  closeEducationalModal() {
    this.playSelect();
    document.getElementById('educational-modal').classList.remove('active');
    if (this.modalCloseCallback) {
      this.modalCloseCallback();
      this.modalCloseCallback = null;
    }
  }

  // ═══════════════════════════════════════════ VIRTUAL TOUCH KEYBOARD ═══════════════════════════════════════════
  renderKeyboard() {
    const container = document.getElementById('kiosk-keyboard');
    container.innerHTML = '';

    const isAr = this.currentLanguage === 'ar';
    const rows = isAr ? [
      ['ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر'],
      ['ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف'],
      ['ق', 'ك', 'ل', 'م', 'ن', 'هـ', 'و', 'ي', 'ء', 'أ'],
      ['Space', 'Backspace']
    ] : [
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '-'],
      ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Space', 'Backspace']
    ];

    rows.forEach(rowKeys => {
      const rowDiv = document.createElement('div');
      rowDiv.className = 'flex justify-center gap-1.5 w-full';

      rowKeys.forEach(key => {
        const btn = document.createElement('button');
        btn.className = 'btn-secondary text-sm font-bold flex-1 py-3 text-center active:bg-white/10 select-none';
        
        if (key === 'Space') {
          btn.style.flex = '2';
          btn.innerHTML = `<i data-lucide="space" class="w-4 h-4 mx-auto"></i>`;
        } else if (key === 'Backspace') {
          btn.style.flex = '1.5';
          btn.classList.add('bg-bahrain/20', 'border-bahrain/20', 'text-bahrain');
          btn.innerHTML = `<span class="ar">مسح</span><span class="en hidden">Del</span>`;
        } else {
          btn.textContent = key;
        }

        btn.addEventListener('click', () => this.onKeyPress(key));
        rowDiv.appendChild(btn);
      });

      container.appendChild(rowDiv);
    });

    lucide.createIcons();
    // Toggle language visibility on labels
    const isArActive = this.currentLanguage === 'ar';
    container.querySelectorAll('.ar').forEach(el => el.classList.toggle('hidden', !isArActive));
    container.querySelectorAll('.en').forEach(el => el.classList.toggle('hidden', isArActive));
  }

  onKeyPress(key) {
    this.playSelect();
    const inputEl = document.getElementById('submit-name-input');
    
    if (key === 'Space') {
      if (this.nameInputBuffer.length < 12) {
        this.nameInputBuffer += ' ';
      }
    } else if (key === 'Backspace') {
      this.nameInputBuffer = this.nameInputBuffer.slice(0, -1);
    } else {
      if (this.nameInputBuffer.length < 12) {
        this.nameInputBuffer += key;
      }
    }

    inputEl.value = this.nameInputBuffer;
  }

  // ═══════════════════════════════════════════ API & LOCALSTORAGE SCORE SYNC ═══════════════════════════════════════════
  async submitScore() {
    this.playSelect();
    let name = this.nameInputBuffer.trim();
    if (!name) {
      alert(this.currentLanguage === 'ar' ? 'الرجاء إدخال الاسم أولاً.' : 'Please enter your name.');
      return;
    }

    const payload = {
      gameId: this.activeGame,
      playerName: name,
      score: this.gameState.score,
      timeSpent: this.gameState.timeElapsed,
      difficulty: this.activeGame === 'memory' ? 'standard' : this.difficulty[this.activeGame]
    };

    // Calculate cryptographic HMAC SHA-256 validation signature
    const message = `${payload.gameId}:${payload.playerName}:${payload.score}:${payload.timeSpent}:${payload.difficulty}`;
    let signature = '';
    
    try {
      signature = await this.generateHMAC(message, SECRET_KEY);
    } catch (e) {
      console.warn("HMAC generation failed:", e);
      // Fallback signature calculation (simple pseudo-hash for offline/legacy)
      signature = 'offline-' + btoa(unescape(encodeURIComponent(message)));
    }

    payload.signature = signature;

    // First local storage caching
    this.saveScoreToLocalStorage(payload);

    // Attempt local API post
    try {
      const response = await fetch(`${API_URL}/api/scores`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (data.success) {
        console.log("Score synced successfully with central DB. Rank:", data.newRank);
      }
    } catch (e) {
      console.warn("Backend server unreachable. Score cached locally in offline mode.");
    }

    // Move to unified leaderboard view for the played game
    this.loadLeaderboard(this.activeGame);
    this.transitionTo('leaderboard');
  }

  // Local Cryptographic Generator using Browser Subtle Crypto API
  async generateHMAC(message, secret) {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const messageData = encoder.encode(message);
    const cryptoKey = await window.crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    const signatureBuffer = await window.crypto.subtle.sign(
      'HMAC',
      cryptoKey,
      messageData
    );
    return Array.from(new Uint8Array(signatureBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  saveScoreToLocalStorage(payload) {
    const key = `${payload.gameId}_leaderboard`;
    let list = [];
    try {
      const stored = localStorage.getItem(key);
      list = stored ? JSON.parse(stored) : [];
    } catch(e) {}

    list.push({
      name: payload.playerName,
      score: payload.score,
      time: payload.timeSpent,
      difficulty: payload.difficulty,
      date: new Date().toISOString()
    });

    // Sort: score desc, time asc
    list.sort((a, b) => b.score - a.score || a.time - b.time);
    localStorage.setItem(key, JSON.stringify(list));
  }

  async loadLeaderboard(gameId) {
    this.playSelect();
    
    // Toggle active tab classes
    ['rakkiz', 'memory', 'mapping'].forEach(id => {
      const tabBtn = document.getElementById(`tab-leaderboard-${id}`);
      if (id === gameId) {
        tabBtn.className = 'px-6 py-2.5 bg-bahrain/20 text-white border border-bahrain/30 rounded-xl text-sm font-semibold transition-all';
      } else {
        tabBtn.className = 'px-6 py-2.5 bg-white/5 text-white/50 rounded-xl text-sm font-semibold transition-all hover:bg-white/10';
      }
    });

    const tbody = document.getElementById('leaderboard-table-body');
    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="py-10 text-center text-white/35 text-xs">
          <span class="ar">جاري تحميل النتائج...</span>
          <span class="en hidden">Loading scoreboard records...</span>
        </td>
      </tr>
    `;

    // Attempt backend fetch
    let records = [];
    let fetchSuccessful = false;

    try {
      const response = await fetch(`${API_URL}/api/leaderboard?gameId=${gameId}&limit=10`);
      const data = await response.json();
      if (data.success) {
        records = data.records;
        fetchSuccessful = true;
      }
    } catch (e) {
      console.warn("Failed to load scores from central API server. Loading local cache...");
    }

    // Fallback: Read client standalone Local Storage Cache
    if (!fetchSuccessful) {
      try {
        const localData = localStorage.getItem(`${gameId}_leaderboard`);
        const parsed = localData ? JSON.parse(localData) : [];
        records = parsed.map((item, index) => ({
          rank: index + 1,
          name: item.name,
          score: item.score,
          time_spent_seconds: item.time,
          difficulty: item.difficulty
        }));
      } catch (e) {
        console.error("Local storage read fail:", e);
      }
    }

    tbody.innerHTML = '';

    if (records.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5" class="py-16 text-center text-white/20 text-sm">
            <span class="ar">لا توجد نتائج مسجلة بعد. كن أول من يسجل!</span>
            <span class="en hidden">No high scores registered yet. Be the first!</span>
          </td>
        </tr>
      `;
      return;
    }

    records.forEach(row => {
      const tr = document.createElement('tr');
      tr.className = 'hover:bg-white/2 transition-colors border-b border-white/5';
      
      const difficultyLabel = row.difficulty === 'hard' ? 
        (this.currentLanguage === 'ar' ? 'صعب' : 'Hard') : 
        (row.difficulty === 'easy' ? (this.currentLanguage === 'ar' ? 'سهل' : 'Easy') : (this.currentLanguage === 'ar' ? 'افتراضي' : 'Standard'));

      tr.innerHTML = `
        <td class="py-4 px-4 font-black ${row.rank === 1 ? 'text-gold' : 'text-white/40'}">#${row.rank}</td>
        <td class="py-4 px-4 font-bold text-white">${row.name}</td>
        <td class="py-4 px-4 text-center font-bold text-gold">${row.score}</td>
        <td class="py-4 px-4 text-center font-semibold text-white/70">${row.time_spent_seconds}s</td>
        <td class="py-4 px-4 text-center text-xs text-white/45">${difficultyLabel}</td>
      `;
      tbody.appendChild(tr);
    });

    // Reset language toggle updates inside tables
    const isAr = this.currentLanguage === 'ar';
    tbody.querySelectorAll('.ar').forEach(el => el.classList.toggle('hidden', !isAr));
    tbody.querySelectorAll('.en').forEach(el => el.classList.toggle('hidden', isAr));
  }
}

// Instantiate global app controller
const app = new KioskApp();

document.addEventListener('DOMContentLoaded', () => {
  app.init();
});
