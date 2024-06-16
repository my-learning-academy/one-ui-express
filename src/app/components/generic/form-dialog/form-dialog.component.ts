import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { ResponseDto } from '@app/dtos/response.dto';
import { FormDialogDataModel } from '@app/models/form-dialog-data.model';
import { NotificationService } from '@app/services/notification.service';
import { FormOf } from '@app/utils/form-utils';
import { take } from 'rxjs';

@Component({
  selector: 'app-form-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './form-dialog.component.html',
  styleUrl: './form-dialog.component.scss',
})
export class FormDialogComponent<T> implements OnInit {
  @Input({ required: true }) formGroup!: FormGroup<FormOf<any>>;
  @Input({ required: true }) dialogEntityId!: string;
  @Input() data!: FormDialogDataModel<T>;
  @Input() upsertRecordFn!: Function;

  loading = false;
  title!: string;

  constructor(
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<FormDialogComponent<T>>
  ) {}

  ngOnInit(): void {
    this.setFormValuesOnEdit();
  }

  clearForm(): void {
    this.formGroup.reset();
  }

  save(): void {
    this.startLoading();
    this.upsertRecordFn({ ...this.formGroup.getRawValue() })
      .pipe(take(1))
      .subscribe({
        next: (result: ResponseDto<T>) => this.handleSaveResult(result),
        error: (err: HttpErrorResponse) => this.handleSaveError(err),
      });
  }

  private setFormValuesOnEdit(): void {
    if (this.data.node) {
      this.formGroup.patchValue(this.data.node);
    }
    this.title = this.data.node ? `Edit` : `Add`;
  }

  private handleSaveResult(result: ResponseDto<T>): void {
    if (!result.succeeded) {
      if (result.errors?.length) {
        this.handleFailure(result.errors[0].code, result.errors[0].description);
        return;
      }
      this.handleFailure(result.responseMessage, 'Save Failed');
      return;
    }
    this.handleSuccess();
  }

  private handleSuccess(): void {
    const transaction = this.data.node
      ? { update: [this.formGroup.getRawValue()] }
      : { add: [this.formGroup.getRawValue()] };
    this.data.gridApi.applyTransaction(transaction);

    this.notificationService.openSnackBar();
    this.dialogRef.close();
  }

  private handleFailure(message: string, errorTitle: string): void {
    this.showError(message, errorTitle);
    this.stopLoading();
  }

  private handleSaveError(err: HttpErrorResponse): void {
    this.stopLoading();
    this.showError(err.message, err.name);
  }

  private startLoading(): void {
    this.loading = true;
  }

  private stopLoading(): void {
    this.loading = false;
  }

  private showError(message: string, errorTitle: string): void {
    this.notificationService.openSnackBar();
  }
}
