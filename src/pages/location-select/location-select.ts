import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationAccuracy } from '@ionic-native/location-accuracy';

@Component({
  selector: 'page-location-select',
  templateUrl: 'location-select.html'
})
export class LocationSelect {

	searchDisabled = true;
    saveDisabled = true;
    markers = [];
    geocoder: any = {};
    GoogleAutocomplete: any = {};
	autocomplete = { input: '', lat: '', lng: '' };
	autocompleteItems = [];
	map: any = {}
	mapsScriptUrl: string = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCafBAru90axG3nmROSa_5A7__k_0wChpc&v=3.exp&libraries=places'
    
    constructor(public navCtrl: NavController, private locationAccuracy: LocationAccuracy, private zone: NgZone, private geolocation: Geolocation) {
    	
    }

    ionViewDidLoad(){
    	this.locationAccuracy.canRequest().then((canRequest: boolean) => {
		  if(canRequest) {
		    // the accuracy option will be ignored by iOS
		    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
		    .then(
		      () => this.tryGeolocation(this),
		      error => this.tryGeolocation(this)
		    );
		  }
		});
    }

    ionViewDidEnter(){
    	this.geocoder = new google.maps.Geocoder;
    	this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
		//Set latitude and longitude of some place
		this.map = new google.maps.Map(document.getElementById('map'), {
			center: { lat: 19.076090, lng: 72.877426 },
			zoom: 15
		});
	}

	searchPlace(){
	  if (this.autocomplete.input == '') {
	    this.autocompleteItems = [];
	    return;
	  }
	  this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
		(predictions, status) => {
	    this.autocompleteItems = [];
	    this.zone.run(() => {
	    	if(predictions != null){
		      predictions.forEach((prediction) => {
		        this.autocompleteItems.push(prediction);
		      });
		    } else {
		    	this.autocompleteItems = [];
		    }
	    });
	  });
	}

	tryGeolocation(that){
		this.geolocation.getCurrentPosition().then((position) => {
			var pos = {
			  lat: position.coords.latitude,
			  lng: position.coords.longitude
			};
			let marker = new google.maps.Marker({
		      position: pos,
		      map: that.map,
		      title: 'I am here!'
		    });
		    that.markers = [];
		    that.markers.push(marker);
			that.map.setCenter(pos);
		})
		.catch(err => {
			console.error(err)
		});
	}

	selectPlace(item){
	  this.autocompleteItems = [];
	  this.autocomplete.input = item.description;
	  this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
	    if(status === 'OK' && results[0]){
	      this.autocomplete.lat = results[0].geometry.location.lat();
	      this.autocomplete.lng = results[0].geometry.location.lng();
	      let marker = new google.maps.Marker({
	        position: results[0].geometry.location,
	        map: this.map,
	      });
	      this.markers = [];
	      this.markers.push(marker);
	      this.map.setCenter(results[0].geometry.location);
	      this.saveDisabled = false;
	      console.log(this.autocomplete)
	    } else {
	    	alert('Some error, Please try again!');
	    }
	  })
	}

	close(){
		this.navCtrl.pop();
	}

	goBackWithCoords(){
		this.navCtrl.getPrevious().data.lat = this.autocomplete.lat;
		this.navCtrl.getPrevious().data.lng = this.autocomplete.lng;
		this.navCtrl.getPrevious().data.address = this.autocomplete.input;
		this.navCtrl.pop()
	}
}	