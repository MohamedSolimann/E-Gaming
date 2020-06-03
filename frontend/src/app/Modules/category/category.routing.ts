import { CategoryPageComponent } from "./pages/category-page/category-page.component";
import { CategoryErrorComponent } from "./pages/category-error/category-error.component";
import { ProdcutPageComponent } from "./pages/prodcut-page/prodcut-page.component";

export default [
  { path: "", component: CategoryPageComponent },
  { path: "categories", component: CategoryPageComponent },
  { path: "productpage/:category_id", component: ProdcutPageComponent },
  { path: "error", component: CategoryErrorComponent },
  { path: "**", redirectTo: "CategoryPageComponent" }
];
