import { Component, HostListener, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared.module';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, SharedModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @Input() isMobile: boolean = false;
  @Input() isCollapsed: boolean = false;
}
