import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Platform, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { APIURL } from '../../app/apiconfig';
import { Storage } from '@ionic/storage';
import { ModalController } from 'ionic-angular';
import { GalleryModal } from 'ionic-gallery-modal';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'page-appointment_status',
  templateUrl: 'appointment_status.html'
})
export class Appointment_statusPage {

	showLoader: boolean = true;	
	order: any = {};
	customer: any = {}
	subcat: any = {}
	user: any = {};
	status_img: string = 'assets/imgs/ic_exp_pending_req.png';

	firebasePlugin;

	constructor(public navCtrl: NavController, public platform: Platform, public datePipe: DatePipe, public modalCtrl: ModalController, private alertCtrl: AlertController, public toast: ToastController, public storage: Storage, public navparams: NavParams, private http: HttpClient) {
		platform.ready().then(() => {
			if(platform.is('cordova')){
				//setting up notification on receive
		    	this.firebasePlugin = (<any>window).FirebasePlugin;
				this.firebasePlugin.onMessageReceived(this.onMessageReceived.bind(this));
			}
		});
	}

	ionViewWillLoad(){
		this.storage.get('userinfo').then(result => {
	        this.user = JSON.parse(result);
			this.loadAppointment();
		});
	}

	loadAppointment(){
		let id = this.navparams.get('id'); 
		this.http.get<any>(APIURL+'orders/'+id+'?access-token='+this.user.token)
		.subscribe({
			next: data => {
				this.showLoader = false;
				this.order = data;
				this.subcat = data.subcategory
				this.customer = data.customer;
				this.getImages();
			},
			error: error => {
				console.error('There was an error!', error);
			}
		});
	}

	onMessageReceived(message){
      if (message.tap) { 
        //do nothing
      } else {
        //received while app in foreground (show a toast)
        //reload current view
        let view = this.navCtrl.getActive();
        let id = this.navparams.get('id');
		if(view.component.name == 'Appointment_statusPage' && id == message.order_id){
			this.loadAppointment();
		}
      }
    }

	openPopup(index){
		let modal = this.modalCtrl.create(GalleryModal, {
		  photos: [{type: 'image', url: this.order.image[index]}],
		  initialSlide: 0
		});
		modal.present();
	}

	getImages(){
		switch(this.order.status){
			case 'Pending':
				this.status_img = 'assets/imgs/ic_exp_pending_req.png';
			break;
			case 'Quoted':
				this.status_img = 'assets/imgs/ic_exp_in_process.png';
			break;
			case 'Accepted':
			case 'Scheduled':
				if(this.order.quotation_approved == 'Y')
					this.status_img = 'assets/imgs/ic_exp_accepted.png';
				else
					this.status_img = 'assets/imgs/ic_exp_pending_req.png';
			break;
			case 'Complete':
				this.status_img = 'assets/imgs/ic_exp_finished.png';
			break;
			default:
				this.status_img = 'assets/imgs/ic_exp_pending_req.png';
			break;
		}
	}

	takeOrderNote(){
		let alert = this.alertCtrl.create({
	    title: 'Order Comment',
	    cssClass:'quotation',
	    inputs: [
	      {
	        name: 'note',
	        placeholder: 'Did you face any issues for this order?'
	      }
	    ],
	    buttons: [
	      {
	        text: 'Cancel',
	        role: 'cancel',
	        handler: data => {
	          console.log('Cancel clicked');
	        }
	      },
	      {
	        text: 'Submit',
	        handler: data => {
	          if (data.note.trim() == '' || data.length < 10) {
	            const toast = this.toast.create({
			      message: 'Please enter valid Comment. It should be minimum 10 characters.',
			      duration: 3000,
			      cssClass: 'toast-danger',
			      position: 'top'
			    });
			    toast.present();
			    return false;
	          } else {
	          	this.submitNote(data.note.trim());
	          }
	        }
	      }
	    ]
	  });
	  alert.present();	
	}

