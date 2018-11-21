import { Component,  OnInit, Input } from "@angular/core";
import {UserService} from "../_services/user.service";
import { MatDialog, MatTableDataSource, MatSnackBar } from "@angular/material";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { DataService } from 'src/app/_services/DataService.service';
import { CatalogItem } from "../_models/catalog/catalogItem.model";

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.css'],
  animations: [
    trigger("detailExpand", [
      state(
        "collapsed",
        style({ height: "0px", minHeight: "0", display: "none" })
      ),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      )
    ])
  ]
})

export class ReturnComponent implements OnInit {

  constructor(private user: UserService, public dialog: MatDialog, private data: DataService) {}
  element;
  item;
  columnsToDisplay: string[] = ["itemType", "title", "quantityLoaned", "checkoutDate", "dueDate"];
  expandedElement: CatalogItem[];
  dataSource: MatTableDataSource<CatalogItem>;
  dataArray: CatalogItem[] = [];

  ngOnInit() {}

  authenticated() {
    return this.user.authenticated;
  }

/*
  getAllLoanedItems() {
    this.http.get<Music>("http://localhost:8090/catalog/returnMusic")

}
*/

}

