import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  breadcrumbData = {
    home: {},
    about: {
      profile: 'profile',
      journey: 'journey'
    },
    portfolio: {
      travelog: 'travelog',
      blog: 'blog',
      foodie: 'foodie'
    }
  };

  title = 'Angular Breadcrumb Component';
}
