import { Component } from '@angular/core';
import { NavController, ToastController, Platform } from 'ionic-angular';
import{ Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { APIURL } from '../../app/apiconfig';
//import { FirebaseX } from '@ionic-native/firebase-x/ngx';

import { SignupPage } from '../signup/signup';
import { TabsPage } from '../tabs/tabs';
import { ForgotPage } from '../forgot/forgot';
import { Appointment_statusPage } from '../appointment_status/appointment_status';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})

export class SigninPage {

	public loginForm: FormGroup;
	public push_token: string = '';
	public submitAttempt: boolean = false;
	public showLoader: boolean = true;

	firebasePlugin;
	
	constructor(public navCtrl: NavController, private platform: Platform, public formBuilder: FormBuilder, private http: HttpClient, public toastController: ToastController, public storage: Storage) {
		
		this.loginForm = formBuilder.group({
			mobile: ['', Validators.compose([
				Validators.required,
				Validators.minLength(10),
				Validators.pattern('^[0-9{10}]+$')
			])],
			password: ['', Validators.required]
		});
	}

	ionViewDidLoad(){
		this.platform.ready().then(() => {
	        this.storage.get('userinfo').then(result => {
	        	this.showLoader = false;
	        	if(typeof result != 'undefined' && result !== null && result !== ''){
	        		if(this.platform.is('cordova')){
			        	let user = JSON.parse(result);
			        	this.firebasePlugin.onTokenRefresh((token: string) => {
							this.push_token = token;
							this.http.put<any>(APIURL+'service-providers/'+user.id+'?access-token='+user.token, {push_token: token})
							.subscribe({
								next: data => {
								},
				    			error: error => {
				    			}
							});
						});
			        }

		        	this.navCtrl.setRoot(TabsPage)
		        }
	        });
        
        	if(this.platform.is('cordova')){
				this.firebasePlugin = (<any>window).FirebasePlugin;
				var channel  = {
				    id: "sp",
				    sound: "evsound",
				    vibration: true,
				    light: true,
				    lightColor: parseInt("FF0000FF", 16).toString(),
				    importance: 4,
				    badge: true,
				    visibility: 1
				};
				// this.firebasePlugin.createChannel(channel);
				//this.firebasePlugin.onMessageReceived(this.onMessageReceived.bind(this));
				// this.firebasePlugin.getToken(token => {
				// 	this.push_token = token;
				// });
			}
	    });
    }

    /*onMessageReceived(message){
      if (message.tap) { 
        this.navCtrl.push(Appointment_statusPage, {id: message.order_id})
      } else {
        //received while app in foreground (show a toast)
        let toast = this.toastController.create({
          message: message.body,
          duration: 5000,
          position: 'top',
          cssClass: 'toast-info'
        });
        toast.present();
      }
    }*/

    signup(){
		this.navCtrl.push(SignupPage)
	}

	forgot(){
		this.navCtrl.push(ForgotPage);
	}

	login(){
		this.submitAttempt = true;
		if(this.loginForm.valid){
			this.showLoader = true
			var data = {push_token: this.push_token, mobile: this.loginForm.controls.mobile.value, password: this.loginForm.controls.password.value}
			this.http.post<any>(APIURL+'service-providers/login', data)
			.subscribe({
				next: data => {
					this.submitAttempt = false;
					this.showLoader = false;
					
					if(data.error == 1){
						const toast = this.toastController.create({
					      message: data.reason,
					      duration: 5000,
					      cssClass: 'toast-danger'
					    });
					    toast.present();
					} else {
						this.loginForm.controls.mobile.setValue('');
						this.loginForm.controls.password.setValue('');
						this.storage.set('userinfo', JSON.stringify(data));
						this.navCtrl.setRoot(TabsPage)
					}
				},
    			error: error => {
    				this.submitAttempt = false;
    				console.error('There was an error!', error);
    			}
			});
		}
	}
}
