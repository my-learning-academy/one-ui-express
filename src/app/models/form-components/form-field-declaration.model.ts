import { FormField } from './form-field.model';

export interface FormFieldConfig {
  key: string;
  config: Partial<FormField<any>>;
}
