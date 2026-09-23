import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollService } from '../../core/services/scroll.service';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { HeroCanvasComponent } from './hero-canvas.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective, HeroCanvasComponent],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroComponent {
  private readonly scrollService = inject(ScrollService);
  readonly isDownloadingResume = signal<boolean>(false);

  onDownloadResume(): void {
    this.isDownloadingResume.set(true);
    setTimeout(() => {
      this.isDownloadingResume.set(false);
    }, 1500);
  }

  scrollTo(sectionId: string, event: Event): void {
    event.preventDefault();
    this.scrollService.scrollToSection(sectionId);
  }
}

