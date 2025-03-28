class TextAnimations {
  constructor() {
    this.initGSAP();
  }

  initGSAP() {
    if (!window.gsap) {
      this.loadDependencies();
      return;
    }
    this.setupAnimations();
  }

  loadDependencies() {
    const loadScript = (src) => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        document.head.appendChild(script);
      });
    };

    Promise.all([
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js'),
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js')
    ]).then(() => {
      gsap.registerPlugin(ScrollTrigger);
      this.setupAnimations();
    });
  }

  setupAnimations() {
    if (!window.gsap || !window.ScrollTrigger) {
      setTimeout(() => this.setupAnimations(), 100);
      return;
    }

    gsap.config({ force3D: true });

    const path = window.location.pathname.split('/').pop();
    if (path === '' || path === 'index.html') this.initHomeAnimations();
    if (path === 'about.html') this.initAboutAnimations();
    if (path === 'menu.html') this.initMenuAnimations();
    if (path.includes('project-')) this.initProjectAnimations();
  }

  initHomeAnimations() {
    this.createCircularText();
    
    gsap.utils.toArray(['.name', '.paragraph']).forEach(el => {
      gsap.fromTo(el,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: el,
            start: "top 80%"
          }
        }
      );
    });
  }

  createCircularText() {
    if (document.querySelector('.circular-text')) return;
    
    const container = document.createElement('div');
    container.className = 'circular-text';
    
    createCircularText() {
      if (document.querySelector('.circular-text')) return;
    
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
    
      // Animación de rotación continua
      gsap.to('.circular-text', {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: 'none'
      });
    }
    
    document.body.appendChild(container);
    
    gsap.to(container, {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "none"
    });
  }

  initMenuAnimations() {
    gsap.from('.animate-project', {
      y: 50,
      opacity: 0,
      stagger: 0.15,
      scrollTrigger: {
        trigger: '.main-menu',
        start: "top 80%"
      }
    });
  }

  initAboutAnimations() {
    gsap.utils.toArray(['.about-title', '.box']).forEach((el, i) => {
      gsap.from(el, {
        y: 50,
        opacity: 0,
        delay: i * 0.1,
        scrollTrigger: {
          trigger: el,
          start: "top 80%"
        }
      });
    });
  }

  initProjectAnimations() {
    gsap.utils.toArray(['.gallery-item']).forEach((el, i) => {
      gsap.from(el, {
        y: 100,
        opacity: 0,
        delay: i * 0.1,
        scrollTrigger: {
          trigger: el,
          start: "top 90%"
        }
      });
    });
  }
}

// Inicialización segura
if (document.readyState === 'complete') {
  new TextAnimations();
} else {
  document.addEventListener('DOMContentLoaded', () => new TextAnimations());
}