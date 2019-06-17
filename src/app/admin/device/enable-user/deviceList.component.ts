import { Component, AfterViewInit, ElementRef, ViewChild, Input } from '@angular/core';

import { DefaultEditor } from 'ng2-smart-table';

@Component({
  template: `
  <select [ngClass]="inputClass"
            multiple
            class="form-control"
            [(ngModel)]="cell.newValue"
            [name]="cell.getId()"
            [disabled]="!cell.isEditable()"
            (click)="onClick.emit($event)"
            (keydown.enter)="onEdited.emit($event)"
            (keydown.esc)="onStopEditing.emit()">
        <option *ngFor="let device of devices" [value]="device"
                [selected]="isSelected(device)">{{ device }}
        </option>
    </select>
    <div [hidden]="true" [innerHTML]="cell.getValue()" #htmlValue></div>
  `,
  styleUrls: ['./enable-user.component.scss']
})

export class DeviceListComponent extends DefaultEditor implements AfterViewInit{


    @Input() value
    @ViewChild('htmlValue') htmlValue: ElementRef;
    devices = ['Muneeb','Ahmed','Siddiqui','Bhai',"Behen"];
    selectedOptions= []

    constructor() {
        super();  
    }

    ngAfterViewInit(){
        console.log(this.value);
        if(this.cell.newValue !== ''){
            this.selectedOptions = this.htmlValue.nativeElement.innerText.split(",");
        }
    }

    isSelected(value): boolean{
        if(this.selectedOptions.indexOf(value) !== -1){
            return true;
        }
        return false;
    }

}