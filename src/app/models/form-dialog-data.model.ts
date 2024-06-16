import { GridApi } from 'ag-grid-community';

export interface FormDialogDataModel<T> {
  node: any;
  gridApi: GridApi<T>;
}
