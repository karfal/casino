import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { filter } from "rxjs/operators";

// MODELS
import { Menu } from "./models/menu";
import { User } from "./models/user";

// SERVICES
import { MenuService } from "./services/menu.service";
import { ModalService } from "./services/modal.service";
import { UserService } from "./services/user.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent {

  mainMenu: Menu[];
  user: User | null;

  constructor(private route: ActivatedRoute, private menuService: MenuService, private userService: UserService, private modalService: ModalService) {
    route.fragment.pipe(filter(f => !!f)).subscribe(res => modalService.loadModal(res || ""));

    menuService.getMainMenu().then((res: Menu[]) => this.mainMenu = res);

    userService.getUser().subscribe((res: User | null) => this.user = res || null);
  }

  logOut() {
    this.userService.user$.next(null);
  }
}
