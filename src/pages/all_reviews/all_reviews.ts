import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { APIURL } from '../../app/apiconfig';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-all_reviews',
  templateUrl: 'all_reviews.html'
})
export class All_reviewsPage {

	data: any = [];		
	user: any = {};
	showLoader: boolean = true;

	constructor(public navCtrl: NavController, public storage: Storage, private http: HttpClient) {

	}

	ionViewWillLoad(){
		this.storage.get('userinfo').then(result => {
	    	this.user = JSON.parse(result);
			this.http.get<any>(APIURL+'reviews/all?access-token='+this.user.token).subscribe({
				next: response => {
					this.showLoader = false;
					this.data = response;
				},
				error: err => {
					this.showLoader = false;
					console.error(err)
				}
			})
		});	
	}

}
