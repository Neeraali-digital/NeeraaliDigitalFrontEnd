import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  is_active: boolean;
  date_joined: string;
  password?: string;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  loading = false;
  showModal = false;
  editingUser: Partial<User> = {};
  confirmPassword = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.apiService.get('users/').subscribe({
      next: (data: any) => {
        this.users = data.results ? data.results as User[] : data as User[];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.loading = false;
      }
    });
  }

  openAddModal() {
    this.editingUser = { is_staff: false, is_active: true };
    this.showModal = true;
  }

  openEditModal(user: User) {
    this.editingUser = { ...user };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.editingUser = {};
    this.confirmPassword = '';
  }

  saveUser() {
    if (!this.editingUser.id && this.editingUser.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (this.editingUser.id) {
      // Update existing
      this.apiService.put(`users/${this.editingUser.id}/`, this.editingUser).subscribe({
        next: () => {
          this.loadUsers();
          this.closeModal();
        },
        error: (error) => console.error('Error updating user:', error)
      });
    } else {
      // Add new
      this.apiService.post('users/', this.editingUser).subscribe({
        next: () => {
          this.loadUsers();
          this.closeModal();
        },
        error: (error) => console.error('Error creating user:', error)
      });
    }
  }

  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.apiService.delete(`users/${id}/`).subscribe({
        next: () => this.loadUsers(),
        error: (error) => console.error('Error deleting user:', error)
      });
    }
  }
}
