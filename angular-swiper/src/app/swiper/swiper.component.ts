import { AfterContentInit, Component, OnInit, ViewChild, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

enum SWIPER_DIRECTION {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical'
}

const DEFAULT_CONFIG = {
  autoplay: false,
  direction: SWIPER_DIRECTION.HORIZONTAL,
  slideInView: 1,
  slideGap: 0,
  activeSlide: 0
};

@Component({
  selector: 'sub-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss']
})
export class SwiperComponent implements OnInit, AfterContentInit, OnChanges {

  @ViewChild('swiperContainer')
  swiperContainer: ElementRef;

  @ViewChild('swiperWrapper')
  swiperWrapper: ElementRef;

  @Input()
  config = DEFAULT_CONFIG;

  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;

  swiperWidth = 0;
  //This will stop the swipe from happening once the lastg slide is in view
  swipeBound: number;
  // The amount by which the swiper has moved
  swipePosition = 0;

  constructor() { }

  ngOnInit() {
    this.swiperWidth = this.swiperContainer.nativeElement.getBoundingClientRect().width;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.config = DEFAULT_CONFIG;
    Object.keys(changes.config.currentValue).map(item => {
      this.config[item] = changes.config.currentValue[item];
    });
  }

  ngAfterContentInit() {
    this.swipeBound = (this.swiperWrapper.nativeElement.children.length - 1) * (this.swiperWidth + this.config.slideGap);

    Array.from(this.swiperWrapper.nativeElement.children).map((item, index) => {
      (item as HTMLElement).style.width = `${this.swiperWidth / this.config.slideInView}px`;

      if (this.config.slideGap) {
        (item as HTMLElement).style.marginRight = `${this.config.slideGap}px`;
      }

      if (index === this.config.activeSlide) {
        (item as HTMLElement).classList.add('active');
      }

    });
  }

  onPanMove(e) {
    this.swiperWrapper.nativeElement.style.transform = `translate3d(${this.swipePosition + e.deltaX}px, 0, 0)`;
  }

  onPanEnd() {
    this.swiperWrapper.nativeElement.style.transform = `translate3d(${this.swipePosition}px, 0, 0)`;
  }

  onSwipeRight() {
    this.performSwipe('right');
  }

  onSwipeLeft() {
    this.performSwipe('left');
  }

  performSwipe(direction: string) {
    const activeEl: HTMLElement = this.swiperWrapper.nativeElement.querySelector('.active');
    const index = Array.from(this.swiperWrapper.nativeElement.children).indexOf(activeEl);
    const totalSteps = this.swiperWrapper.nativeElement.children.length / this.config.slideInView;

    switch (direction) {
      case "left":
        // The if condition below checks that we are on the last slide, totalSteps ensures that in case of multiple slides 
        // in view we do not end up having all the slides go out of the slider area
        if (index >= this.swiperWrapper.nativeElement.children.length - 1 || index >= totalSteps - 1) {
          return;
        }

        this.swipePosition = -((index + 1) * (this.swiperWidth + this.config.slideInView * (this.config.slideGap)));

        this.swiperWrapper.nativeElement.children[index].classList.remove('active');
        this.swiperWrapper.nativeElement.children[index + 1].classList.add('active');
        break;

      case "right":
        if (!index) {
          return;
        }

        this.swipePosition = -((index - 1) * (this.swiperWidth + this.config.slideInView * (this.config.slideGap)));

        this.swiperWrapper.nativeElement.children[index].classList.remove('active');
        this.swiperWrapper.nativeElement.children[index - 1].classList.add('active');
        break;
    }

    this.swiperWrapper.nativeElement.style.transform = `translate3d(${this.swipePosition}px, 0, 0)`;
  }

}
