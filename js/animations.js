const { gsap } = window;
gsap.registerPlugin(ScrollTrigger);
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

class TextAnimations {
  constructor() {
    this.init();
  }

  init() {
    // Handle homepage animations differently
    if (window.location.pathname === '/' || window.location.pathname.includes('index.html')) {
      this.initHomeAnimations();
    } 
    // About page specific animations
    else if (window.location.pathname.includes('about.html')) {
      this.initAboutAnimations();
    }
    // Menu page animations
    else if (window.location.pathname.includes('menu.html')) {
      this.initMenuAnimations();
    }
    // Project pages animations
    else if (window.location.pathname.includes('project-')) {
      this.initProjectAnimations();
    }
  }

  initHomeAnimations() {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.main-content',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    // Set initial states
    gsap.set('.name, .paragraph, .paragraph-desktop, .paragraph-mobile', {
      y: 50,
      opacity: 0
    });

    // Animate title first
    timeline.to('.name', {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power2.out'
    })
    // Then animate first paragraph
    .to('.paragraph', {
      y: 0,
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out'
    }, '+=0.05')
    // Finally animate the desktop/mobile paragraphs
    .to(['.paragraph-desktop', '.paragraph-mobile'], {
      y: 0,
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out'
    }, '+=0.05');
  }

  initMenuAnimations() {
    const projects = document.querySelectorAll('.animate-project');
    
    // Set initial states
    gsap.set(projects, {
      y: 50,
      opacity: 0
    });

    // Create timeline for projects with a delay
    const timeline = gsap.timeline({
      delay: 0.5, // Add initial delay
      scrollTrigger: {
        trigger: '.main-menu',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    // Animate each project with a stagger effect
    timeline.to(projects, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power3.out'
    });
  }

  initAboutAnimations() {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.about-content-top',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    // Set initial states
    gsap.set([
      '.profile-picture-mobile',
      '.about-title',
      '.about-paragraphs p',
      '.box',
      '.button-download'
    ], {
      y: 50,
      opacity: 0
    });

    // Profile picture animation (mobile)
    if (document.querySelector('.profile-picture-mobile')) {
      timeline.to('.profile-picture-mobile', {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out'
      });
    }

    // Title animation
    timeline.to('.about-title', {
      y: 0,
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out'
    }, '+=0.1');

    // Paragraphs animation
    const paragraphs = document.querySelectorAll('.about-paragraphs p');
    paragraphs.forEach((paragraph, index) => {
      timeline.to(paragraph, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out'
      }, '+=0.05');
    });

    // Animate boxes and download button together
    const boxesTimeline = gsap.timeline({}, "+=0.1");
    
    // Boxes animation
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box, index) => {
      boxesTimeline.to(box, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out'
      }, index * 0.1); // Reduced stagger time
    });

    // Download button animation - starts with the boxes
    const downloadBtn = document.querySelector('.button-download');
    if (downloadBtn) {
      boxesTimeline.to(downloadBtn, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out'
      }, 0); // Start at the same time as boxes
    }

    // Add boxes timeline to main timeline
    timeline.add(boxesTimeline);
  }

  initProjectAnimations() {
    const timeline = gsap.timeline();

    // Set initial states
    gsap.set([
      '.project-header p',
      '.project-header h1',
      '.project-description',
      '.buttons',
      '.scroll-down-btn',
      '.gallery-item'
    ], {
      y: 50,
      opacity: 0
    });

    // Animate header elements together
    timeline.to(['.project-header h1', '.project-header p'], {
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

    // Gallery items animation
    const galleryTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.gallery-section',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    galleryTimeline.to('.gallery-item', {
      y: 0,
      opacity: 1,
      duration: 0.4,
      stagger: 0.1,
      ease: 'power2.out'
    });
  }
}

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new TextAnimations();
});