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
  showPopup = true; // Always visible

  ngOnInit() {
    // Component is always visible
  }

  ngOnDestroy() {
    // No cleanup needed
  }

  openWhatsApp() {
    const phoneNumber = '919945883333';
    const message = 'Hi! I would like to discuss my brand growth with Neeraali Digital.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }
}
