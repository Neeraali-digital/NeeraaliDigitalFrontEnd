import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

interface Blog {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  status: string;
  image: string;
  created_at: string;
  views: number;
}

@Component({
  selector: 'app-blog-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-section.component.html',
  styleUrls: ['./blog-section.component.scss']
})
export class BlogSectionComponent implements OnInit {
  blogs: Blog[] = [];
  loading = true;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.loadBlogs();
  }

  loadBlogs() {
    this.apiService.getBlogs().subscribe({
      next: (data) => {
        this.blogs = data.slice(0, 3);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading blogs:', error);
        this.loading = false;
      }
    });
  }

  navigateToBlogs() {
    this.router.navigate(['/blogs']);
  }

  navigateToBlog(blogId: number) {
    this.router.navigate(['/blogs', blogId]);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}