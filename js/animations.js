// animations.js - Código completo optimizado para Safari y GSAP
class TextAnimations {
  constructor() {
    this.checkDependencies();
  }

  checkDependencies() {
    if (!window.gsap || !window.ScrollTrigger) {
      console.warn('GSAP no detectado. Intentando cargar dinámicamente...');
      this.loadGSAPDependencies();
      return;
    }
    this.init();
  }

  loadGSAPDependencies() {
    const gsapScript = document.createElement('script');
    gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
    gsapScript.async = false; // Crucial para Safari
    
    gsapScript.onload = () => {
      const stScript = document.createElement('script');
      stScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
      stScript.async = false; // Crucial para Safari
      
      stScript.onload = () => {
        gsap.registerPlugin(ScrollTrigger);
        this.init();
      };
      
      document.head.appendChild(stScript);
    };

    document.head.appendChild(gsapScript);
  }

  init() {
    console.log('✨ Animaciones inicializadas con GSAP', gsap.version);
    
    // Verificación final de dependencias
    if (!window.gsap || !window.ScrollTrigger) {
      console.error('❌ GSAP/ScrollTrigger no disponibles después de carga');
      return;
    }

    const path = window.location.pathname;
    
    if (path === '/' || path.includes('index.html')) {
      this.initHomeAnimations();
      this.createCircularText();
    } else if (path.includes('about.html')) {
      this.initAboutAnimations();
    } else if (path.includes('menu.html')) {
      this.initMenuAnimations();
    } else if (path.includes('project-')) {
      this.initProjectAnimations();
    }
  }

  /* ======================= */
  /*   CIRCLE TEXT & SVG      */
  /* ======================= */
  createCircularText() {
    // ... (mantén el mismo código de createCircularText que tenías)
    // Solo asegúrate de que use window.gsap en lugar de gsap directamente
  }

  /* ======================= */
  /*   HOME PAGE ANIMATIONS   */
  /* ======================= */
  initHomeAnimations() {
    window.gsap.set(['.name', '.paragraph', '.paragraph-desktop', '.paragraph-mobile'], {
      y: 50,
      opacity: 0,
      willChange: 'transform, opacity'
    });

    const tl = window.gsap.timeline({
      scrollTrigger: {
        trigger: '.main-content',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
        markers: false // Desactiva en producción
      }
    });

    tl.to('.name', {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power2.out'
    })
    // ... (resto de tus animaciones igual pero usando window.gsap)
  }

  /* ======================= */
  /*   MENU PAGE ANIMATIONS   */
  /* ======================= */
  initMenuAnimations() {
    // ... (implementa igual pero usando window.gsap)
  }

  /* ======================= */
  /*   ABOUT PAGE ANIMATIONS  */
  /* ======================= */
  initAboutAnimations() {
    // ... (implementa igual pero usando window.gsap)
  }

  /* ======================= */
  /*  PROJECT PAGE ANIMATIONS */
  /* ======================= */
  initProjectAnimations() {
    // ... (implementa igual pero usando window.gsap)
  }
}

// Inicialización segura para Safari
function initializeAnimations() {
  // Espera a que GSAP esté disponible
  const checkInterval = setInterval(() => {
    if (window.gsap && window.ScrollTrigger) {
      clearInterval(checkInterval);
      new TextAnimations();
    }
  }, 100);

  // Timeout de seguridad
  setTimeout(() => {
    clearInterval(checkInterval);
    if (window.gsap && window.ScrollTrigger) {
      new TextAnimations();
    } else {
      console.error('No se pudo cargar GSAP después de 3 segundos');
    }
  }, 3000);
}

// Iniciar cuando el DOM esté listo
if (document.readyState === 'complete') {
  initializeAnimations();
} else {
  document.addEventListener('DOMContentLoaded', initializeAnimations);
}