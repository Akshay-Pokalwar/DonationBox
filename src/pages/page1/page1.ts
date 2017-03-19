import { Component } from '@angular/core';
import { AngularFire, FirebaseObjectObservable,FirebaseListObservable} from 'angularfire2';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {
  public myItem:any;
  public myI:any;
  public myIt:any;
  
  item: FirebaseObjectObservable<any[]>;
  lists:FirebaseListObservable<any[]>;
  constructor(public navCtrl: NavController, public af:AngularFire) {
    this.item = af.database.object('/item');
    this.item.subscribe((result:any)=>{
      console.log(result);
      this.myItem = result.$value;
});
this.lists = af.database.list('/lists');
this.lists.subscribe((result:any)=>{
      console.log(result);
      
});
this.item.subscribe((result:any)=>{
      console.log(result);
      this.myItem = result.$value;
});


      
      
  }
  

}
