import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-trusted-by',
  imports: [],
  templateUrl: './trusted-by.html',
  styleUrl: './trusted-by.scss'
})
export class TrustedBy implements AfterViewInit {
  radius = 650; // increased radius for full width arc
  centerX = 0;
  centerY = 0;
  currentIndex = 0;
  visibleCount = 8;

  ngAfterViewInit() {
    this.animateCounters();
    this.startLogoRotation();
  }

  logos = [
    '../../../assets/logos/1.png',
    '../../../assets/logos/2.png',
    '../../../assets/logos/3.jpg',
    '../../../assets/logos/4.jpg',
    '../../../assets/logos/5.png',
    '../../../assets/logos/6.png',
    '../../../assets/logos/7.png',
    '../../../assets/logos/8.png',
    '../../../assets/logos/9.png',
    '../../../assets/logos/10.png',
    '../../../assets/logos/11.jpg',
    '../../../assets/logos/12.jpg',
    '../../../assets/logos/13.png',
    '../../../assets/logos/14.jpg',
    '../../../assets/logos/15.jpg',
    '../../../assets/logos/16.png',
    '../../../assets/logos/17.png'
  ];

  // Returns array of objects with logo and transform style for semi-circle layout
  getLogosWithPosition() {
    const logosWithPos: { src: string; transform: string; size: string }[] = [];
    const angleRange = 120; // decreased curve
    const angleStep = angleRange / (this.visibleCount - 1); // degrees between visible logos
    const startAngle = (180 - angleRange) / 2; // center the arc

    for (let i = 0; i < this.visibleCount; i++) {
      const logoIndex = (this.currentIndex + i) % this.logos.length;
      const angleDeg = startAngle + i * angleStep; // centered upside down semi-circle
      const angleRad = angleDeg * (Math.PI / 180);
      const x = this.radius * Math.cos(angleRad);
      const y = this.radius * Math.sin(angleRad);
      const transform = `translate(${x}px, ${-y}px)`; // y inverted for CSS coords
      let size = 'large';
      if (i === 0 || i === this.visibleCount - 1) size = 'small';
      else if (i === 1 || i === this.visibleCount - 2) size = 'medium';
      logosWithPos.push({ src: this.logos[logoIndex], transform, size });
    }
    return logosWithPos;
  }

  private startLogoRotation() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + this.visibleCount) % this.logos.length;
    }, 3000); // switch every 3 seconds
  }

  private animateCounters() {
    const counters = document.querySelectorAll('.counter');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target as HTMLElement;
          const target = parseInt(counter.getAttribute('data-target') || '0');
          this.animateCounter(counter, target);
          observer.unobserve(counter);
        }
      });
    });

    counters.forEach(counter => observer.observe(counter));
  }

  private animateCounter(element: HTMLElement, target: number) {
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current).toString();
    }, 16);
  }
}
