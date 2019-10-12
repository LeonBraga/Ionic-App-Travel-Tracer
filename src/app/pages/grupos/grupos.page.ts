import { LoginService, User } from "src/app/services/login.service";
import { Component, OnInit } from "@angular/core";
import { GruposService, Grupo } from "src/app/api/grupos.service";
import { Observable, Subject } from "rxjs";
import { AlertController } from "@ionic/angular";
import { ToastController } from "@ionic/angular";
import { Router, ActivatedRoute } from "@angular/router";

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
    private activatedRoute: ActivatedRoute
  ) {}

  private usuarios: Observable<User[]>;
  private grupos: Observable<Grupo[]>;
  private detalhesGrupo: Observable<Grupo>;
  private novoGrupo: Grupo;
  private novoGrupoNome: string;
  public grupoSelecionado;
  public participantes: any[];

  todosUsuarios;
  searchterm: string;
  resultados;

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
            this.novoGrupo.nome = alertData.nomeGrupo;
            console.log("Var nvGrupo: ", this.novoGrupo);

            this.grupoService.addGrupo(this.novoGrupo).then(
              () => {
                this.router.navigateByUrl("/grupos");
                this.showToast("Criado Grupo, adicone participantes!");
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
    console.log("retorno resultados", this.resultados);
    this.participantes = this.grupoSelecionado.participantes;
  }

  search($event) {
    this.resultados = this.todosUsuarios.filter(
      user =>
        user.login.toLowerCase().indexOf(this.searchterm.toLowerCase()) !== -1
    );
  }

  cadastrarEmGrupo(grupo, novoUsuario) {
    delete novoUsuario.senha;
    this.participantes.push(novoUsuario);

    this.grupoService.updateGrupo(grupo, this.participantes);
  }
}
