import { Component } from '@angular/core';
import { AngularFire,FirebaseListObservable} from 'angularfire2';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html'
})
export class Page2 {
  public name:string='';
  public mfg_date:string='';
  public exp_date:string='';
  public address:string='';
  public phone:string='';
  public email:string='';
  public uid:string='';
  
  
  selectedItem: any;
  
lists:FirebaseListObservable<any[]>;
loggedin;
  constructor(public navCtrl: NavController, public navParams: NavParams, public af:AngularFire,public alertCtrl: AlertController) {
        this.af.auth.subscribe(auth => 
        {
          if(auth){
            this.uid=auth.uid;
            this.loggedin = true;
          }else{
            this.loggedin = false;
          }
        });
        this.lists = af.database.list('/lists',{preserveSnapshot:true});
  }
  add()
    {
        this.lists.push({
      'name':this.name,
      'mfg_date':this.mfg_date,
      'exp_date':this.exp_date,
      'addr':this.address,
      contact:{
        'phone':this.phone,
        'email':this.email
      },
      createdBy:this.uid
    }).then(
      (res)=>{console.log(res)
      this.showAlert('Success!','Record inserted');},
      (err:any)=>{console.error(err)
    this.showAlert(err.code,err.message);  
    }
    );
     }
showAlert(x,y) {
    let alert = this.alertCtrl.create({
      title: x,
      subTitle: y,
      buttons: ['OK']
    });
    alert.present();
  }
 
public logout()
  {
    this.af.auth.logout();
    this.navCtrl.setRoot(LoginPage);
  }
  
}
