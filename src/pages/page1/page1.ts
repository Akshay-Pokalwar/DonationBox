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
  public myItem:any='';
  public myI:any;
  public myIt:any;
  
  // item: FirebaseObjectObservable<any[]>;
  lists:FirebaseListObservable<any[]>;
  constructor(public navCtrl: NavController, public af:AngularFire) {
    this.lists = af.database.list('/lists',{preserveSnapshot:true});
this.lists.subscribe((result:any)=>{
  result.forEach(result => {
    // console.log(result.key)
    //   console.log(result.val())
      this.myItem=this.myItem+result.key+':';
      this.myItem+=result.val()+'\n';
      
    });
      });
//     this.item = af.dat   abase.object('/item');
//     this.item.subscribe((result:any)=>{
//       console.log(result);
//       this.myItem = result.$key;
//       this.myItem = result.$value;
// });   
  }
  public login()
  {
    this.navCtrl.setRoot(LoginPage);
  }

}
