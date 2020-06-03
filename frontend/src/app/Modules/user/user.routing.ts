import { UserComponent } from "./user.component";
import { SignInComponent } from "./pages/sign-in/sign-in.component";
import { SignUpComponent } from "./pages/sign-up/sign-up.component";
import { CartComponent } from "./pages/cart/cart.component";
import { MyAccountComponent } from "./pages/my-account/my-account.component";
import { UserErrorComponent } from "./pages/user-error/user-error.component";

export default [
  {
    path: "",
    component: UserComponent
  },
  {
    path: "signin",
    component: SignInComponent
  },
  {
    path: "signin/:prePath",
    component: SignInComponent
  },
  {
    path: "signup",
    component: SignUpComponent
  },
  {
    path: "cart/:id:",
    component: CartComponent
  },
  {
    path: "cart",
    component: CartComponent
  },
  {
    path: "myaccount",
    component: MyAccountComponent
  },
  {
    path: "error",
    component: UserErrorComponent
  },
  {
    path: "**",
    redirectTo: "error"
  }
];
