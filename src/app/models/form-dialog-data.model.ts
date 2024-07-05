import { GridApi } from 'ag-grid-community';

export interface FormDialogDataModel<T> {
  node: any;
  gridApi: GridApi<T>;
}

export enum DialogSizes {
  Small = '400px',
  Medium = '600px',
  Large = '800px',
  MaxSize = '1600px',
  FullScreen = '100%',
}
