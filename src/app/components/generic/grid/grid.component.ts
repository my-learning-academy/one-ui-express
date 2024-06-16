import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  ColDef,
  SelectionChangedEvent,
  GridApi,
  GridReadyEvent,
  GridOptions,
} from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { MatIconModule } from '@angular/material/icon';
import { ComponentType } from '@angular/cdk/portal';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '@app/services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EMPTY, switchMap, take } from 'rxjs';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { ResponseDto } from '@app/dtos/response.dto';
import { FormDialogDataModel } from '@app/models/form-dialog-data.model';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [AgGridAngular, MatIconModule, MatButtonModule],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
})
export class GridComponent<T> {
  @Input() rowData: any;
  @Input({ required: true }) colDefs!: ColDef[];
  @Input() deleteRecordFn!: Function;
  @Input() dialogComponent!: ComponentType<any>;
  @Input({ required: true }) gridOptions!: GridOptions<T>;

  disable = true;
  gridApi!: GridApi<T>;

  private currentSelectedNode!: any;

  constructor(
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {}

  onRowSelectionChange(event: SelectionChangedEvent<T>): void {
    this.currentSelectedNode = event.api.getSelectedNodes()[0]?.data;
    this.disable = !!!this.currentSelectedNode;
  }

  openDialog(edit?: boolean): void {
    this.dialog.open(this.dialogComponent, {
      width: '60%',
      data: {
        node: edit ? this.currentSelectedNode : null,
        gridApi: this.gridApi,
      } as FormDialogDataModel<T>,
    });
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  deleteRecord(): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      height: '200px',
      width: '600px',
    });
    dialogRef
      .afterClosed()
      .pipe(
        take(1),
        switchMap((isDeleteConfirmed: boolean) => {
          if (isDeleteConfirmed) {
            return this.deleteRecordFn({
              ...this.currentSelectedNode,
              sys_Deactivated: true,
            });
          }
          return EMPTY;
        })
      )
      .subscribe({
        next: (result: any) => this.handleDeleteRecord(result),
        error: (err: HttpErrorResponse) => this.handleDeleteError(err),
      });
  }

  private handleDeleteRecord(result: ResponseDto<T>): void {
    if (!result.succeeded) {
      this.notificationService.openSnackBar();
      return;
    }
    this.notificationService.openSnackBar();
    this.gridApi.applyTransaction({ remove: [this.currentSelectedNode] });
  }

  private handleDeleteError(err: HttpErrorResponse): void {
    this.notificationService.openSnackBar();
  }
}
