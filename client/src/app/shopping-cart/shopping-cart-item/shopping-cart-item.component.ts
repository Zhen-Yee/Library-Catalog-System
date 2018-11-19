import { Component, OnInit, Input } from '@angular/core';
import { CartService } from '../../_services/CartService';
import { ShoppingCartComponent } from '../../shopping-cart/shopping-cart.component';

@Component({
    selector: 'shopping-item',
    templateUrl: './shopping-cart-item.component.html',
    styleUrls: ['./shopping-cart-item.component.css']
})
export class ShoppingCartItemComponent implements OnInit {

    @Input() item;

    private editQty = false;
    newQty;
    constructor(private cart: ShoppingCartComponent) { }

    ngOnInit() {
    }

    private removeItem() {
        this.cart.removeItem(this.item.id);
    }

    private editQuantity() {
        this.editQty = !this.editQty;
    }

    private saveQuantity() {
        this.cart.saveQuantity(this.item.id, this.item);
        this.editQty = false;
    }

}
