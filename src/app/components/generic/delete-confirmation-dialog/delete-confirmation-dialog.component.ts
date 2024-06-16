import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { DeleteConfirmationDialogConfig } from '@app/models/delete-confirmation-modal-config.model';

@Component({
  selector: 'app-delete-confirmation-dialog',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatButtonModule,
  ],
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrl: './delete-confirmation-dialog.component.scss',
})
export class DeleteConfirmationDialogComponent {
  @Input() deleteConfirmConfig!: DeleteConfirmationDialogConfig | null;

  constructor(
    private dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
