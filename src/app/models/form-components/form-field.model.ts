export interface FormField<TFormGroup> {
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
  formControlName: string | number | null;
  type?: 'password' | 'email' | 'password' | 'number' | 'tel';
  formGroup: TFormGroup;
}

export interface TextField<TFormGroup> extends FormField<TFormGroup> {
  enableTextarea: boolean;
}
