import { Component, OnInit } from "@angular/core";
import { UserBackendCallService } from "src/app/Modules/user/services/user-backendCall.service";

@Component({
  selector: "app-about-us",
  templateUrl: "./about-us.component.html",
  styleUrls: ["./about-us.component.css"]
})
export class AboutUsComponent implements OnInit {
  constructor(public myUserBackendCalls: UserBackendCallService) {
    this.handleUserAuthentication();
  }

  ngOnInit() {}

  public userStatus: String = "Log In";
  public username: String = "";
  public user_id: String = "";

  handleUserAuthentication() {
    this.myUserBackendCalls.userAuthentication().subscribe((res: response) => {
      if (res.message === "success") {
        this.user_id = res.data;
        this.handleGetUserById(this.user_id);
        this.userStatus = "Log Out";
      }
    });
  }
  handleGetUserById(user_id) {
    let data = { user_id };
    this.myUserBackendCalls.getUserById(data).subscribe((res: response) => {
      if (res.message === "success") {
        debugger;
        this.username = res.data[0].username;
      }
    });
  }
}
