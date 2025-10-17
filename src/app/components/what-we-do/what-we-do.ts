import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Blog {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  tags: string[];
}

@Component({
  selector: 'app-what-we-do',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './what-we-do.html',
  styleUrl: './what-we-do.scss'
})
export class WhatWeDo implements OnInit {
  // blogs: Blog[] = [];
  // isLoading = true;

  // constructor(private apiService: ApiService) {}

  ngOnInit() {
    // this.loadBlogs();
  }

  // loadBlogs() {
  //   this.apiService.getBlogs().subscribe({
  //     next: (data: Blog[]) => {
  //       this.blogs = data;
  //       this.isLoading = false;
  //     },
  //     error: (error: any) => {
  //       console.error('Error loading blogs:', error);
  //       this.isLoading = false;
  //     }
  //   });
  // }
}
