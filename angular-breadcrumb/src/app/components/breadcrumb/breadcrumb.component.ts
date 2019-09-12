import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  @Input()
  breadcrumbModel = {};

  currentUrl: string;
  breadcrumbCollection = [];

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.currentUrl = this.router.url;
      this.breadcrumbCollection = this.buildBreadcrumb(this.currentUrl);
    });
  }

  private buildBreadcrumb(url: string): Array<string> {
    const pathArray = url.split('/');
    pathArray.shift();
    const parentCrumb = pathArray[0];
    let breadcrumb = [];
    
    breadcrumb.push(parentCrumb);
    pathArray.map((item, index) => {
      if(index > 0) {
        breadcrumb.push(this.breadcrumbModel[parentCrumb][item]);
      }
    });

    return breadcrumb;
  }

}
