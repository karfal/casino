export enum ModalType {
  Notice,
  Register
}

export interface Modal {
  type: ModalType;
  message?: string;
}
