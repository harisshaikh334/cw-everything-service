import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { APIURL } from '../../app/apiconfig';
import { Storage } from '@ionic/storage';

import { All_reviewsPage } from '../all_reviews/all_reviews';
@Component({
  selector: 'page-ratings',
  templateUrl: 'ratings.html'
})
export class RatingsPage {

  data: any = [];	
  showLoader: Boolean = false;
  ratings: any = []

  constructor(public navCtrl: NavController, public platform: Platform, private http: HttpClient, public storage: Storage) {

  }

  ionViewWillLoad(){
    this.showLoader = true;
    this.storage.get('userinfo').then(result => {
      let user = JSON.parse(result);
  	  this.http.get<any>(APIURL+'reviews/ratings?access-token='+user.token).subscribe({
    		next: response => {
    			this.data = response;
          this.ratings = response.ratings.reverse();
          this.showLoader = false;
    		},
    		error: err => {
    			console.error(err)
    		}
    	})
    });
  }
  
  all_reviews(){
    this.navCtrl.push(All_reviewsPage)
  }  
}
