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
  public items:any=[];
  public uid:string;
  loggedin;
  // item: FirebaseObjectObservable<any[]>;
  lists:FirebaseListObservable<any[]>;
  constructor(public navCtrl: NavController, public af:AngularFire) {
    this.af.auth.subscribe(auth => {
      if(auth){
        this.uid=auth.uid;
        this.loggedin = true;
      }else{
        this.loggedin = false;
      }
    });
    this.lists = af.database.list('/lists',{preserveSnapshot:true});
    
    this.lists.subscribe((result:any)=>{
      this.items =[];
      for(var i=0; i<result.length; i++)
      {
        this.items[i]=result[i].val();
        this.items[i].key=result[i].key;
      }
      console.log(this.items)
    });

  }
  public login()
  {
    this.navCtrl.setRoot(LoginPage);
  }

  public canRemove(item:any)
  {
    if(this.uid == item.createdBy)
      return true;
    else
    return false;
  }
  public removeItem(item)
  {
    if(this.uid == item.createdBy)
    {
      this.lists.remove(item.key);
    }
  }
  // public add()
  // {
  //   this.lists.push({
  //     'name':'Crocin',
  //     'mfg_date':'11/2015',
  //     'exp_date':'12/2020',
  //     'addr':'Nanded',
  //     contact:{
  //       'phone':'8888004844',
  //       'email':'akshaypklwr@gmail.com'
  //     }
  //   }).then(
  //     (res)=>{console.log(res)},
  //     (err)=>{console.error(err)}
  //   );
  // }

}
