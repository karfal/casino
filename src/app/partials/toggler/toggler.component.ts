import { Component, HostBinding } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";

import { filter } from "rxjs/operators";

// SERVICES
import { MenuService } from "../../services/menu.service";

@Component({
  selector: "toggler",
  template: `<span (click)="toggleMenu()">&#9776;</span>`,
  styleUrls: ["./toggler.component.scss"]
})
export class TogglerComponent {

  @HostBinding("class.show")
  show: boolean;

  constructor(private menuService: MenuService, private router: Router) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(navigationEvent => {
      const ev = navigationEvent as NavigationEnd;

      this.show = ev.url.includes("casino");
    });
  }

  toggleMenu() {
    this.menuService.menuToggled$.next(!this.menuService.menuToggled$.getValue());
  }
}
