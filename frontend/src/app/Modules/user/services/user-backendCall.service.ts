import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class UserBackendCallService {
  constructor(public myHttp: HttpClient) {}

  signUp(data) {
    return this.myHttp.post("http://localhost:8080/signup", data, {
      headers: { "Content-Type": "Application/Json" }
      // withCredentials: true
    });
  }
  signIn(data) {
    return this.myHttp.post("http://localhost:8080/signin", data, {
      headers: { "Content-Type": "Application/Json" },
      withCredentials: true
    });
  }
  signOut() {
    return this.myHttp.get("http://localhost:8080/signout", {
      headers: { "Content-Type": "Application/Json" },
      withCredentials: true
    });
  }
  getUserById(data) {
    return this.myHttp.post("http://localhost:8080/userbyid", data, {
      headers: {
        "Content-Type": "Application/Json"
      }
    });
  }
  getUserId() {
    return this.myHttp.get("http://localhost:8080/getuserid", {
      withCredentials: true
    });
  }

  userAuthentication() {
    return this.myHttp.get("http://localhost:8080/userauth", {
      withCredentials: true
    });
  }
}
