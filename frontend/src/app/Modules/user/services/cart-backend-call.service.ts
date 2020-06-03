import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class CartBackendCallService {
  constructor(public myHttp: HttpClient) {}

  createCart(data) {
    return this.myHttp.post("http://localhost:8080/createCart", data, {
      headers: {
        "Content-Type": "Application/Json"
      },

      withCredentials: true
    });
  }
  addItemToCart(data) {
    return this.myHttp.post("http://localhost:8080/addItemToCart", data, {
      headers: { "Content-Type": "Application/Json" },
      withCredentials: true
    });
  }
  updateProductQty(data) {
    return this.myHttp.post("http://localhost:8080/updateproductqty", data, {
      headers: { "Content-Type": "Application/Json" },
      withCredentials: true
    });
  }
  updateTempProductQty(data) {
    return this.myHttp.post(
      "http://localhost:8080/updatetempproductqty",
      data,
      { headers: { "Content-Type": "Application/Json" }, withCredentials: true }
    );
  }
  getCartId(data) {
    return this.myHttp.post("http://localhost:8080/getcartid", data, {
      headers: { "Content-Type": "Application/Json" },
      withCredentials: true
    });
  }
  getProductsIdsInUserCart(data) {
    return this.myHttp.post("http://localhost:8080/productsinusercart", data, {
      headers: {
        "Content-Type": "Application/Json"
      },
      withCredentials: true
    });
  }
  removeItemFromCart(data) {
    return this.myHttp.post("http://localhost:8080/removeitemfromcart", data, {
      headers: {
        "Content-Type": "Application/Json"
      }
    });
  }
  addTempProductToCart(data) {
    return this.myHttp.post("http://localhost:8080/addtempproduct", data, {
      headers: { "Content-Type": "Application/Json" },
      withCredentials: true
    });
  }
  getTempProductsIds() {
    return this.myHttp.get("http://localhost:8080/gettempproductsids", {
      withCredentials: true
    });
  }
  removeTempProductId(data) {
    return this.myHttp.post("http://localhost:8080/removetemporductid", data, {
      headers: { "Content-Type": "Application/Json" },
      withCredentials: true
    });
  }
  removeOneQtyFromCart(data) {
    return this.myHttp.post(
      "http://localhost:8080/removeoneqtyfromcart",
      data,
      { headers: { "Content-Type": "Application/Json" }, withCredentials: true }
    );
  }
  removeAllTempProductId(data) {
    return this.myHttp.post(
      "http://localhost:8080/removealltempproductid",
      data,
      { headers: { "Content-Type": "Application/Json" }, withCredentials: true }
    );
  }
  addTempProductIdsToUserCart(data) {
    return this.myHttp.post(
      "http://localhost:8080/addTempProductIdsToUserCart",
      data,
      { headers: { "Content-Type": "Application/Json" }, withCredentials: true }
    );
  }
  removeAllTempProductIds() {
    return this.myHttp.get(
      "http://localhost:8080/removetempproductsidsfromcookies",
      {
        withCredentials: true
      }
    );
  }
}
