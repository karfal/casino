import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

// MODELS
import { MenuItem } from "../../models/menu";

@Component({
  selector: "section.casino",
  templateUrl: "./casino.page.html"
})
export class CasinoPage {

  menuItem: MenuItem[];

  constructor(private route: ActivatedRoute) {
    this.menuItem = route.snapshot.data.menu;
  }
}
