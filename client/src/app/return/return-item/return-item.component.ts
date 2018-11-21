import { Component, OnInit, Input } from '@angular/core';
import { ReturnComponent } from '../../return/return.component';

@Component({
  selector: 'app-return-item',
  templateUrl: './return-item.component.html',
  styleUrls: ['./return-item.component.css']
})
export class ReturnItemComponent implements OnInit {

  @Input() item;
   private editQty = false;
   newQty;

    constructor(private rItem : ReturnItemComponent) { }

    ngOnInit() {
    }

    private returnBook() {
    }

    private returMusic() {
    }

    private returnMovie() {
    }

}
