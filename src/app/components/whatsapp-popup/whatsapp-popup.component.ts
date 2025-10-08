import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-whatsapp-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './whatsapp-popup.component.html',
  styleUrl: './whatsapp-popup.component.scss'
})
export class WhatsappPopupComponent implements OnInit, OnDestroy {
  showPopup = false;
  private scrollTimeout: any;
  private reopenTimeout: any;

  ngOnInit() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.handleScroll.bind(this));
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
    if (this.reopenTimeout) {
      clearTimeout(this.reopenTimeout);
    }
  }

  private handleScroll() {
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }

    this.scrollTimeout = setTimeout(() => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Show popup after scrolling 50% of viewport height
      if (scrollPosition > windowHeight * 1 && !this.showPopup) {
        this.showPopup = true;
      }
    }, 3000);
  }

  closePopup() {
    this.showPopup = false;
    
    // Reopen popup after 30 seconds
    this.reopenTimeout = setTimeout(() => {
      this.showPopup = true;
    }, 30000);
  }

  openWhatsApp() {
    const phoneNumber = '919945883333';
    const message = 'Hi! I would like to discuss my brand growth with Neeraali Digital.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    this.showPopup = false;
    
    // Clear any pending reopen timeout when user clicks WhatsApp
    if (this.reopenTimeout) {
      clearTimeout(this.reopenTimeout);
    }
  }
}