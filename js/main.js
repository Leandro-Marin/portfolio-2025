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
  { bg: '#1A1A2E', text: '#E94560' },  // Crimson Night
  { bg: '#ECDBBA', text: '#2D4263' },  // Vintage Elegance
  { bg: '#808080', text: '#FFF200' },  // Urban Sun
  { bg: '#007BFF', text: '#FFD700' },  // Electric Gold
  { bg: '#A2D2FF', text: '#121212' },  // Midnight Frost
  { bg: '#C71585', text: '#FF6F00' },  // Bold Pink
  { bg: '#272727', text: '#d6ff01' },  // Neon Eclipse
  { bg: '#FF6363', text: '#17223B' },  // Scarlet Sunrise
  { bg: '#1B262C', text: '#BBE1FA' },  // Frozen Ocean
  { bg: '#A4D17A', text: '#728F48' },  // Mossy Whisper
  { bg: '#F4ECE5', text: '#8F6348' },  // Autumn Glow
  { bg: '#FFA500', text: '#282C34' },  // Golden Hour
  { bg: '#2A2A2A', text: '#FF007F' },  // Metallic Rose
  { bg: '#141D2E', text: '#006AFF' },  // Royal Blue
  { bg: '#4B0082', text: '#FFFAF0' },  // Crimson Ivory
  { bg: '#FFFEF0', text: '#6A8E7F' },  // Main colors
];

// Get saved color index from localStorage or use -1 as default

// Function to update colors with a smooth transition
function changeMood() {
  const savedIndex = parseInt(localStorage.getItem('selectedPalette'));
  let currentPaletteIndex = isNaN(savedIndex) ? -1 : savedIndex; // Si no hay índice guardado, usa -1

  currentPaletteIndex = (currentPaletteIndex + 1) % colorPalettes.length; // Mueve al siguiente color
  const newColors = colorPalettes[currentPaletteIndex];
  const root = document.documentElement;

  console.log("Cambiando a paleta:", newColors); // Debug: ver si cambia

  root.style.setProperty('--main-bg-color', newColors.bg);
  root.style.setProperty('--main-text-color', newColors.text);

  localStorage.setItem('selectedPalette', currentPaletteIndex.toString());
}


/* ----------DON'T TOUCH THIS CODE--------
function changeMood() {
  const savedIndex = parseInt(localStorage.getItem('selectedPalette'));
  currentPaletteIndex = (savedIndex + 1) % colorPalettes.length;
  const newColors = colorPalettes[currentPaletteIndex];
  const root = document.documentElement;

  root.style.setProperty('--main-bg-color', newColors.bg);
  root.style.setProperty('--main-text-color', newColors.text);
  
  // Save current index to localStorage
  localStorage.setItem('selectedPalette', currentPaletteIndex.toString());
}*/

// Function to update colors with a smooth transition
function changeMood1() {
  // Recupera l'indice salvato o usa -1 come default
  const savedIndex = parseInt(localStorage.getItem('selectedPalette'));
  let currentIndex = isNaN(savedIndex) ? -1 : savedIndex;
  
  // Passa al prossimo indice (gestendo anche il caso in cui currentIndex sia -1)
  currentIndex = (currentIndex + 1) % colorPalettes.length;
  
  // Applica il nuovo colore
  const newColors = colorPalettes[currentIndex];
  const root = document.documentElement;
  
  root.style.setProperty('--main-bg-color', newColors.bg);
  root.style.setProperty('--main-text-color', newColors.text);
  
  // Salva il nuovo indice
  localStorage.setItem('selectedPalette', currentIndex.toString());
}

 // Funzione di inizializzazione tema
 function initializeTheme() {
  const savedIndex = localStorage.getItem('selectedPalette');
  const root = document.documentElement;
  
  if (savedIndex !== null) {
    const index = parseInt(savedIndex);
    if (index >= 0 && index < colorPalettes.length) {
      // Applica il tema salvato
      root.style.setProperty('--main-bg-color', colorPalettes[index].bg);
      root.style.setProperty('--main-text-color', colorPalettes[index].text);
    }
  }
  
  // Importante: mostra il contenuto solo dopo aver applicato il tema
  document.body.classList.add('theme-initialized');
}

// Se il DOM è già pronto, inizializza subito
if (document.readyState === 'interactive' || document.readyState === 'complete') {
  initializeTheme();
} else {
  // Altrimenti aspetta il primo evento disponibile
  document.addEventListener('DOMContentLoaded', initializeTheme);
}

document.addEventListener('DOMContentLoaded', () => {
  // Selecciona todos los botones de cambio de mood
  const moodButtons = document.querySelectorAll('.mood-button');

  // Agrega evento de clic a cada botón
  moodButtons.forEach(button => {
    button.addEventListener('click', changeMood);
  });
});


/*
// Set initial colors based on saved index
const root = document.documentElement;
let currentPaletteIndex = parseInt(localStorage.getItem('selectedPalette') || '-1');


if (currentPaletteIndex >= 0) {
  const savedColors = colorPalettes[currentPaletteIndex];
  root.style.setProperty('--main-bg-color', savedColors.bg);
  root.style.setProperty('--main-text-color', savedColors.text);
} else {
  // Set default colors if no saved index
  root.style.setProperty('--main-bg-color', '#FFFEF0');
  root.style.setProperty('--main-text-color', '#6A8E7F');
}*/

// Add click event listeners to both mood buttons
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Attach the scrollToTop function to the button
const scrollToTopButton = document.getElementById('scrollToTop');
if (scrollToTopButton) {
  scrollToTopButton.addEventListener('click', scrollToTop);
}

// Gallery Navigation
const gallery = document.querySelector('.gallery');
const prevBtn = document.querySelector('.gallery-nav.prev');
const nextBtn = document.querySelector('.gallery-nav.next');

prevBtn.addEventListener('click', () => {
  gallery.scrollBy({
    left: -gallery.offsetWidth,
    behavior: 'smooth'
  });
});

nextBtn.addEventListener('click', () => {
  gallery.scrollBy({
    left: gallery.offsetWidth,
    behavior: 'smooth'
  });
});