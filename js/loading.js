class LoadingScreen {
  constructor() {
    this.loadingScreen = document.querySelector('.loading-screen');
    this.counter = document.querySelector('.loading-counter');
    this.progress = document.querySelector('.loading-progress');
    this.currentProgress = 0;
    this.targetProgress = 0;
    this.isLoading = true;
  }

  // Método estático para determinar si se debe mostrar la pantalla de carga
  static shouldShow() {
    // Verificar si es la primera visita en esta sesión
    const hasShown = sessionStorage.getItem('loadingShown');
    
    // Mostrar siempre en la primera visita o si forzamos recarga
    if (!hasShown || performance.getEntriesByType("navigation")[0].type === "reload") {
      sessionStorage.setItem('loadingShown', 'true');
      return true;
    }
    
    return false;
  }

  start() {
    if (!LoadingScreen.shouldShow()) {
      this.skipLoading();
      return;
    }
    this.animate();
    this.simulateLoading();
  }

  skipLoading() {
    if (this.loadingScreen) {
      this.loadingScreen.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
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

// Initialize loading screen when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const loader = new LoadingScreen();
  loader.start();
});