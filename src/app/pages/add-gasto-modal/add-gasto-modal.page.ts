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
  public participantsArray: boolean[] = [];
  public mediumCost = 0;
  public result;

  sharedValue;

  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController
  ) {
    this.groupReceived = navParams.get("group");
    this.userReceived = navParams.get("register");
    console.log(this.groupReceived);
  }

  async fechar() {
    await this.modalCtrl.dismiss({ retornoDoModal: "Exemplo de retorno" });
  }

  shareCost(event) {
    this.calculateShares();
  }

  shareParticipants(event) {
    console.log(event.detail);
    this.participantsArray[event.detail.value] = !this.participantsArray[
      event.detail.value
    ];
    this.calculateShares();
  }

  calculateShares() {
    for (let index = 0; index < this.participantsArray.length; index++) {
      if (this.participantsArray[index] === true) {
        this.result++;
      }
    }

    this.mediumCost = this.sharedValue / this.result;
    if (isFinite(this.mediumCost)) {
      this.mediumCost = Number(this.mediumCost.toFixed(2));
    } else {
      this.mediumCost = 0;
    }

    this.result = 0;
  }

  ngOnInit() {
    for (const iterator of this.groupReceived) {
      this.participantsArray.push(true);
    }
  }
}
