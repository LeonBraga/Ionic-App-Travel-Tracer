import { Component, OnInit } from "@angular/core";
import { GroupService } from "../../services/groups.service";
import { Observable } from "rxjs";
import { AlertController, ModalController, NavController } from "@ionic/angular";
import { ToastController } from "@ionic/angular";
import { Router, ActivatedRoute } from "@angular/router";
import { AddGastoModalPage } from "../add-gasto-modal/add-gasto-modal.page";
import { User } from '../../model/user'
import { UserService } from 'src/app/services/user.service';
import { StorageService } from 'src/app/services/storage.service';
import { Group } from 'src/app/model/group';
import { LocalUser } from 'src/app/model/localuser';
import { AuthService } from 'src/app/services/auth.service';
import { map } from 'rxjs/operators';
import { GroupDTO } from 'src/app/model/group.dto';


@Component({
  selector: "app-grupos",
  templateUrl: "./grupos.page.html",
  styleUrls: ["./grupos.page.scss"]
})
export class GruposPage implements OnInit {

  localUser: LocalUser = this.storageService.getLocalUser()

  groups: Group[]
  participants: User[]
  allUsers: Observable<User[]>
  data: Object

  groupDTO: GroupDTO = {
    userId: 0,
    group: {
      name: ""
    }
  }

  constructor(
    private groupService: GroupService,
    private userService: UserService,
    private authService: AuthService,
    private storageService: StorageService,
    public alertController: AlertController,
    private toastCtrl: ToastController,
    private router: Router,
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    public modalCtrl: ModalController
  ) {

  }



  ngOnInit() {
    this.reloadDataUser();
  }

  private reloadDataUser() {
    this.userService.getUserByEmail(this.localUser.email).subscribe(
      response => {
        this.groupDTO.userId = response['id']
        this.groups = response['groups'];
      }
    )
  }


  ionViewDidLeave() {
    this.logout()
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
            this.groupDTO.group.name = alertData.nomeGrupo
            this.groupService.createGroup(this.groupDTO).subscribe(
              () => {
                this.reloadDataUser();
                this.router.navigateByUrl("/grupos");
                this.showToast(
                  'Criado Grupo, selecione em "Meus Grupos" e adicione participantes!'
                );
              },
              error => this.showToast("Houve um problema adicionando o grupo" + error)
            )
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

  showGroupDetails(groupId) {
    this.reloadDataGroup(groupId);
  }

  private reloadDataGroup(groupId) {
    this.groupService.getGroup(groupId).subscribe(
      response => {
        this.participants = response["users"]
      })
  }

  initializeSearch() {
    let partipantsIds = this.participants.map(participant => participant.id);
    this.allUsers = this.userService.getAllUsers().pipe(map((users: User[]) => users.filter(user => !partipantsIds.includes(user.id))))

  }

  search($event) {
    this.initializeSearch()
  }

  addUserInGroup(groupId, newUserId) {
    this.groupService.addUser(groupId, newUserId).subscribe(
      response => {
        this.reloadDataGroup(groupId);
      },
      error => console.log(error)
    )
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['/login'], {
      replaceUrl: true
    })
  }

  async gastoAdd(user: User, group: Group) {
    const modal = await this.modalCtrl.create({
      component: AddGastoModalPage,
      componentProps: {
        participants: this.participants,
        register: user,
        groupName: group.name,
        groupId: group.id
      }
    });

    modal.onDidDismiss()
      .then((data) => {
        console.log(data)
    })
       
    await modal.present();
  }


 async goToExtract(groupId) {
    await this.navCtrl.navigateForward('grupos/extract',{
      queryParams: {groupId: groupId}
    })
  }
}
