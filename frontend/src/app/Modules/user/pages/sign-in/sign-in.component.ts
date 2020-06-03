import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { NavigationService } from "../../../services/navigation.service";
import { UserBackendCallService } from "../../services/user-backendCall.service";
import { ActivatedRoute } from "@angular/router";
import * as Rx from "rxjs";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"]
})
export class SignInComponent {
  constructor(
    public myNavigation: NavigationService,
    public myBackendCalls: UserBackendCallService,
    public myActivatedRoute: ActivatedRoute
  ) {
    this.getPreviousPath();
  }

  public email: String = "a@a.com";
  public password: String = "1234";
  public show: boolean = false;
  public responseMessage: string = "";
  public status: string = "Log In";
  public previousPath: String = "";

  navigateTo(url) {
    this.myNavigation.navigateTo(url);
  }

  handleSignin() {
    const { email, password } = this;
    let data = { email, password };
    this.myBackendCalls.signIn(data).subscribe((res: response) => {
      if (res.message === "success") {
        this.myNavigation.navigateTo(this.previousPath);
      } else {
        this.responseMessage = res.message;
        this.show = true;
      }
    });
  }
  getPreviousPath() {
    this.previousPath = this.myActivatedRoute.snapshot.params.prePath;
  }
}
