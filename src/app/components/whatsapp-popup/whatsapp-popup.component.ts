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
  private reopenTimeout: any;

  ngOnInit() {
    // Show popup immediately when component loads
    setTimeout(() => {
      this.showPopup = true;
    }, 1000);
  }

  ngOnDestroy() {
    if (this.reopenTimeout) {
      clearTimeout(this.reopenTimeout);
    }
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