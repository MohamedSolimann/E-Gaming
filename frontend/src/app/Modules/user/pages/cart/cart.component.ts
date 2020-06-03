import { Component, OnInit } from "@angular/core";
import { NavigationService } from "../../../services/navigation.service";
import { CartBackendCallService } from "../../services/cart-backend-call.service";
import { ActivatedRoute, RouterState, Router } from "@angular/router";
import { CategoryBackendCallsService } from "src/app/Modules/category/services/category-backendCalls";
import { UserBackendCallService } from "../../services/user-backendCall.service";

// import "rxjs/add/operator/toPromise";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"]
})
export class CartComponent implements OnInit {
  constructor(
    public myNavigation: NavigationService,
    public myCartBackendCalls: CartBackendCallService,
    public myActivatedRoute: ActivatedRoute,
    public myCategoryBackendCalls: CategoryBackendCallsService,
    public myUserBackendCalls: UserBackendCallService,
    private myRouter: Router
  ) {
    this.handleUserAuthentication();
  }

  ngOnInit() {}
  public user_cartId: String = "";
  public user_id: String = "";
  public productsObjects: Array<any>;
  public products: Array<any> = [];
  public responseMessage: String = "";
  public numbers: Array<any> = [1, 2, 3, 4];
  public totalProductPrice: number;
  public totalOrderPrice: number = 0;
  public status: boolean = false;
  public qtyValules: Array<string> = [];
  public userStatus: String = "Log In";
  public username: String = "";
  public tempProductsObjects: any;
  public currentUrl: String = "";
  public productsObjectsInUserCart: Array<any> = [];

  getQty(product_id, qty) {
    debugger;
    let { user_cartId } = this;
    if (user_cartId) {
      let data = { cart_id: user_cartId, product_id, qty };
      this.myCartBackendCalls
        .updateProductQty(data)
        .subscribe((res: response) => {
          if (res.message === "success") {
            this.myNavigation.refreshPage("user/cart");
          }
        });
    } else {
      let data = { product_id, qty };
      this.myCartBackendCalls
        .updateTempProductQty(data)
        .subscribe((res: response) => {
          debugger;
          if (res.message === "success") {
            this.myNavigation.refreshPage("user/cart");
          }
        });
    }
  }

