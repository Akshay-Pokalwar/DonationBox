import { Component } from '@angular/core';
// import { NavController, NavParams } from 'ionic-angular';
import { NavController} from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';


/*
  Generated class for the Login1 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login1',
  templateUrl: 'login1.html',
})
export class Login1Page {
items: FirebaseListObservable<any[]>;
constructor(public navCtrl: NavController,af: AngularFire,private _auth: AuthService) {
    this.items = af.database.list('/items');
  }
  // constructor(public navCtrl: NavController, public navParams: NavParams) {}
signInWithFacebook(): void {
    this._auth.signInWithFacebook()
      .then(() => this.onSignInSuccess());
  }

  private onSignInSuccess(): void {
    console.log("Facebook display name ",this._auth.displayName());
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Login1Page');
  }

}