import { Component } from '@angular/core';
import { NavController, ToastController, NavParams, Platform } from 'ionic-angular';
import{ Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { distinctUntilChanged } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { APIURL } from '../../app/apiconfig';
//import { FirebaseX } from '@ionic-native/firebase-x/ngx';

import { PickerPage } from '../picker/picker';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

	public signupForm: FormGroup;
	public skill_ids: any = [];
	public push_token: string = '';
	public submitAttempt: boolean = false;	
	public showLoader: boolean = false;	
	public otp: number = null;

	constructor(public navCtrl: NavController, private platform: Platform, public navparams: NavParams, public formBuilder: FormBuilder, private http: HttpClient, public toastController: ToastController, public storage: Storage) {
	}

	ngOnInit() {
		this.buildForm();
		this.setEmailValidators();
	}

	ionViewDidEnter(){
		if(typeof this.navparams.get('ids') != 'undefined'){
			this.skill_ids = this.navparams.get('ids');
			this.signupForm.get('skills').setValue(this.navparams.get('names'));
			this.signupForm.get('subcat_id').setValue(this.navparams.get('ids'));
		}

		if(this.platform.is('cordova')){
			(<any>window).FirebasePlugin.getToken(token => this.push_token = token);
		}
	}

	buildForm(){
		this.signupForm = this.formBuilder.group({
			name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), 
			Validators.required])],
			email: [''],
			skills: ['',Validators.required],
			subcat_id: [''],
			contact: ['', Validators.compose([
				Validators.required,
				Validators.minLength(10),
				Validators.pattern('^[0-9{10}]+$')
			])],
			password: ['', Validators.compose([
				Validators.required,
				Validators.minLength(8)
			])],
			// otp: ['', Validators.compose([
			// 	// Validators.required,
			// 	// Validators.minLength(6)
			// ])]
		});
	}

	sendOTP(){
		if(this.signupForm.get('contact').valid){
			this.otp = Math.floor(100000 + Math.random() * 900000);
			this.http.post(APIURL+'service-providers/send-otp', {otp: this.otp, phone: this.signupForm.get('contact').value})
			.subscribe({
				next: data => {
					//nothing to do
				},
    			error: error => {
    				console.error('There was an error!', error);
    			}
			});
		}
	}

	resend(){
		this.showLoader = true;
		if(this.signupForm.get('contact').valid){
			this.otp = Math.floor(100000 + Math.random() * 900000);
			this.http.post(APIURL+'service-providers/send-otp', {otp: this.otp, phone: this.signupForm.get('contact').value})
			.subscribe({
				next: data => {
					this.showLoader = false;
					alert('OTP has been resent!');
					//nothing to do
				},
    			error: error => {
    				this.showLoader = false;
    				console.error('There was an error!', error);
    			}
			});
		}
	}

	setEmailValidators(){
		const emailControl = this.signupForm.get('email');
		emailControl.valueChanges.pipe(distinctUntilChanged()).subscribe(value => {
			if(value != ''){
				emailControl.setValidators(Validators.pattern('^[a-zA-Z0-9.-_]{1,}@[a-zA-Z0-9.-]{2,}[.]{1}[a-zA-Z]{2,}$'));
			} else {
				emailControl.setValidators(null);
			}
			emailControl.updateValueAndValidity();
		});
	}

	openTerms(){
		window.open("https://everythingservices.in/terms",'_system', 'location=yes');
	}

	openPicker(){
		this.navCtrl.push(PickerPage);
	}
	
	signup(){

		this.submitAttempt = true;

		// if(this.signupForm.get('otp').value != this.otp){
		// 	this.signupForm.get('otp').markAsDirty();
		// 	return false;
		// }
		
		if(this.signupForm.valid){
			this.showLoader = true;
			var data = this.signupForm.value;
			data['push_token'] = this.push_token;
			delete data['otp'];
			this.http.post<any>(APIURL+'service-providers?key=25e86ce50a1544c871f066cff5651adb', data)
			.subscribe({
				next: data => {
					this.submitAttempt = false;
					this.showLoader = false;
					const toast = this.toastController.create({
				      message: 'Registration was successful. Kindly make the payment through Payment link sent to your mobile number in order to activate your account.',
				      duration: 5000,
				      cssClass: 'toast-success'
				    });
				    toast.present();

				    var that = this;
					setTimeout(function(){
						that.navCtrl.pop();
					},5000);	
				},
    			error: error => {
    				this.submitAttempt = false;
    				this.showLoader = false;
    				const toast = this.toastController.create({
				      message: error.error.msg,
				      duration: 3000,
				      cssClass: 'toast-danger'
				    });
				    toast.present();
    			}
			});
		}
	} 
}
