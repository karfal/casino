import { Component, Input } from "@angular/core";

// MODELS
import { Game } from "../../models/game";

@Component({
  selector: "casino-game",
  templateUrl: "./casino-game.component.html",
  styleUrls: ["./casino-game.component.scss"]
})
export class CasinoGameComponent {

  @Input()
  game: Game | undefined;

  constructor() {
    this.game = undefined;
  }
}
