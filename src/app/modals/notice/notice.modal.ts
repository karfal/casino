import { Component, HostBinding } from "@angular/core";
import { filter } from "rxjs/operators";

// MODELS
import { Modal, ModalType } from "../../models/modal";

// SERVICES
import { ModalService } from "../../services/modal.service";

@Component({
  selector: "notice-modal",
  templateUrl: "./notice.modal.html",
  styleUrls: ["./notice.modal.scss", "../modal.scss"]
})
export class NoticeModal {

  @HostBinding("class.toggled")
  toggled: boolean;

  text: string;

  constructor(private modalService: ModalService) {
    this.toggled = false;
    this.text = "";

    modalService.modal$.pipe(
      filter(res => res?.type === ModalType.Notice)
    ).subscribe((res: Modal | null) => {
      this.text = res?.message || "";
      this.toggled = true;
    });
  }

  close() {
    this.toggled = false;
  }
}
