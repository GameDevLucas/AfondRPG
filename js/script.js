const thumbnails = document.querySelectorAll('.media-thumbnails img');
const popupOverlay = document.getElementById('popup-overlay');
const popupImage = popupOverlay.querySelector('img');
const popupCaption = document.getElementById('popup-caption');
const closeBtn = popupOverlay.querySelector('.close-btn');

thumbnails.forEach(img => {
  img.addEventListener('click', () => {
    // Replace 'thumb' with 'large' in filename if you have large versions, else fallback to same src
    popupImage.src = img.src.replace('thumb', 'large') || img.src;
    popupImage.alt = img.alt || "Expanded image";

    // Set caption text from alt attribute or empty string
    popupCaption.textContent = img.alt || "";

    popupOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // prevent background scroll
  });

  // Accessibility: open popup on Enter or Space key
  img.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      img.click();
    }
  });
});

function closePopup() {
  popupOverlay.classList.remove('active');
  popupImage.src = '';
  popupCaption.textContent = '';
  document.body.style.overflow = '';
}

closeBtn.addEventListener('click', closePopup);

popupOverlay.addEventListener('click', (e) => {
  // Only close if clicking outside the image and caption (on overlay background)
  if (e.target === popupOverlay) {
    closePopup();
  }
});

// Close popup on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && popupOverlay.classList.contains('active')) {
    closePopup();
  }
});
