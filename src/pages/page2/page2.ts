import { Component } from '@angular/core';
import { AngularFire,FirebaseListObservable} from 'angularfire2';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import {Camera} from "ionic-native";

@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html',
  providers:[Camera]
})
export class Page2 {
  public name:string='';
  public mfg_date:string='';
  public exp_date:string='';
  public address:string='';
  public phone:string='';
  public email:string='';
  public uid:string='';
  //adding Camera
  public base64Image: string;

  
  selectedItem: any;
  
lists:FirebaseListObservable<any[]>;
loggedin;
  constructor(public navCtrl: NavController, public navParams: NavParams, public af:AngularFire,public camera: Camera,public alertCtrl: AlertController) {
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
        //adding Camera
        this.base64Image = "https://placehold.sssit/150x150";
  this.base64Image = "https://placehold.it/150x150";
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
  public login()
  {
    this.navCtrl.push(LoginPage);
  }
  //adding camera
  public takePicture() {
        Camera.getPicture({
            quality : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            saveToPhotoAlbum: false
        }).then(imageData => {
            this.base64Image = "data:image/jpeg;base64," + imageData;
        }, error => {
            console.log("ERROR -> " + JSON.stringify(error));
        });
  }  
}
