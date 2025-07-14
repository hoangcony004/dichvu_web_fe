import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../pages/client/header/header.component';
import { FooterComponent } from '../../../pages/client/footer/footer.component';
import { BannerComponent } from '../../../pages/client/banner/banner.component';
import { FeaturesComponent } from '../../../pages/client/features/features.component';
import { HomeComponent } from '../../../../module/apps/client/home/home.component';
import { initLayoutAnimations } from '../layout-client.component';

@Component({
  selector: 'app-layout-client',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    FeaturesComponent,
    HomeComponent,
  ],
  templateUrl: './layout-client.component.html',
  styleUrl: './layout-client.component.css',
})
export class LayoutClientComponent implements AfterViewInit {
  ngAfterViewInit() {
    initLayoutAnimations();
  }
}
