class LoadingScreen {
  constructor() {
    this.loadingScreen = document.querySelector('.loading-screen');
    this.counter = document.querySelector('.loading-counter');
    this.progress = document.querySelector('.loading-progress');
    this.currentProgress = 0;
    this.targetProgress = 0;
    this.isLoading = true;
  }

  static shouldShow() {
    // 1. Si es una navegación interna (click en enlaces), no mostrar loading
    if (sessionStorage.getItem('isSPANavigation')) {
      sessionStorage.removeItem('isSPANavigation');
      return false;
    }

    // 2. Mostrar solo en carga inicial (navigate) o refresh (reload)
    if (window.performance && window.performance.getEntriesByType) {
      const navEntries = performance.getEntriesByType('navigation');
      if (navEntries.length > 0) {
        return navEntries[0].type === 'navigate' || navEntries[0].type === 'reload';
      }
    }

    // 3. Fallback para navegadores antiguos
    return !sessionStorage.getItem('alreadyLoaded');
  }

  start() {
    if (!this.loadingScreen) return;

    if (!LoadingScreen.shouldShow()) {
      this.skipLoading();
      return;
    }

    sessionStorage.setItem('alreadyLoaded', 'true');
    this.animate();
    this.simulateLoading();
  }

  // Resto de tus métodos existentes...
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
        
        setTimeout(() => {
          this.loadingScreen.remove();
        }, 500);
      }
    }, 500);
  }
}

// Inicialización
if (document.readyState === 'complete') {
  new LoadingScreen().start();
} else {
  document.addEventListener('DOMContentLoaded', () => {
    new LoadingScreen().start();
  });
}