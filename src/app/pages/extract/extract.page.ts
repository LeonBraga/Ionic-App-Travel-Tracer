import { Component } from '@angular/core';
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
export class ExtractPage {

  userGroups: Group[]
  private trip: Group
  tripName: string
  userTripTotalSpend: number
  tripTotalValue: number
  activitySpends: ActivitySpend[]
  email: string

  groupId: number


  constructor(
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute,
    private storageService: StorageService) {
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.groupId = params['groupId']
      }
    });
  }

  ngOnInit() {
    this.email = this.storageService.getLocalUser().email
    this.userService.getUserByEmail(this.email).subscribe(
      response => {
        this.userGroups = response['groups']
        this.trip = this.userGroups.find(group => group.id == this.groupId)
        this.tripName = this.trip.name
        this.tripTotalValue = this.trip.totalGroupSpend
        this.userTripTotalSpend = this.trip.totalUserSpend
        this.activitySpends = this.trip['activitySpends']


      },
      error => {
        console.log(error)
      })

  }


}
