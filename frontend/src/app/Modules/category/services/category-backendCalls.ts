import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class CategoryBackendCallsService {
  constructor(public myHttp: HttpClient) {}

  getAllCategories() {
    return this.myHttp.get("http://localhost:8080/allcategories");
  }
  getProductByCategory(data) {
    return this.myHttp.post("http://localhost:8080/producstbycategory", data);
  }
  getProductById(data) {
    return this.myHttp.post("http://localhost:8080/productbyid", data, {
      headers: { "Content-Type": "Application/Json" },
      withCredentials: true
    });
  }
}
