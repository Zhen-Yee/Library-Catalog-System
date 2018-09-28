import { Component,  OnInit } from "@angular/core";
import { HttpClient} from "@angular/common/http";
import { UserService } from "../_services/user.service";

@Component({
  selector: "home-page",
  templateUrl: "./homepage.component.html"
})
export class HomePageComponent implements OnInit {

  constructor(private http: HttpClient, private user: UserService) {}
 // constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  ngOnInit() {}

  isAdmin() {
    return this.user.isAdmin;
  }
  post(sendThis: string) {
    const x: string = sendThis;
    // use a subscribe when doing an http call otherwise the call wont work
     this.http
       .post("http://localhost:8090/admin/promoteAdmin", x).subscribe(() => {});

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