import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";

import { ModalType } from "../models/modal";

// SERVICES
import { ModalService } from "../services/modal.service";
import { UserService } from "../services/user.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {

  constructor(private modalService: ModalService, private userService: UserService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (!this.userService.user$.getValue() && route.queryParamMap.has("mode") && route.queryParamMap.get("mode") === "real") {
      const message = "you must be logged in to play for real";

      this.modalService.modal$.next({type: ModalType.Notice, message});

      return false;
    }

    return true;
  }
}
