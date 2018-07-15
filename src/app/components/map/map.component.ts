import { ViewChild, ElementRef, NgZone, EventEmitter, Output } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { } from '@types/googlemaps';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

import { MapService } from '../../services/map.service';
import { HistoryService } from '../../services/history.service';

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
  public faMapMarkerAlt = faMapMarkerAlt;
  public savedLocation = [];

  @ViewChild('search')
  public searchElementRef: ElementRef;
  @Input('fullscreen')
  public fullscreen;
  @Output()
  public closeEvent = new EventEmitter;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private mapService: MapService,
    private historyService: HistoryService
  ) { }

  ngOnInit() {
    this.zoom = 4;
    this.latitude = 0.789275;
    this.longitude = 113.92132700000002;

    this.searchControl = new FormControl();
    this.savedLocation = this.historyService.locationHistory();
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
          this.searchControl.setValue(place.name);
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 13;
        });
      });
    });
  }

  public markerDrag(e) {
    this.mapService.getLocation(e.coords.lat, e.coords.lng).subscribe((location: Res) => {
      if (location.results) {
        this.searchControl.setValue(location.results[0].formatted_address);
        this.latitude = location.results[0].geometry.location.lat;
        this.longitude = location.results[0].geometry.location.lng;
      }
    });
  }

  public markerIconUrl() {
    return require('../../../assets/marker.png');
  }

  public setLocation(location) {
    this.searchControl.setValue(location.name);
    this.longitude = location.longitude;
    this.latitude = location.latitude;
    this.locationSelected = true;
    this.zoom = 13;
  }

  public selectLocation(e, reset) {
    this.fullscreen = false;
    const location = {
      name: this.searchControl.value,
      latitude: this.latitude,
      longitude: this.longitude
    };
    if (reset === 'reset') {
      this.savedLocation.push(location);
      this.historyService.saveLocation(this.savedLocation);
      this.resetForm();
    }
  }

  public resetForm() {
    this.searchControl.setValue('');
    this.latitude = 0.789275;
    this.longitude = 113.92132700000002;
    this.zoom = 4;
    this.locationSelected = false;
  }

  public clearLocation() {
    this.savedLocation = [];
    this.historyService.saveLocation(this.savedLocation);
  }
}


interface Res {
  results: object;
}
