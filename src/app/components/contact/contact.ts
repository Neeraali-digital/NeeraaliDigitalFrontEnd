import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact {
  enquiry = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    project_type: '',
    message: ''
  };

  isSubmitting = false;
  submitMessage = '';
  submitted = false;

  constructor(private apiService: ApiService) {}

  onSubmit() {
    this.submitted = true;
    this.submitMessage = '';

    if (!this.isFormValid()) {
      this.submitMessage = 'Please fill in all required fields correctly.';
      return;
    }

    if (this.isSubmitting) return;

    this.isSubmitting = true;

    this.apiService.post('enquiries', this.enquiry).subscribe({
      next: (response) => {
        this.submitMessage = 'Thank you for your enquiry! We will get back to you soon.';
        this.resetForm();
        this.isSubmitting = false;
        this.submitted = false;
      },
      error: (error) => {
        this.submitMessage = 'There was an error submitting your enquiry. Please try again.';
        console.error('Error submitting enquiry:', error);
        this.isSubmitting = false;
      }
    });
  }

  private isFormValid(): boolean {
    return Boolean(
      this.enquiry.first_name.trim() &&
      this.enquiry.last_name.trim() &&
      this.enquiry.email.trim() && this.enquiry.email.includes('@') &&
      this.enquiry.phone.trim() && this.enquiry.phone.trim().length >= 10 &&
      this.enquiry.project_type &&
      this.enquiry.message.trim()
    );
  }

  isFieldInvalid(field: string): boolean {
    if (!this.submitted) return false;
    switch (field) {
      case 'first_name':
        return !this.enquiry.first_name.trim();
      case 'last_name':
        return !this.enquiry.last_name.trim();
      case 'email':
        return !this.enquiry.email.trim() || !this.enquiry.email.includes('@');
      case 'phone':
        return !this.enquiry.phone.trim() || this.enquiry.phone.trim().length < 10;
      case 'project_type':
        return !this.enquiry.project_type;
      case 'message':
        return !this.enquiry.message.trim();
      default:
        return false;
    }
  }

  private resetForm() {
    this.enquiry = {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      project_type: '',
      message: ''
    };
  }
}
