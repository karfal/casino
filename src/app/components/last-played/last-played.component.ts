import { Component, HostBinding } from "@angular/core";

// MODELS
import { Game } from "../../models/game";

// SERVICES
import { CasinoService } from "../../services/casino.service";

@Component({
  selector: "last-played",
  templateUrl: "./last-played.component.html",
  styleUrls: ["./last-played.component.scss"]
})
export class LastPlayedComponent {

  @HostBinding("class.hide")
  hide: boolean;

  games: Game[];

  constructor(private casinoService: CasinoService) {
    casinoService.getLastPlayed().then((res: Game[]) => this.games = res);
  }
}
