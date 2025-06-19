import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @Input() isMobile: boolean = false;
  @Input() isCollapsed: boolean = false;
}
