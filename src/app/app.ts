import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { LoadingComponent } from './components/loading/loading.component';
import { WhatsappPopupComponent } from './components/whatsapp-popup/whatsapp-popup.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    Header,
    Footer,
    LoadingComponent,
    WhatsappPopupComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('neeraali-digital');
  isLoading = signal(true);
  isAdmin = signal(false);

  constructor(private router: Router) {}

  ngOnInit() {
    // Simulate loading time
    setTimeout(() => {
      this.isLoading.set(false);
    }, 3000);

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isAdmin.set(event.url.startsWith('/admin'));
      }
    });
  }
}
