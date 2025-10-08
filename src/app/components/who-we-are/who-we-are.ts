import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-who-we-are',
  imports: [CommonModule],
  templateUrl: './who-we-are.html',
  styleUrl: './who-we-are.scss'
})
export class WhoWeAre implements OnInit, OnDestroy {
  posters = ['assets/posters/p1.jpeg', 'assets/posters/p2.jpeg', 'assets/posters/p3.jpeg', 'assets/posters/p4.jpeg'];
  currentSlide = 0;
  private slideInterval: any;
  private touchStartX = 0;
  private touchEndX = 0;

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  startAutoSlide() {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.posters.length;
  }

  prevSlide() {
    this.currentSlide = this.currentSlide === 0 ? this.posters.length - 1 : this.currentSlide - 1;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipe();
  }

  private handleSwipe() {
    const swipeThreshold = 50;
    const diff = this.touchStartX - this.touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
    }
  }
}
