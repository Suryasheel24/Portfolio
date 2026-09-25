import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceMilestone } from '../../core/models/experience.model';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  template: `
    <section id="experience" class="experience section" aria-label="Professional Experience Timeline">
      <div class="container">
        <!-- Section Header -->
        <div class="section-header text-center" appScrollReveal>
          <span class="category-tag">03. CAREER MILESTONES</span>
          <h2 class="section-title">Professional Experience</h2>
          <p class="section-subtitle">
            A track record of architecting scalable Angular frontends, component libraries, and client-facing web applications.
          </p>
        </div>

        <!-- Vertical Glowing Timeline -->
        <div class="timeline-container">
          @for (milestone of milestones(); track milestone.company; let i = $index) {
            <div class="timeline-item" appScrollReveal [revealDelay]="i * 120">
              <!-- Glowing Pulsing Node Marker -->
              <div
                class="timeline-node"
                [ngClass]="'node--' + (milestone.variant || 'mint')"
                aria-hidden="true"
              ></div>

              <!-- Milestone Card -->
              <div class="timeline-card glass-card">
                <div class="timeline-header">
                  <div>
                    <h3 class="role-title">{{ milestone.role }}</h3>
                    <div class="company-name" [ngClass]="'company--' + (milestone.variant || 'mint')">
                      {{ milestone.company }}
                    </div>
                  </div>
                  <span class="date-badge">{{ milestone.period }}</span>
                </div>

                <!-- Achievements List -->
                <ul class="achievement-list" [ngClass]="'achievements--' + (milestone.variant || 'mint')">
                  @for (ach of milestone.achievements; track ach) {
                    <li>{{ ach }}</li>
                  }
                </ul>

                <!-- Tech Stack Badges -->
                <div class="timeline-tech-stack" aria-label="Technologies employed">
                  @for (tech of milestone.techStack; track tech) {
                    <span class="tech-pill-sm tech-badge">{{ tech }}</span>
                  }
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./experience.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExperienceComponent {
  readonly milestones = signal<ExperienceMilestone[]>([
    {
      role: 'Frontend Developer',
      company: '',
      period: 'Feb 2025 – Present',
      variant: 'mint',
      achievements: [
        'Delivered frontend solutions across 7+ client engagements, contributing to scalable travel booking platforms.',
        'Refactored modular booking engines into micro-architectures using Standalone Components and dynamic Feature Modules.',
        'Integrated real-time travel GDS systems using Angular HttpClient and RxJS Operators for live fare state transformations.',
        'Implemented SSR & frontend optimization strategies that reduced page load times by 35% and improved Core Web Vitals.',
        'Developed token-refresh and centralized error-handling pipelines via global HTTP Interceptors.'
      ],
      techStack: ['Angular 17', 'Standalone APIs', 'RxJS Streams', 'GDS Integration', 'SSR', 'HTTP Interceptors']
    },
    {
      role: 'Freelance Frontend Developer',
      company: '',
      period: 'Apr 2024 – Jan 2025',
      variant: 'cyan',
      achievements: [
        'Developed, revamped, and optimized responsive websites and landing pages for client engagements.',
        'Enhanced expertise in Angular 17, Angular Signals, NgRx, and SSR through self-directed projects.'
      ],
      techStack: ['Angular 17', 'Angular Signals', 'NgRx', 'SSR', 'Modern SCSS', 'Responsive Design']
    },
    {
      role: 'Jr Frontend Developer',
      company: '',
      period: 'Jul 2021 – Apr 2024',
      variant: 'mint',
      achievements: [
        'Built enterprise-grade Angular SPAs structured into scalable Feature Modules with dynamic routing.',
        'Applied reactive programming via RxJS Operators to throttle rapid form updates in Reactive Forms.',
        'Diagnosed and resolved 50+ UI defects across major browsers, improving target app production stability by 20%.',
        'Collaborated in Agile/Scrum sprints via Azure DevOps workflows.'
      ],
      techStack: ['Angular', 'TypeScript', 'RxJS Operators', 'Reactive Forms', 'Cross-Browser QA', 'Azure DevOps']
    }
  ]);
}
