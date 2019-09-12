import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { JourneyComponent } from './components/about/journey/journey.component';
import { ProfileComponent } from './components/about/profile/profile.component';
import { BreadcrumbModule } from './components/breadcrumb/breadcrumb.module';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { BlogComponent } from './components/portfolio/blog/blog.component';
import { FoodieComponent } from './components/portfolio/foodie/foodie.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { TravelogComponent } from './components/portfolio/travelog/travelog.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ProfileComponent,
    JourneyComponent,
    PortfolioComponent,
    TravelogComponent,
    BlogComponent,
    FoodieComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BreadcrumbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
