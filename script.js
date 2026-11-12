document.addEventListener('DOMContentLoaded', () => {
    // 1. Category Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const gameCards = document.querySelectorAll('.game-card');
  
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
  
        const category = btn.dataset.filter;
        gameCards.forEach((card) => {
          if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  
    // 2. Modal & Aim Trainer Game Setup
    const modal = document.getElementById('gameModal');
    const canvas = document.getElementById('aimCanvas');
    const ctx = canvas.getContext('2d');
    const scoreDisplay = document.getElementById('scoreDisplay');
  
    let score = 0;
    let target = { x: 200, y: 130, r: 18 };
  
    function openGameModal() {
      modal.classList.add('open');
      drawTarget();
    }
  
    function closeGameModal() {
      modal.classList.remove('open');
    }
  
    function resetGame() {
      score = 0;
      scoreDisplay.textContent = score;
      spawnTarget();
    }
  
    function spawnTarget() {
      target.x = Math.random() * (canvas.width - 50) + 25;
      target.y = Math.random() * (canvas.height - 50) + 25;
      drawTarget();
    }
  
    function drawTarget() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.arc(target.x, target.y, target.r, 0, Math.PI * 2);
      ctx.fillStyle = '#06b6d4';
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = 15;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  
    // Event Listeners for Modal Controls
    document.getElementById('openModalNav').addEventListener('click', openGameModal);
    document.getElementById('openModalHero').addEventListener('click', openGameModal);
    document.querySelectorAll('.open-aim-btn').forEach((btn) => {
      btn.addEventListener('click', openGameModal);
    });
  
    document.getElementById('closeModalBtn').addEventListener('click', closeGameModal);
    document.getElementById('resetGameBtn').addEventListener('click', resetGame);
  
    // Canvas Target Click Detection
    canvas.addEventListener('mousedown', (e) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const clickX = (e.clientX - rect.left) * scaleX;
      const clickY = (e.clientY - rect.top) * scaleY;
  
      const dist = Math.hypot(clickX - target.x, clickY - target.y);
      if (dist <= target.r) {
        score++;
        scoreDisplay.textContent = score;
        spawnTarget();
      }
    });
  });
  