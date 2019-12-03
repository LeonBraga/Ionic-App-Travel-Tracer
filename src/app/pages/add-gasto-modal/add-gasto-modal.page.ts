import { Component, OnInit, Input } from "@angular/core";
import { NavParams, ModalController } from "@ionic/angular";
import { User } from 'src/app/model/user';
import { SpendDTO } from 'src/app/model/spend.dto';
import { GroupService } from 'src/app/services/groups.service';

@Component({
  selector: "app-add-gasto-modal",
  templateUrl: "./add-gasto-modal.page.html",
  styleUrls: ["./add-gasto-modal.page.scss"]
})
export class AddGastoModalPage implements OnInit {

  groupParticipants: User[];
  userReceived: User;
  groupName: string;
  groupId: number
  spendDTO: SpendDTO = {
    name: "",
    price: 0,
    usersPayers: [],
    usersReceivers: [],
  }

  checkItens: User[]
  usersReceiversId: number
  participantsArray: boolean[] = [];
  mediumCost = 0;
  result;

  sharedValue;

  constructor(
    private navParams: NavParams,
    private groupService: GroupService,
    private modalCtrl: ModalController
  ) {
    this.groupParticipants = navParams.get("participants")
    this.userReceived = navParams.get("register");
    this.groupName = navParams.get("groupName");
    this.groupId = navParams.get("groupId")

  }


  shareCost(event) {
    this.calculateShares();
  }

  private getCheckedValues() {
    this.checkItens = this.groupParticipants.filter(value => {
      return value.isChecked;
    });
  }

  shareParticipants(event) {
    this.participantsArray[event.detail.value] = !this.participantsArray[event.detail.value];
    this.calculateShares();
  }

  async addSpend() {
    this.getCheckedValues()
    this.spendDTO.price = this.sharedValue
    this.spendDTO.usersPayers.push(this.userReceived.id)
    this.checkItens.forEach(user => {
      console.log(this.checkItens)
      this.spendDTO.usersReceivers.push(user.id)
    })

    console.log(this.spendDTO)
    this.groupService.addSpend(this.groupId, this.spendDTO)
      .subscribe(
        response => {
          this.checkItens = []

        },
        error => console.log(error)
      )

    await this.modalCtrl.dismiss();
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
    for (const iterator of this.groupParticipants) {
      this.participantsArray.push(true);
    }
  }
}
