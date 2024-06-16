import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { MenuItem } from '@app/models/layout/menu-item.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatSidenavModule,
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Input() isExpanded: boolean = false;
  @Input({ required: true }) navItems!: MenuItem[];

  @Output() toggleSidebar = new EventEmitter<boolean>();

  handleSidebarToggle = (): void => this.toggleSidebar.emit(!this.isExpanded);
}
