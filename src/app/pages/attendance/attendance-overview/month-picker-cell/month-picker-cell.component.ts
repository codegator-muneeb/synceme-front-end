import { Component } from '@angular/core';
import { NbCalendarMonthCellComponent } from '@nebular/theme';

@Component({
  selector: 'ngx-month-picker-cell',
  templateUrl: './month-picker-cell.component.html',
  styleUrls: ['./month-picker-cell.component.scss'],
  host: { '(click)': 'onClick()', 'class': 'month-cell' },
})
export class MonthPickerCellComponent extends NbCalendarMonthCellComponent<Date> {
}
