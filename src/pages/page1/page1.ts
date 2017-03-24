import { Component } from '@angular/core';
import { AngularFire,FirebaseListObservable} from 'angularfire2';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
// , FirebaseObjectObservable
@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {
  public items:any='';
  
  // item: FirebaseObjectObservable<any[]>;
  lists:FirebaseListObservable<any[]>;
  constructor(public navCtrl: NavController, public af:AngularFire) {
  
    this.lists = af.database.list('/lists',{preserveSnapshot:true});
    
    this.lists.subscribe((result:any)=>{
      this.items = result;
      console.log(this.items)
    });

  }
  public login()
  {
    this.navCtrl.setRoot(LoginPage);
  }
  public add()
  {
    this.lists.push({
      'name':'Crocin',
      'mfg_date':'11/2015',
      'exp_date':'12/2020',
      'addr':'Nanded',
      contact:{
        'phone':'8888004844',
        'email':'akshaypklwr@gmail.com'
      }
    }).then(
      (res)=>{console.log(res)},
      (err)=>{console.error(err)}
    );
  }

}
