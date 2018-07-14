import { ViewChild, ElementRef, NgZone } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public mapFullscreen = false;
  constructor(
  ) { }

  ngOnInit() {
  }
  public onToogleFullscreen() {
    this.mapFullscreen = !this.mapFullscreen;
  }
  public closeEvent (e) {
    this.mapFullscreen = e;
  }
}

