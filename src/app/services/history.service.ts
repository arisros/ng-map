import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(
    public http: HttpClient
  ) { }

  saveLocation(location) {
    return localStorage.setItem('location', JSON.stringify(location));
  }

  locationHistory() {
    const location = localStorage.getItem('location') ? JSON.parse(localStorage.getItem('location')) : [];
    return location;
  }
}
