import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AlertController, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { APIURL } from '../../app/apiconfig';
import { DatePipe } from '@angular/common';

/**
 * Generated class for the OrderDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-order-details',
  templateUrl: 'order-details.html',
})
export class OrderDetailsPage {
  showLoader: boolean = false;
  user:any = {};
  order_details :any = {};
  showDesc: boolean = false;
  description: string = '';
  updateName: string = '';
  orderStatus: string = '';
  constructor(public navCtrl: NavController,public datePipe: DatePipe,public toastSer: ToastController, public navParams: NavParams, public http: HttpClient, public storage: Storage, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderDetailsPage');
    this.storage.get('userinfo').then(result => {
      this.user = JSON.parse(result);
      this.loadOrderDetails();
    });
  }

  loadOrderDetails() {
    let order = this.navParams.get('order');
    this.showLoader = true;
  
    this.http.get<any>(APIURL+'orders/'+order.id+'?access-token='+this.user.token)
		.subscribe({
			next: data => {
				this.showLoader = false
        this.order_details = data;
        console.log('order_details is ', this.order_details);
        this.orderStatus = this.order_details.status;
        if (this.orderStatus == "Pending") {
          this.updateName = "Confirm Order";
        } else if (this.orderStatus == "Confirmed") { 
          this.updateName = "Delivered Order";
        }
        // this.order_details = data.orders;
			},
			error: err => {
				this.showLoader = false;
			}
		});
  }
  updateOrder() {
    // if (this.orderStatus == "Pending") {
    //   this.orderStatus = "Confirmed";
    //   this.updateName = "Delivered Order";
    // } else if (this.orderStatus == "Confirmed") {
    //   this.orderStatus = "Delivered";
    // }
    let dataObj = {};

    let date = new Date();
    let d = this.datePipe.transform(date,'yyyy-MM-dd HH:mm:ss');
    if (this.orderStatus == "Pending") {
      dataObj['status'] = "Confirmed";
    } else if (this.orderStatus == "Confirmed") {
      dataObj['status'] = "Complete";
      dataObj['completion_date'] = d;
    }
    this.showLoader = true;
    this.http.put<any>(APIURL+"orders/"+this.order_details.id+"?access-token="+this.user.token, dataObj)
      .subscribe({
        next: response => {
          this.showLoader = false;
          const toast = this.toastSer.create({
            message: 'Status updated successfully.',
            duration: 3000,
            cssClass: 'toast-success',
            position: 'top'
          });
        toast.present();
        if (this.orderStatus == "Pending") {
            this.orderStatus = "Confirmed";
            this.updateName = "Complete Order";
          } else if (this.orderStatus == "Confirmed") {
            // this.updateName = "Delivered Order";
            this.orderStatus = "Complete";
          }
        },error: err => {
          this.showLoader = false;
          alert('Something went wrong.')
        }
    })
    
    console.log('order detaisl are ', this.orderStatus, this.updateName);
  }
  handleAlert() {
    let alert = this.alertCtrl.create({
      title: 'Update Order',
      message: 'Do you want to update the order status?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.updateOrder();
          }
        }
      ]
    });
    alert.present();

  }
  openDesc(prod) {
		this.description = prod.description;
		this.showDesc = true;
	}
  closeDesc() {
		this.description = '';
		this.showDesc = false;
	}
}
