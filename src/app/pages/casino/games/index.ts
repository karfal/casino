import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { debounceTime, filter, map, tap } from "rxjs/operators";

// MODELS
import { Game } from "../../../models/game";
import { Provider } from "../../../models/provider";

// SERVICES
import { CasinoService } from "../../../services/casino.service";

@Component({
  selector: "section.casino-games",
  templateUrl: "./casino-games.page.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CasinoGamesPage implements OnDestroy {

  formGroup: FormGroup;

  games: Game[];
  providers: Provider[];
  hasSelectedProviders: boolean;

  private sub: Subscription;

  constructor(private casinoService: CasinoService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private cdr: ChangeDetectorRef) {
    this.games = [];
    this.providers = [];

    this.sub = new Subscription();

    route.parent?.data.subscribe(res => this.games = res.games as Game[]);
    this.casinoService.getProviders().then((res: Provider[]) => this.providers = res);

    route.queryParamMap.pipe(filter(res => res.has("search"))).subscribe(res => {
      const search = res.get("search") || "";

      this.filterGamesByTerm(search);
    });

    route.queryParamMap.pipe(
      tap(res => {
        this.hasSelectedProviders = !!res.getAll("provider").length;

        if (!res.getAll("provider").length && !res.has("search")) {
          this.resetHiddenGames();
        }
      }),
      filter(res => !!res.getAll("provider").length)
    ).subscribe(res => {
      const providers = res.getAll("provider");

      this.filterGamesByProvider(providers);
    });

    this.formGroup = fb.group({
      search: [route.snapshot.queryParamMap.get("search") || "", Validators.compose([Validators.minLength(3)])]
    });

    this.sub.add(this.formGroup.get("search")?.valueChanges.pipe(
      /** keep this operator first */
      debounceTime(500),
      map(term => {
        if (!term.length) {
          this.resetHiddenGames();
          this.casinoService.getProviders().then((res: Provider[]) => this.providers = res);

          this.router.navigate([], {queryParams: {search: null}, queryParamsHandling: "merge"});
        }
        return term;
      }),
      filter(term => term?.length > 2),
    ).subscribe(search => {
      this.router.navigate([], {queryParams: {search}, queryParamsHandling: "merge"});
    }));
  }

  ngOnDestroy() {
    this.resetHiddenGames();
    this.sub.unsubscribe();
  }

  clearProviders() {
    if (!this.hasSelectedProviders) {
      return;
    }

    this.resetHiddenGames();
    this.casinoService.getProviders().then((res: Provider[]) => this.providers = res);

    this.router.navigate([], {queryParams: {provider: null}, queryParamsHandling: "merge"});
  }

  trackByFunction(index: number, game: Game) {
    return game.id;
  }

  activeGames() {
    return this.games.filter((g: Game) => !g.hide).length;
  }

  private filterGamesByTerm(term: string) {
    // show/hide games based on user search
    this.games.forEach((g: Game) => g.title.toLowerCase().includes(term) ? g.hide = false : g.hide = true);

    // update the provider list based on active games
    this.casinoService.getProviders().then((res: Provider[]) => {
      this.providers = res.filter(s => this.games.filter((g: Game) => !g.hide).map((g: Game) => g.providerName.toLowerCase()).includes(s.name));
    });

    this.cdr.markForCheck();
  }

  private filterGamesByProvider(provider: string[]) {
    this.games.forEach((g: Game) => provider.indexOf(g.providerName.toLowerCase()) !== -1 ? g.hide = false : g.hide = true);

    this.cdr.markForCheck();
  }

  private resetHiddenGames() {
    this.games.forEach((g: Game) => g.hide = false);

    this.cdr.markForCheck();
  }
}
