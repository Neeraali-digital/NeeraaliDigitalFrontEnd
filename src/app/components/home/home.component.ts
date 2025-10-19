import { Component } from '@angular/core';
import { Hero } from '../hero/hero';
import { WhoWeAre } from '../who-we-are/who-we-are';
import { WhatWeDo } from '../what-we-do/what-we-do';
import { NeeraaliWay } from '../neeraali-way/neeraali-way';
import { Process } from '../process/process';
import { BlogSectionComponent } from '../blog-section/blog-section.component';
import { TrustedBy } from '../trusted-by/trusted-by';
import { Contact } from '../contact/contact';
import { Testimonials } from '../testimonials/testimonials';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    Hero,
    WhoWeAre,
    WhatWeDo,
    NeeraaliWay,
    Process,
    BlogSectionComponent,
    TrustedBy,
    Contact,
    Testimonials
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent {
}