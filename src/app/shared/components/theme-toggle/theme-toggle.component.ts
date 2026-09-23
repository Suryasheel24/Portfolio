import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      type="button"
      class="theme-toggle-btn"
      (click)="themeService.toggleTheme()"
      [attr.aria-label]="themeService.isDark() ? 'Switch to light theme' : 'Switch to dark theme'"
      [attr.title]="themeService.isDark() ? 'Switch to light theme' : 'Switch to dark theme'"
    >
      @if (themeService.isDark()) {
        <!-- Sun Icon (switch to light) -->
        <svg class="theme-icon theme-icon--sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      } @else {
        <!-- Moon Icon (switch to dark) -->
        <svg class="theme-icon theme-icon--moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      }
    </button>
  `,
  styles: [`
    .theme-toggle-btn {
      width: 40px;
      height: 40px;
      border-radius: var(--radius-full);
      background: var(--surface-glass);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid var(--glass-border);
      color: var(--text-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      padding: 0;
      position: relative;
      transition: all var(--transition-normal);
      box-shadow: var(--glass-shadow);

      &:hover {
        background: var(--surface-glass-hover);
        border-color: var(--accent-primary);
        color: var(--accent-primary);
        box-shadow: 0 0 16px var(--accent-primary-glow);
        transform: rotate(15deg) scale(1.05);
      }

      .theme-icon {
        width: 19px;
        height: 19px;
        transition: transform var(--transition-smooth), opacity var(--transition-fast);
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeToggleComponent {
  readonly themeService = inject(ThemeService);
}
