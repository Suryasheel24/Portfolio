import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillCategory } from '../../core/models/skill.model';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  template: `
    <section id="skills" class="skills section" aria-label="Technical Skills Matrix">
      <div class="container">
        <!-- Section Header -->
        <div class="section-header text-center" appScrollReveal>
          <span class="category-tag">01. TECHNICAL EXPERTISE</span>
          <h2 class="section-title">Core Competencies &amp; Toolkit</h2>
          <p class="section-subtitle">
            A comprehensive overview of my frontend engineering, reactive state management, and modern UI tooling proficiencies.
          </p>
        </div>

        <!-- 4-Card Skills Matrix Grid -->
        <div class="skills-grid">
          @for (cat of skillCategories(); track cat.id; let i = $index) {
            <div
              class="skill-card glass-card"
              [ngClass]="'skill-card--' + cat.variant"
              appScrollReveal
              [revealDelay]="i * 80"
            >
              <!-- Card Header -->
              <div class="skill-card-header">
                <div class="category-icon" [ngClass]="'icon--' + cat.variant" aria-hidden="true">
                  {{ cat.iconTag }}
                </div>
                <div class="category-info">
                  <h3 class="category-title">{{ cat.title }}</h3>
                  <span class="category-tag">{{ cat.subtitle }}</span>
                </div>
              </div>

              <!-- Card Description -->
              <p class="skill-card-description">{{ cat.description }}</p>

              <!-- Skill Pills Cluster -->
              <div class="skill-pills" [attr.aria-label]="cat.title + ' Skills List'">
                @for (skill of cat.skills; track skill) {
                  <span class="skill-pill tech-badge">
                    <span class="pill-dot" aria-hidden="true"></span>
                    {{ skill }}
                  </span>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./skills.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillsComponent {
  readonly skillCategories = signal<SkillCategory[]>([
    {
      id: 'angular-core',
      iconTag: '<NG>',
      variant: 'angular',
      title: 'Modern Angular & Core Frontend',
      subtitle: 'Framework & Core Web Technologies',
      description: 'Production frontend architecture leveraging Angular 12 through 17 with Standalone Components & APIs, Angular Signals, and modern TypeScript.',
      skills: [
        'Angular 12-17',
        'Standalone Components & APIs',
        'Angular Signals',
        'TypeScript',
        'ES6+',
        'HTML5',
        'SCSS/SASS',
        'Bootstrap 5',
        'Angular Material'
      ]
    },
    {
      id: 'arch-state',
      iconTag: 'ARCH',
      variant: 'arch',
      title: 'Architecture & State Management',
      subtitle: 'Reactive Streams & Data Architecture',
      description: 'Enterprise data flows, reactive stream transformations, micro-frontends, and server-side rendering for optimal application state.',
      skills: [
        'RxJS',
        'NgRx',
        'Reactive Forms',
        'HTTP Interceptors',
        'Route Guards',
        'Feature Modules',
        'Micro-Architecture',
        'SSR'
      ]
    },
    {
      id: 'perf-standards',
      iconTag: 'PERF',
      variant: 'perf',
      title: 'Performance & Standards',
      subtitle: 'Web Vitals & Accessible Engineering',
      description: 'Rigorous optimization for sub-second Core Web Vitals, accessible component design, and responsive cross-browser fidelity.',
      skills: [
        'Core Web Vitals',
        'Web Accessibility (WCAG 2.1/A11y)',
        'Lazy Loading',
        'Responsive & Mobile-First Design',
        'Cross-Browser Compatibility'
      ]
    },
    {
      id: 'tools-devops',
      iconTag: 'TOOLS',
      variant: 'tools',
      title: 'Tools, DevOps & Testing',
      subtitle: 'CI/CD & Developer Workflows',
      description: 'Streamlined continuous integration, version control workflows, Figma-to-code translations, and rigorous UI testing.',
      skills: [
        'Git',
        'GitHub Actions',
        'Azure DevOps',
        'Figma',
        'Jira',
        'Chrome DevTools',
        'Unit Testing'
      ]
    }
  ]);
}
