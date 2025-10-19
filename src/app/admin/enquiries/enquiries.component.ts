import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

interface Enquiry {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  project_type: string;
  message: string;
  created_at: string;
  status: string;
}

@Component({
  selector: 'app-enquiries',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enquiries.component.html',
  styleUrls: ['./enquiries.component.scss']
})
export class EnquiriesComponent implements OnInit {
  enquiries: Enquiry[] = [];
  loading = false;
  showModal = false;
  showDetailModal = false;
  editingEnquiry: Partial<Enquiry> = {};
  selectedEnquiry: Enquiry | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadEnquiries();
  }

  loadEnquiries() {
    this.loading = true;
    this.apiService.get<Enquiry[]>('enquiries').subscribe({
      next: (data) => {
        this.enquiries = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading enquiries:', error);
        this.loading = false;
      }
    });
  }

  openAddModal() {
    this.editingEnquiry = {};
    this.showModal = true;
  }

  openEditModal(enquiry: Enquiry) {
    this.editingEnquiry = { ...enquiry };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.editingEnquiry = {};
  }

  saveEnquiry() {
    if (this.editingEnquiry.id) {
      // Update existing
      this.apiService.put(`enquiries/${this.editingEnquiry.id}`, this.editingEnquiry).subscribe({
        next: () => {
          this.loadEnquiries();
          this.closeModal();
        },
        error: (error) => console.error('Error updating enquiry:', error)
      });
    } else {
      // Add new
      this.apiService.post('enquiries', this.editingEnquiry).subscribe({
        next: () => {
          this.loadEnquiries();
          this.closeModal();
        },
        error: (error) => console.error('Error creating enquiry:', error)
      });
    }
  }

  deleteEnquiry(id: number) {
    if (confirm('Are you sure you want to delete this enquiry?')) {
      this.apiService.delete(`enquiries/${id}`).subscribe({
        next: () => this.loadEnquiries(),
        error: (error) => console.error('Error deleting enquiry:', error)
      });
    }
  }

  openDetailModal(enquiry: Enquiry) {
    this.selectedEnquiry = enquiry;
    this.showDetailModal = true;
  }

  closeDetailModal() {
    this.showDetailModal = false;
    this.selectedEnquiry = null;
  }
}
