import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { APIURL } from '../../app/apiconfig';

@Component({
  selector: 'page-picker',
  templateUrl: 'picker.html',
})

export class PickerPage {

  public skills: any = [];
  public filteredskills: any = [];
  public subcat_id: any = [];
  public fee: any = 0.00;
  public total: any = 0.00;
  public ids: any = [];
  public names: any = [];
  public showLoader: boolean = true;
  public multi_fee: number = 0;


  constructor(public navCtrl: NavController, public navparams: NavParams, private http: HttpClient) {
  }

  ionViewDidLoad() {

    this.http.get(APIURL+'service-providers/skills').subscribe({
      next: (data) => {
        this.skills = this.filteredskills = data;
        this.showLoader = false;
      },
      error: (err) => {
        console.error(err)
      }
    })

    //getting multi fee value
    this.http.get(APIURL+'service-providers/settings').subscribe({
      next: (data: any) => {
        this.multi_fee = data.value;
        this.showLoader = false;
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  filterItems(searchTerm) {
    let newArr = [];
    this.skills.filter(item => {
      let cat  = item.category;
      let subcatArr = []
      item.subcat.forEach(function(a){
        if(a.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1){
          subcatArr.push(a)
        }
      })
      if(subcatArr.length > 0){
        newArr.push({category: cat, subcat: subcatArr});
      }
    });
    this.filteredskills = newArr;
  }

  ionViewDidEnter(){
    if(typeof this.navparams.get('ids') != 'undefined'){
      let ids = this.navparams.get('ids');
      for(var i = 0; i < ids.length; i++ ){
        this.subcat_id[ids[i]] = true;
      }
    }
  }

  updateSelected(obj){
  	if(this.subcat_id[obj.id] === true){
  		this.fee += parseFloat(obj.registration_cost);
  		this.ids.push(obj.id)
  		this.names.push(obj.name)
  	} else {
  		this.fee -= parseFloat(obj.registration_cost);
  		this.ids.splice(this.ids.indexOf(obj.id),1);
  		this.names.splice(this.names.indexOf(obj.name),1);
  	}

    if(this.subcat_id.length > 1 && this.fee > this.multi_fee){
      this.total = this.multi_fee
    } else {
      this.total = this.fee
    }
  }

  goBackWithSkills(){
  	this.navCtrl.getPrevious().data.ids = this.ids.join(', ');
  	this.navCtrl.getPrevious().data.names = this.names.join(', ');
  	this.navCtrl.pop()
  }

}
