import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../../pages/admin/navbar/navbar.component';
import { HeaderComponent } from '../../../pages/admin/header/header.component';
import { FooterComponent } from '../../../pages/admin/footer/footer.component';

@Component({
  selector: 'app-layout-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, NavbarComponent, FooterComponent],
  templateUrl: './layout-admin.component.html',
  styleUrl: './layout-admin.component.css'
})
export class LayoutAdminComponent implements OnInit {
  isSidebarVisible = true;
  isMobile = false;

  ngOnInit() {
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
  }

  // checkScreenSize() {
  //   this.isMobile = window.innerWidth < 768;
  //   if (!this.isMobile) {
  //     this.isSidebarVisible = true; // auto hiện trên desktop
  //   }
  // }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 768;

    // Tùy chỉnh trạng thái sidebar khi thay đổi màn hình
    this.isSidebarVisible = !this.isMobile;
  }

}
