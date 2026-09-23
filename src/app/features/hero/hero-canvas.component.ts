import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, ThemeMode } from '../../core/services/theme.service';

@Component({
  selector: 'app-hero-canvas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-canvas.component.html',
  styleUrls: ['./hero-canvas.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroCanvasComponent {
  private readonly themeService = inject(ThemeService);

  // SIGNAL 1: Theme Switcher Toggle - synced with ThemeService
  readonly themeSignal = computed(() => this.themeService.theme());

  // SIGNAL 2: Micro-Interaction Precision Range Slider
  readonly blurPrecision = signal<number>(94);

  // SIGNAL 3: Dynamic Design Token Copy Stream
  readonly tokenCopied = signal<boolean>(false);

  // Computed values derived from blurPrecision signal
  readonly cardBlurPx = computed(() => this.blurPrecision() / 4);
  readonly cardOpacity = computed(() => (this.blurPrecision() / 100).toFixed(2));

  // Dynamic SCSS design token string reflecting real-time state
  readonly scssTokenString = computed(() => {
    const isDark = this.themeService.isDark();
    const alpha = this.cardOpacity();
    const blur = Math.round(this.cardBlurPx());
    return isDark
      ? `$ui-glass-refraction: rgba(15, 23, 42, ${alpha}); // blur: ${blur}px;`
      : `$ui-glass-refraction: rgba(255, 255, 255, ${alpha}); // blur: ${blur}px;`;
  });

  setTheme(targetTheme: ThemeMode): void {
    if (this.themeService.theme() !== targetTheme) {
      this.themeService.toggleTheme();
    }
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  updatePrecision(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.blurPrecision.set(Number(target.value));
  }

  copyToken(): void {
    const token = this.scssTokenString();
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(token).catch(() => {});
    }
    this.tokenCopied.set(true);
    setTimeout(() => {
      this.tokenCopied.set(false);
    }, 2000);
  }
}
