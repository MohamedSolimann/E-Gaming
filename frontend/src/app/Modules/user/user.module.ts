import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SignInComponent } from "./pages/sign-in/sign-in.component";
import { SignUpComponent } from "./pages/sign-up/sign-up.component";
import { MyAccountComponent } from "./pages/my-account/my-account.component";
import { CartComponent } from "./pages/cart/cart.component";
import { UserErrorComponent } from "./pages/user-error/user-error.component";
import { RouterModule } from "@angular/router";
import userRouting from "./user.routing";
import { MainDivisionModule } from "../main-division/main-division.module";
import { UserComponent } from "./user.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    MyAccountComponent,
    CartComponent,
    UserErrorComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(userRouting),
    MainDivisionModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserModule {}
