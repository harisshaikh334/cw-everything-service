import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Purchase_planPage } from '../purchase_plan/purchase_plan';
@Component({
  selector: 'page-subscription',
  templateUrl: 'subscription.html'
})
export class SubscriptionPage {

  constructor(public navCtrl: NavController) {

  }
purchase_plan(){
        this.navCtrl.push(Purchase_planPage)
  }  
}
