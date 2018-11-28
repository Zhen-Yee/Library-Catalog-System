import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'return-item',
  templateUrl: './return-item.component.html',
  styleUrls: ['./return-item.component.css']
})
export class ReturnItemComponent implements OnInit {

  @Input() item;

  constructor() { }

  ngOnInit() {
  }

}
