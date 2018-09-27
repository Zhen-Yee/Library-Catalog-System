import { Component,  OnInit } from "@angular/core";
import { HttpClient} from "@angular/common/http";

@Component({
  selector: "home-page",
  templateUrl: "./homepage.component.html"
})
export class HomePageComponent implements OnInit {

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  post(sendThis: string) {
    const x: string = sendThis
     this.http
       .post("http://localhost:8090/promoteAdmin", x)
       .subscribe(sent => console.log(sent));
   }

}