import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ConversationPage } from '../conversation/conversation';
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html'
})
export class ChatsPage {

  constructor(public navCtrl: NavController) {

  }

conversation(){
        this.navCtrl.push(ConversationPage)
  }  
    
    
}
