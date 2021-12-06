import { Component } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Plugins, StatusBarStyle } from '@capacitor/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { HttpClient } from '@angular/common/http';
import { Http } from '@capacitor-community/http';

// const { StatusBar } = Plugins;
// const { Browser } = Plugins;
declare var cordova: any;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  constructor(
    private oneSignal: OneSignal, 
    private platform: Platform, 
    private splashScreen: SplashScreen, 
    private statusBar: StatusBar,
    private androidPermissions: AndroidPermissions,
    private http: HttpClient,
    ) {
    this.initializeApp();
    // this.statusBar.overlaysWebView(true);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString("#ffffff");
      // if(this.platform.is('cordova')){
      // StatusBar.setStyle({style: StatusBarStyle.Dark});
      this.splashScreen.hide();
      cordova.InAppBrowser.open("https://lingyo.vn", "_blank", "location=no, zoom=no, toolbar=no, hidenavigationbuttons=yes")
      window.open = cordova.InAppBrowser.open;
      // Browser.open({ url: 'https://lingyo.vn/' });
      // const doGet = () => {
      //   const options = {
      //     url: 'https://lingyo.vn',
  
      //   }

      //   Http.request({ ...options, method: 'GET'});
      // }
      // doGet();

      cordova.plugins.iosrtc.registerGlobals();
      var adapterVersion = 'latest';
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://webrtc.github.io/adapter-" + adapterVersion + ".js";4
      script.async = false;
      document.getElementsByTagName("head")[0].appendChild(script);

      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
        result => console.log('Has permission?',result.hasPermission),
        err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
      );
      
      this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA]);
      this.oneSignal.startInit('efa501b3-8346-4a6f-a6d8-2015fdb115b6', '991376111507');
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

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
