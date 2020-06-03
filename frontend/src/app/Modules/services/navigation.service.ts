import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class NavigationService {
  constructor(public myRouter: Router) {}

  navigateTo(url) {
    this.myRouter.navigateByUrl(url);
  }
  refreshPage(url) {
    this.myRouter
      .navigateByUrl("home")
      .then(() => this.myRouter.navigateByUrl(url));
  }
  navigateToWithData(url, data) {
    this.myRouter.navigate([url, data]);
  }
}
