import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(
    public http: HttpClient
  ) { }

  getLocation(lat, lng) {
    return this.http
      .get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAd1xMYT1bt99qtFWQEzXiRBvORDWHgPtk`)
      .map(res => res)
      .catch(err => err);
  }
}
