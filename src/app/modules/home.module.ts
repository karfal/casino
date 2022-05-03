import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// PAGES
import { HomePage } from "../pages/home";

// RESOLVERS
import { CasinoGamesResolver } from "../resolvers/casino-games.resolver";

// MODULES
import { SharedModule } from "./shared.module";

const routes: Routes = [
	{path: "", component: HomePage, resolve: {casinoGames: CasinoGamesResolver}}
];

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		HomePage
	],
	providers: [
		CasinoGamesResolver
	],
	exports: [
		RouterModule
	]
})
export class HomeModule {
}
