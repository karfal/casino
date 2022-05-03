import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

// GUARDS
import { AuthGuard } from "../guards/auth.guard";

// PAGES
import { CasinoPage } from "../pages/casino";
import { CasinoGamePage } from "../pages/casino/game";
import { CasinoGamesPage } from "../pages/casino/games";

// RESOLVERS
import { CasinoGameResolver } from "../resolvers/casino-game.resolver";
import { CasinoGamesResolver } from "../resolvers/casino-games.resolver";
import { MenuResolver } from "../resolvers/menu.resolver";

// MODULES
import { SharedModule } from "./shared.module";

const routes: Routes = [
  {
    path: "",
    component: CasinoPage,
    resolve: {games: CasinoGamesResolver, menu: MenuResolver},
    data: {section: "casino"},
    children: [
      {path: "", redirectTo: "games", pathMatch: "full"},
      {path: "games", component: CasinoGamesPage},
      {path: "game", component: CasinoGamePage, canActivate: [AuthGuard], resolve: {game: CasinoGameResolver}, runGuardsAndResolvers: "paramsOrQueryParamsChange"},
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    CasinoPage,
    CasinoGamesPage,
    CasinoGamePage
  ],
  providers: [
    CasinoGamesResolver,
    CasinoGameResolver,
    MenuResolver
  ],
  exports: [
    RouterModule,
  ]
})
export class CasinoModule {
}
