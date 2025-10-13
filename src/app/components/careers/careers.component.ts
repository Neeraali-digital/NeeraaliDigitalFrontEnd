import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

interface Job {
  id: number;
  title: string;
  description: string;
  type: string;
  location: string;
  requirements: string[];
  created_at: string;
}

interface JobApplication {
  name: string;
  email: string;
  phone: string;
  resume: File | null;
  cover_letter: string;
  job_id: number;
}

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './careers.component.html',
  styleUrl: './careers.component.scss'
})
export class CareersComponent implements OnInit {
  jobs: Job[] = [];
  isLoading = true;
  selectedJob: Job | null = null;
  applicationForm: JobApplication = {
    name: '',
    email: '',
    phone: '',
    resume: null,
    cover_letter: '',
    job_id: 0
  };
  isSubmitting = false;
  showApplicationForm = false;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadJobs();
  }

  loadJobs() {
    this.apiService.get<Job[]>('jobs/').subscribe({
      next: (data) => {
        this.jobs = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading jobs:', error);
        this.isLoading = false;
      }
    });
  }

  openApplicationForm(job: Job) {
    this.selectedJob = job;
    this.applicationForm.job_id = job.id;
    this.showApplicationForm = true;
  }

  closeApplicationForm() {
    this.showApplicationForm = false;
    this.selectedJob = null;
    this.resetForm();
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.applicationForm.resume = file;
    }
  }

  submitApplication() {
    if (!this.applicationForm.resume) {
      alert('Please upload your resume');
      return;
    }

    this.isSubmitting = true;
    const formData = new FormData();
    formData.append('name', this.applicationForm.name);
    formData.append('email', this.applicationForm.email);
    formData.append('phone', this.applicationForm.phone);
    formData.append('cover_letter', this.applicationForm.cover_letter);
    formData.append('job_id', this.applicationForm.job_id.toString());
    if (this.applicationForm.resume) {
      formData.append('resume', this.applicationForm.resume);
    }

    this.apiService.post('job-applications/', formData).subscribe({
      next: (response) => {
        alert('Application submitted successfully!');
        this.closeApplicationForm();
        this.isSubmitting = false;
      },
      error: (error) => {
        console.error('Error submitting application:', error);
        alert('Error submitting application. Please try again.');
        this.isSubmitting = false;
      }
    });
  }

  private resetForm() {
    this.applicationForm = {
      name: '',
      email: '',
      phone: '',
      resume: null,
      cover_letter: '',
      job_id: 0
    };
  }
}
