import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IdeaService, Idea } from 'src/app/services/idea.service';
import { ToastController } from '@ionic/angular';
 
@Component({
  selector: 'app-idea-details',
  templateUrl: './idea-details.page.html',
  styleUrls: ['./idea-details.page.scss'],
})
export class IdeaDetailsPage implements OnInit {
 
  idea: Idea = {
    name: '',
    notes: ''
  };
 
  constructor(private activatedRoute: ActivatedRoute, private ideaService: IdeaService,
    private toastCtrl: ToastController, private router: Router) { }
 
  ngOnInit() { }
 
  ionViewWillEnter() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.ideaService.getIdea(id).subscribe(idea => {
        this.idea = idea;
      });
    }
  }
 
  addIdea() {
    this.ideaService.addIdea(this.idea).then(() => {
      this.router.navigateByUrl('/');
      this.showToast('Idea added');
    }, err => {
      this.showToast('There was a problem adding your idea :(');
    });
  }
 
  deleteIdea() {
    this.ideaService.deleteIdea(this.idea.id).then(() => {
      this.router.navigateByUrl('/');
      this.showToast('Idea deleted');
    }, err => {
      this.showToast('There was a problem deleting your idea :(');
    });
  }
 
  updateIdea() {
    this.ideaService.updateIdea(this.idea).then(() => {
      this.showToast('Idea updated');
    }, err => {
      this.showToast('There was a problem updating your idea :(');
    });
  }
 
  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }
}