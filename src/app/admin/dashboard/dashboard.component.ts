import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('revenueChart') revenueChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('projectChart') projectChart!: ElementRef<HTMLCanvasElement>;

  ngOnInit() {}

  ngAfterViewInit() {
    this.initRevenueChart();
    this.initProjectChart();
  }

  initRevenueChart() {
    const ctx = this.revenueChart.nativeElement.getContext('2d');
    new Chart(ctx!, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Revenue',
          data: [12000, 19000, 15000, 25000, 22000, 30000],
          borderColor: '#007bff',
          backgroundColor: 'rgba(0, 123, 255, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: '#f0f0f0'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  }

  initProjectChart() {
    const ctx = this.projectChart.nativeElement.getContext('2d');
    new Chart(ctx!, {
      type: 'doughnut',
      data: {
        labels: ['Completed', 'In Progress', 'Pending'],
        datasets: [{
          data: [65, 25, 10],
          backgroundColor: ['#28a745', '#007bff', '#ffc107'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 20,
              usePointStyle: true
            }
          }
        }
      }
    });
  }
}