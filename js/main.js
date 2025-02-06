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
let currentPaletteIndex = parseInt(localStorage.getItem('currentPaletteIndex') || '-1');

// Function to update colors with a smooth transition
function changeMood() {
  currentPaletteIndex = (currentPaletteIndex + 1) % colorPalettes.length;
  const newColors = colorPalettes[currentPaletteIndex];
  const root = document.documentElement;
  
  root.style.setProperty('--main-bg-color', newColors.bg);
  root.style.setProperty('--main-text-color', newColors.text);
  
  // Save current index to localStorage
  localStorage.setItem('currentPaletteIndex', currentPaletteIndex.toString());
}

// Set initial colors based on saved index
const root = document.documentElement;
if (currentPaletteIndex >= 0) {
  const savedColors = colorPalettes[currentPaletteIndex];
  root.style.setProperty('--main-bg-color', savedColors.bg);
  root.style.setProperty('--main-text-color', savedColors.text);
} else {
  // Set default colors if no saved index
  root.style.setProperty('--main-bg-color', '#FFFEF0');
  root.style.setProperty('--main-text-color', '#6A8E7F');
}

// Add click event listeners to both mood buttons
const moodButtons = document.querySelectorAll('.mood-button');
moodButtons.forEach(button => {
  button.addEventListener('click', changeMood);
});