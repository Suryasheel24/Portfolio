import { Component, ChangeDetectionStrategy, inject, signal, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollService } from '../../core/services/scroll.service';
import { ThemeToggleComponent } from '../../shared/components/theme-toggle/theme-toggle.component';

interface NavItem {
  id: string;
  label: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, ThemeToggleComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {
  readonly scrollService = inject(ScrollService);
  readonly mobileOpen = signal<boolean>(false);
  readonly isDownloadingResume = signal<boolean>(false);

  onDownloadResume(): void {
    this.isDownloadingResume.set(true);
    setTimeout(() => {
      this.isDownloadingResume.set(false);
    }, 1500);
  }

  readonly navItems: NavItem[] = [
    { id: 'skills', label: 'Skills' },
    // { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' }
  ];

  ngOnInit(): void {
    this.scrollService.initScrollSpy(['hero', 'skills', /* 'projects', */ 'experience', 'education', 'contact']);
  }

  @HostListener('window:keydown.escape')
  onEscape(): void {
    if (this.mobileOpen()) {
      this.closeMobileMenu();
    }
  }

  toggleMobileMenu(): void {
    this.mobileOpen.update((v) => !v);
    document.body.style.overflow = this.mobileOpen() ? 'hidden' : '';
  }

  closeMobileMenu(): void {
    this.mobileOpen.set(false);
    document.body.style.overflow = '';
  }

  onNavClick(sectionId: string, event: Event): void {
    event.preventDefault();
    this.closeMobileMenu();
    this.scrollService.scrollToSection(sectionId);
  }
}
