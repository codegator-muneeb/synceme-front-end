import { Component, Input, HostBinding } from '@angular/core';
import {A_LIST, L_LIST} from './legend-lists';

@Component({
  selector: 'ngx-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss']
})

export class LegendComponent{
  @Input()
  @HostBinding('class.collapsed')
  collapsed: boolean;

  abbreviations = A_LIST;
  legend = L_LIST;
}
