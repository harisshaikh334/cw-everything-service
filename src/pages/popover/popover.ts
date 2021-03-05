import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {

  filter: string = ''	

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams) {
    this.filter = navParams.get('filter');
  }

  handleInput() {
  	if(this.filter != ''){
    	setTimeout(() => this.viewCtrl.dismiss({value: this.filter}), 500);
    }
  }

}
