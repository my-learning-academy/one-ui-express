import { Component, Input } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { Tab } from '@app/models/tab/tab.model';

@Component({
  selector: 'app-tab-group',
  standalone: true,
  imports: [MatTabsModule, RouterModule],
  templateUrl: './tab-group.component.html',
  styleUrl: './tab-group.component.scss',
})
export class TabGroupComponent {
  @Input({ required: true }) tabs!: Tab[];
}
