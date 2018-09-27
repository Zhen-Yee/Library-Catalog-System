import { Component,  OnInit } from "@angular/core";
import { HttpClient} from "@angular/common/http";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "home-page",
  templateUrl: "./homepage.component.html"
})
export class HomePageComponent implements OnInit {

  constructor(private http: HttpClient) {}
 // constructor(private http: HttpClient, private snackBar: MatSnackBar) {}
 
 ngOnInit() {}

  post(sendThis: string) {
    const x: string = sendThis
     this.http
       .post("http://localhost:8090/promoteAdmin", x)
      
      /* keep this section for future sprints:
       * give feedback to whether user is found/promoted or
       * user is NOT found/promoted OR
       * user is found/already promoted
        .subscribe(sent =>
        { console.log(sent);
          this.snackBar.openFromComponent(HomePageComponent, {
            data: "Promoted",
            duration: 500,
          });
        }
       );
       */
   }

}