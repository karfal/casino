import { Component, HostBinding } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { filter } from "rxjs/operators";

// MODELS
import { ModalType } from "../../models/modal";
import { User } from "../../models/user";

// SERVICES
import { ModalService } from "../../services/modal.service";
import { UserService } from "../../services/user.service";

@Component({
  selector: "register-modal",
  templateUrl: "./register.modal.html",
  styleUrls: ["./register.modal.scss", "../modal.scss"]
})
export class RegisterModal {

  @HostBinding("class.toggled")
  toggled: boolean;

  step: string;
  formRegister: FormGroup;

  constructor(private modalService: ModalService, private fb: FormBuilder, private userService: UserService) {
    this.toggled = false;

    modalService.modal$.pipe(
      filter(res => res?.type === ModalType.Register)
    ).subscribe(() => {
      this.step = "personal";
      this.toggled = true;
    });

    this.formRegister = fb.group({
      personal: fb.group({
        username: ["", Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])],
        name: ["", Validators.compose([Validators.required, Validators.minLength(2), Validators.pattern(/^[a-z\/']+(([' ][a-z ])?[a-z]*)*$/i)])],
        surname: ["", Validators.compose([Validators.required, Validators.minLength(2), Validators.pattern(/^[a-z\/']+(([' ][a-z ])?[a-z]*)*$/i)])],
        gender: ["select", Validators.compose([Validators.required])],
        birthday: ["", Validators.compose([Validators.required])]
      })
    });
  }

  close() {
    this.toggled = false;
  }

  navigate(step: string) {
    this.step = step;
  }

  register() {
    const user = {...this.formRegister.get("personal")?.value} as User;
    this.userService.user$.next(user);

    this.close();
  }
}
