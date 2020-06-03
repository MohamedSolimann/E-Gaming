export default [
  {
    path: "user",
    loadChildren: () =>
      import("./Modules/user/user.module").then(m => m.UserModule)
  },
  {
    path: "category",
    loadChildren: () =>
      import("./Modules/category/category.module").then(m => m.CategoryModule)
  },
  {
    path: "",
    loadChildren: () =>
      import("./Modules/main-pages/main-pages.module").then(
        m => m.MainPagesModule
      )
  }
];
