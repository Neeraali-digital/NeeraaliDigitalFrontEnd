import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  tags: string[];
  metrics: string;
  created_at: string;
}

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './work.component.html',
  styleUrl: './work.component.scss'
})
export class WorkComponent implements OnInit {
  projects: Project[] = [];
  isLoading = true;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.apiService.get<Project[]>('projects/').subscribe({
      next: (data) => {
        this.projects = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading projects:', error);
        this.isLoading = false;
      }
    });
  }
}
