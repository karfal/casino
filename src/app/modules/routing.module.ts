import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// PAGES
import { ErrorPage } from "../pages/error";

const routes: Routes = [
	{path: "", redirectTo: "home", pathMatch: "full"},
	{path: "home", loadChildren: () => import("./home.module").then(m => m.HomeModule)},
	{path: "casino", loadChildren: () => import("./casino.module").then(m => m.CasinoModule)},
	{path: "error", component: ErrorPage},
	{path: "**", redirectTo: "home"}
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {enableTracing: false, scrollPositionRestoration: "top", initialNavigation: "enabled", relativeLinkResolution: "legacy"})],
	exports: [RouterModule]
})
export class RoutingModule {
}
