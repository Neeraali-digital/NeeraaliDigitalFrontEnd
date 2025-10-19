import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  blog: Blog | null = null;
  loading = true;
  relatedBlogs: Blog[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const blogId = params['id'];
      if (blogId) {
        this.loadBlog(blogId);
        this.loadRelatedBlogs();
      }
    });
  }

  loadBlog(id: string) {
    this.apiService.get<Blog>(`blogs/${id}/`).subscribe({
      next: (data) => {
        this.blog = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading blog:', error);
        this.loading = false;
        this.router.navigate(['/blogs']);
      }
    });
  }

  loadRelatedBlogs() {
    this.apiService.getBlogs().subscribe({
      next: (data) => {
        this.relatedBlogs = data
          .filter(blog => blog.id !== this.blog?.id)
          .slice(0, 3);
      },
      error: (error) => {
        console.error('Error loading related blogs:', error);
      }
    });
  }

  navigateToBlog(blogId: number) {
    this.router.navigate(['/blogs', blogId]);
  }

  goBack() {
    this.router.navigate(['/blogs']);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}