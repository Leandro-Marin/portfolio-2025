// ============================
// 🍔 BURGER MENU FUNCTIONALITY
// ============================
const burger = document.querySelector('.burger-menu');
const nav = document.querySelector('.nav-links');
const body = document.body;  // Referencia al body

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  nav.classList.toggle('active');
  
  // Alterna la clase menu-active en el body y en el nav para cambiar el fondo
  body.classList.toggle('menu-active');
  nav.classList.toggle('menu-active');  // Asegúrate de aplicar también al contenedor del nav

  // Actualizar color de la X cuando se active el menú
  updateBurgerColor();
});

// Cerrar menú cuando se hace clic fuera
document.addEventListener('click', (e) => {
  if (!nav.contains(e.target) && !burger.contains(e.target) && nav.classList.contains('active')) {
    nav.classList.remove('active');
    burger.classList.remove('active');
    body.classList.remove('menu-active');  // Eliminar la clase si el menú se cierra
    nav.classList.remove('menu-active');   // Eliminar la clase en nav también
    updateBurgerColor();
  }
});

// Cerrar menú cuando se hace clic en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
    burger.classList.remove('active');
    body.classList.remove('menu-active');  // Eliminar la clase si se hace clic en un enlace
    nav.classList.remove('menu-active');   // Eliminar la clase en nav también
    updateBurgerColor();
  });
});

// ============================
// 🎨 COLOR MOOD FUNCTIONALITY
// ============================
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
  { bg: '#2A2A2A', text: '#FF007F' },  // Metallic
];

// Function to apply selected color palette
function applyColorPalette(palette) {
  document.documentElement.style.setProperty('--main-text-color', palette.text);
  document.documentElement.style.setProperty('--main-bg-color', palette.bg);
  updateBurgerColor();
}

// Función para actualizar el color de la "X"
function updateBurgerColor() {
  const burger = document.querySelector('.burger-menu');
  const burgerBars = document.querySelectorAll('.burger-menu div');
  const currentTextColor = getComputedStyle(document.documentElement).getPropertyValue('--main-text-color').trim();
  
  burgerBars.forEach(bar => {
    bar.style.setProperty('background-color', currentTextColor, 'important');
  });
}

// Load the saved color palette from localStorage (if any)
const savedPalette = localStorage.getItem('selectedPalette');
if (savedPalette) {
  const paletteIndex = parseInt(savedPalette);
  applyColorPalette(colorPalettes[paletteIndex]);
}

// Button functionality to change color mood (both buttons)
const changeMoodButtons = document.querySelectorAll('.mood-button');
changeMoodButtons.forEach(button => {
  button.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * colorPalettes.length);
    const selectedPalette = colorPalettes[randomIndex];
    applyColorPalette(selectedPalette);
    localStorage.setItem('selectedPalette', randomIndex);
  });
});
