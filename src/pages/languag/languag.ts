import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SigninPage } from '../signin/signin';
@Component({
  selector: 'page-languag',
  templateUrl: 'languag.html'
})
export class LanguagPage {

  constructor(public navCtrl: NavController) {

  }
 signin(){
        this.navCtrl.setRoot(SigninPage)
  } 

}
