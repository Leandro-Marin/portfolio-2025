const { gsap } = window;
const { ScrollTrigger } = window;

class TextAnimations {
  constructor() {
    if (!window.gsap) {
      console.error('❌ GSAP no está cargado');
      return;
    }
    
    gsap.registerPlugin(ScrollTrigger);
    this.init();
    console.log('✨ Animaciones inicializadas');
  }

  init() {
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
    const circularText = document.createElement('div');
    circularText.className = 'circular-text';
    circularText.setAttribute('aria-hidden', 'true');

    // Text Circle
    const textCircle = document.createElement('div');
    textCircle.className = 'text-circle';
    
    const text = 'WELCOME · nice to meet you · WELCOME · nice to meet you · ';
    const chars = text.split('');
    const angleStep = 360 / chars.length;
    
    chars.forEach((char, i) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.transform = `rotate(${angleStep * i}deg)`;
      span.style.fontFamily = (['W','E','L','C','O','M'].includes(char)) 
        ? '"BaseNeueTrial-SuperExpBlack", sans-serif' 
        : '"Questrial", sans-serif';
      textCircle.appendChild(span);
    });

    // SVG Construction
    const svgContainer = document.createElement('div');
    svgContainer.className = 'svg-container';
    
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 500 500");
    svg.setAttribute("width", "120");
    svg.setAttribute("height", "120");

    const paths = [
      "M366.47,455.52c-69.56,39.27-157.38,42.43-232.01.61C20.8,392.42-19.84,248.13,43.86,134.47,107.57,20.8,251.86-19.82,365.52,43.87h0c113.66,63.71,154.3,208,90.6,321.65-21.88,39.03-53.26,69.46-89.64,90ZM139.84,55.66c-34.41,19.42-64.08,48.19-84.76,85.1-60.24,107.48-21.81,243.92,85.67,304.16,107.47,60.24,243.92,21.81,304.15-85.67,60.24-107.47,21.81-243.92-85.67-304.15-70.56-39.55-153.62-36.56-219.39.57Z",
      "M140.31,211.55c-12.06,6.81-9.53,34.12,5.65,61s37.26,43.16,49.32,36.35c12.06-6.81,9.53-34.12-5.65-61-15.18-26.88-37.26-43.16-49.32-36.35Z",
      "M270.07,138.29c-12.06,6.81-9.53,34.12,5.65,61,15.18,26.88,37.26,43.16,49.32,36.35s9.53-34.12-5.65-61c-15.18-26.88-37.26-43.16-49.32-36.35Z",
      "M205.28,174.87c-12.06,6.81-9.53,34.12,5.65,61,15.18,26.88,37.26,43.16,49.32,36.35,12.06-6.81,9.53-34.12-5.65-61-15.18-26.88-37.26-43.16-49.32-36.35Z",
      "M331.36,393.52c-11.42,6.45-23.71,11.57-36.66,15.22-42.4,11.94-86.91,6.66-125.34-14.88-16.42-9.2-30.99-20.98-43.31-35.01-2.34-2.67-2.08-6.72.59-9.07,2.62-2.35,6.72-2.08,9.07.59,11.36,12.92,24.79,23.79,39.94,32.27,35.43,19.86,76.48,24.73,115.57,13.72,39.09-11.01,71.56-36.59,91.41-72.02,19.86-35.43,24.73-76.48,13.72-115.57-.96-3.41,1.02-6.97,4.44-7.93,3.42-.96,6.97,1.03,7.93,4.44,11.94,42.4,6.66,86.91-14.88,125.34-14.96,26.69-36.51,48.22-62.49,62.89Z"
    ];

    paths.forEach(d => {
      const path = document.createElementNS(svgNS, "path");
      path.setAttribute("fill", "currentColor");
      path.setAttribute("d", d);
      path.setAttribute("shape-rendering", "geometricPrecision");
      svg.appendChild(path);
    });

    svgContainer.appendChild(svg);
    circularText.appendChild(textCircle);
    circularText.appendChild(svgContainer);
    document.body.appendChild(circularText);
  }

  /* ======================= */
  /*   HOME PAGE ANIMATIONS   */
  /* ======================= */
  initHomeAnimations() {
    // Initial Setup
    gsap.set(['.name', '.paragraph', '.paragraph-desktop', '.paragraph-mobile'], {
      y: 50,
      opacity: 0,
      willChange: 'transform, opacity'
    });

    // Main Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.main-content',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.to('.name', {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power2.out'
    })
    .to('.paragraph', {
      y: 0,
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out'
    }, '+=0.05')
    .to(['.paragraph-desktop', '.paragraph-mobile'], {
      y: 0,
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out'
    }, '+=0.05');
  }

  /* ======================= */
  /*   MENU PAGE ANIMATIONS   */
  /* ======================= */
  initMenuAnimations() {
    const projects = document.querySelectorAll('.animate-project');
    
    gsap.set(projects, {
      y: 50,
      opacity: 0,
      willChange: 'transform, opacity'
    });

    const tl = gsap.timeline({
      delay: 0.5,
      scrollTrigger: {
        trigger: '.main-menu',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.to(projects, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power3.out'
    });
  }

  /* ======================= */
  /*   ABOUT PAGE ANIMATIONS  */
  /* ======================= */
  initAboutAnimations() {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.about-content-top',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    // Initial States
    gsap.set([
      '.profile-picture-mobile',
      '.about-title',
      '.about-paragraphs p',
      '.box',
      '.button-download'
    ], {
      y: 50,
      opacity: 0,
      willChange: 'transform, opacity'
    });

    // Animations
    if (document.querySelector('.profile-picture-mobile')) {
      tl.to('.profile-picture-mobile', {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out'
      });
    }

    tl.to('.about-title', {
      y: 0,
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out'
    }, '+=0.1');

    document.querySelectorAll('.about-paragraphs p').forEach((p, i) => {
      tl.to(p, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out'
      }, i === 0 ? '+=0.1' : '+=0.05');
    });

    // Boxes Timeline
    const boxesTl = gsap.timeline();
    document.querySelectorAll('.box').forEach((box, i) => {
      boxesTl.to(box, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out'
      }, i * 0.1);
    });

    const downloadBtn = document.querySelector('.button-download');
    if (downloadBtn) {
      boxesTl.to(downloadBtn, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out'
      }, 0);
    }

    tl.add(boxesTl);
  }

  /* ======================= */
  /*  PROJECT PAGE ANIMATIONS */
  /* ======================= */
  initProjectAnimations() {
    const mainTl = gsap.timeline();

    // Initial States
    gsap.set([
      '.project-header p',
      '.project-header h1',
      '.project-description',
      '.buttons',
      '.scroll-down-btn',
      '.gallery-item'
    ], {
      y: 50,
      opacity: 0,
      willChange: 'transform, opacity'
    });

    // Header Animations
    mainTl
      .to(['.project-header h1', '.project-header p'], {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
      })
      .to('.project-description', {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out'
      }, '+=0.2')
      .to('.buttons', {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out'
      }, '+=0.2')
      .to('.scroll-down-btn', {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out'
      }, '+=0.05');

    // Gallery Animations
    const galleryTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.gallery-section',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    galleryTl.to('.gallery-item', {
      y: 0,
      opacity: 1,
      duration: 0.4,
      stagger: 0.1,
      ease: 'power2.out'
    });
  }
}

// Smart Initialization
if (document.readyState === 'complete') {
  new TextAnimations();
} else {
  document.addEventListener('DOMContentLoaded', () => {
    new TextAnimations();
  });
}