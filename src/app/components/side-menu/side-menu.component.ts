import { Component, OnInit } from '@angular/core';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  public userpict = 'https://lighthouse-ci.appspot.com/logo-nolight.png';
  public username = 'Mercusuar';

  public faCommentAlt = faCommentAlt;
  public faQuestionCircle = faQuestionCircle;

  constructor() { }

  ngOnInit() {
  }

}
