import { Component } from '@angular/core';
import { NavController, Platform, PopoverController, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { APIURL } from '../../app/apiconfig';
//import { Geolocation } from '@ionic-native/geolocation';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationEvents, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Appointment_statusPage } from '../appointment_status/appointment_status';
import {My_profilePage } from '../my_profile/my_profile';
import { PopoverPage } from '../popover/popover';

@Component({
  selector: 'page-appointments',
  templateUrl: 'appointments.html'
})
export class AppointmentsPage {
	appointments_tab: string = "upcoming";
	showLoader: boolean = false;
	approved: any = null;
	pancard: string = '';
	orders: any = [];
	orderStack: any = [];
	user : any = {};
	showfee: boolean = false;
	filterVal: string = 'All';

	firebasePlugin;

	constructor(private locationAccuracy: LocationAccuracy, public toastController: ToastController, public diagnostic: Diagnostic, public navCtrl: NavController, public popoverController: PopoverController, public platform: Platform, private backgroundGeolocation: BackgroundGeolocation, public storage: Storage, private http: HttpClient) {
		
	}

	onViewDidEnter(){
		this.platform.ready().then(() => {
			if(this.platform.is('cordova')){
				this.diagnostic.isLocationEnabled()
			    .then(function (available) {
			      if(!available){
			      	this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
			      }
			    }).catch(function (error) {
			      alert("The following error occurred: " + error);
			    });

			    //setting up notification on receive
		    	this.firebasePlugin = (<any>window).FirebasePlugin;
				this.firebasePlugin.onMessageReceived(this.onMessageReceived.bind(this));
			}
		});
	}

	onMessageReceived(message){
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
        //reload current view
        let view = this.navCtrl.getActive();
		if(view.component.name == 'AppointmentsPage'){
			this.loadAppointments();
		}
      }
    }

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

	ionViewWillLoad(){
		this.storage.get('userinfo').then(result => {
        	this.user = JSON.parse(result);

        	//check this approval status in order api, no need to separately hit this.
        	this.loadAppointments();

			//getting unpaid services
			this.http.get<any>(APIURL+'service-providers/unpaid-services?access-token='+this.user.token)
			.subscribe({
				next: data => {
					this.showLoader = false;
					if(data.cnt > 0){
						this.showfee = true;
					}
				},
				error: error => {
					console.error('There was an error!', error);
				}
			});


        });
	}

	loadAppointments(){
		this.showLoader = true;
		this.http.get<any>(APIURL+'orders?access-token='+this.user.token+'&where[sp_id]='+this.user.id)
		.subscribe({
			next: data => {
				this.showLoader = false;
				this.approved = data.approved;
				this.pancard = data.pancard;
				this.orders = data.orders;
				this.orderStack = data.orders;

				if(data.online == 1 && data.is_automobile > 0 && this.platform.is('cordova')){
					this.startWatch();
				}
			},
			error: error => {
				console.error('There was an error!', error);
			}
		});
	}

	doRefresh(refresher) {
	    this.loadAppointments();

	    let interval = setInterval(() => {
	      if(this.showLoader == false){
	      	refresher.complete();
	      	clearInterval(interval)
	      }
	    }, 1000);
	}

	filterOrders(type){
		if(typeof this.orders != 'undefined'){
			if(type == 'Past'){
				return this.orders.filter(x => x.status == 'Complete' || x.status == 'Rejected' || x.status == 'Cancelled');
			} else {
				return this.orders.filter(x => x.status != 'Complete' && x.status != 'Rejected' && x.status != 'Cancelled');
			}
		} else {
			return [];
		}
	}

	openPopover(ev){
		const popover = this.popoverController.create(PopoverPage,{filter: this.filterVal});
		popover.onDidDismiss(data => {
			if(data){
				this.filterVal = data.value;
				if(data.value == 'All'){
					this.orders = this.orderStack;	
				} else {
					this.orders = this.orderStack.filter(x => x.status == this.filterVal);	
				}
			}
	    });
	    popover.present({
	    	ev: ev
	    });
	}

	openPay(){
		window.open("https://everythingservices.in/pay-fee/"+this.user.id,'_system', 'location=yes');
	}
  
	appointment_status(id){
		this.navCtrl.push(Appointment_statusPage, {id: id})
	}

	my_profile(){
	    this.navCtrl.push(My_profilePage)
	}
}
