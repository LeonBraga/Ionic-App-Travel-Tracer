import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-gasto-modal',
  templateUrl: './add-gasto-modal.page.html',
  styleUrls: ['./add-gasto-modal.page.scss']
})
export class AddGastoModalPage implements OnInit {

  // @Input() data: any;

  public dadosRecebido: any;

  constructor(private navParams: NavParams, private modalCtrl: ModalController) {
    this.dadosRecebido = navParams.get('data');
    console.log('data recebido pelo modal: ', this.dadosRecebido);

  }

  async fechar() {
    await this.modalCtrl.dismiss({ retornoDoModal: "Exemplo de retorno" });
  }

  ngOnInit() {}
}
