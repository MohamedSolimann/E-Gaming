import { Component, OnInit } from "@angular/core";
import { NavigationService } from "../../../services/navigation.service";
import { UserBackendCallService } from "../../services/user-backendCall.service";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"]
})
export class SignUpComponent implements OnInit {
  constructor(
    public myNavigation: NavigationService,
    public myBackendCalls: UserBackendCallService
  ) {}

  ngOnInit() {}

  public email: String = "";
  public password: String = "";
  public username: String = "";
  public mobile: String = "";
  public responseMessage: string = "";
  public show: boolean = false;

  navigateTo(url) {
    this.myNavigation.navigateTo(url);
  }
  handleSignUp() {
    debugger;
    const { email, password, username, mobile } = this;
    let data = { email, password, username, mobile };
    this.myBackendCalls.signUp(data).subscribe((res: response) => {
      debugger;
      res.message === "success"
        ? this.myNavigation.navigateTo("user/signin")
        : ((this.responseMessage = res.message), (this.show = true));
    });
  }
}
