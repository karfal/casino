import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

// MODELS
import { Game } from "../../models/game";

// SERVICES
import { CasinoService } from "../../services/casino.service";

@Component({
	selector: "section.home",
	templateUrl: "./home.page.html"
})
export class HomePage {

	games: string[];
	trending: Game[];

	constructor(private casinoService: CasinoService, private route: ActivatedRoute) {
		this.games = [];
		this.trending = [];

		route.data.subscribe(res => {
			this.games = res.casinoGames.filter((g: Game) => g.tag === "hot").map((g: Game) => g.title) as string[];
			this.trending = res.casinoGames.filter((g: Game) => g.tag === "trending") as Game[];
		});
	}
}
