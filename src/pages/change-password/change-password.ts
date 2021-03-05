import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { APIURL } from '../../app/apiconfig';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

  public submitAttempt: boolean = false;
  public showLoader: boolean = false;
  public pass: string = '';
  public cpass: string = '';
  public oldpass: string = '';
  public user: object = {};

  constructor(public navCtrl: NavController, public storage: Storage, private http: HttpClient, public navParams: NavParams, public toastController: ToastController) {
  }

  ionViewDidLoad() {
    this.storage.get('userinfo').then(result => {
      this.user = JSON.parse(result);
    });
  }

  updatePass(){
  	this.submitAttempt = true;
  	if(!this.pass || !this.cpass || !this.oldpass){
  		return false;
  	}
  	
  	if(this.pass.trim() !== this.cpass.trim()){
  		this.showLoader = false;
		const toast = this.toastController.create({
	      message: 'Password and Confirm Password does not match.',
	      duration: 4000,
	      cssClass: 'toast-danger',
	      position: 'top'
	    });
	    toast.present();
	    return false;
  	} else if(this.pass.indexOf(' ') != -1){
  		const toast = this.toastController.create({
	      message: 'Password cannot contain spaces.',
	      duration: 4000,
	      cssClass: 'toast-danger',
	      position: 'top'
	    });
	    toast.present();
	    return false;
  	} else {
  		this.showLoader = true;
  		this.http.post<any>(APIURL+'service-providers/update-password',{id: this.user['id'], current: this.oldpass.trim(), secretkey: this.pass.trim()})
  		.subscribe({
  			next: response => {
  				this.showLoader = false;
          if(response.error == 1){
            const toast = this.toastController.create({
              message: response.reason,
              duration: 4000,
              cssClass: 'toast-danger',
              position: 'top'
            });
            toast.present();
          } else {
            const toast = this.toastController.create({
              message: 'Password updated successfully.',
              duration: 4000,
              cssClass: 'toast-success',
              position: 'top'
            });
            toast.present();
            setTimeout(() => this.navCtrl.pop(), 1000); 
          }
  			},
  			error: err => {
  				this.showLoader = false;
  				const toast = this.toastController.create({
			      message: err.message,
			      duration: 4000,
			      cssClass: 'toast-danger',
			      position: 'top'
			    });
			    toast.present();
  			}
  		})
  	}
  }

}
