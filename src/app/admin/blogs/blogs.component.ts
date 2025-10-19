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
  selectedFile: File | null = null;

  currentPage: number = 1;
  pageSize: number = 6;
  totalPages: number = 1;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadBlogs();
  }

  loadBlogs() {
    this.loading = true;
    this.apiService.getAllBlogs().subscribe({
      next: (data: any) => {
        this.blogs = data as Blog[];
        this.totalPages = Math.ceil(this.filteredBlogs.length / this.pageSize);
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

  get paginatedBlogs() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredBlogs.slice(startIndex, startIndex + this.pageSize);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
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
      this.apiService.delete(`blogs/${id}/`).subscribe({
        next: () => this.loadBlogs(),
        error: (error) => console.error('Error deleting blog:', error)
      });
    }
  }

  saveBlog() {
    const formData = new FormData();

    // Add all blog fields to FormData
    Object.keys(this.currentBlog).forEach(key => {
      if (key !== 'image' && this.currentBlog[key as keyof Blog] !== undefined) {
        formData.append(key, String(this.currentBlog[key as keyof Blog]));
      }
    });

    // Add image file if selected
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    if (this.isEditing) {
      this.apiService.putFormData(`blogs/${this.currentBlog.id}/`, formData).subscribe({
        next: () => {
          this.loadBlogs();
          this.closeModal();
        },
        error: (error: any) => console.error('Error updating blog:', error)
      });
    } else {
      this.apiService.postFormData('blogs/', formData).subscribe({
        next: () => {
          this.loadBlogs();
          this.closeModal();
        },
        error: (error: any) => console.error('Error creating blog:', error)
      });
    }
  }

  closeModal() {
    this.showModal = false;
    this.currentBlog = {};
    this.selectedFile = null;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onFileDropped(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      this.handleFile(event.dataTransfer.files[0]);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFile(input.files[0]);
    }
  }

  handleFile(file: File) {
    this.selectedFile = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.currentBlog.image = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  getImageUrl(imagePath: string): string {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    return `http://localhost:8000${imagePath}`;
  }
}
