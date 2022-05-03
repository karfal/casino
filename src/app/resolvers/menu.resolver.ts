import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";

// MODELS
import { MenuItem } from "../models/menu";

// SERVICES
import { MenuService } from "../services/menu.service";

@Injectable()
export class MenuResolver implements Resolve<MenuItem[] | []> {

  constructor(private menuService: MenuService) {
  }

  resolve(route: ActivatedRouteSnapshot): Promise<MenuItem[] | []> {
    return this.menuService.getMenu(route.data.section).catch(() => Promise.resolve([]));
  }
}
