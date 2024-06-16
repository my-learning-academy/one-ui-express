import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DropDownOption } from '@app/models/form-components/drop-down-option.model';
import { FormField } from '@app/models/form-components/form-field.model';

@Component({
  selector: 'app-drop-down-field',
  standalone: true,
  imports: [MatInputModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './drop-down-field.component.html',
})
export class DropDownFieldComponent {
  @Input() dropDownOptions!: DropDownOption[];
  @Input({ required: true }) dropDownElement!: FormField<UntypedFormGroup>;
}
