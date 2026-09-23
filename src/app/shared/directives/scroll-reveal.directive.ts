import { Directive, ElementRef, OnInit, OnDestroy, inject, PLATFORM_ID, Input } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private observer: IntersectionObserver | null = null;

  @Input() threshold = 0.12;
  @Input() rootMargin = '0px 0px -40px 0px';
  @Input() revealDelay = 0;

  ngOnInit(): void {
    if (!this.isBrowser) return;

    const nativeEl = this.el.nativeElement as HTMLElement;
    nativeEl.classList.add('reveal-on-scroll');
    if (this.revealDelay > 0) {
      nativeEl.style.transitionDelay = `${this.revealDelay}ms`;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      nativeEl.classList.add('is-visible', 'is-revealed');
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            nativeEl.classList.add('is-visible', 'is-revealed');
            this.observer?.unobserve(nativeEl);
          }
        });
      },
      {
        threshold: this.threshold,
        rootMargin: this.rootMargin
      }
    );

    this.observer.observe(nativeEl);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}
