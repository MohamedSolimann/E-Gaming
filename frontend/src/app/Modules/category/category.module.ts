import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CategoryErrorComponent } from "./pages/category-error/category-error.component";
import { CategoryPageComponent } from "./pages/category-page/category-page.component";
import { CategoryComponent } from "./category.component";
import categoryRouting from "./category.routing";
import { RouterModule } from "@angular/router";
import { MainDivisionModule } from "../main-division/main-division.module";
import { ProdcutPageComponent } from "./pages/prodcut-page/prodcut-page.component";

@NgModule({
  declarations: [
    CategoryComponent,
    CategoryErrorComponent,
    CategoryPageComponent,
    ProdcutPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(categoryRouting),
    MainDivisionModule
  ]
})
export class CategoryModule {}
