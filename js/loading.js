class LoadingScreen {
  constructor() {
    this.loadingScreen = document.querySelector('.loading-screen');
    this.counter = document.querySelector('.loading-counter');
    this.progress = document.querySelector('.loading-progress');
    this.currentProgress = 0;
    this.targetProgress = 0;
    this.isLoading = true;
    
    // Mostrar siempre la loading screen (eliminamos la lógica condicional)
    this.animate();
    this.simulateLoading();
  }

  animate() {
    if (!this.isLoading || !this.loadingScreen) return;

    if (this.currentProgress < this.targetProgress) {
      this.currentProgress += 1;
      this.updateUI();
    }

    if (this.currentProgress >= 100) {
      this.complete();
      return;
    }

    requestAnimationFrame(() => this.animate());
  }

  updateUI() {
    if (this.counter && this.progress) {
      this.counter.textContent = Math.floor(this.currentProgress);
      this.progress.style.width = `${this.currentProgress}%`;
    }
  }

  simulateLoading() {
    const intervals = [
      { target: 30, time: 500 },
      { target: 50, time: 1000 },
      { target: 70, time: 800 },
      { target: 90, time: 700 },
      { target: 100, time: 500 }
    ];

    intervals.forEach(({ target, time }, index) => {
      setTimeout(() => {
        this.targetProgress = target;
      }, intervals.slice(0, index + 1).reduce((sum, { time }) => sum + time, 0));
    });
  }

  complete() {
    this.isLoading = false;
    setTimeout(() => {
      if (this.loadingScreen) {
        this.loadingScreen.classList.add('fade-out');
        document.body.style.overflow = 'auto';
        
        // Remove the loading screen from DOM after fade out
        setTimeout(() => {
          this.loadingScreen.remove();
        }, 500);
      }
    }, 500);
  }
}

// Inicialización mejorada con verificación de elementos
function initLoadingScreen() {
  const loadingScreenExists = document.querySelector('.loading-screen');
  if (loadingScreenExists && !window.loadingScreenInitialized) {
    window.loadingScreenInitialized = true;
    new LoadingScreen();
  }
}

// Iniciar cuando el DOM esté listo
if (document.readyState === 'complete') {
  initLoadingScreen();
} else {
  document.addEventListener('DOMContentLoaded', initLoadingScreen);
}