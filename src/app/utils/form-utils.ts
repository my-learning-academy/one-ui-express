import { FormControl, FormGroup } from '@angular/forms';
import { FormFieldConfig } from '@app/models/form-components/form-field-declaration.model';

export type FormOf<T> = {
  [K in keyof T]: T[K] extends Record<string, Object>
    ? FormGroup<FormOf<T[K]>>
    : FormControl<T[K]>;
};

export abstract class BaseFormField {
  [key: string]: any;

  protected generateFormFieldElements(
    fields: FormFieldConfig[],
    formGroup: FormGroup<FormOf<any>>
  ) {
    fields.forEach((field) => {
      this[field.key] = {
        ...field.config,
        formGroup: formGroup,
      };
    });
  }
}
