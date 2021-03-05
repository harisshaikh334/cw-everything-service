import { Component } from '@angular/core';
import { NavController, Platform, App, AlertController } from 'ionic-angular';

import { AppointmentsPage } from '../appointments/appointments';
import { NotificationPage } from '../notification/notification';
import { RatingsPage } from '../ratings/ratings';
import { AccountPage } from '../account/account';
//import { ChatsPage } from '../chats/chats';
import { EarningsPage } from '../earnings/earnings';

@Component({
  templateUrl: 'tabs.html',
  selector: 'page-tabs',
})
export class TabsPage {

  public unsubscribeBackEvent: any;

  tab1Root = AppointmentsPage;
  tab2Root = NotificationPage;
  tab3Root = RatingsPage;
  tab4Root = AccountPage;
  tab5Root = EarningsPage;

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public app: App,
    public alertCtrl: AlertController
  ) {
    
  }

  ionViewWillLeave() {
    /*const alert = this.alertCtrl.create({
          title: 'Exit App?',
          message: 'Do you want to exit the application?',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {}
            },
            {
              text: 'Exit',
              handler: () => {
                this.platform.exitApp();
              }
            }
          ]
      });
    alert.present();
    return false;*/
  }
}