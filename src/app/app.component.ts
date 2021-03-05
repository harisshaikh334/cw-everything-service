import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
//import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//import { LanguagPage } from '../pages/languag/languag';
import { SigninPage } from '../pages/signin/signin';
import { TranslateService } from '../../node_modules/@ngx-translate/core';

@Component({
  templateUrl: 'app.html'
})
export class MyApp { 
  @ViewChild('myNav') nav: NavController
  rootPage:any = SigninPage;

 constructor(private platform: Platform, private splashScreen: SplashScreen, public translate:TranslateService) {
    this.initializeApp();
  }
  
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.translate.setDefaultLang('en');
      this.translate.use('en');

    });
  }

}