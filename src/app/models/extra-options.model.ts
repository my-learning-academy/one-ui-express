import { DialogSizes } from './form-dialog-data.model';

export interface ExtraOption {
  entityDataAccessEndpoint: any | null;
  dialogSize?: DialogSizes;
  enableExtraGridAction?: EnableExtraGridAction;
  gridWidth?: number /* Pixels in number*/;
  gridHeight?: number /* Pixels in number*/;
}

export interface EnableExtraGridAction {
  disableBasicActions?: boolean;
  fileUpload?: boolean;
}
