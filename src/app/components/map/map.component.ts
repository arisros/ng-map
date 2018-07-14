import { ViewChild, ElementRef, NgZone, EventEmitter, Output } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { } from '@types/googlemaps';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  public locationSelected = false;
  public faArrowLeft = faArrowLeft;

  @ViewChild('search')
  public searchElementRef: ElementRef;
  @Input('fullscreen')
  public fullscreen;
  @Output()
  public closeEvent = new EventEmitter;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private mapService: MapService
  ) { }

  ngOnInit() {
    this.zoom = 4;
    this.latitude = 0.789275;
    this.longitude = 113.92132700000002;

    this.searchControl = new FormControl();
    this.initMap();
  }

  public onClose() {
    this.fullscreen = false;
    this.closeEvent.emit(this.fullscreen);
  }

  public initMap() {
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: []
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.locationSelected = true;
          // set latitude, longitude and zoom
          // console.log(place.name);
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 15;
        });
      });
    });
  }

  public markerDrag(e) {
    this.mapService.getLocation(e.coords.lat, e.coords.lng).subscribe((location: Res) => {
      if (location.results) {
        this.setLocation(location.results[0].formatted_address);
      }
    })
  }

  public setPostition(latLng) {

  }

  private setLocation(str) {
    this.searchControl.setValue(str);
  }

  public markerIconUrl() {
    return require('../../../assets/marker.png');
  }

  public selectLocation() {
    this.fullscreen = false;
    // todo
  }

}


interface Res {
  results: object;
}
