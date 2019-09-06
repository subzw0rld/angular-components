import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-swiper';
  dataArr = new Array(10);
  config = {
    slideInView: 1,
    slideGap: 25
  }
}
