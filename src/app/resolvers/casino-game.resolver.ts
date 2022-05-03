import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";

// MODELS
import { Game } from "../models/game";

// SERVICES
import { CasinoService } from "../services/casino.service";

@Injectable()
export class CasinoGameResolver implements Resolve<Game | null> {

  constructor(private casinoService: CasinoService) {
  }

  resolve(route: ActivatedRouteSnapshot): Promise<Game | null> {
    return this.casinoService.getGame(route.queryParams.id).catch(() => Promise.resolve(null));
  }
}
