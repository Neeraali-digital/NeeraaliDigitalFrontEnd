import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  created_at: string;
}

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  reviews: Review[] = [];
  loading = false;
  showModal = false;
  editingReview: Partial<Review> = {};

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadReviews();
  }

  loadReviews() {
    this.loading = true;
    this.apiService.get('reviews').subscribe({
      next: (data: any) => {
        this.reviews = data as Review[];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading reviews:', error);
        this.loading = false;
      }
    });
  }

  openAddModal() {
    this.editingReview = {};
    this.showModal = true;
  }

  openEditModal(review: Review) {
    this.editingReview = { ...review };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.editingReview = {};
  }

  saveReview() {
    if (this.editingReview.id) {
      // Update existing
      this.apiService.put(`reviews/${this.editingReview.id}`, this.editingReview).subscribe({
        next: () => {
          this.loadReviews();
          this.closeModal();
        },
        error: (error) => console.error('Error updating review:', error)
      });
    } else {
      // Add new
      this.apiService.post('reviews', this.editingReview).subscribe({
        next: () => {
          this.loadReviews();
          this.closeModal();
        },
        error: (error) => console.error('Error creating review:', error)
      });
    }
  }

  deleteReview(id: number) {
    if (confirm('Are you sure you want to delete this review?')) {
      this.apiService.delete(`reviews/${id}`).subscribe({
        next: () => this.loadReviews(),
        error: (error) => console.error('Error deleting review:', error)
      });
    }
  }

  getStars(rating: number): string {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }
}
