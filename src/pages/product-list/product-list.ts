import { Component } from '@angular/core';
import { ActionSheetController, AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { APIURL } from '../../app/apiconfig';
import { HttpClient } from '@angular/common/http';
import { AddProductPage } from '../add-product/add-product';
import { ProductDetailPage } from '../product-detail/product-detail';

/**
 * Generated class for the ProductListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
})
export class ProductListPage {
  product_list = [
    
  ];
  public baseurl: string = APIURL;
  showLoader: boolean = false;
  user:any = {};
  constructor(public navCtrl: NavController,
               public navParams: NavParams,
               public toastController:ToastController,
               public storage: Storage,
               public actionsheet: ActionSheetController,
               private http: HttpClient,
               public alertCtrl: AlertController
    
            ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductListPage');
    this.storage.get('userinfo').then(result => {
		  this.user = JSON.parse(result);
      console.log('user is ', this.user);
      this.getProductList();
    });
    
  }

  getProductList() {
    this.showLoader = true;
    this.http.get<any>(APIURL+"products/product-list?key="+this.user.token+"&sp_id="+this.user.id,{})
    .subscribe({
      next: response => {
        this.showLoader = false;
        console.log('response is ', response);
        this.product_list = response;
      },
      error: err => {
        this.showLoader = false;
      }
    })
  }

  editProduct(item) {
    console.log('item is ', item);
    this.navCtrl.push(AddProductPage, {product: item});
  }

  goToAddProductPage() {
    this.navCtrl.push(AddProductPage);
  }

  goToDetail(item) {
    console.log('detail');
    this.navCtrl.push(ProductDetailPage, {product: item})
  }

  askDeleteCOnfirmation(item, index) {
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
            this.deleteProduct(item, index);
          }
        }
      ]
    });
    alert.present();
  }
  

  deleteProduct(item, index) {

    // return false;
    this.showLoader = true;
    this.http.get<any>(APIURL+"products/del-product?key="+this.user.token+"&id="+item.product_id,{})
    .subscribe({
      next: response => {
        this.showLoader = false;
        if (response.error == 0) {
          this.product_list.splice(index, 1);
          const toast = this.toastController.create({
            message: "Product deleted successfully.",
            duration: 2000,
            position: 'top'
          });
          toast.present();
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
