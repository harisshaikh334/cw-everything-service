import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationEvents, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
//import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Diagnostic } from '@ionic-native/diagnostic';
import * as ionicGalleryModal from 'ionic-gallery-modal';
//import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

import { AboutPage } from '../pages/about/about';
import { All_reviewsPage } from '../pages/all_reviews/all_reviews';
import { AccountPage } from '../pages/account/account';
import { Appointment_statusPage } from '../pages/appointment_status/appointment_status';
import { AppointmentsPage } from '../pages/appointments/appointments';
import { CategoryPage } from '../pages/category/category';
import { ChatsPage } from '../pages/chats/chats';
import { ContactPage } from '../pages/contact/contact';
import { ConversationPage } from '../pages/conversation/conversation';
import { FaqPage } from '../pages/faq/faq';
import { ForgotPage } from '../pages/forgot/forgot';
import { LanguagPage } from '../pages/languag/languag';
import { My_profilePage } from '../pages/my_profile/my_profile';
import { NotificationPage } from '../pages/notification/notification';
import { Purchase_planPage } from '../pages/purchase_plan/purchase_plan';
import { RatingsPage } from '../pages/ratings/ratings'; 
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup'; 
import { SubscriptionPage } from '../pages/subscription/subscription'; 
import { TabsPage } from '../pages/tabs/tabs';
import { PickerPage } from '../pages/picker/picker';
import { LocationSelect } from '../pages/location-select/location-select';
import { EarningsPage } from '../pages/earnings/earnings';
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { PopoverPage } from '../pages/popover/popover';
 
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    All_reviewsPage,
    AccountPage,
    Appointment_statusPage,
    AppointmentsPage,
    CategoryPage,
    ChatsPage,
    ContactPage,
    ConversationPage,
    FaqPage,
    ForgotPage,
    LanguagPage,
    My_profilePage,
    NotificationPage,
    Purchase_planPage,
    RatingsPage,
    SigninPage,
    SignupPage,
    SubscriptionPage,
    TabsPage,
    PickerPage,
    LocationSelect,
    EarningsPage,
    ChangePasswordPage,
    PopoverPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ionicGalleryModal.GalleryModalModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    All_reviewsPage,
    AccountPage,
    Appointment_statusPage,
    AppointmentsPage,
    CategoryPage,
    ChatsPage,
    ContactPage,
    ConversationPage,
    FaqPage,
    ForgotPage,
    LanguagPage,
    My_profilePage,
    NotificationPage,
    Purchase_planPage,
    RatingsPage,
    SigninPage,
    SignupPage,
    SubscriptionPage,
    TabsPage,
    PickerPage,
    LocationSelect,
    EarningsPage,
    ChangePasswordPage,
    PopoverPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    DatePipe,
    Geolocation,
    Diagnostic,
    BackgroundGeolocation,
    LocationAccuracy,
    ionicGalleryModal.GalleryModalHammerConfig,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
