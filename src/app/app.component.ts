import { Component } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { HttpClient } from '@angular/common/http';
// import { StatusBar, Style } from '@capacitor/status-bar';
// import { SplashScreen } from '@capacitor/splash-screen';
import { Browser } from '@capacitor/browser';


declare var wkWebView: any
declare var cordova: any
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  constructor(
    private oneSignal: OneSignal, 
    private platform: Platform, 
    private statusBar: StatusBar, 
    private splashScreen: SplashScreen, 
    private androidPermissions: AndroidPermissions,
    private http: HttpClient,
    private inAppBrowser : InAppBrowser
    ) {
    this.initializeApp();
    // this.statusBar.overlaysWebView(true);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      // if(this.platform.is('cordova')){
      this.statusBar.backgroundColorByHexString('#ffffff');
      // StatusBar.setStyle({ style: Style.Light });
      // SplashScreen.hide();
      this.splashScreen.hide();
      // Browser.open({ url: 'https://gapo.vn/' });
      let browser = this.inAppBrowser.create('https://lingyo.vn/','_self',{zoom:'no', location:'no'});
      browser.show();
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
        result => console.log('Has permission?',result.hasPermission),
        err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
      );
      
      this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA]);
      this.oneSignal.startInit('efa501b3-8346-4a6f-a6d8-2015fdb115b6', '991376111507');
      // this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

      this.oneSignal.handleNotificationReceived().subscribe(() => {
      });

      this.oneSignal.handleNotificationOpened().subscribe(() => {
      });

      this.oneSignal.endInit()
  // }
      this.oneSignal.getIds().then(identity => {
        this.http.post('https://lingyo.vn/userToken', { token: identity.userId }).subscribe(data => {});
      });                        
    });
  }
}
