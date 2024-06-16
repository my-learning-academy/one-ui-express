import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from '@app/components/generic/notification/notification.component';
import { NotificationConfig } from '@app/models/notification.config,model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(params?: NotificationConfig) {
    this.snackBar.openFromComponent(NotificationComponent, {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 2000,
      data: params,
    });
  }
}
