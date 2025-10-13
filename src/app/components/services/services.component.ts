import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

interface Blog {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  image: string;
  tags: string[];
  published_date: string;
  slug: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent implements OnInit {
  blogs: Blog[] = [];
  isLoading = true;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadBlogs();
  }

  loadBlogs() {
    this.apiService.get<Blog[]>('blogs/').subscribe({
      next: (data) => {
        this.blogs = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading blogs:', error);
        this.isLoading = false;
      }
    });
  }
}
