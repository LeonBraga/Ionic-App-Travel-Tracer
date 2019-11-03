import { Component, OnInit, Input } from "@angular/core";
import { NavParams, ModalController } from "@ionic/angular";

@Component({
  selector: "app-add-gasto-modal",
  templateUrl: "./add-gasto-modal.page.html",
  styleUrls: ["./add-gasto-modal.page.scss"]
})
export class AddGastoModalPage implements OnInit {
  // @Input() data: any;

  public groupReceived: any;
  public userReceived: any;

  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController
  ) {
    this.groupReceived = navParams.get("group");
    this.userReceived = navParams.get("register");
    console.log("group recebido pelo modal: ", this.groupReceived);
    console.log("user recebido pelo modal: ", this.userReceived);
  }

  async fechar() {
    await this.modalCtrl.dismiss({ retornoDoModal: "Exemplo de retorno" });
  }

  ngOnInit() {
    this.groupReceived.forEach(element => {
      element.isChecked = false;
    });
  }
}
