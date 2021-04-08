import { Component } from '@angular/core';
import { ActionSheetController, AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { APIURL, UNIT_LIST } from '../../app/apiconfig';
import { TabsPage } from '../tabs/tabs';
import { HttpClient } from '@angular/common/http';
import { AddProductPage } from '../add-product/add-product';

/**
 * Generated class for the ProductDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {
  public baseurl: string = APIURL;
  product_detail:any ;
  showLoader: boolean = false;
  user: any = {};
  unit_obj = {};
  constructor(public navCtrl: NavController,public toastController:ToastController,public alertCtrl: AlertController, public storage: Storage,public actionsheet: ActionSheetController,private http: HttpClient, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
    this.storage.get('userinfo').then(result => {
		  this.user = JSON.parse(result);
    });
    UNIT_LIST.forEach(element => {
      this.unit_obj[element.value] = element.name
    });
    this.product_detail = this.navParams.get('product');
  }
 
  askDeleteConfirmation(item, index) {
    let alert = this.alertCtrl.create({
      title: 'Delete Product',
      message: 'Are you sure you want to delete this product?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            console.log('Buy clicked');
            this.deleteProduct();
          }
        }
      ]
    });
    alert.present();
  }

  editProduct(item) {
    console.log('item is ', item);
    this.navCtrl.push(AddProductPage, {product: this.product_detail});
  }

  deleteProduct(){
    this.showLoader = true;
    this.http.get<any>(APIURL+"products/del-product?key="+this.user.token+"&id="+this.product_detail.product_id,{})
    .subscribe({
      next: response => {
        this.showLoader = false;
        if (response.error == 0) {
          const toast = this.toastController.create({
            message: "Product deleted successfully.",
            duration: 2000,
            position: 'top'
          });
          toast.present();
          this.navCtrl.setRoot(TabsPage);
        } else {
          const toast = this.toastController.create({
            message: response.message,
            duration: 2000,
            cssClass: 'toast-danger',
            position: 'top'
          });
          toast.present();
        }
        console.log('response is ', response);
      },
      error: err => {
        this.showLoader = false;
        const toast = this.toastController.create({
          message: "Something went wrong.",
          duration: 2000,
          cssClass: 'toast-danger',
          position: 'top'
        });
        toast.present();
      }
    })
  }
}
