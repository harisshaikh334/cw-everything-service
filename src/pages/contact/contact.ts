import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import{ Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { APIURL } from '../../app/apiconfig';
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  public user: any = {};	
  public contactForm: FormGroup;
  public submitAttempt: boolean = false;
  public showLoader: boolean = false;

  constructor(public storage: Storage, private http: HttpClient, public formBuilder: FormBuilder, public navCtrl: NavController, public toastController: ToastController) {

  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(){
    this.contactForm = this.formBuilder.group({
      email: [this.user.email],
      message: ['', Validators.compose([
        Validators.required,
        Validators.minLength(25)
      ])],
    });
  }

  ionViewWillLoad(){
    this.storage.get('userinfo').then(result => {
      this.user = JSON.parse(result);
    });
  }

  sendMsg(){
    this.submitAttempt = true;
    
    if(!this.contactForm.get('message').valid){
      const toast = this.toastController.create({
        message: 'Please enter minimum 25 character message.',
        duration: 3000,
        cssClass: 'toast-danger',
        position: 'top'
      });
      toast.present(); 
      return false;
    }

    if(this.contactForm.valid){
      this.showLoader = true;
      var data = this.contactForm.value;

      this.http.post<any>(APIURL+'service-providers/enquiry?access-token='+this.user.token, data)
      .subscribe({
        next: data => {
          this.submitAttempt = false;
          this.showLoader = false;
          this.contactForm.get('message').setValue('');
          const toast = this.toastController.create({
            message: 'Message delivered successfully.',
            duration: 5000,
            cssClass: 'toast-success',
            position: 'top'
          });
          toast.present();
        },
        error: error => {
          this.submitAttempt = false;
          this.showLoader = false;
          const toast = this.toastController.create({
            message: error.error.msg,
            duration: 3000,
            cssClass: 'toast-danger',
            position: 'top'
          });
          toast.present();
        }
      });
    }
  }

}
