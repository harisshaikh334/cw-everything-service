import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { APIURL } from '../../app/apiconfig';

/**
 * Generated class for the EarningsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-earnings',
  templateUrl: 'earnings.html',
})
export class EarningsPage {

	user :any = {};
	showLoader: boolean = true;
	earnings: any = {daily_earnings: []}

	constructor(public navCtrl: NavController, public platform: Platform, public navParams: NavParams, public storage: Storage, private http: HttpClient) {

	}

	ionViewWillLoad(){
        this.storage.get('userinfo').then(result => {
        	this.user = JSON.parse(result);

        	//check this approval status in order api, no need to separately hit this.
        	this.http.get<any>(APIURL+'service-providers/earnings?access-token='+this.user.token)
			.subscribe({
				next: data => {
					this.showLoader = false;
					this.earnings = data;
				},
				error: error => {
					this.showLoader = false;
					console.error('There was an error!', error);
				}
			});
        });
    }
}
