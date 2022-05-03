import { Component, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { Subscription } from "rxjs";
import { filter } from "rxjs/operators";

// MODELS
import { Game } from "../../../models/game";
import { User } from "../../../models/user";

// SERVICES
import { CasinoService } from "../../../services/casino.service";
import { UserService } from "../../../services/user.service";

@Component({
  selector: "section.casino-game",
  templateUrl: "./casino-game.page.html"
})
export class CasinoGamePage implements OnDestroy {

  game: Game;
  isReal: boolean;

  private sub: Subscription = new Subscription();

  constructor(private casinoService: CasinoService, private route: ActivatedRoute, private router: Router, private userService: UserService) {
    route.data.subscribe(res => this.game = res.game);
    this.isReal = userService.user$.getValue() && route.snapshot.queryParamMap.get("mode") === "real" || false;

    this.sub = this.userService.user$.pipe(
      filter((res: User | null) => !res && this.isReal)
    ).subscribe(() => {
      this.router.navigate(["/casino"]);
    });
  }

  played(id: string) {
    this.casinoService.lastPlayed(id);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
