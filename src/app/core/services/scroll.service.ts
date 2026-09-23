import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly activeSection = signal<string>('hero');
  readonly isHeaderScrolled = signal<boolean>(false);

  private ticking = false;

  initScrollSpy(sectionIds: string[]): void {
    if (!this.isBrowser) return;

    const onScroll = () => {
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          this.updateScrollState(sectionIds);
          this.ticking = false;
        });
        this.ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    this.updateScrollState(sectionIds);
  }

  scrollToTop(): void {
    if (!this.isBrowser) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.activeSection.set('hero');
  }

  scrollToSection(sectionId: string): void {
    if (!this.isBrowser) return;

    const cleanId = sectionId.replace('#', '');
    if (cleanId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.activeSection.set('hero');
      return;
    }

    const targetEl = document.getElementById(cleanId);
    if (targetEl) {
      const headerOffset = 80;
      const elementPosition = targetEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      this.activeSection.set(cleanId);
    }
  }

  private updateScrollState(sectionIds: string[]): void {
    if (!this.isBrowser) return;

    const scrollY = window.pageYOffset;
    this.isHeaderScrolled.set(scrollY > 20);

    const headerOffset = 140;
    let currentId = 'hero';

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) {
        const top = el.offsetTop - headerOffset;
        const height = el.offsetHeight;
        if (scrollY >= top && scrollY < top + height) {
          currentId = id;
        }
      }
    }

    // Bottom of page activates the last section (contact)
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
      const lastId = sectionIds[sectionIds.length - 1];
      if (lastId) currentId = lastId;
    }

    this.activeSection.set(currentId);
  }
}
