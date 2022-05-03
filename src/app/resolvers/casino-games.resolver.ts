import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";

import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";

// MODELS
import { Game } from "../models/game";

// SERVICES
import { CasinoService } from "../services/casino.service";

@Injectable()
export class CasinoGamesResolver implements Resolve<Game[]> {

  constructor(private casinoService: CasinoService) {
  }

  resolve(): Observable<Game[]> {
    if (this.casinoService.games$.value.length) {
      return of(this.casinoService.games$.value);
    }

    return this.casinoService.getGames().pipe(catchError(() => of([])));
  }
}
