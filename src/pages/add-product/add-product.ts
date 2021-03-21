import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActionSheetController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { APIURL, UNIT_LIST } from '../../app/apiconfig';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the AddProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
})
export class AddProductPage {
  showLoader: boolean = false;
  pageHeading = "Add Product";
  btnHeading = "Add Product"
  public productForm: FormGroup;
  public submitAttempt: boolean = false;
  user:any = {};
  product_image:any;
  edit_form: boolean = false;
  product_detail = {};
  unit_list = UNIT_LIST;
  image_update: boolean = true;
  constructor(public navCtrl: NavController,public toastController:ToastController, public storage: Storage,public actionsheet: ActionSheetController,private http: HttpClient, public navParams: NavParams, public formBuilder: FormBuilder, public camera: Camera) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProductPage');
    this.storage.get('userinfo').then(result => {
		  this.user = JSON.parse(result);
    });
    this.product_detail = this.navParams.get('product');
    if (this.product_detail) {
      this.edit_form = true;
    }
    this.buildForm();
    
  }
  onSelImage(files) {
    console.log('files => ', files.length);
    if (files.length == 0) {
      return false;
    }
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = (_event) => {
      this.image_update = true;
      this.product_image = reader.result;
    }
}
  buildForm(){
		this.productForm = this.formBuilder.group({
			product_name: ['', Validators.compose([Validators.maxLength(100), Validators.pattern('^[0-9A-Za-zÀ-ÿ\s,._+; ()*~#@!?&-]+$'), Validators.required])],
			product_unit: ['', Validators.compose([ Validators.required, Validators.maxLength(10)])],
			unit_value: ['', Validators.compose([ Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9{10}]+$')])],
			sale_price: ['', Validators.compose([ Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9{10}]+$')])],
			product_mrp: ['', Validators.compose([ Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9{10}]+$')])],
			discount_price: ['', Validators.compose([ Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9{10}]+$')])],
			in_stock: ['', Validators.compose([ Validators.required, Validators.pattern('^[0-9]*\.?[0-9]*$')])],
			description: ['', Validators.compose([ Validators.required])]
		});
    if (this.edit_form) {
      console.log('edit form ', this.product_detail);
      this.productForm.patchValue({
        product_name: this.product_detail['product_name'], 
        product_unit: this.product_detail['unit'], 
        unit_value: this.product_detail['unit_value'], 
        sale_price: this.product_detail['sale_price'], 
        product_mrp: this.product_detail['mrp'], 
        discount_price: this.product_detail['discount'], 
        in_stock:this.product_detail['stock'] , 
        description: this.product_detail['description'], 
      });
      this.product_image = this.product_detail['image'];
    }
        
	}

  actionSheetFile(){
		let actionSheet = this.actionsheet.create({
	     title: 'Set your display picture',
	     buttons: [
	        {
	         text: 'Browse Photo Albums',
	         role: 'destructive',
	         handler: () => {
	          const options: CameraOptions = {
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: this.camera.DestinationType.DATA_URL,
            correctOrientation: true
				  };

          this.camera.getPicture(options).then((imageData) => {
            let base64Image = 'data:image/jpeg;base64,' + imageData
            this.product_image = base64Image;
            this.image_update = true;
            
          })
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
            this.product_image = base64Image;

            this.image_update = true;
            
            })
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

  addProduct() {
    this.submitAttempt = true;
    console.log('form data ', this.productForm.valid, APIURL, this.productForm.get('product_name').value);
    if (!this.productForm.valid) {
      return false;
    }
    let values = this.productForm.value;
    if (Number(values.sale_price) > Number(values.product_mrp)) {
      const toast = this.toastController.create({
        message: "Sale price cannot be grater than mrp price.",
        duration: 4000,
        cssClass: 'toast-danger',
        position: 'top'
      });
      toast.present();
      return false;
    }
    var formdata: any = new FormData();
    this.showLoader = true;
   
    if (this.edit_form) {
      formdata.append("id", this.product_detail['product_id']);
    }
    formdata.append('sp_id', this.user.id);
    formdata.append('name', this.productForm.get('product_name').value);
    formdata.append('description', this.productForm.get('description').value);
    formdata.append('mrp', this.productForm.get('product_mrp').value);
    formdata.append('sale_price', this.productForm.get('sale_price').value);
    formdata.append('discount', this.productForm.get('discount_price').value);
    formdata.append('unit', this.productForm.get('product_unit').value);
    formdata.append('unit_value', this.productForm.get('unit_value').value);
    formdata.append('stock', this.productForm.get('in_stock').value);
    if (this.image_update) {
      formdata.append('file', this.product_image);
    }
    let url = APIURL+"products/product-create?token="+this.user.token;
    if (this.edit_form) {
      url = APIURL+"products/update-product?token="+this.user.token;
    }
    this.http.post<any>(url, formdata)
    .subscribe({
      next: response => {
        this.showLoader = false;
        console.log('response is ', response);
        if(response && response.error && response.error == 1){
          const toast = this.toastController.create({
              message: response.reason,
              duration: 4000,
              cssClass: 'toast-danger',
              position: 'top'
            });
            toast.present();
        }
        else {
          const toast = this.toastController.create({
            message: this.edit_form ? "Product Updated Successfully" : "Product Created Sucessfully.",
            duration: 4000,
            position: 'top'
          });
          toast.present();
          this.navCtrl.push(TabsPage);
        }
      },
      error: err => {
        console.log(err);
        this.showLoader = false;
        const toast = this.toastController.create({
          message: "Something went wrong",
          duration: 4000,
          position: 'top'
        });
        toast.present();
      }
    })
  }

}
