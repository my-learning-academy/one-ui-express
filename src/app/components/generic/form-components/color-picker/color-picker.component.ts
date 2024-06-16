import { Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormField } from '@app/models/form-components/form-field.model';
import { ColorPickerModule, ColorPickerService } from 'ngx-color-picker';

@Component({
  selector: 'app-color-picker',
  standalone: true,
  imports: [
    ColorPickerModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  providers: [ColorPickerService],
  templateUrl: './color-picker.component.html',
})
export class ColorPickerComponent implements OnInit {
  @Input({ required: true }) colorFieldElement!: FormField<UntypedFormGroup>;

  defaultColor = '#ffffff';
  cpPresetColors: string[] = [
    '#fff',
    '#000',
    '#2889e9',
    '#e920e9',
    '#fff500',
    'rgb(236,64,64)',
  ];

  ngOnInit(): void {
    this.setDefaultColor();
  }

  onColorChange(selectedColor: string): void {
    this.colorFieldElement.formGroup
      .get(this.colorFieldElement.formControlName as string)
      ?.setValue(selectedColor);
  }

  private setDefaultColor(): void {
    this.defaultColor =
      this.colorFieldElement.formGroup.get(
        this.colorFieldElement.formControlName as string
      )?.value ?? this.defaultColor;
  }
}
