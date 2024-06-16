import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    SidebarComponent,
  ],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
})
export class ShellComponent {
  sidebarExpanded = false;

  constructor(private router: Router) {}

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/inventory/sign-in']);
  }
}
