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
