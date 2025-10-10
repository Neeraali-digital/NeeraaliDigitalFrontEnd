import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-enquiries',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enquiries.component.html',
  styleUrls: ['./enquiries.component.scss']
})
export class EnquiriesComponent {
  enquiries = [
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', projectType: 'Brand Strategy', message: 'Interested in your services', date: '2024-10-01', status: 'New' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', projectType: 'Digital Products', message: 'Need more information', date: '2024-09-28', status: 'Replied' }
  ];

  showModal = false;
  editingEnquiry: any = null;

  openAddModal() {
    this.editingEnquiry = null;
    this.showModal = true;
  }

  openEditModal(enquiry: any) {
    this.editingEnquiry = { ...enquiry };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.editingEnquiry = null;
  }

  saveEnquiry() {
    if (this.editingEnquiry) {
      // Update existing
      const index = this.enquiries.findIndex(e => e.id === this.editingEnquiry.id);
      if (index !== -1) {
        this.enquiries[index] = { ...this.editingEnquiry };
      }
    } else {
      // Add new
      const newId = Math.max(...this.enquiries.map(e => e.id)) + 1;
      this.enquiries.push({ ...this.editingEnquiry, id: newId });
    }
    this.closeModal();
  }

  deleteEnquiry(id: number) {
    this.enquiries = this.enquiries.filter(e => e.id !== id);
  }
}
