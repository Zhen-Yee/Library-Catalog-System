import { Component,  OnInit, Input } from "@angular/core";
import {UserService} from "../_services/user.service";
import { HttpClient } from "@angular/common/http";
import { MatDialog, MatTableDataSource, MatSnackBar } from "@angular/material";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { Router } from '@angular/router';
import { DataService } from 'src/app/_services/DataService.service';
import { CatalogItem } from "../_models/catalog/catalogItem.model";
import { Book } from "../_models/catalog/book.model";
import { Movie } from "../_models/catalog/movie.model";
import { Music } from "../_models/catalog/music.model";
import { CartService } from '../_services/CartService';

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

  @Input()
  book;
  music;
  movie;


  constructor(private router: Router, private user: UserService, public dialog: MatDialog, private http: HttpClient, public snackBar: MatSnackBar, private data: DataService) {}
  element;
  item;
  columnsToDisplay: string[] = ["itemType", "title", "quantity"];
  expandedElement: CatalogItem[];
  dataSource: MatTableDataSource<CatalogItem>;
  
  ngOnInit() {
       
  }

  authenticated() {
    return this.user.authenticated;
  }

  returnBook() {
      this.http.post<Book>("http://localhost:8090/catalog/returnBook", this.book)
          .subscribe(confirmation => {
            this.router.navigate(["/"]);
            if (confirmation) {
              this.data.updatedSearchItem = true;
              this.openSnackBar("Book Return Completed!", "Close");
            } else {
              this.openSnackBar("Error with Return", "Close");
            }
          });
    }

  returnMusic() {
      this.http.post<Music>("http://localhost:8090/catalog/returnMusic", this.music)
          .subscribe(confirmation => {
            this.router.navigate(["/"]);
            if (confirmation) {
              this.data.updatedSearchItem = true;
              this.openSnackBar("Music Return Completed!", "Close");
            } else {
              this.openSnackBar("Error with Return", "Close");
            }
          });
  }

  returnMovie() {
      this.http.post<Movie>("http://localhost:8090/catalog/returnMovie", this.movie)
          .subscribe(confirmation => {
            this.router.navigate(["/"]);
            if (confirmation) {
              this.data.updatedSearchItem = true;
              this.openSnackBar("Movie Return Completed!", "Close");
            } else {
              this.openSnackBar("Error with Return", "Close");
            }
          });
  }
/*
   this function is meant to take all the loaned items and displaye it onto the return item table
   getAllLoanedItems(){

   }
*/

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message , action, {
      duration: 5000,
    });
  }

}

