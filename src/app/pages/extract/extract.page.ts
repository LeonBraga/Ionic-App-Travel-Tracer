import { Component, OnInit } from '@angular/core';
import { Payment } from 'src/app/model/payment';
import { UserService } from 'src/app/services/user.service';
import { StorageService } from 'src/app/services/storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Group } from 'src/app/model/group';
import { ActivitySpend } from 'src/app/model/activity-spend';

@Component({
  selector: 'app-extract',
  templateUrl: './extract.page.html',
  styleUrls: ['./extract.page.scss'],
})
export class ExtractPage implements OnInit {

  paymentsToReceive: Payment[]
  paymentsPaid: Payment[]
  paymentsOwing: Payment[]
  userGroups: Group[]
  activitySpends: ActivitySpend[]
  tripTotalValue: number
  userTripTotalSpend: number
  tripName: string
  activitySpendName: string
  email: string

  groupId: any

  constructor(
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute,
    private storageService: StorageService) {
     

     }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.groupId = params   
      }
    });



    this.email = this.storageService.getLocalUser().email
    console.log(this.email)
    this.userService.getUserByEmail(this.email).subscribe(
      response => {

        


        this.activitySpendName = response['name']
        this.userGroups = response['groups']



        this.userGroups.forEach(group => {
            this.activitySpends = group['activitySpends']
            console.log(this.activitySpends)
        })

        console.log(this.userGroups)
        console.log(this.activitySpendName)
      },
      error => {
        console.log(error)
      })
  }
  
}
