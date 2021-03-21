import { Component } from '@angular/core';
import { NavController, App, Platform, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { APIURL } from '../../app/apiconfig';
//import { Geolocation } from '@ionic-native/geolocation';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationEvents, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';

import {My_profilePage } from '../my_profile/my_profile';
import {ContactPage } from '../contact/contact';
import {AboutPage } from '../about/about';
import {FaqPage } from '../faq/faq';
import { ChangePasswordPage } from '../change-password/change-password';
import {SigninPage} from '../signin/signin';
import { ProductListPage } from '../product-list/product-list';
import { OrderHostoryPage } from '../order-hostory/order-hostory';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {

  public online: boolean = false;
  public user: any = {};
  public showLoader: boolean = false;
  public baseurl: string = APIURL;
  public watch: any = null;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public platform: Platform, private backgroundGeolocation: BackgroundGeolocation, private http: HttpClient, public storage: Storage, private app: App) {

  }

  ionViewDidEnter(){
    this.storage.get('userinfo').then(result => {
      this.user = JSON.parse(result);
      this.http.get(APIURL+'service-providers/'+this.user.id+'?access-token='+this.user.token).subscribe({
        next: response => {
          this.user = response;
          if(this.user.online == 1){
            this.online = true;
          } else {
            this.online = false;
          }
        },
        error: err => {
          console.error(err);
        }
      });
    });
  }

  my_order_history() {
    this.navCtrl.push(OrderHostoryPage)
  }

  //starting watch while user goes online
  startWatch(){
    
    const config: BackgroundGeolocationConfig = {
            desiredAccuracy: 10,
            stationaryRadius: 20,
            distanceFilter: 30,
            interval: 120000,
            fastestInterval: 60000,
            activitiesInterval: 60000,
            debug: false, //  enable this hear sounds for background-geolocation life-cycle.
            stopOnTerminate: true, // enable this to clear background location settings when the app terminates
      };

      this.backgroundGeolocation.configure(config)
      .then(() => {
        this.backgroundGeolocation.on(BackgroundGeolocationEvents.location).subscribe((location: BackgroundGeolocationResponse) => {
          if(typeof location != 'undefined'){
            let coords = {lat: location.latitude, lng: location.longitude};
            this.http.put<any>(APIURL+'service-providers/'+this.user.id+'?access-token='+this.user.token, coords)
            .subscribe({
              next: data => {
              },
              error: error => {
              }
            });
          }
          // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
          // and the background-task may be completed.  You must do this regardless if your operations are successful or not.
          // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
          //this.backgroundGeolocation.finish(); // FOR IOS ONLY
        });
      });

      this.backgroundGeolocation.checkStatus().then(status => {
        if (!status.isRunning) {
          this.backgroundGeolocation.start(); //triggers start on start event
        }
      });

      // start recording location
      this.backgroundGeolocation.start();

      // If you wish to turn OFF background-tracking, call the #stop method.
      //this.backgroundGeolocation.stop();
    }

  setOnlineStatus(){
    let data = new FormData();
    let online = !this.online ? '0' : '1';
    data.append('online', online);

    this.http.put(APIURL+'service-providers/'+this.user.id+'?access-token='+this.user.token, data).subscribe({
      next: (response: any) => {
        if(online == '1' && response.is_automobile == 1 && this.platform.is('cordova')){
          this.startWatch();
        } else {
          if(this.platform.is('cordova')){
            this.backgroundGeolocation.checkStatus().then(status => {
              if (status.isRunning) {
                this.backgroundGeolocation.stop(); //triggers start on start event
              }
            });
          }
        }
      },
      error: err => {
        console.error(err);
      }
    });
  }

  change_pass(){
    this.navCtrl.push(ChangePasswordPage);
  }

  my_product() {
    this.navCtrl.push(ProductListPage);
  }

  my_profile(){
    this.navCtrl.push(My_profilePage)
  }   
  contact(){
    this.navCtrl.push(ContactPage)
  }
  openPrivacy(){
    window.open("https://everythingservices.in/privacy",'_system', 'location=yes');
  }
  about(){
    this.navCtrl.push(AboutPage)
  }  
  faq(){
    this.navCtrl.push(FaqPage)
  }  
  logout(){
    let alert = this.alertCtrl.create({
    title: 'Confirm Logout',
    message: 'Are you sure you want to logout?',
    buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {}
        },
        {
          text: 'Yes',
          handler: () => {
            this.showLoader = true;
            this.http.put(APIURL+'service-providers/'+this.user.id+'?access-token='+this.user.token, {online: 0, push_token: ''})
            .subscribe({
              next: response => {
                this.showLoader = false;
                this.storage.remove('userinfo');
                this.app.getRootNav().setRoot(SigninPage)
              },
              error: err => {
                this.showLoader = false;
                this.storage.remove('userinfo');
                this.app.getRootNav().setRoot(SigninPage);
              }
            })
          }
        }
      ]
    });
    alert.present();
  }
}
