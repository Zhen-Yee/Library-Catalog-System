import { Component, OnInit, Input } from '@angular/core';
import { ReturnComponent } from '../../return/return.component';

@Component({
  selector: 'app-return-item',
  templateUrl: './return-item.component.html',
  styleUrls: ['./return-item.component.css']
})
export class ReturnItemComponent implements OnInit {

  @Input() item;

    constructor() { }

    ngOnInit() {
    }

    private returnBook() {
    }

    private returMusic() {
    }

    private returnMovie() {
    }

}
