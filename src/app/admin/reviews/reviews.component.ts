import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent {
  reviews = [
    { id: 1, name: 'Alice Johnson', rating: 5, comment: 'Excellent service!', date: '2024-10-01' },
    { id: 2, name: 'Bob Wilson', rating: 4, comment: 'Very satisfied with the work.', date: '2024-09-28' }
  ];

  showModal = false;
  editingReview: any = null;

  openAddModal() {
    this.editingReview = null;
    this.showModal = true;
  }

  openEditModal(review: any) {
    this.editingReview = { ...review };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.editingReview = null;
  }

  saveReview() {
    if (this.editingReview) {
      // Update existing
      const index = this.reviews.findIndex(r => r.id === this.editingReview.id);
      if (index !== -1) {
        this.reviews[index] = { ...this.editingReview };
      }
    } else {
      // Add new
      const newId = Math.max(...this.reviews.map(r => r.id)) + 1;
      this.reviews.push({ ...this.editingReview, id: newId });
    }
    this.closeModal();
  }

  deleteReview(id: number) {
    this.reviews = this.reviews.filter(r => r.id !== id);
  }

  getStars(rating: number): string {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }
}
