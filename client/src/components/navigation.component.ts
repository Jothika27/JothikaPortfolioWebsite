import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100" [@slideDown]>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-lg">J</span>
            </div>
            <div>
              <span class="text-xl font-bold text-gray-900">Jothika R</span>
              <p class="text-sm text-gray-600">Software Engineer</p>
            </div>
          </div>
          
          <div class="hidden md:flex items-center space-x-8">
            <a *ngFor="let item of navItems" 
               [href]="item.href" 
               class="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
               (click)="scrollToSection($event, item.href)">
              {{item.label}}
            </a>
            <button class="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300">
              Contact Me
            </button>
          </div>
          
          <button class="md:hidden p-2" (click)="toggleMobileMenu()">
            <div class="w-6 h-6 flex flex-col justify-center items-center">
              <span class="w-5 h-0.5 bg-gray-600 transform transition-all duration-300" 
                    [class.rotate-45]="isMobileMenuOpen" 
                    [class.translate-y-1.5]="isMobileMenuOpen"></span>
              <span class="w-5 h-0.5 bg-gray-600 my-1 transition-all duration-300" 
                    [class.opacity-0]="isMobileMenuOpen"></span>
              <span class="w-5 h-0.5 bg-gray-600 transform transition-all duration-300" 
                    [class.-rotate-45]="isMobileMenuOpen" 
                    [class.-translate-y-1.5]="isMobileMenuOpen"></span>
            </div>
          </button>
        </div>

        <!-- Mobile menu -->
        <div *ngIf="isMobileMenuOpen" 
             class="md:hidden bg-white border-t border-gray-100 py-4" 
             [@mobileMenu]>
          <div class="space-y-3">
            <a *ngFor="let item of navItems" 
               [href]="item.href" 
               class="block px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
               (click)="scrollToSection($event, item.href); closeMobileMenu()">
              {{item.label}}
            </a>
            <button class="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full mt-4">
              Contact Me
            </button>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    nav {
      transition: all 0.3s ease;
    }
  `],
  animations: [
    trigger('slideDown', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate('500ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ]),
    trigger('mobileMenu', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('300ms ease-out', style({ height: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ height: 0, opacity: 0 }))
      ])
    ])
  ]
})
export class NavigationComponent {
  isMobileMenuOpen = false;
  
  navItems = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#education', label: 'Education' },
    { href: '#contact', label: 'Contact' }
  ];

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  scrollToSection(event: Event, href: string) {
    event.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}