import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  imports: [CommonModule, FormsModule],
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
  blogs: Blog[] = [];
  loading = false;
  searchTerm = '';
  statusFilter = '';
  showModal = false;
  isEditing = false;
  currentBlog: Partial<Blog> = {};

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadBlogs();
  }

  loadBlogs() {
    this.loading = true;
    this.apiService.get('blogs').subscribe({
      next: (data: any) => {
        this.blogs = data as Blog[];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading blogs:', error);
        this.loading = false;
      }
    });
  }

  get filteredBlogs() {
    return this.blogs.filter(blog => {
      const matchesSearch = blog.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           blog.author.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = !this.statusFilter || blog.status === this.statusFilter;
      return matchesSearch && matchesStatus;
    });
  }

  openCreateModal() {
    this.isEditing = false;
    this.currentBlog = {
      title: '',
      excerpt: '',
      content: '',
      author: '',
      status: 'draft',
      image: '',
      views: 0
    };
    this.showModal = true;
  }

  editBlog(blog: Blog) {
    this.isEditing = true;
    this.currentBlog = { ...blog };
    this.showModal = true;
  }

  viewBlog(blog: Blog) {
    console.log('View blog:', blog);
  }

  deleteBlog(id: number) {
    if (confirm('Are you sure you want to delete this blog?')) {
      this.apiService.delete(`blogs/${id}`).subscribe({
        next: () => this.loadBlogs(),
        error: (error) => console.error('Error deleting blog:', error)
      });
    }
  }

  saveBlog() {
    if (this.isEditing) {
      this.apiService.put(`blogs/${this.currentBlog.id}`, this.currentBlog).subscribe({
        next: () => {
          this.loadBlogs();
          this.closeModal();
        },
        error: (error) => console.error('Error updating blog:', error)
      });
    } else {
      this.apiService.post('blogs', this.currentBlog).subscribe({
        next: () => {
          this.loadBlogs();
          this.closeModal();
        },
        error: (error) => console.error('Error creating blog:', error)
      });
    }
  }

  closeModal() {
    this.showModal = false;
    this.currentBlog = {};
  }
}
