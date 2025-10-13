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
    project_type: '',
    message: ''
  };

  isSubmitting = false;
  submitMessage = '';

  constructor(private apiService: ApiService) {}

  onSubmit() {
    if (this.isSubmitting) return;

    this.isSubmitting = true;
    this.submitMessage = '';

    this.apiService.post('enquiries/', this.enquiry).subscribe({
      next: (response) => {
        this.submitMessage = 'Thank you for your enquiry! We will get back to you soon.';
        this.resetForm();
        this.isSubmitting = false;
      },
      error: (error) => {
        this.submitMessage = 'There was an error submitting your enquiry. Please try again.';
        console.error('Error submitting enquiry:', error);
        this.isSubmitting = false;
      }
    });
  }

  private resetForm() {
    this.enquiry = {
      first_name: '',
      last_name: '',
      email: '',
      project_type: '',
      message: ''
    };
  }
}
