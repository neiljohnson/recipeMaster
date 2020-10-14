export class ConfirmDialogModel {
  constructor(
    public title: string,
    public message: string,
    public confirmText: string,
    public dismissText?: string,
    public showTimer?: boolean) {
  }
}
