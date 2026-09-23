import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ScrollRevealDirective],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent {
  private readonly fb = inject(FormBuilder);

  readonly emailAddress = 'suryasheel22@gmail.com';
  readonly copiedEmail = signal<boolean>(false);
  readonly isSubmitting = signal<boolean>(false);
  readonly isSubmitted = signal<boolean>(false);

  readonly contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  async copyEmail(): Promise<void> {
    try {
      if (navigator?.clipboard) {
        await navigator.clipboard.writeText(this.emailAddress);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = this.emailAddress;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      this.copiedEmail.set(true);
      setTimeout(() => {
        this.copiedEmail.set(false);
      }, 2200);
    } catch {
      // Fallback
      this.copiedEmail.set(true);
      setTimeout(() => this.copiedEmail.set(false), 2200);
    }
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    // Simulate async submission with Signal updates
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.isSubmitted.set(true);
      this.contactForm.reset();
      setTimeout(() => {
        this.isSubmitted.set(false);
      }, 5000);
    }, 800);
  }
}
