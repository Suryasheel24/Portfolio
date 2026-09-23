import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../core/models/project.model';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent {
  readonly orderStep = signal<number>(2);
  readonly orderSteps = [
    { id: 'placed', name: 'Order Placed', shortName: 'Placed' },
    { id: 'prep', name: 'Sorting & Prep', shortName: 'Sorting' },
    { id: 'clean', name: 'Eco-Cleaning', shortName: 'Cleaning' },
    { id: 'ready', name: 'Out for Delivery', shortName: 'Delivery' }
  ];

  readonly colorSwatches = [
    { name: 'Mint Accent', hex: '#00F5D4' },
    { name: 'Electric Cyan', hex: '#38BDF8' },
    { name: 'Dark Navy', hex: '#0F172A' }
  ];
  readonly selectedSwatch = signal<string>('#00F5D4');
  readonly isDsGlassActive = signal<boolean>(true);

  readonly projects = signal<Project[]>([
    {
      id: 'travel-booking-engine',
      kicker: 'ENTERPRISE ANGULAR ARCHITECTURE',
      kickerVariant: 'mint',
      title: 'Travel Booking Engine Architecture',
      description: 'Refactored modular booking flows into micro-frontends with Standalone Angular Components, RxJS state streams, and global HTTP Interceptors for zero-drop transaction handling.',
      tags: ['Angular 17', 'RxJS', 'TypeScript', 'Standalone APIs', 'Micro-Architecture'],
      mockup: {
        urlText: 'booking.enterprise.internal/checkout',
        tagText: 'STANDALONE + RXJS',
        variant: 'mint',
        type: 'code'
      },
      actions: [
        { label: 'Architecture Docs', url: '#experience', isPrimary: true },
        { label: 'Technical Spec', url: '#contact', external: false }
      ]
    },
    {
      id: 'prime-dry-clean',
      kicker: 'CLIENT WEB PLATFORM',
      kickerVariant: 'cyan',
      title: 'Prime Dry Clean Client Portal',
      description: 'Engineered a responsive on-demand laundry management portal featuring dynamic booking forms, real-time order state progression, and responsive mobile-first UI.',
      tags: ['Angular 17', 'TypeScript', 'Reactive Forms', 'SCSS Systems', 'REST APIs'],
      mockup: {
        urlText: 'app.primedryclean.in/orders/4821',
        tagText: 'ORDER TRACKER',
        variant: 'cyan',
        type: 'stepper'
      },
      actions: [
        { label: 'Live Portal', url: 'https://linkedin.com/in/suryasheel', external: true, isPrimary: true },
        { label: 'Case Study', url: '#experience', external: false }
      ]
    },
    {
      id: 'glass-design-system',
      kicker: 'DESIGN SYSTEM & COMPONENT LIBRARY',
      kickerVariant: 'purple',
      title: 'Glassmorphism UI Component System',
      description: 'Engineered an accessible WCAG 2.1 AA component library with hard frosted glass filters, dynamic theme tokens, and sub-millisecond OnPush change detection cycles.',
      tags: ['Design Tokens', 'SCSS Mixins', 'WCAG 2.1 AA', 'OnPush Strategy', 'Web Components'],
      mockup: {
        urlText: 'ds.suryasheel.dev/tokens/palette',
        tagText: 'DESIGN TOKENS',
        variant: 'purple',
        type: 'tokens'
      },
      actions: [
        { label: 'Explore Components', url: '#skills', isPrimary: true },
        { label: 'Token Specs', url: '#contact', external: false }
      ]
    }
  ]);

  cycleOrderStep(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.orderStep.update(curr => (curr + 1) % this.orderSteps.length);
  }

  setOrderStep(stepIndex: number, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.orderStep.set(stepIndex);
  }

  getStepLabel(stepIndex: number): string {
    return this.orderSteps[stepIndex]?.name || 'In Progress';
  }

  selectSwatch(hex: string, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.selectedSwatch.set(hex);
  }

  toggleDsGlass(event: Event): void {
    event.stopPropagation();
    const target = event.target as HTMLInputElement;
    this.isDsGlassActive.set(target.checked);
  }
}
