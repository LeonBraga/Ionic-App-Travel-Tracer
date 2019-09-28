import { Component, OnInit } from '@angular/core';
import { GruposService, Grupo } from 'src/app/api/grupos.service';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.page.html',
  styleUrls: ['./grupos.page.scss']
})
export class GruposPage implements OnInit {

  private grupos: Observable<Grupo[]>;
  private detalhesGrupo: Observable<Grupo>;
  private novoGrupo: Grupo = {
    nome: '',
    participantes: []
  };
  private novoGrupoNome: string;
  public grupoSelecionado;
  public participantes: any[];

  constructor(
    private grupoService: GruposService,
    public alertController: AlertController,
    private toastCtrl: ToastController,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.grupos = this.grupoService.getGrupos();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Novo grupo',
      inputs: [
        {
          name: 'nomeGrupo',
          type: 'text',
          placeholder: 'Nome do grupo'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'Salvar',
          handler: alertData => {
            console.log('Nome do novo grupo:', alertData.nomeGrupo);
            this.novoGrupo.nome = alertData.nomeGrupo;
            console.log('Var nvGrupo: ', this.novoGrupo);

            this.grupoService.addGrupo(this.novoGrupo).then(() => {
              this.router.navigateByUrl('/grupos');
              this.showToast('Criado Grupo, adicone participantes!');
            }, err => {
              this.showToast('Houve um problema adicionando o grupo :(');
            });
          }
        }
      ]
    });
    await alert.present();
  }

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }


  exibirDetalhes() {
    console.log('Grupo selecionado: ', this.grupoSelecionado);
    this.participantes = this.grupoSelecionado.participantes;
  }
}
