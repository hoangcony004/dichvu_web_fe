import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { DichVuWeb_Service } from '../../../../core/service/dichvuweb.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit, OnInit {
  title = 'Trang chủ';

  constructor(
    private router: Router,
    private titleService: Title,
    private service: DichVuWeb_Service
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }
  ngAfterViewInit(): void {
  }
  // @ViewChild('text') text!: ElementRef;

  // ngAfterViewInit(): void {
  //   gsap.from(this.text.nativeElement, {
  //     opacity: 0,
  //     y: -50,
  //     duration: 1,
  //     ease: 'power2.out'
  //   });
  // }
}
