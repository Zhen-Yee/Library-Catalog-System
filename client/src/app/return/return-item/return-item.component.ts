import {Component, Input, OnInit} from '@angular/core';
import {ReturnComponent} from "../return.component";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'return-item',
  templateUrl: './return-item.component.html',
  styleUrls: ['./return-item.component.css'],
  animations: [
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(179.9deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in'))
    ])
  ]
})
export class ReturnItemComponent implements OnInit {
  flip: string = 'inactive';
  @Input() item;

  constructor(private itemReturn: ReturnComponent) { }

  ngOnInit() {
  }

  return() {
    this.itemReturn.returnItem(this.item);
  }

  toggleFlip() {
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
  }

}
