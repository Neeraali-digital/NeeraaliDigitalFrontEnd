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
  selector: 'app-blogs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
  blogs: Blog[] = [];
  loading = true;
  currentPage = 1;
  blogsPerPage = 9;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.loadBlogs();
  }

  loadBlogs() {
    this.apiService.getBlogs().subscribe({
      next: (data) => {
        this.blogs = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading blogs:', error);
        this.loading = false;
      }
    });
  }

  get paginatedBlogs() {
    const startIndex = (this.currentPage - 1) * this.blogsPerPage;
    return this.blogs.slice(startIndex, startIndex + this.blogsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.blogs.length / this.blogsPerPage);
  }

  navigateToBlog(blogId: number) {
    this.router.navigate(['/blogs', blogId]);
  }

  goToPage(page: number) {
    this.currentPage = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}