  getCurrentQtyOfProduct(product_id, arr) {
    debugger;
    let products = arr;
    //loop on the products array
    for (let productObject of products) {
      //loop on each product object
      for (let key in productObject) {
        //check for the product id
        if (key === "_id" && productObject[key] === product_id) {
          let productCurrentQty = productObject.qty;
          //return the product current qty
          return productCurrentQty;
        }
      }
    }
  }
  navigateTo(url) {
    this.myNavigation.navigateTo(url);
  }
  handleUserAuthentication() {
    this.myUserBackendCalls.userAuthentication().subscribe((res: response) => {
      if (res.message === "success") {
        this.user_id = res.data;
        this.userStatus = "Log Out";
        this.handleGetUserById();
      } else {
        this.handleGetTempProductIds();
      }
    });
  }
  handleGetUserById() {
    let { user_id } = this;
    let data = { user_id };
    this.myUserBackendCalls.getUserById(data).subscribe((res: response) => {
      if (res.message === "success") {
        this.username = res.data[0].username;
        this.handleGetUserCartId();
      }
    });
  }
  handleGetUserCartId() {
    this.handleGetTempProductsIdsOnly();
    let { user_id } = this;
    let data = { user_id };
    this.myCartBackendCalls.getCartId(data).subscribe((res: response) => {
      if (res.message === "success") {
        this.user_cartId = res.data;
        this.handleGetProudctsObjectInUserCartOnly(this.user_cartId);
        debugger;
        if (this.tempProductsObjects) {
          debugger;
          // this.handleAddTempProductIdsToUserCart(
          //   this.user_cartId,
          //   this.tempProductsObjects
          // );
          this.handleProductsShifting(
            this.tempProductsObjects,
            this.productsObjectsInUserCart
          );
        }
        this.handleGetProductsObjectInCart();
      } else {
        this.responseMessage = "There is no items in cart yet!";
      }
    });
  }
  handleAddTempProductIdsToUserCart(cart_id, tempProducts_ids) {
    debugger;
    let data = { cart_id, tempProducts_ids };
    this.myCartBackendCalls.addTempProductIdsToUserCart(data).subscribe();
  }
  handleProductsShifting = (arr1, arr2) => {
    debugger;
    //get products ids from tempproducts
    let productsIdsOfTempProducts = this.getProductsIdsFromObject(arr1);

    //get products ids from user cart
    let productsIdsOfUserCart = this.getProductsIdsFromObject(arr2);

    //search with the product id from the temp products  in user cart products ids
    this.checkExistence(productsIdsOfTempProducts, productsIdsOfUserCart);
  };
  checkExistence = (productsIdsOfTempProducts, productsIdsOfUserCart) => {
    debugger;
    for (let productId of productsIdsOfTempProducts) {
      //if product id exists, update qty
      if (productsIdsOfUserCart.includes(productId)) {
        //update qty
        //get  qty of product in user cart
        debugger;
        let productQtyInUserCart = this.getCurrentQtyOfProduct(
          productId,
          this.products
        );
        //get qty of product in temp cart
        let productQtyInTempCart = this.getCurrentQtyOfProduct(
          productId,
          this.tempProductsObjects
        );
        //add them together
        let totalQty = productQtyInTempCart + productQtyInUserCart;
        let { user_cartId } = this;
        debugger;
        let data = {
          cart_id: user_cartId,
          product_id: productId,
          qty: totalQty
        };
        this.myCartBackendCalls.updateProductQty(data);
      }
      //if product id does not exists, add product
      else {
        //add product
        debugger;
        this.handleAddTempProductIdsToUserCart(
          this.user_cartId,
          this.tempProductsObjects
        );
      }
    }
    this.myCartBackendCalls.removeAllTempProductIds().subscribe();
  };
  getProductsIdsFromObject = arr => {
    let newArr = [];
    //loop on the array
    for (let object of arr) {
      //get product id from each object
      let productId = object.product_id;
      //push the product id into new array
      newArr.push(productId);
    }
    return newArr;
  };
  getArrayFromObject(arr) {
    let arry = [];
    for (let tempProductObject of arr) {
      for (let key in tempProductObject) {
        if (key === "product_id") {
          arry.push(tempProductObject[key]);
        }
      }
    }
    return arry;
  }
  handleGetProudctsObjectInUserCartOnly(user_cartId) {
    debugger;
    let data = { cart_id: user_cartId };
    this.myCartBackendCalls
      .getProductsIdsInUserCart(data)
      .subscribe((res: response) => {
        debugger;
        this.productsObjectsInUserCart = res.data;
      });
  }
  handleGetProductsObjectInCart() {
    let { user_cartId } = this;
    let data = { cart_id: user_cartId };
    if (user_cartId) {
      this.myCartBackendCalls
        .getProductsIdsInUserCart(data)
        .subscribe((res: response) => {
          this.productsObjects = res.data;
          debugger;
          if (this.productsObjects.length) {
            this.status = true;
            this.handelGetProductDetails(this.productsObjects);
          } else {
            this.responseMessage = "There is no items in the cart yet!";
          }
        });
    }
  }
  handleGetProductById(product_id, product_qty) {
    let data = { product_id };
    this.myCategoryBackendCalls
      .getProductById(data)
      .subscribe((res: response) => {
        let product = res.data;
        product.qty = product_qty;
        let product_price = product.price;
        // let previousQty = this.checkIfProductExists(product._id);
        // if (previousQty) {
        //   this.myNavigation.refreshPage("user/cart");
        //   return;
        // }
        this.getTotalPriceOfOrder(product_price, product.qty);
        product.totalProductPrice =
          parseInt(product_price) * parseInt(product.qty);
        this.products.push(product);
      });
  }
  checkIfProductExists(product_id) {
    //Array of Products
    let products = this.products;

    //loop on array of products
    for (let productObject of products) {
      //loop on each product
      for (let key in productObject) {
        //check  the key equals id of product
        if (key === "_id") {
          //check the product id equals to the given product id
          if (productObject[key] === product_id) {
            let previousQty = productObject.qty;
            //get the index of the product object
            let index = products.findIndex(
              productObject => productObject._id === product_id
            );
            //remove the existing product
            this.products.splice(index, 1);
            return previousQty;
          }
        }
      }
    }
  }
  handelGetProductDetails(productsObjects) {
    // this.productIdsObject = this.arrayToObject(arr);
    // this.qtyValules = Object.values(this.productIdsObject);
    let product_ids = [];
    let productQties = [];
    for (let productObject of productsObjects) {
      for (let key in productObject) {
        if (key === "product_id") {
          product_ids.push(productObject[key]);
        } else {
          productQties.push(productObject[key]);
        }
      }
    }
    for (let i = 0; i < product_ids.length; i++) {
      let product_id = product_ids[i];
      let product_qty = productQties[i];
      this.handleGetProductById(product_id, product_qty);
    }
  }
  getTotalPriceOfOrder(productPrice, productQty) {
    let product_price = parseInt(productPrice) * productQty;
    this.totalOrderPrice += product_price;
  }
  handleRemoveItemFromCart(product_id) {
    const { user_cartId } = this;
    let data = { cart_id: user_cartId, product_id };
    this.myCartBackendCalls
      .removeItemFromCart(data)
      .subscribe((res: response) => {
        if (res.message === "success") {
          this.myNavigation.refreshPage("user/cart");
        } else {
          this.responseMessage = "Please try agian";
        }
      });
  }
  handleGetTempProductIds() {
    this.myCartBackendCalls.getTempProductsIds().subscribe((res: response) => {
      if (res.message === "success") {
        this.tempProductsObjects = res.data;
        if (this.tempProductsObjects) {
          this.handelGetProductDetails(this.tempProductsObjects);
          this.status = true;
        } else {
          this.responseMessage = "There is no items in cart yet!.";
        }
      }
    });
  }
  handleGetTempProductsIdsOnly() {
    this.myCartBackendCalls.getTempProductsIds().subscribe((res: response) => {
      if (res.message === "success") {
        this.tempProductsObjects = res.data;
      }
    });
  }
  removeItem(product_id) {
    let cart_id = this.user_cartId;
    let productId = product_id;
    if (cart_id) {
      this.handleRemoveItemFromCart(productId);
    } else {
      this.handleRemoveAllTempProductId(product_id);
    }
  }
  handleRemoveAllTempProductId(product_id) {
    let data = { product_id };
    this.myCartBackendCalls
      .removeAllTempProductId(data)
      .subscribe((res: response) => {
        if (res.message === "success") {
          this.myNavigation.refreshPage("user/cart");
        }
      });
  }
  handleRemoveOneTempProductId(product_id) {
    let data = { product_id };
    this.myCartBackendCalls
      .removeTempProductId(data)
      .subscribe((res: response) => {
        if (res.message === "success") {
          this.myNavigation.refreshPage("user/cart");
        }
        {
          this.responseMessage = "Error, Please try again";
        }
      });
  }
  handleCheckOut() {
    this.getCurrentUrl();
    if (!this.user_id) {
      this.myNavigation.navigateToWithData("user/signin", this.currentUrl);
    }
  }
  getCurrentUrl() {
    this.currentUrl = this.myRouter.url;
  }
  arrayToObject(arr) {
    let obj = {};
    arr.forEach(val => {
      obj[val] ? obj[val]++ : (obj[val] = 1);
    });
    return obj;
  }
}
