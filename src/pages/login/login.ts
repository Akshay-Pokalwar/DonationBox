import { Component } from '@angular/core';
// import { NavController, NavParams } from 'ionic-angular';
import { NavController} from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { AngularFire,AuthProviders,AuthMethods, FirebaseListObservable } from 'angularfire2';
import { Page2 } from '../page2/page2';
import { SignUpPage } from '../signup/signup';
import { AlertController } from 'ionic-angular';
import { Page1 } from '../page1/page1';

/*
  Generated class for the Login1 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public email:string='';
  public password:string='';
items: FirebaseListObservable<any[]>;
constructor(public navCtrl: NavController,public af: AngularFire,private _auth: AuthService,public alertCtrl: AlertController) {
    this.items = af.database.list('/items');
  }
  // constructor(public navCtrl: NavController, public navParams: NavParams) {}
signInWithEmail(): void {

  console.log("EMail="+this.email+":Password="+this.password)
  
      this.af.auth.login({
        email:  this.email,
        password: this.password
      },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
      }).then(
        (success) => {
        console.log(success);
         this.showAlert('Success!','Logged In');
        this.navCtrl.setRoot(Page2);
      }).catch(
        (err:any) => {
        console.log(err);
        this.showAlert(err.code,err.message);
      }).catch();
  
    
  }
   showAlert(x,y) {
    let alert = this.alertCtrl.create({
      title: x,
      subTitle: y,
      buttons: ['OK']
    });
    alert.present();
  }

public signup()
{
  this.navCtrl.setRoot(SignUpPage);
}
 public page1()
{
  this.navCtrl.setRoot(Page1);
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad Login1Page');
  }

}