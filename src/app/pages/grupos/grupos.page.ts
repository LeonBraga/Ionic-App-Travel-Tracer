import { LoginService, User } from "src/app/services/login.service";
import { Component, OnInit } from "@angular/core";
import { GruposService, Grupo } from "src/app/api/grupos.service";
import { Observable } from "rxjs";
import { AlertController, ModalController } from "@ionic/angular";
import { ToastController } from "@ionic/angular";
import { Router, ActivatedRoute } from "@angular/router";
import { AddGastoModalPage } from "../add-gasto-modal/add-gasto-modal.page";

@Component({
  selector: "app-grupos",
  templateUrl: "./grupos.page.html",
  styleUrls: ["./grupos.page.scss"]
})
export class GruposPage implements OnInit {
  constructor(
    private grupoService: GruposService,
    private loginService: LoginService,
    public alertController: AlertController,
    private toastCtrl: ToastController,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public modalCtrl: ModalController
  ) {}

  private usuarios: Observable<User[]>;
  private detalhesGrupo: Observable<Grupo>;
  private novoGrupo: Grupo;
  private novoGrupoNome: Grupo = {
    nome: "",
    participantes: [{ id: "" }]
  };
  public grupoSelecionado;
  public participantes: any[];

  grupos: Observable<Grupo[]>;
  todosUsuarios;
  searchterm: string;
  resultados;
  resultadosFiltrados;

  ngOnInit() {
    this.grupos = this.grupoService.getGrupos();
    this.loginService.getUsers().subscribe(users => {
      this.resultados = this.todosUsuarios = users;
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: "Novo grupo",
      inputs: [
        {
          name: "nomeGrupo",
          type: "text",
          placeholder: "Nome do grupo"
        }
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
          }
        },
        {
          text: "Salvar",
          handler: alertData => {
            console.log("Nome do novo grupo:", alertData.nomeGrupo);
            this.novoGrupoNome.nome = alertData.nomeGrupo;
            console.log("Var nvGrupo: ", this.novoGrupoNome);

            this.grupoService.addGrupo(this.novoGrupoNome).then(
              () => {
                this.router.navigateByUrl("/grupos");
                this.showToast(
                  'Criado Grupo, selecione em "Meus Grupos" e adicione participantes!'
                );
              },
              err => {
                this.showToast("Houve um problema adicionando o grupo :(");
              }
            );
          }
        }
      ]
    });
    await alert.present();
  }

  showToast(msg) {
    this.toastCtrl
      .create({
        message: msg,
        duration: 2000
      })
      .then(toast => toast.present());
  }

  exibirDetalhes() {
    this.participantes = this.grupoSelecionado.participantes;
    console.log(this.participantes);
  }

  initializeSearch(){
    this.resultadosFiltrados = this.resultados;
  }

  search($event) {
    this.initializeSearch();

    if (!this.searchterm || this.searchterm.trim() === '') {
      this.resultadosFiltrados = null;
      return;
    }


    this.resultadosFiltrados = this.todosUsuarios.filter(usuarioFiltrado => {
      if (usuarioFiltrado.email && this.searchterm) {
        if (
          usuarioFiltrado.name
            .toLowerCase()
            .indexOf(this.searchterm.toLowerCase()) > -1
        ) {
          return true;
        }
        return false;
      }
    });
  }

  cadastrarEmGrupo(grupo, novoUsuario) {
    console.log(novoUsuario);
    this.participantes.push(novoUsuario);
    this.grupoService.updateGrupo(grupo, this.participantes);
  }

  async gastoAdd(usuario) {
    console.log("participante recebido em gastoADD: ", usuario);

    const modal = await this.modalCtrl.create({
      component: AddGastoModalPage,
      componentProps: {
        data: "Exemplo de entrada"
      }
    });
    await modal.present();
    modal.onDidDismiss().then(res => alert(JSON.stringify(res)));
  }
}
