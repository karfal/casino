import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { Modal, ModalType } from "../models/modal";

@Injectable()
export class ModalService {

  modal$: BehaviorSubject<Modal | null>;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.modal$ = new BehaviorSubject<Modal | null>(null);
  }

  loadModal(frag: string) {
    switch (frag) {
      case "register":
        this.modal$.next({type: ModalType.Register});
        break;
    }

    this.router.navigate([], {fragment: undefined});
  }
}
