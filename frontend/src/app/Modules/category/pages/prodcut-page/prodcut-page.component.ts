import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CategoryBackendCallsService } from "../../services/category-backendCalls";
import { CartBackendCallService } from "src/app/Modules/user/services/cart-backend-call.service";
import { NavigationService } from "src/app/Modules/services/navigation.service";
import { UserBackendCallService } from "src/app/Modules/user/services/user-backendCall.service";

@Component({
  selector: "app-prodcut-page",
  templateUrl: "./prodcut-page.component.html",
  styleUrls: ["./prodcut-page.component.css"]
})
export class ProdcutPageComponent implements OnInit {
  constructor(
    public myActivatedRoute: ActivatedRoute,
    public myCategoryBackendCalls: CategoryBackendCallsService,
    public cartBackendCalls: CartBackendCallService,
    public myNavigation: NavigationService,
    public myUserBackendCalls: UserBackendCallService
  ) {
    this.handleUserAuthentication();
    this.getCategoryId();
    this.handleGetTempProudctsObjects();
  }

  public category_id: string;
  public products: Array<any>;
  public status: String = "";
  public user_id: String = "";
  public cart_id: any;
  public userStatus: String = "Log In";
  public username: String = "";
  public productsObjects: Array<any> = [];
  public tempProductsObjects: Array<any> = [];
  public productExistence: Boolean;

  ngOnInit() {}

  getCategoryId() {
    this.category_id = this.myActivatedRoute.snapshot.params.category_id;
    this.handleGetPoductByCategory();
  }
  handleGetPoductByCategory() {
    const { category_id } = this;
    let data = { category_id };
    this.myCategoryBackendCalls
      .getProductByCategory(data)
      .subscribe((res: response) => {
        if (res.message === "success") {
          this.products = res.data;
        }
      });
  }
  handleCreateCart(product_id) {
    debugger;
    let data = { product_id };
    this.cartBackendCalls.createCart(data).subscribe((res: response) => {
      if (res.message === "success") {
        debugger;
        this.cart_id = res.data;
        this.myNavigation.navigateToWithData("user/cart", this.cart_id);
      } else {
        this.status = "Error ,Please try again";
      }
    });
  }
  handleAddItemToCart(product_id) {
    debugger;
    let ProductExistence = this.checkProductExistenceInUserCart(product_id);
    if (this.cart_id) {
      let { cart_id } = this;
      let data = { cart_id, product_id };
      if (ProductExistence) {
        debugger;
        let productQty = this.getProductQty(product_id);
        let data = { cart_id, product_id, qty: productQty + 1 };
        debugger;
        this.cartBackendCalls
          .updateProductQty(data)
          .subscribe((res: response) => {
            debugger;
            if (res.message === "success") {
              debugger;
              this.myNavigation.navigateToWithData("user/cart", this.cart_id);
            }
          });
      } else {
        this.cartBackendCalls.addItemToCart(data).subscribe((res: response) => {
          if (res.message === "success") {
            this.myNavigation.navigateToWithData("user/cart", this.cart_id);
          } else {
            this.status = "Error ,Please try again";
          }
        });
      }
    } else if (this.userStatus === "Log In") {
      debugger;
      let ProductExitenceInTempProducts = this.checkProductExitenceInTempProducts(
        product_id
      );
      debugger;
      if (ProductExitenceInTempProducts) {
        debugger;
        let tempPorductQty = this.getTempProudctQty(product_id);
        debugger;
        let data = { product_id, qty: tempPorductQty + 1 };
        this.cartBackendCalls
          .updateTempProductQty(data)
          .subscribe((res: response) => {
            if (res.message === "success") {
              debugger;
              this.myNavigation.navigateTo("user/cart");
            }
          });
      } else {
        this.handleAddTempProductToCookies(product_id);
      }
    } else {
      debugger;
      this.handleCreateCart(product_id);
    }
  }
  getProductQty(product_id) {
    debugger;
    for (let productObject of this.productsObjects) {
      for (let key in productObject) {
        if (key === "product_id" && productObject[key] === product_id) {
          let productQty = productObject.qty;
          return productQty;
        }
      }
    }
  }
  checkProductExistenceInUserCart(product_id) {
    debugger;
    let productsObjects = this.productsObjects;
    for (let productObject of productsObjects) {
      for (let key in productObject) {
        if (key === "product_id" && productObject[key] === product_id) {
          this.productExistence = true;
          return true;
        }
      }
    }
  }
  handleGetProductsObjectInCart(cart_id) {
    debugger;
    let data = { cart_id };
    this.cartBackendCalls
      .getProductsIdsInUserCart(data)
      .subscribe((res: response) => {
        if (res.message === "success") {
          debugger;
          this.productsObjects = res.data;
        }
      });
  }
  handleGetUserById() {
    const { user_id } = this;
    let data = { user_id };
    this.myUserBackendCalls.getUserById(data).subscribe((res: response) => {
      if (res.message === "success") {
        this.username = res.data[0].username;
        this.handleGetCartId(this.user_id);
      }
    });
  }
  handleGetCartId(user_id) {
    let data = { user_id };
    this.cartBackendCalls.getCartId(data).subscribe((res: response) => {
      if (res.message === "success") {
        this.cart_id = res.data;
        this.handleGetProductsObjectInCart(this.cart_id);
      }
    });
  }
  handleUserAuthentication() {
    this.myUserBackendCalls.userAuthentication().subscribe((res: response) => {
      if (res.message === "success") {
        this.user_id = res.data;
        this.userStatus = "Log Out";
        this.handleGetUserById();
      }
    });
  }
  handleAddTempProductToCookies(product_id) {
    debugger;
    let x = this.checkProductExistenceInUserCart(product_id);
    let data = { product_id };
    this.cartBackendCalls
      .addTempProductToCart(data)
      .subscribe((res: response) => {
        if (res.message === "success") {
          this.myNavigation.navigateTo("user/cart");
        }
      });
  }
  handleGetTempProudctsObjects() {
    debugger;
    this.cartBackendCalls.getTempProductsIds().subscribe((res: response) => {
      if (res.message === "success") {
        debugger;
        this.tempProductsObjects = res.data;
      }
    });
  }
  checkProductExitenceInTempProducts(product_id) {
    let tempProductsObjects = this.tempProductsObjects;
    if (tempProductsObjects) {
      for (let productObject of tempProductsObjects) {
        for (let key in productObject) {
          if (key === "product_id" && productObject[key] === product_id) {
            return true;
          }
        }
      }
    }
  }
  getTempProudctQty(product_id) {
    for (let productObject of this.tempProductsObjects) {
      for (let key in productObject) {
        if (key === "product_id" && productObject[key] === product_id) {
          let productQty = productObject.qty;
          return productQty;
        }
      }
    }
  }
}
