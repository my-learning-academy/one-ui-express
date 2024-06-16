import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { NotificationConfig } from '@app/models/notification.config,model';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class NotificationComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: NotificationConfig) {}
}
