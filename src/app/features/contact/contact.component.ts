import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

export interface EmailJsConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
}

/**
 * EmailJS Production Configuration
 * To receive emails directly to suryasheel22@gmail.com:
 * 1. Create a free account at https://www.emailjs.com/
 * 2. Add an Email Service (e.g. Gmail) -> Copy Service ID
 * 3. Create an Email Template with params {{from_name}}, {{from_email}}, {{message}} -> Copy Template ID
 * 4. Navigate to Account > API Keys -> Copy Public Key
 */
export const EMAILJS_CONFIG: EmailJsConfig = {
  serviceId: 'service_6o92137', // Replace with your EmailJS service ID
  templateId: 'template_e7bx4kg', // Replace with your EmailJS template ID
  publicKey: 'AbtAcBrurpzdcOOif' // Replace with your EmailJS public key
};

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
  readonly config = EMAILJS_CONFIG;

  readonly emailAddress = 'suryasheel22@gmail.com';
  readonly copiedEmail = signal<boolean>(false);
  readonly isSubmitting = signal<boolean>(false);
  readonly submissionState = signal<'idle' | 'success' | 'error'>('idle');
  readonly errorMessage = signal<string | null>(null);

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
      this.copiedEmail.set(true);
      setTimeout(() => this.copiedEmail.set(false), 2200);
    }
  }

  async onSubmit(): Promise<void> {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.submissionState.set('idle');
    this.errorMessage.set(null);

    const formValues = this.contactForm.value;

    try {
      await this.sendEmailViaEmailJs(formValues);
      this.isSubmitting.set(false);
      this.submissionState.set('success');
      this.contactForm.reset();

      // Auto-clear success notification after 6 seconds
      setTimeout(() => {
        this.submissionState.set('idle');
      }, 6000);
    } catch (err: unknown) {
      this.isSubmitting.set(false);
      this.submissionState.set('error');
      const errMessage = err instanceof Error ? err.message : 'Transmission failed.';
      this.errorMessage.set(`${errMessage} Please reach out directly to suryasheel22@gmail.com.`);
    }
  }

  /**
   * Lightweight zero-dependency EmailJS REST API dispatch
   */
  private async sendEmailViaEmailJs(data: { name: string; email: string; message: string }): Promise<boolean> {
    // If using default placeholder credentials, run in simulated demo mode
    if (
      this.config.serviceId === 'service_portfolio' ||
      this.config.publicKey === 'user_portfolio_pubkey'
    ) {
      console.info(
        '%c[EmailJS]%c Demo mode active. To send real emails, update EMAILJS_CONFIG in contact.component.ts with credentials from https://dashboard.emailjs.com/admin/account',
        'color: #00F5D4; font-weight: bold;',
        'color: inherit;'
      );
      // Realistic network roundtrip latency simulation
      await new Promise(resolve => setTimeout(resolve, 800));
      return true;
    }

    const payload = {
      service_id: this.config.serviceId,
      template_id: this.config.templateId,
      user_id: this.config.publicKey,
      template_params: {
        from_name: data.name,
        from_email: data.email,
        message: data.message,
        to_name: 'Suryasheel Mourtika',
        reply_to: data.email
      }
    };

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Network response was not ok');
      throw new Error(`Email delivery failed (${response.status}): ${errorText}`);
    }

    return true;
  }
}
