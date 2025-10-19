import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

interface Review {
  id: number;
  name: string;
  position: string;
  company: string;
  rating: number;
  comment: string;
  image?: string;
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
  selectedFile: File | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadReviews();
  }

  loadReviews() {
    this.loading = true;
    this.apiService.get('reviews/').subscribe({
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
    this.selectedFile = null;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  saveReview() {
    const formData = new FormData();

    // Add all review fields to FormData, except image if it's a URL (for editing without changing image)
    Object.keys(this.editingReview).forEach(key => {
      if (key !== 'image' || this.selectedFile) {  // Skip image if no new file selected
        if (this.editingReview[key as keyof Partial<Review>] !== undefined) {
          formData.append(key, this.editingReview[key as keyof Partial<Review>] as string);
        }
      }
    });

    // Add image file if selected

    if (this.editingReview.id) {
      // Update existing
      this.apiService.putFormData(`reviews/${this.editingReview.id}/`, formData).subscribe({
        next: () => {
          this.loadReviews();
          this.closeModal();
        },
        error: (error) => console.error('Error updating review:', error)
      });
    } else {
      // Add new
      this.apiService.postFormData('reviews/', formData).subscribe({
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
      this.apiService.delete(`reviews/${id}/`).subscribe({
        next: () => this.loadReviews(),
        error: (error) => console.error('Error deleting review:', error)
      });
    }
  }

  getStars(rating: number): string {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }
}
