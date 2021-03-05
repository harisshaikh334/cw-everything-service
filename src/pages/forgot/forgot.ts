import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { APIURL } from '../../app/apiconfig';

@Component({
  selector: 'page-forgot',
  templateUrl: 'forgot.html'
})
export class ForgotPage {
	showLoader: boolean = false;
	mobile: string = '';

	constructor(public navCtrl: NavController, private http: HttpClient, public toast: ToastController) {

	}

	createToast(msg, css, duration, pos){
		const toast = this.toast.create({
	      message: msg,
	      duration: duration,
	      cssClass: css,
	      position: pos
	    });
	    toast.present();
	}

	sendEmail(){
		this.showLoader = true;
		var regex = /^[0-9]{10}$/;

		if(this.mobile.trim() == '' || !regex.test(this.mobile) || this.mobile.length < 10){
			this.createToast('Please enter a valid mobile number.','toast-danger',4000,'top');
		    this.showLoader = false;
		    return false;
		}
		this.http.post(APIURL+'service-providers/forgot', {contact: this.mobile})
		.subscribe({
			next: response => {
				this.showLoader = false;
				if(response['error'] == 0){
					var that = this;
					this.mobile = '';
					this.createToast('Password Reset Link has been sent to your registered mobile number and email address.','toast-success',5000,'bottom');
				    setTimeout(function(){
				    	that.navCtrl.pop();
				    },5000);
				} else {
					const toast = this.toast.create({
				      message: response['reason'],
				      duration: 5000,
				      cssClass: 'toast-danger',
				      position: 'bottom'
				    });
				    toast.present();
				}
			},
			error : err => {
				this.showLoader = false;
				this.createToast('Some technical glitch observed. Please try again.','toast-dnger',3000,'bottom');
			}
		})
	} 
}
