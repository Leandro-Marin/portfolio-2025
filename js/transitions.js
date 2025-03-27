import { gsap } from 'gsap';

class PageTransitions {
  constructor() {
    this.isTransitioning = false;
    this.init();
  }

  init() {
    // Create transition overlay
    this.transition = document.createElement('div');
    this.transition.className = 'page-transition';
    document.body.appendChild(this.transition);

    // Add event listeners to all internal links
    this.addLinkListeners();

    // Handle initial page load transition
    this.transitionIn();
  }

  addLinkListeners() {
    document.querySelectorAll('a').forEach(link => {
      if (link.href.startsWith(window.location.origin) && 
          !link.href.includes('#') && 
          !link.target) {
        link.addEventListener('click', (e) => this.handleLinkClick(e, link.href));
      }
    });
  }

  async handleLinkClick(e, href) {
    if (this.isTransitioning) return;
    e.preventDefault();
    this.isTransitioning = true;

    await this.transitionOut();
    window.location.href = href;
  }

  transitionIn() {
    gsap.fromTo(
      document.body,
      { opacity: 0 },
      { 
        opacity: 1, 
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: () => {
          this.isTransitioning = false;
          this.transition.style.opacity = '0';
          this.transition.style.pointerEvents = 'none';
        }
      }
    );
  }

  async transitionOut() {
    return new Promise(resolve => {
      this.transition.style.opacity = '1';
      this.transition.style.pointerEvents = 'all';
      
      gsap.to(document.body, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.inOut',
        onComplete: resolve
      });
    });
  }
}

// Initialize transitions when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new PageTransitions();
});