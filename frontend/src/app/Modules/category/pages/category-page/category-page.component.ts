import { Component, OnInit } from "@angular/core";
import { NavigationService } from "../../../services/navigation.service";
import { CategoryBackendCallsService } from "../../services/category-backendCalls";
import { CartBackendCallService } from "src/app/Modules/user/services/cart-backend-call.service";
import { UserBackendCallService } from "src/app/Modules/user/services/user-backendCall.service";
@Component({
  selector: "app-category-page",
  templateUrl: "./category-page.component.html",
  styleUrls: ["./category-page.component.css"]
})
export class CategoryPageComponent implements OnInit {
  constructor(
    public myNavigation: NavigationService,
    public myCategoryBackedCalls: CategoryBackendCallsService,
    public myUserBackendCalls: UserBackendCallService
  ) {
    this.handleUserAuthentication();
    this.handleGetAllCategories();
  }

  ngOnInit() {}

  public categories: Array<any>;
  public userStatus: String = "Log In";
  public username: String = "";
  public user_id: String = "";

  navigateTo(url, category_id) {
    this.myNavigation.navigateToWithData(url, category_id);
  }
  handleGetAllCategories() {
    this.myCategoryBackedCalls.getAllCategories().subscribe((res: response) => {
      this.categories = res.data;
    });
  }
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