	submitNote(comment){
		this.showLoader = true;

		let order_id = this.navparams.get('id');
		let d = new Date();
		
		var data = {order_id: order_id, comment: comment, created_at: d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds(), note_from: 'Service Provider', from_id: this.user.id};

		let formData = new FormData();
		for ( var key in data ) {
		    formData.append(key, data[key]);
		}

		//sending api request
		this.http.post(APIURL+'order-notes?access-token='+this.user.token,formData)
		.subscribe({
			next: response => {
				this.showLoader = false;
				let alert = this.alertCtrl.create({
				    title: 'Success',
				    subTitle: 'Your Comment has been submitted successfully. We will call you incase we need your assistance.',
				    buttons: ['OK']
				  });
				alert.present();
			},
			error: err => {
				this.showLoader = false;
				console.error(err);
			}
		})
	}

	presentPrompt() {
	  let alert = this.alertCtrl.create({
	    title: 'Quotation',
	    cssClass:'quotation',
	    inputs: [
	      {
	        name: 'quote',
	        placeholder: 'Please enter amount.'
	      },
	      {
	        name: 'quotation_note',
	        placeholder: 'Note (if any).'
	      }
	    ],
	    buttons: [
	      {
	        text: 'Cancel',
	        role: 'cancel',
	        handler: data => {
	          console.log('Cancel clicked');
	        }
	      },
	      {
	        text: 'Send',
	        handler: data => {
	          if (isNaN(data.quote) || data.quote.trim() == '') {
	            const toast = this.toast.create({
			      message: 'Please enter valid Amount.',
			      duration: 3000,
			      cssClass: 'toast-danger',
			      position: 'top'
			    });
			    toast.present();
			    return false;
	          } else if(data.quote.toString().length > 7){
	          	const toast = this.toast.create({
			      message: 'Quotation amount cannot be greater than 7 digit.',
			      duration: 3000,
			      cssClass: 'toast-danger',
			      position: 'top'
			    });
			    toast.present();
			    return false;	
	          } else {
	          	this.submitQuote(data.quote.trim(), data.quotation_note.trim());
	          }
	        }
	      }
	    ]
	  });
	  alert.present();
	}

	submitQuote(amt, note){
		this.showLoader = true;

		let order_id = this.navparams.get('id');
		let d = new Date();
		
		var data = {id: order_id, quotation_date: d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds(), quotation: amt, quotation_note: note, status: 'Quoted'};

		let formData = new FormData();
		for ( var key in data ) {
		    formData.append(key, data[key]);
		}

		//sending api request
		this.http.put<any>(APIURL+'orders/'+order_id+'?access-token='+this.user.token,formData)
		.subscribe({
			next: response => {
				this.showLoader = false;
				if(response.error == 1){
					let alert = this.alertCtrl.create({
					    title: 'Error',
					    subTitle: response.msg,
					    buttons: ['OK']
					  });
					alert.present();
				} else {
					this.order.status = 'Quoted';
					this.order.quotation = amt;
					this.order.quotation_note = note;
					this.order.quotation_date = new Date().getTime();
					this.getImages();
					let alert = this.alertCtrl.create({
					    title: 'Success',
					    subTitle: 'Your Quotation has been sent successfully. You will be notified once customer reacts on it.',
					    buttons: ['OK']
					  });
					alert.present();
				}
			},
			error: err => {
				this.showLoader = false;
				console.error(err);
			}
		})
	}

	presentFinish() {
	  let alert = this.alertCtrl.create({
	    title: 'Finish Job',
	    subTitle: 'Are you sure, the job is complete?',
	    buttons: [
	      {
	        text: 'Cancel',
	        role: 'cancel',
	        handler: data => {
	          console.log('Cancel clicked');
	        }
	      },
	      {
	        text: 'YES',
	        handler: data => {
	          let date = new Date();
	          let d = this.datePipe.transform(date,'yyyy-MM-dd HH:mm:ss');	
	          this.http.put<any>(APIURL+"orders/"+this.order.id+"?access-token="+this.user.token, {'status':'Complete', 'completion_date': d})
	          .subscribe({
	          	next: response => {
	          		const toast = this.toast.create({
				      message: 'Job finished successfully.',
				      duration: 3000,
				      cssClass: 'toast-success',
				      position: 'top'
				    });
				    toast.present();
				    setTimeout(() => this.navCtrl.pop(), 2000);
	          	},
	          	error: err => {

	          	}
	          })
	        }
	      }
	    ]
	  });
	  alert.present();
	}

	onImageLoad(e){
		e.classList.add('visible')
	  	e.classList.remove('invisible')
	}

}
