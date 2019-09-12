import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ProfileComponent } from './components/about/profile/profile.component';
import { JourneyComponent } from './components/about/journey/journey.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { TravelogComponent } from './components/portfolio/travelog/travelog.component';
import { BlogComponent } from './components/portfolio/blog/blog.component';
import { FoodieComponent } from './components/portfolio/foodie/foodie.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full', },
  { path: 'home', component: HomeComponent },
  {
    path: 'about', component: AboutComponent, children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'journey', component: JourneyComponent }
    ]
  },
  { path: 'portfolio', component: PortfolioComponent,  children: [
    {path: 'travelog', component: TravelogComponent},
    {path: 'blog', component: BlogComponent},
    {path: 'foodie', component: FoodieComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
