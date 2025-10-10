import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Blog {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  status: 'draft' | 'published' | 'archived';
  image: string;
  createdAt: Date;
  views: number;
}

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent {
  blogs: Blog[] = [
    {
      id: 1,
      title: 'Getting Started with Angular 18',
      excerpt: 'Learn the basics of Angular 18 and its new features',
      content: 'Full content here...',
      author: 'John Doe',
      status: 'published',
      image: 'https://via.placeholder.com/300x200',
      createdAt: new Date('2024-01-15'),
      views: 1250
    },
    {
      id: 2,
      title: 'Modern Web Development Trends',
      excerpt: 'Explore the latest trends in web development',
      content: 'Full content here...',
      author: 'Jane Smith',
      status: 'draft',
      image: 'https://via.placeholder.com/300x200',
      createdAt: new Date('2024-01-10'),
      views: 890
    }
  ];

  searchTerm = '';
  statusFilter = '';
  showModal = false;
  isEditing = false;
  currentBlog: Partial<Blog> = {};

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
      this.blogs = this.blogs.filter(blog => blog.id !== id);
    }
  }

  saveBlog() {
    if (this.isEditing) {
      const index = this.blogs.findIndex(blog => blog.id === this.currentBlog.id);
      if (index !== -1) {
        this.blogs[index] = { ...this.currentBlog } as Blog;
      }
    } else {
      const newBlog: Blog = {
        ...this.currentBlog,
        id: Date.now(),
        createdAt: new Date(),
        views: 0
      } as Blog;
      this.blogs.push(newBlog);
    }
    this.closeModal();
  }

  closeModal() {
    this.showModal = false;
    this.currentBlog = {};
  }
}