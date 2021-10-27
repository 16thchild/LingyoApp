import { Component } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { BrowserTab } from '@ionic-native/browser-tab/ngx';
import { Platform } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  constructor(private inAppBrowser : InAppBrowser, private platform : Platform, private browserTab : BrowserTab, public googlePlus: GooglePlus) {
    // platform.ready().then(() => {
    //   let browser = this.inAppBrowser.create('https://lingyo.vn/','_blank',{zoom:'no', location:'no', camera: 'yes'});
    //   browser.show();
    // })
    this.platform.backButton.subscribeWithPriority(10, () => {
      window.history.back();
    });
  }
  
  login(){
    this.googlePlus.login({})
    .then(res => console.log(res))
    .catch(err => console.error(err));
  }
}