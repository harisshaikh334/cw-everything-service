import { Component, Input } from '@angular/core';
import { NavController, Platform, NavParams, PopoverController, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { APIURL } from '../../app/apiconfig';
import { OrderDetailsPage } from '../order-details/order-details';

/**
 * Generated class for the OrderHostoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-order-hostory',
  templateUrl: 'order-hostory.html',
})
export class OrderHostoryPage {
  showLoader: boolean = false;
  user:any = {};
  @Input()order_list = [];
  constructor(public navCtrl: NavController, public toastController: ToastController, public popoverController: PopoverController, public navparams: NavParams, public platform: Platform, public storage: Storage, private http: HttpClient) {
  }

  
  
  order_details(item) {
    this.navCtrl.push(OrderDetailsPage, {order: item})
  }

}
