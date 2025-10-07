import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trusted-by',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    .partner-logo {
      opacity: 0;
      animation: fadeIn 0.6s ease forwards;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .partner-logo:nth-child(1) { animation-delay: 0.1s; }
    .partner-logo:nth-child(2) { animation-delay: 0.2s; }
    .partner-logo:nth-child(3) { animation-delay: 0.3s; }
    .partner-logo:nth-child(4) { animation-delay: 0.4s; }
    .partner-logo:nth-child(5) { animation-delay: 0.5s; }
    .partner-logo:nth-child(6) { animation-delay: 0.6s; }

    @keyframes scroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-100%); }
    }

    .scroll-container {
      animation: scroll 20s linear infinite;
    }

    .scroll-container:hover {
      animation-play-state: paused;
    }
  `],
  template: `
    <section class="py-20 px-4 md:px-8 bg-white">
      <div class="container mx-auto">
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted By Industry Leaders
          </h2>
          <p class="text-xl text-gray-600">
            Partnering with forward-thinking businesses to create exceptional digital experiences
          </p>
        </div>

        <!-- Partners Grid - Static for larger screens -->
        <div class="hidden lg:grid grid-cols-3 gap-8 mb-12">
          <!-- Partner 1 -->
          <div class="partner-logo p-8 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <div class="flex items-center justify-center h-24 group">
              <div class="text-2xl font-bold text-gray-400 group-hover:text-brand-500 transition-colors">
                Partner 1
              </div>
            </div>
          </div>

          <!-- Partner 2 -->
          <div class="partner-logo p-8 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <div class="flex items-center justify-center h-24 group">
              <div class="text-2xl font-bold text-gray-400 group-hover:text-brand-500 transition-colors">
                Partner 2
              </div>
            </div>
          </div>

          <!-- Partner 3 -->
          <div class="partner-logo p-8 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <div class="flex items-center justify-center h-24 group">
              <div class="text-2xl font-bold text-gray-400 group-hover:text-brand-500 transition-colors">
                Partner 3
              </div>
            </div>
          </div>

          <!-- Partner 4 -->
          <div class="partner-logo p-8 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <div class="flex items-center justify-center h-24 group">
              <div class="text-2xl font-bold text-gray-400 group-hover:text-brand-500 transition-colors">
                Partner 4
              </div>
            </div>
          </div>

          <!-- Partner 5 -->
          <div class="partner-logo p-8 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <div class="flex items-center justify-center h-24 group">
              <div class="text-2xl font-bold text-gray-400 group-hover:text-brand-500 transition-colors">
                Partner 5
              </div>
            </div>
          </div>

          <!-- Partner 6 -->
          <div class="partner-logo p-8 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <div class="flex items-center justify-center h-24 group">
              <div class="text-2xl font-bold text-gray-400 group-hover:text-brand-500 transition-colors">
                Partner 6
              </div>
            </div>
          </div>
        </div>

        <!-- Scrolling Partners for mobile/tablet -->
        <div class="lg:hidden relative overflow-hidden">
          <div class="absolute left-0 top-0 w-12 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
          <div class="absolute right-0 top-0 w-12 h-full bg-gradient-to-l from-white to-transparent z-10"></div>
          
          <div class="scroll-container flex gap-8">
            <!-- First set -->
            <div class="flex-none w-64 p-6 bg-white rounded-lg shadow-md">
              <div class="flex items-center justify-center h-20">
                <div class="text-xl font-bold text-gray-400">Partner 1</div>
              </div>
            </div>
            <div class="flex-none w-64 p-6 bg-white rounded-lg shadow-md">
              <div class="flex items-center justify-center h-20">
                <div class="text-xl font-bold text-gray-400">Partner 2</div>
              </div>
            </div>
            <div class="flex-none w-64 p-6 bg-white rounded-lg shadow-md">
              <div class="flex items-center justify-center h-20">
                <div class="text-xl font-bold text-gray-400">Partner 3</div>
              </div>
            </div>
            <!-- Duplicate set for seamless scroll -->
            <div class="flex-none w-64 p-6 bg-white rounded-lg shadow-md">
              <div class="flex items-center justify-center h-20">
                <div class="text-xl font-bold text-gray-400">Partner 1</div>
              </div>
            </div>
            <div class="flex-none w-64 p-6 bg-white rounded-lg shadow-md">
              <div class="flex items-center justify-center h-20">
                <div class="text-xl font-bold text-gray-400">Partner 2</div>
              </div>
            </div>
            <div class="flex-none w-64 p-6 bg-white rounded-lg shadow-md">
              <div class="flex items-center justify-center h-20">
                <div class="text-xl font-bold text-gray-400">Partner 3</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Testimonial -->
        <div class="mt-16 max-w-3xl mx-auto bg-gray-50 p-8 rounded-lg">
          <blockquote class="italic text-gray-600 text-lg text-center">
            "Working with Neeraali Digital transformed our online presence. Their innovative approach and attention to detail exceeded our expectations."
          </blockquote>
          <div class="mt-4 text-center">
            <p class="font-semibold text-gray-900">John Smith</p>
            <p class="text-gray-500">CEO, Example Corp</p>
          </div>
        </div>
      </div>
    </section>
  `
})
export class TrustedByComponent {}