import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { NavigationService } from "../../../services/navigation.service";
import { UserBackendCallService } from "src/app/Modules/user/services/user-backendCall.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  constructor(
    public myNavigation: NavigationService,
    public myUserBackendCalls: UserBackendCallService
  ) {}

  ngOnInit() {}

  handleUserStatus() {
    debugger;
    let userStatus = this.userStatus;
    if (userStatus === "Log In") {
      this.navigateTo("user/signin");
    } else {
      this.handelSignOut();
    }
  }
  navigateTo(url) {
    this.myNavigation.navigateTo(url);
  }
  handelSignOut() {
    this.myUserBackendCalls.signOut().subscribe((res: response) => {
      if (res.message === "success") {
        debugger;
        this.navigateTo("user/signin");
      }
    });
  }
  @Input() userStatus = "Log In";
  @Input() username = "";
}
