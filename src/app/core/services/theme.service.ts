import { Injectable, signal, computed, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type ThemeMode = 'dark' | 'light';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly storageKey = 'portfolio-theme';

  readonly theme = signal<ThemeMode>(this.getInitialTheme());
  readonly isDark = computed(() => this.theme() === 'dark');
  readonly isLight = computed(() => this.theme() === 'light');

  constructor() {
    // Effect to reactively synchronize data-theme attribute with DOM and localStorage
    effect(() => {
      const currentTheme = this.theme();
      if (this.isBrowser) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        localStorage.setItem(this.storageKey, currentTheme);
      }
    });

    // Listen to live OS theme changes if user hasn't explicitly set a preference in localStorage
    if (this.isBrowser) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (e) => {
        if (!localStorage.getItem(this.storageKey)) {
          this.theme.set(e.matches ? 'dark' : 'light');
        }
      });
    }
  }

  toggleTheme(): void {
    this.theme.update((current) => (current === 'dark' ? 'light' : 'dark'));
  }

  setTheme(theme: ThemeMode): void {
    this.theme.set(theme);
  }

  private getInitialTheme(): ThemeMode {
    if (!this.isBrowser) return 'dark';

    const savedTheme = localStorage.getItem(this.storageKey) as ThemeMode | null;
    if (savedTheme === 'dark' || savedTheme === 'light') {
      return savedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}
