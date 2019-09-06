import 'hammerjs';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperComponent } from './swiper.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    SwiperComponent
  ],
  exports: [
    SwiperComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ]
})
export class SwiperModule { }
