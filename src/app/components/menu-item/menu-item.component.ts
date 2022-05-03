import { Component, HostBinding, Input, OnDestroy } from "@angular/core";

import { Subscription } from "rxjs";

// MODELS
import { MenuItem } from "../../models/menu";

// SERVICES
import { MenuService } from "../../services/menu.service";

@Component({
  selector: "menu-item",
  templateUrl: "./menu-item.component.html",
  styleUrls: ["./menu-item.component.scss"]
})
export class MenuItemComponent implements OnDestroy {

  @HostBinding("class.toggled")
  toggled: boolean;

  @Input()
  menuItem: MenuItem[];

  private sub: Subscription;

  constructor(private menuService: MenuService) {
    this.sub = new Subscription();
    this.menuItem = [];

    this.sub.add(menuService.menuToggled$.subscribe((res: boolean) => this.toggled = res));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
