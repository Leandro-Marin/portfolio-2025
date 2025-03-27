// Burger menu functionality
const burger = document.querySelector('.burger-menu');
const nav = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  nav.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!nav.contains(e.target) && !burger.contains(e.target) && nav.classList.contains('active')) {
    nav.classList.remove('active');
    burger.classList.remove('active');
  }
});

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
    burger.classList.remove('active');
  });
});

// Color palettes
const colorPalettes = [ 
  { bg: '#FF69B4', text: '#F0A1C2' },   // Hot Pink + Soft Pink
  { bg: '#F5A623', text: '#1B1B1B' },  // Sunset Gold
  { bg: '#1A1A2E', text: '#E94560' },  // Crimson Night
  { bg: '#ECDBBA', text: '#2D4263' },  // Vintage Elegance
  { bg: '#A2D2FF', text: '#121212' },  // Midnight Frost
  { bg: '#FF6F00', text: '#9B00FF' },  // Vivid Orange + Neon Violet
  { bg: '#808080', text: '#FFF200' },  // Urban Sun
  { bg: '#007BFF', text: '#FFD700' },  // Electric Gold
  { bg: '#121212', text: '#FF1744' },  // Dark Cherry
  { bg: '#9B00FF', text: '#FF66B2' },  // Electric Violet + Barbie Pink
  { bg: '#FF0099', text: '#FF6F00' },  // Electric Sunset
  { bg: '#102A43', text: '#00D9F9' },  // Deep Sea
  { bg: '#D90000', text: '#F2FF00' },  // Red + Neon Yellow
  { bg: '#F5F3F0', text: '#FF4D00' },  // Warm Glow
  { bg: '#A4D17A', text: '#728F48' },  // Mossy Whisper
  { bg: '#F4ECE5', text: '#8F6348' },  // Autumn Glow
  { bg: '#2A2A2A', text: '#FF007F' }, // Metallic Rose
  { bg: '#FFFEF0', text: '#6A8E7F' }  // Main colors 
];

function changeMood() {
  const savedIndex = parseInt(localStorage.getItem('selectedPalette'));
  let currentPaletteIndex = isNaN(savedIndex) ? -1 : savedIndex;

  currentPaletteIndex = (currentPaletteIndex + 1) % colorPalettes.length;
  const newColors = colorPalettes[currentPaletteIndex];
  const root = document.documentElement;

  root.style.setProperty('--main-bg-color', newColors.bg);
  root.style.setProperty('--main-text-color', newColors.text);

  localStorage.setItem('selectedPalette', currentPaletteIndex.toString());
}

function initializeTheme() {
  const savedIndex = localStorage.getItem('selectedPalette');
  const root = document.documentElement;
  
  if (savedIndex !== null) {
    const index = parseInt(savedIndex);
    if (index >= 0 && index < colorPalettes.length) {
      root.style.setProperty('--main-bg-color', colorPalettes[index].bg);
      root.style.setProperty('--main-text-color', colorPalettes[index].text);
    }
  }
  
  document.body.classList.add('theme-initialized');
}

// Initialize theme
if (document.readyState === 'interactive' || document.readyState === 'complete') {
  initializeTheme();
} else {
  document.addEventListener('DOMContentLoaded', initializeTheme);
}

// Add event listeners for mood buttons
document.addEventListener('DOMContentLoaded', () => {
  const moodButtons = document.querySelectorAll('.mood-button');
  moodButtons.forEach(button => {
    button.addEventListener('click', changeMood);
  });

  // Gallery navigation with infinite scroll
  const gallery = document.querySelector('.gallery');
  const prevBtn = document.querySelector('.gallery-nav-prev');
  const nextBtn = document.querySelector('.gallery-nav-next');
  
  if (gallery && prevBtn && nextBtn) {
    const scrollWidth = gallery.scrollWidth;
    const clientWidth = gallery.clientWidth;
    
    const handleScroll = () => {
      if (gallery.scrollLeft === 0) {
        // At the start, jump to end
        gallery.scrollLeft = scrollWidth - clientWidth;
      } else if (Math.ceil(gallery.scrollLeft) >= scrollWidth - clientWidth) {
        // At the end, jump to start
        gallery.scrollLeft = 0;
      }
    };

    prevBtn.addEventListener('click', () => {
      gallery.scrollBy({
        left: -gallery.offsetWidth,
        behavior: 'smooth'
      });
      setTimeout(handleScroll, 500); // Check after scroll animation
    });

    nextBtn.addEventListener('click', () => {
      gallery.scrollBy({
        left: gallery.offsetWidth,
        behavior: 'smooth'
      });
      setTimeout(handleScroll, 500); // Check after scroll animation
    });

    gallery.addEventListener('scroll', () => {
      requestAnimationFrame(handleScroll);
    });
  }

  // Add scroll down functionality
  const scrollDownBtn = document.querySelector('.scroll-down-btn');
  if (scrollDownBtn) {
    scrollDownBtn.addEventListener('click', () => {
      const gallerySection = document.querySelector('.gallery-section');
      if (gallerySection) {
        gallerySection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
});

// Función para crear el texto circular
function createCircularText() {
  const circularText = document.createElement('div');
  circularText.className = 'circular-text';
  circularText.style.background = 'rgba(255, 0, 0, 0.3)'; // Forzamos el fondo rojo para debug

  const textCircle = document.createElement('div');
  textCircle.className = 'text-circle';

  const text = 'WELCOME · nice to meet you · WELCOME · nice to meet you · ';
  const chars = text.split('');
  const angleStep = 360 / chars.length;

  chars.forEach((char, i) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.transform = `rotate(${angleStep * i}deg)`;
    span.style.fontFamily = (char === 'W' || char === 'E' || char === 'L' || char === 'C' || char === 'O' || char === 'M') 
      ? '"BaseNeueTrial-SuperExpBlack", sans-serif' 
      : '"Questrial", sans-serif';
    textCircle.appendChild(span);
  });

  circularText.appendChild(textCircle);

  // SVG simplificado
  const svgContainer = document.createElement('div');
  svgContainer.className = 'svg-container';
  svgContainer.innerHTML = `
    <svg viewBox="0 0 500 500">
      <path fill="currentColor" d="M366.47,455.52c-69.56,39.27-157.38,42.43-232.01.61C20.8,392.42-19.84,248.13,43.86,134.47,107.57,20.8,251.86-19.82,365.52,43.87h0c113.66,63.71,154.3,208,90.6,321.65-21.88,39.03-53.26,69.46-89.64,90ZM139.84,55.66c-34.41,19.42-64.08,48.19-84.76,85.1-60.24,107.48-21.81,243.92,85.67,304.16,107.47,60.24,243.92,21.81,304.15-85.67,60.24-107.47,21.81-243.92-85.67-304.15-70.56-39.55-153.62-36.56-219.39.57Z"/>
    </svg>`;

  circularText.appendChild(svgContainer);
  document.body.appendChild(circularText); // Añadir al body, no a .main-content
}

// Ejecutar al cargar (sin depender de DOMContentLoaded)
if (window.location.pathname.endsWith('/') || window.location.pathname.includes('index.html')) {
  createCircularText();
}