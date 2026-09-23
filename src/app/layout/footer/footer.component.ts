import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollService } from '../../core/services/scroll.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-card">
          <!-- Top Row: Brand Info, Quick Navigation & Back-to-Top CTA -->
          <div class="footer-top-row">
            <!-- Brand Logo -->
            <div class="footer-brand">
              <a (click)="scrollTo('hero', $event)" href="#hero" class="footer-brand-logo" aria-label="Back to top">
                <img src="assets/images/logo.jpg" alt="Suryasheel Mourtika Logo" class="footer-logo-image" width="38" height="38">
                <div class="footer-logo-text">
                  <span class="footer-logo-title">Suryasheel<span class="accent">.dev</span></span>
                  <span class="footer-logo-sub">Angular Specialist &bull; New Delhi, India</span>
                </div>
              </a>
            </div>

            <!-- Center Quick Navigation Links -->
            <nav class="footer-nav" aria-label="Footer Quick Links">
              <ul class="footer-nav-list">
                <li><a (click)="scrollTo('hero', $event)" href="#hero" class="footer-nav-link">Home</a></li>
                <li><a (click)="scrollTo('skills', $event)" href="#skills" class="footer-nav-link">Skills</a></li>
                <li><a (click)="scrollTo('projects', $event)" href="#projects" class="footer-nav-link">Projects</a></li>
                <li><a (click)="scrollTo('experience', $event)" href="#experience" class="footer-nav-link">Experience</a></li>
                <li><a (click)="scrollTo('education', $event)" href="#education" class="footer-nav-link">Education</a></li>
                <li><a (click)="scrollTo('contact', $event)" href="#contact" class="footer-nav-link">Contact</a></li>
              </ul>
            </nav>

            <!-- Back-to-Top Button -->
            <div class="footer-back-to-top">
              <button (click)="scrollToTop()" type="button" class="back-to-top-btn" aria-label="Scroll smoothly back to top of page">
                <span>Back to Top</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <line x1="12" y1="19" x2="12" y2="5"></line>
                  <polyline points="5 12 12 5 19 12"></polyline>
                </svg>
              </button>
            </div>
          </div>

          <!-- Middle Translucent Divider -->
          <div class="footer-divider" role="separator" aria-hidden="true"></div>

          <!-- Bottom Row: Copyright Statement & Social Pill Cluster -->
          <div class="footer-bottom-row">
            <div class="footer-copyright-info">
              <p class="copyright-text">
                &copy; {{ currentYear }} Suryasheel Mourtika. Built with Angular 17+ Standalone Components &amp; Signals.
              </p>
              <span class="footer-meta-pill">
                <span class="status-dot"></span> Available for UI Engineering &amp; Angular Roles
              </span>
            </div>

            <!-- Social Media Icon Pills -->
            <div class="footer-social-cluster" aria-label="Social Media &amp; Profiles">
              <a href="https://linkedin.com/in/suryasheel" target="_blank" rel="noopener noreferrer" class="footer-social-pill footer-social-pill--linkedin" aria-label="LinkedIn Profile">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45c-.89 0-1.61.72-1.61 1.61 0 .89.72 1.61 1.61 1.61.89 0 1.61-.72 1.61-1.61 0-.89-.72-1.61-1.61-1.61Z"/>
                </svg>
                <span>LinkedIn</span>
              </a>
              <a href="https://github.com/suryasheel" target="_blank" rel="noopener noreferrer" class="footer-social-pill footer-social-pill--github" aria-label="GitHub Profile">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"/>
                </svg>
                <span>GitHub</span>
              </a>
              <a href="mailto:suryasheel22@gmail.com" class="footer-social-pill footer-social-pill--email" aria-label="Send Email">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `,
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  private readonly scrollService = inject(ScrollService);
  readonly currentYear = new Date().getFullYear();

  scrollTo(sectionId: string, event: Event): void {
    event.preventDefault();
    this.scrollService.scrollToSection(sectionId);
  }

  scrollToTop(): void {
    this.scrollService.scrollToTop();
  }
}
