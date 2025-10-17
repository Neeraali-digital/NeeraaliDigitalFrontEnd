import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {

  constructor(private router: Router) {}

  openFacebook() {
    window.open('https://www.facebook.com/share/1Fq5NbLjGF/?mibextid=wwXIfr', '_blank');
  }

  openLinkedIn() {
    window.open('https://www.linkedin.com/company/neeraali-digital-marketing-services/', '_blank');
  }

  openInstagram() {
    window.open('https://www.instagram.com/neeraali_digitalmarketing?igsh=MWk1dTdyempxeWlhZw%3D%3D&utm_source=qr', '_blank');
  }

  navigateToService(service: string) {
    this.router.navigate(['/what-we-do', service]);
  }

  startProject() {
    this.router.navigate(['/contact']);
  }

}
