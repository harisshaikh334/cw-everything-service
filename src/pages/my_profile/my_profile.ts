import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ActionSheetController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import{ Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { distinctUntilChanged } from 'rxjs/operators';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { APIURL } from '../../app/apiconfig';

import { PickerPage } from '../picker/picker';
import { LocationSelect } from '../location-select/location-select';

@Component({
  selector: 'page-my_profile',
  templateUrl: 'my_profile.html'
})
export class My_profilePage {
	
	category: string = '';
	segments: string = "basic";
	data: any = [];
	user: any = {};
	maxyear: any = (new Date().getFullYear() + 5);
	uploadedFiles: any = [];
	vehicle_subcats: any = [];
	registration_owner: string = '';
	google_address: string = '';
	qualification: any = ['No formal education','Primary education','Secondary education or high school','GED','Vocational qualification','Bachelor\'s degree','Master\'s degree','Doctorate or higher'];

	public imagePath;
  	public profile_picture: any = '';

	public basicForm: FormGroup;
	public bankForm: FormGroup;
	public vehicleForm: FormGroup;

	public submitAttempt: boolean = false;	
	public showLoader: boolean = false;	

	constructor(public navCtrl: NavController, public actionsheet: ActionSheetController, public navparams: NavParams, public storage: Storage, private http: HttpClient, public formBuilder: FormBuilder, public toastController: ToastController, private camera: Camera) {

	}

	ngOnInit() {
		this.buildForm();
		this.setEmailValidators();
	}

	ionViewWillLoad(){
		this.storage.get('userinfo').then(result => {
	    	this.user = JSON.parse(result);
	    	this.showLoader = true;
	    	this.http.get<any>(APIURL+'service-providers/'+this.user.id+'?access-token='+this.user.token)
			.subscribe({
				next: response => {
					this.showLoader = false;
					this.data = response;

					if(response.is_approved == 1){
						const toast = this.toastController.create({
					      message: 'Modifying any documents will attract the re-approval from administrator.',
					      duration: 15000,
					      position: 'top',
					      cssClass: 'toast-info',
					      showCloseButton: true,
					      closeButtonText: 'OK'
					    });
					    toast.present();
					}

					let ignoreFields = ['upload_pan_card','upload_cancelled_cheque','upload_adhaar_card','upload_driving_licence','upload_bank_passbook'];

					for(var i in response){
						if(this.basicForm.controls[i] && response[i] != null && ignoreFields.indexOf(i) == -1){
							this.basicForm.controls[i].setValue(response[i])
						}
					}

					for(var b in response){
						if(this.bankForm.controls[b] && response[b] != null && ignoreFields.indexOf(b) == -1){
							this.bankForm.controls[b].setValue(response[b])
						}
					}

					for(var c in response){
						if(this.vehicleForm.controls[c] && response[c] != null && ignoreFields.indexOf(c) == -1){
							this.vehicleForm.controls[c].setValue(response[c])
						}
					}

					//setting profile pic
					if(this.data.upload_photo != '' && this.data.upload_photo != 'null'){
						this.profile_picture = APIURL+'../../web'+this.data.upload_photo;
					}
					
					//removing file validation if data already exists
					if(this.data.upload_cancelled_cheque != '' && this.data.upload_cancelled_cheque != null){
						this.bankForm.get('upload_cancelled_cheque').setValidators(null);
						this.bankForm.get('upload_cancelled_cheque').updateValueAndValidity();
					}
					if(this.data.upload_driving_licence != '' && this.data.upload_driving_licence != null){
						this.vehicleForm.get('upload_driving_licence').setValidators(null);
						this.vehicleForm.get('upload_driving_licence').updateValueAndValidity();
					}
					/*if(this.data.upload_pan_card != '' && this.data.upload_pan_card != null){
						this.basicForm.get('upload_pan_card').setValidators(null);
						this.basicForm.get('upload_pan_card').updateValueAndValidity();
					}*/
					if(this.data.upload_bank_passbook != '' && this.data.upload_bank_passbook != null){
						this.bankForm.get('upload_bank_passbook').setValidators(null);
						this.bankForm.get('upload_bank_passbook').updateValueAndValidity();
					}
					if(this.data.upload_adhaar_card != '' && this.data.upload_adhaar_card != null){
						this.basicForm.get('upload_adhaar_card').setValidators(null);
						this.basicForm.get('upload_adhaar_card').updateValueAndValidity();
					}

					//enabling vehicle tab
					let ids = this.basicForm.get('subcat_id').value;
					for(var m in ids){
						if(this.vehicle_subcats.indexOf(ids[m]) != -1){
							this.category = 'vehicle';
							break;
						}
					}
				},
				error: error => {
					this.showLoader = false;
					console.error('There was an error!', error);
				}
			});
	    });

	    this.http.get<any>(APIURL+'service-providers/vehicle-subcats')
	    .subscribe({
	    	next: response => {
				this.vehicle_subcats = response;
			},
			error: error => {
				console.error('There was an error!', error);
			}
	    })
	}

	ionViewDidEnter(){
		if(typeof this.navparams.get('ids') != 'undefined'){
			this.basicForm.controls.skills.setValue(this.navparams.get('names'));
			this.basicForm.controls.subcat_id.setValue(this.navparams.get('ids').split(', '));

			//enabling vehicle tab
			let ids = this.navparams.get('ids').split(', ');
			for(var i in ids){
				if(this.vehicle_subcats.indexOf(ids[i]) != -1){
					this.category = 'vehicle';
					break;
				}
			}
		}

		if(typeof this.navparams.get('lat') != 'undefined'){
			this.basicForm.controls.lat.setValue(this.navparams.get('lat'));
			this.basicForm.controls.lng.setValue(this.navparams.get('lng'));
			this.google_address = this.navparams.get('address');
		}
	}

	openFilePicker(id){
		document.getElementById(id).querySelectorAll('input')[0].click();
	}

	preview() {
		var files = document.getElementById('profilePic').querySelectorAll('input')[0].files;
	    if (files.length === 0)
	      return;
	 
	    var reader = new FileReader();
	    this.imagePath = files;
	    this.uploadedFiles.push({upload_photo: files[0]});
	    reader.readAsDataURL(files[0]); 
	    reader.onload = (_event) => { 
	      this.profile_picture = reader.result;
	    }
	}

	buildForm(){
		this.basicForm = this.formBuilder.group({
			id: [this.data.id],
			is_approved:[this.data.is_approved],
			name: [this.data.name, Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), 
			Validators.required])],
			email: [this.data.email],
			skills: [this.data.skills, Validators.required],
			subcat_id: [''],
			lat: ['', Validators.required],
			lng: [''],
			contact: [this.data.contact, Validators.compose([
				Validators.required,
				Validators.minLength(10),
				Validators.pattern('^[0-9]{10}$')
			])],
			father_name: [this.data.father_name, Validators.required],
			mother_name: [this.data.mother_name, Validators.required],
			present_address: [this.data.present_address, Validators.required],
			permenant_address: [this.data.permenant_address, Validators.required],
			shop_name: [this.data.shop_name],
			shop_address: [this.data.shop_address],
			shop_licence_no: [this.data.shop_licence_no],
			tel_no: [this.data.tel_no, Validators.compose([
				Validators.minLength(11),
				Validators.maxLength(11),
				Validators.pattern('^[0-9]{11}$')
			])],
			gst_no: [this.data.gst_no],
			pancard_no: [this.data.pancard_no, Validators.compose([
                Validators.required, 
                Validators.pattern('^[A-Za-z]{5}[0-9]{4}[a-zA-Z]{1}$')
            ])],
            adhaar_card_no: [this.data.adhaar_card_no, Validators.compose([
                Validators.required, 
                Validators.pattern('^[0-9]{12}$')
            ])],
			education_qualification: [this.data.education_qualification, Validators.required],
			reference1_name: [this.data.reference1_name, Validators.required],
			reference1_contact: [this.data.reference1_contact, Validators.compose([
				Validators.required,
				Validators.minLength(10),
				Validators.maxLength(10),
				Validators.pattern('^[0-9]{10}$')
			])],
			reference2_name: [this.data.reference2_name, Validators.required],
			reference2_contact: [this.data.reference2_contact, Validators.compose([
				Validators.required,
				Validators.minLength(10),
				Validators.maxLength(10),
				Validators.pattern('^[0-9]{10}$')
			])],
			upload_pan_card: [''],
			upload_adhaar_card: ['', Validators.required]
		});

		this.vehicleForm = this.formBuilder.group({
			vehicle_owner: [this.data.vehicle_owner],
			driving_licence_no: [this.data.driving_licence_no, Validators.required],
			permit_licence_no: [this.data.permit_licence_no, Validators.required],
			batch_no: [this.data.batch_no],
			car_rikshaw_reg_no: [this.data.car_rikshaw_reg_no, Validators.required],
			rc_book_no: [this.data.rc_book_no, Validators.required],
			puc: [this.data.puc],
			car_rikshaw_insurance_dt: [this.data.car_rikshaw_insurance_dt, Validators.required],
			upload_driving_licence: ['', Validators.required]
		});

		this.bankForm = this.formBuilder.group({
			account_type: ['Saving Account'],
			accountholder: [this.data.accountholder_name, Validators.required],
			bank: [this.data.bank_name, Validators.required],
			branch: [this.data.branch, Validators.required],
			accountnumber: [this.data.account_number, Validators.compose([
				Validators.minLength(10),
				Validators.required,
				Validators.pattern('^[0-9]*$')
			])],
			ifsc: [this.data.ifsc_code, Validators.required],
			upload_cancelled_cheque: ['', Validators.required],
			upload_bank_passbook: [''],
		});
	}

	setEmailValidators(){
		const emailControl = this.basicForm.get('email');
		emailControl.valueChanges.pipe(distinctUntilChanged()).subscribe(value => {
			if(value != ''){
				emailControl.setValidators(Validators.pattern('^[a-zA-Z0-9.-_]{1,}@[a-zA-Z0-9.-]{2,}[.]{1}[a-zA-Z]{2,}$'));
			} else {
				emailControl.setValidators(null);
			}
			emailControl.updateValueAndValidity();
		});
	}

	setVehicleOwnerValidators(){
		const vehicleOwnerControl = this.vehicleForm.get('vehicle_owner');
		if(this.registration_owner == 'No'){
			vehicleOwnerControl.setValidators(Validators.required);
		} else {
			vehicleOwnerControl.setValidators(null);
		}
		vehicleOwnerControl.updateValueAndValidity();
	}

	openPicker(){
		this.navCtrl.push(PickerPage,{ids: this.basicForm.controls.subcat_id.value});
	}

	openLocationPicker(){
		this.navCtrl.push(LocationSelect);
	}

	private urltoFile(url, filename, mimeType) {
	    return (fetch(url)
	        .then(function(res){return res.arrayBuffer();})
	        .then(function(buf){return new File([buf], filename, {type:mimeType});})
	        .catch(err => alert(err.message))
	    );
	}

	DataURIToBlob(dataURI: string) {
		const splitDataURI = dataURI.split(',')
		const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
		const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

		const ia = new Uint8Array(byteString.length)
		for (let i = 0; i < byteString.length; i++)
		    ia[i] = byteString.charCodeAt(i)

		return new Blob([ia], { type: mimeString })
	}

	actionSheetFile(field){
		let actionSheet = this.actionsheet.create({
	     title: (field == 'pp') ? 'Set your display picture' : 'Select Document to Upload',
	     buttons: [
	       {
	         text: 'Browse Photo Albums',
	         role: 'destructive',
	         handler: () => {
	           const options: CameraOptions = {
				  sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
				  destinationType: this.camera.DestinationType.DATA_URL,
				  correctOrientation: true
				}

				this.camera.getPicture(options).then((imageData) => {
					let base64Image = 'data:image/jpeg;base64,' + imageData
					if(field == 'pp'){
						this.profile_picture = base64Image;
					}
      				
  					switch(field){
  						case 'pp':
      						this.uploadedFiles.push({upload_photo: base64Image});
      					break;
      					case 'pan':
      						this.uploadedFiles.push({upload_pan_card: base64Image});
      						var elem1: any = document.getElementById('upload_pan_card').parentElement;
							elem1.getElementsByTagName('ion-icon')[0].innerText = 'check';
							//this.basicForm.get('upload_pan_card').setValidators(null);
							//this.basicForm.get('upload_pan_card').updateValueAndValidity();
      					break;
      					case 'adhaar':
      						this.uploadedFiles.push({upload_adhaar_card: base64Image});
      						var elem2: any = document.getElementById('upload_adhaar_card').parentElement;
							elem2.getElementsByTagName('ion-icon')[0].innerText = 'check';
							this.basicForm.get('upload_adhaar_card').setValidators(null);
							this.basicForm.get('upload_adhaar_card').updateValueAndValidity();
      					break;
      					case 'passbook':
      						this.uploadedFiles.push({upload_bank_passbook: base64Image});
      						var elem3: any = document.getElementById('upload_bank_passbook').parentElement;
							elem3.getElementsByTagName('ion-icon')[0].innerText = 'check';
							this.bankForm.get('upload_bank_passbook').setValidators(null);
							this.bankForm.get('upload_bank_passbook').updateValueAndValidity();
      					break;
      					case 'cheque':
      						this.uploadedFiles.push({upload_cancelled_cheque: base64Image});
      						var elem4: any = document.getElementById('upload_cancelled_cheque').parentElement;
							elem4.getElementsByTagName('ion-icon')[0].innerText = 'check';
							this.bankForm.get('upload_cancelled_cheque').setValidators(null);
							this.bankForm.get('upload_cancelled_cheque').updateValueAndValidity();
      					break;
      					case 'license':
      						this.uploadedFiles.push({upload_driving_licence: base64Image});
      						var elem5: any = document.getElementById('upload_driving_licence').parentElement;
							elem5.getElementsByTagName('ion-icon')[0].innerText = 'check';
							this.vehicleForm.get('upload_driving_licence').setValidators(null);
							this.vehicleForm.get('upload_driving_licence').updateValueAndValidity();
      					break;	
      				}
				}, (err) => {
				 console.error(err);
				});
	         }
	       },
	       {
	         text: 'Open Camera',
	         role: 'destructive',
	         handler: () => {
	            const options: CameraOptions = {
				  quality: 100,
				  destinationType: this.camera.DestinationType.DATA_URL,
				  encodingType: this.camera.EncodingType.JPEG,
				  mediaType: this.camera.MediaType.PICTURE,
				  correctOrientation: true,
				  cameraDirection: 1
				}

				this.camera.getPicture(options).then((imageData) => {
					let base64Image = 'data:image/jpeg;base64,' + imageData
					if(field == 'pp'){
						this.profile_picture = base64Image;
					}
  					switch(field){
  						case 'pp':
      						this.uploadedFiles.push({upload_photo: base64Image});
      					break;
      					case 'pan':
      						this.uploadedFiles.push({upload_pan_card: base64Image});
      						var elem1: any = document.getElementById('upload_pan_card').parentElement;
							elem1.getElementsByTagName('ion-icon')[0].innerText = 'check';
							//this.basicForm.get('upload_pan_card').setValidators(null);
							//this.basicForm.get('upload_pan_card').updateValueAndValidity();
      					break;
      					case 'adhaar':
      						this.uploadedFiles.push({upload_adhaar_card: base64Image});
      						var elem2: any = document.getElementById('upload_adhaar_card').parentElement;
							elem2.getElementsByTagName('ion-icon')[0].innerText = 'check';
							this.basicForm.get('upload_adhaar_card').setValidators(null);
							this.basicForm.get('upload_adhaar_card').updateValueAndValidity();
      					break;
      					case 'passbook':
      						this.uploadedFiles.push({upload_bank_passbook: base64Image});
      						var elem3: any = document.getElementById('upload_bank_passbook').parentElement;
							elem3.getElementsByTagName('ion-icon')[0].innerText = 'check';
							this.bankForm.get('upload_bank_passbook').setValidators(null);
							this.bankForm.get('upload_bank_passbook').updateValueAndValidity();
      					break;
      					case 'cheque':
      						this.uploadedFiles.push({upload_cancelled_cheque: base64Image});
      						var elem4: any = document.getElementById('upload_cancelled_cheque').parentElement;
							elem4.getElementsByTagName('ion-icon')[0].innerText = 'check';
							this.bankForm.get('upload_cancelled_cheque').setValidators(null);
							this.bankForm.get('upload_cancelled_cheque').updateValueAndValidity();
      					break;
      					case 'license':
      						this.uploadedFiles.push({upload_driving_licence: base64Image});
      						var elem5: any = document.getElementById('upload_driving_licence').parentElement;
							elem5.getElementsByTagName('ion-icon')[0].innerText = 'check';
							this.vehicleForm.get('upload_driving_licence').setValidators(null);
							this.vehicleForm.get('upload_driving_licence').updateValueAndValidity();
      					break;	
      				}
				}, (err) => {
				 console.error(err);
				});
	         }
	       },
	       {
	         text: 'Cancel',
	         role: 'cancel',
	         handler: () => {}
	       }
	     ]
	   });
	   actionSheet.present();
	}

	uploadFile(id){
		let file = document.getElementById(id).querySelectorAll('input')[0].files[0];
		this.uploadedFiles.push({[id]: file})
		var elem: any = document.getElementById(id).parentElement;
		elem.getElementsByTagName('ion-icon')[0].innerText = 'check';
	}

	segmentChanged(e){
		this.segments = e._value;
	}

	showNextSegment(){
		this.submitAttempt = true;
		this.setVehicleOwnerValidators();

		switch(this.segments){
			case 'basic':
				if(!this.basicForm.valid) return false;
				if(this.category == 'vehicle'){
					this.segments = 'vehicle';
				} else {
					this.segments = 'bank';
				}
			break;
			case 'vehicle':
				if(!this.vehicleForm.valid) return false;
				this.segments = 'bank';
			break;
			case 'bank':
				if(!this.bankForm.valid) return false;
				this.save()
			break;
			default:
				this.segments = 'basic';
			break;		
		}
	}

	save(){
		let formData: any = new FormData();

	    for (var i = 0; i < this.uploadedFiles.length; i++) {
	    	formData.append(Object.keys(this.uploadedFiles[i])[0], this.uploadedFiles[i][Object.keys(this.uploadedFiles[i])[0]]);
	    }
	    for(var j in this.basicForm.value){
	    	if(['upload_photo','upload_pan_card','upload_adhaar_card'].indexOf(j) == -1){
	    		formData.append(j, this.basicForm.value[j]);
	    	}
	    }
	    for(var k in this.vehicleForm.value){
	    	if(['upload_driving_licence'].indexOf(k) == -1 && this.vehicleForm.value[k] != 'null'){
	    		formData.append(k, this.vehicleForm.value[k]);
	    	}
	    }
	    for(var l in this.bankForm.value){
	    	if(['upload_cancelled_cheque','upload_bank_passbook'].indexOf(l) == -1 && this.bankForm.value[l] != 'null'){
	    		formData.append(l, this.bankForm.value[l]);
	    	}
	    }

	    console.log(formData);

	    this.showLoader = true;
	    this.http.put(APIURL+'service-providers/'+this.user.id+'?access-token='+this.user.token, formData)
	    .subscribe({
	    	next: response => {
				this.showLoader = false;

				const toast = this.toastController.create({
			      message: 'Your profile was successfully updated. You will be notified once your profile is approved.',
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
				console.error('There was an error!', error);
			}
	    })
	}

}
