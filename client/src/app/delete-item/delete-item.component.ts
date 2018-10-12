import {Component, OnInit, Input} from '@angular/core';
import {Book} from "../_models/catalog/book.model";
import {CatalogItemType} from "../enums/catalogItemType";
import {CatalogItem} from "../_models/catalog/catalogItem.model";

@Component({
  selector: 'delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.css']
})
export class DeleteItemComponent implements OnInit {

  @Input() element;

  constructor() {
}

  //Generated Data
  deleteNumber: number;
  dataArray: CatalogItem[];

  delete(itemType: CatalogItem){
   itemType.qtyInStock = itemType.qtyInStock - this.deleteNumber
   console.log(itemType.qtyInStock)
  }

  ngOnInit() {
  }

}
