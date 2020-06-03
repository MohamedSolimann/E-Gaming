import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ContactUsComponent } from "./pages/contact-us/contact-us.component";
import { AboutUsComponent } from "./pages/about-us/about-us.component";
import { HomeComponent } from "./pages/home/home.component";
import { MainPagesErrorComponent } from "./pages/main-pages-error/main-pages-error.component";
import { RouterModule } from "@angular/router";
import mainPagesRouting from "./main-pages.routing";
import { MainDivisionModule } from "../main-division/main-division.module";
import { MainPagesComponent } from "./main-pages.component";
import { OurServiceComponent } from './pages/our-service/our-service.component';
@NgModule({
  declarations: [
    HomeComponent,
    ContactUsComponent,
    AboutUsComponent,
    MainPagesErrorComponent,
    MainPagesComponent,
    OurServiceComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(mainPagesRouting),
    MainDivisionModule
  ]
})
export class MainPagesModule {}
