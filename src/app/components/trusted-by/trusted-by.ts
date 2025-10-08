import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-trusted-by',
  imports: [],
  templateUrl: './trusted-by.html',
  styleUrl: './trusted-by.scss'
})
export class TrustedBy implements AfterViewInit {
  ngAfterViewInit() {
    this.animateCounters();
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
]

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

  getFirstHalfLogos() {
    return this.logos.slice(0, Math.ceil(this.logos.length / 2));
  }

  getSecondHalfLogos() {
    return this.logos.slice(Math.ceil(this.logos.length / 2));
  }
}
