import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { Router, RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [SharedModule, RouterModule, CommonModule ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  title = 'Dashboard';

  // Dữ liệu cứng cho các ô thống kê
  stats = [
    { label: 'Income', value: 40886200, sub: 'Total income', type: 'Monthly', percent: 98, color: 'primary' },
    { label: 'Orders', value: 275800, sub: 'New orders', type: 'Annual', percent: 20, color: 'success' },
    { label: 'visits', value: 106120, sub: 'New visits', type: 'Today', percent: 44, color: 'info' },
    { label: 'User activity', value: 80600, sub: 'In first month', type: 'Low value', percent: -38, color: 'danger' },
  ];

  // Dữ liệu cứng cho chart Orders
  ordersChart = {
    labels: [
      'Jan 03', 'Jan 06', 'Jan 09', 'Jan 12', 'Jan 15', 'Jan 18', 'Jan 21', 'Jan 24', 'Jan 27', 'Jan 30'
    ],
    numberOfOrders: [800, 500, 750, 400, 900, 600, 950, 700, 850, 1000],
    payments: [200, 250, 300, 220, 350, 280, 400, 320, 370, 450]
  };

  // Dữ liệu cứng cho các chỉ số Orders bên phải chart
  ordersStats = [
    { label: 'Total orders in period', value: 2346, percent: 48 },
    { label: 'Orders in last month', value: 4422, percent: 60 },
    { label: 'Monthly income from orders', value: 9180, percent: 22 },
  ];

  // Dữ liệu cứng cho Messages
  messages = {
    new: 22,
    draft: 16,
    list: [
      { name: 'Monica Smith', time: '1m ago', content: 'Lorem ipsum dolor sit amet...' },
      { name: 'John Doe', time: '5m ago', content: 'Consectetur adipiscing elit...' }
    ]
  };

  // Dữ liệu cứng cho User project list
  userProjects = [
    { status: 'Pending', time: '11:20pm', user: 'Samantha', value: 24, isUp: true },
    { status: 'Canceled', time: '10:40am', user: 'Monica', value: 66, isUp: true },
  ];

  // Dữ liệu cứng cho todo list
  todos = [
    { text: 'Buy a milk', done: true },
    { text: 'Go to shop and find some products.', done: false },
    { text: 'Send documents to Mike', done: false, time: '1 mins' },
  ];

  constructor(
    private router: Router,
    private titleService: Title,
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }

}
