import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationCredential } from '../../core/models/education.model';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  template: `
    <section id="education" class="education section" aria-label="Education &amp; Academic Credentials">
      <div class="container">
        <!-- Section Header -->
        <div class="section-header text-center" appScrollReveal>
          <span class="category-tag">04. ACADEMIC BACKGROUND</span>
          <h2 class="section-title">Education &amp; Degrees</h2>
          <p class="section-subtitle">
            Formal foundations in computer science, software engineering principles, and mathematics.
          </p>
        </div>

        <!-- Credentials Grid -->
        <div class="education-grid">
          @for (edu of credentials(); track edu.degree; let i = $index) {
            <div
              class="education-card glass-card"
              [ngClass]="'education-card--' + (edu.variant || 'mint')"
              appScrollReveal
              [revealDelay]="i * 100"
            >
              <div class="education-header">
                <div class="edu-icon" [ngClass]="'icon--' + (edu.variant || 'mint')" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                    <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                  </svg>
                </div>
                <div class="edu-info">
                  <h3 class="degree-title">{{ edu.degree }}</h3>
                  <span class="university-name" [ngClass]="'univ--' + (edu.variant || 'mint')">{{ edu.institution }}</span>
                </div>
              </div>

              <div class="education-meta">
                <span class="date-pill">{{ edu.period }}</span>
                <span class="status-pill">{{ edu.status }}</span>
              </div>

              <p class="education-desc">{{ edu.description }}</p>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./education.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EducationComponent {
  readonly credentials = signal<EducationCredential[]>([
    {
      degree: 'Bachelor of Computer Applications (BCA)',
      institution: 'Amity University, Noida',
      period: 'Expected Graduation: 2027',
      status: 'Pursuing',
      variant: 'mint',
      description: 'Focusing on Advanced Web Technologies, Software Engineering, Object-Oriented Analysis & Design, and Cloud Architecture.'
    },
    {
      degree: 'Diploma in Computer Science',
      institution: 'Arka Jain University, Jharkhand',
      period: 'Aug 2018 – Aug 2021',
      status: 'Graduated',
      variant: 'cyan',
      description: 'Comprehensive technical grounding in Computer Science fundamentals, Web Development, Programming in C/C++/Java, and Relational Databases.'
    }
  ]);
}
