import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UserBackendCallService } from "src/app/Modules/user/services/user-backendCall.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  constructor(public myUserBackendCalls: UserBackendCallService) {
    this.handleUserAuthentication();
  }

  ngOnInit() {}
  public userStatus: string = "Log In";
  public username: String = "";
  public user_id: String = "";

  handleUserAuthentication() {
    this.myUserBackendCalls.userAuthentication().subscribe((res: response) => {
      if (res.message === "success") {
        this.user_id = res.data;
        this.userStatus = "Log Out";
        this.handleGetUserById(this.user_id);
      }
    });
  }
  handleGetUserById(user_id) {
    let data = { user_id };
    this.myUserBackendCalls.getUserById(data).subscribe((res: response) => {
      if (res.message === "success") {
        this.username = res.data[0].username;
      }
    });
  }
}
