import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, first, map, take, tap } from "rxjs/operators";

// MODELS
import { Game } from "../models/game";
import { ModalType } from "../models/modal";
import { Provider } from "../models/provider";

// SERVICES
import { ModalService } from "./modal.service";

@Injectable({
  providedIn: "root"
})
export class CasinoService {

  games$: BehaviorSubject<Game[]>;

  private readonly url = "assets/game.mock-data.json";

  constructor(private http: HttpClient, private modalService: ModalService) {
    this.games$ = new BehaviorSubject<Game[]>([]);
  }

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.url).pipe(
      tap((res: Game[]) => this.games$.next(res)),
      catchError((e: HttpErrorResponse) => {
        this.modalService.modal$.next({type: ModalType.Notice, message: "Error finding games"});
        return throwError(e);
      })
    );
  }

  getGame(id: string): Promise<Game | null> {
    return this.games$.pipe(
      first(),
      map((res: Game[]) => {
        const game = res.find(g => g.id === id);

        if (game) {
          return game;
        }

        this.modalService.modal$.next({type: ModalType.Notice, message: "Game does not exist"});

        return null;
      }),
      catchError((e: HttpErrorResponse) => {
        this.modalService.modal$.next({type: ModalType.Notice, message: "Error finding game"});
        return throwError(e);
      })
    ).toPromise();
  }

  getProviders(): Promise<Provider[]> {
    // from the games we can get the providers list
    return this.games$.pipe(
      take(1),
      map((res: Game[]) => {
        const providers = res.map((g: Game) => g.providerName.toLowerCase())
          .filter((provider, i, arr) => arr.indexOf(provider) === i)
          .sort((a, b) => a.localeCompare(b));

        // from array of strings, convert to array of provider objects
        return providers.map(name => ({name}));
      })
    ).toPromise();
  }

  getLastPlayed(): Promise<Game[]> {
    if (localStorage.hasOwnProperty("lastPlayed")) {
      const lastPlayed = JSON.parse(localStorage.getItem("lastPlayed") || "");

      return this.games$.pipe(
        take(1),
        map((res: Game[]) => {
          const list = res.filter((g: Game) => lastPlayed.includes(g.id))
            .sort((a, b) => lastPlayed.indexOf(a.id) - lastPlayed.indexOf(b.id));

          return list
        })
      ).toPromise();
    }

    return Promise.resolve([]);
  }

  lastPlayed(id: string) {
    if (!localStorage.hasOwnProperty("lastPlayed")) {
      localStorage.setItem("lastPlayed", JSON.stringify([]));
    }

    const local = JSON.parse(localStorage.getItem("lastPlayed") || "").splice(0, 4);

    if (local.indexOf(id) === -1) {
      local.unshift(id);
      localStorage.setItem("lastPlayed", JSON.stringify(local));
    }
  }
}
