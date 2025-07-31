const thumbnails = document.querySelectorAll('.media-thumbnails img');
const popupOverlay = document.getElementById('popup-overlay');
const popupImage = popupOverlay.querySelector('img');
const popupCaption = document.getElementById('popup-caption');
const closeBtn = popupOverlay.querySelector('.close-btn');

// Media thumbnail click & keyboard behavior
thumbnails.forEach(img => {
  img.addEventListener('click', () => {
    popupImage.src = img.src.replace('thumb', 'large') || img.src;
    popupImage.alt = img.alt || "Expanded image";
    popupCaption.textContent = img.alt || "";
    popupOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  img.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      img.click();
    }
  });
});

// Close popup behavior
function closePopup() {
  popupOverlay.classList.remove('active');
  popupImage.src = '';
  popupCaption.textContent = '';
  document.body.style.overflow = '';
}

closeBtn.addEventListener('click', closePopup);
popupOverlay.addEventListener('click', (e) => {
  if (e.target === popupOverlay) {
    closePopup();
  }
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && popupOverlay.classList.contains('active')) {
    closePopup();
  }
});


// ========================
// RyneW Triple-Click Logic
// ========================

const walkers = document.querySelectorAll('.walker');
let ryneClickCount = 0;
let lastClickPosition = { x: 0, y: 0 };
const boomSound = new Audio("images/Boom.mp3");

walkers.forEach(walker => {
  walker.addEventListener('click', (e) => {
    ryneClickCount++;
    const rect = e.target.getBoundingClientRect();
    lastClickPosition = {
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY
    };

    if (ryneClickCount === 3) {
      // Remove all walker gifs
      walkers.forEach(w => w.remove());

      // Create Boom.gif
      const boom = document.createElement('img');
      boom.src = "images/Boom.gif";
      boom.style.position = "absolute";
      boom.style.left = lastClickPosition.x + "px";
      boom.style.top = lastClickPosition.y + "px";
      boom.style.width = "120px";
      boom.style.zIndex = "9999";
      boom.style.pointerEvents = "none";
      boom.style.imageRendering = "pixelated";
      document.body.appendChild(boom);

      // Play sound once
      boomSound.play();

      // Remove boom after 2 seconds
      setTimeout(() => {
        boom.remove();
      }, 2000);
    }
  });
});
