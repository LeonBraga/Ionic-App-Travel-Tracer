import { Component, OnInit } from "@angular/core";
import { GroupService } from "../../services/groups.service";
import { Observable } from "rxjs";
import { AlertController, ModalController } from "@ionic/angular";
import { ToastController } from "@ionic/angular";
import { Router, ActivatedRoute } from "@angular/router";
import { AddGastoModalPage } from "../add-gasto-modal/add-gasto-modal.page";
import { User } from '../../model/user'
import { UserService } from 'src/app/services/user.service';
import { StorageService } from 'src/app/services/storage.service';
import { Group } from 'src/app/model/group';
import { LocalUser } from 'src/app/model/localuser';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: "app-grupos",
  templateUrl: "./grupos.page.html",
  styleUrls: ["./grupos.page.scss"]
})
export class GruposPage implements OnInit {

  localUser: LocalUser = this.storageService.getLocalUser()

  groups: Group[]
  participants: User[]
  data: Object

  constructor(
    private groupService: GroupService,
    private userService: UserService,
    private authService: AuthService,
    private storageService: StorageService,
    public alertController: AlertController,
    private toastCtrl: ToastController,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public modalCtrl: ModalController
  ) {
    
   }






  ngOnInit() {
    this.userService.getUserByEmail(this.localUser.email).subscribe(
      response => {
        this.groups = response['groups'];
        
      }
    )
    
  }


  ionViewDidLeave() {
    console.log("desconectou o cara")
    this.logout()
  }


  // async presentAlert() {
  //   const alert = await this.alertController.create({
  //     header: "Novo grupo",
  //     inputs: [
  //       {
  //         name: "nomeGrupo",
  //         type: "text",
  //         placeholder: "Nome do grupo"
  //       }
  //     ],
  //     buttons: [
  //       {
  //         text: "Cancel",
  //         role: "cancel",
  //         cssClass: "secondary",
  //         handler: () => {
  //           console.log("Confirm Cancel");
  //         }
  //       },
  //       {
  //         text: "Salvar",
  //         handler: alertData => {
  //           console.log("Nome do novo grupo:", alertData.nomeGrupo);
  //           this.novoGrupoNome.nome = alertData.nomeGrupo;
  //           console.log("Var nvGrupo: ", this.novoGrupoNome);

  //           this.grupoService.addGrupo(this.novoGrupoNome).then(
  //             () => {
  //               this.router.navigateByUrl("/grupos");
  //               this.showToast(
  //                 'Criado Grupo, selecione em "Meus Grupos" e adicione participantes!'
  //               );
  //             },
  //             err => {
  //               this.showToast("Houve um problema adicionando o grupo :(");
  //             }
  //           );
  //         }
  //       }
  //     ]
  //   });
  //   await alert.present();
  // }

  // showToast(msg) {
  //   this.toastCtrl
  //     .create({
  //       message: msg,
  //       duration: 2000
  //     })
  //     .then(toast => toast.present());
  // }

  exibirDetalhes(groupId) {
    this.groupService.getGroup(groupId).subscribe(
      response => {
        this.participants = response["users"]
        console.log(this.participants)
      })
  }

  // initializeSearch(){
  //   this.resultadosFiltrados = this.resultados;
  // }

  // search($event) {
  //   this.initializeSearch();

  //   if (!this.searchterm || this.searchterm.trim() === '') {
  //     this.resultadosFiltrados = null;
  //     return;
  //   }


  //   this.resultadosFiltrados = this.todosUsuarios.filter(usuarioFiltrado => {
  //     if (usuarioFiltrado.email && this.searchterm) {
  //       if (
  //         usuarioFiltrado.name
  //           .toLowerCase()
  //           .indexOf(this.searchterm.toLowerCase()) > -1
  //       ) {
  //         return true;
  //       }
  //       return false;
  //     }
  //   });
  // }

  cadastrarEmGrupo(grupo, novoUsuario) {
    console.log(novoUsuario);
    // this.participantes.push(novoUsuario);
    // this.grupoService.updateGrupo(grupo, this.participantes);
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['/login'], {
      replaceUrl: true
    })
  }

  // async gastoAdd(usuario) {
  //   // console.log("participante recebido em gastoADD: ", usuario);
  //   const modal = await this.modalCtrl.create({
  //     component: AddGastoModalPage,
  //     componentProps: {
  //       group: this.participantes,
  //       register: usuario,
  //       groupName: this.grupoSelecionado.nome
  //     }
  //   });
  //   await modal.present();
  //   modal.onDidDismiss().then(res => alert(JSON.stringify(res)));
  // }
}
