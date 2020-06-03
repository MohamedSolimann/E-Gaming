import { HomeComponent } from "./pages/home/home.component";
import { ContactUsComponent } from "./pages/contact-us/contact-us.component";
import { AboutUsComponent } from "./pages/about-us/about-us.component";
import { MainPagesErrorComponent } from "./pages/main-pages-error/main-pages-error.component";
import { OurServiceComponent } from "./pages/our-service/our-service.component";

export default [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "contactus",
    component: ContactUsComponent
  },
  {
    path: "ourservice",
    component: OurServiceComponent
  },
  {
    path: "aboutus",
    component: AboutUsComponent
  },
  {
    path: "error",
    component: MainPagesErrorComponent
  },
  {
    path: "**",
    redirectTo: "error"
  }
];
