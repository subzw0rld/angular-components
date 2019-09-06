import { AfterContentInit, Component, OnInit, ViewChild, ElementRef, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { config } from 'rxjs';

enum SWIPER_DIRECTION {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical'
}

const DEFAULT_CONFIG = {
  autoplay: false,
  autoplayDuration: 1500,
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
export class SwiperComponent implements OnInit, AfterContentInit, OnChanges, OnDestroy {

  @ViewChild('swiperContainer')
  swiperContainer: ElementRef;

  @ViewChild('swiperWrapper')
  swiperWrapper: ElementRef;

  @Input()
  config = DEFAULT_CONFIG;

  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;

  swiperWidth = 0;
  swiperHeight = 0;
  //This will stop the swipe from happening once the lastg slide is in view
  swipeBound: number;
  // The amount by which the swiper has moved
  swipePosition = 0;

  autoplayDuration;

  constructor() { }

  ngOnInit() {
    this.swiperWidth = this.swiperContainer.nativeElement.getBoundingClientRect().width;
    this.swiperHeight = this.swiperContainer.nativeElement.getBoundingClientRect().height;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.config = DEFAULT_CONFIG;
    Object.keys(changes.config.currentValue).map(item => {
      this.config[item] = changes.config.currentValue[item];
    });

    if (this.config.autoplay) {
      this.autoPlaySwiper();
    }
  }

  ngAfterContentInit() {
    this.swipeBound = (this.swiperWrapper.nativeElement.children.length - 1) * (this.swiperWidth + this.config.slideGap);

    Array.from(this.swiperWrapper.nativeElement.children).map((item, index) => {
      (item as HTMLElement).style.width = `${this.swiperWidth / this.config.slideInView}px`;

      if (this.config.direction === SWIPER_DIRECTION.VERTICAL) {
        (item as HTMLElement).style.height = `${this.swiperHeight / this.config.slideInView}px`;
      }

      if (this.config.slideGap) {
        if (this.config.direction === SWIPER_DIRECTION.HORIZONTAL) {
          (item as HTMLElement).style.marginRight = `${this.config.slideGap}px`;
        } else {
          (item as HTMLElement).style.marginBottom = `${this.config.slideGap}px`;
        }

      }

      if (index === this.config.activeSlide) {
        (item as HTMLElement).classList.add('active');
      }

    });
  }

  ngOnDestroy() {
    clearInterval(this.autoplayDuration);
  }

  autoPlaySwiper() {
    this.autoplayDuration = setInterval(() => {
      if (this.config.direction === SWIPER_DIRECTION.HORIZONTAL) {
        this.onSwipeLeft();
      } else {
        this.onSwipeUp();
      }
    }, this.config.autoplayDuration);


  }

  onSwipeRight() {
    if (this.config.direction === SWIPER_DIRECTION.HORIZONTAL) {
      this.performSwipe('right');
    }
  }

  onSwipeLeft() {
    if (this.config.direction === SWIPER_DIRECTION.HORIZONTAL) {
      this.performSwipe('left');
    }
  }

  onSwipeUp() {
    this.performVerticalSwipe('up');
  }

  onSwipeDown() {
    this.performVerticalSwipe('down');
  }

  panHorizontal(xPos: number) {
    this.swiperWrapper.nativeElement.style.transform = `translate3d(${this.swipePosition + xPos}px, 0, 0)`;
  }

  panVertical(yPos: number) {
    this.swiperWrapper.nativeElement.style.transform = `translate3d(0, ${this.swipePosition + yPos}px, 0)`;
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
          clearInterval(this.autoplayDuration);
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

  performVerticalSwipe(direction: string) {
    const activeEl: HTMLElement = this.swiperWrapper.nativeElement.querySelector('.active');
    const index = Array.from(this.swiperWrapper.nativeElement.children).indexOf(activeEl);
    const totalSteps = this.swiperWrapper.nativeElement.children.length / this.config.slideInView;

    switch (direction) {
      case "down":
        // The if condition below checks that we are on the last slide, totalSteps ensures that in case of multiple slides 
        // in view we do not end up having all the slides go out of the slider area
        if (index >= this.swiperWrapper.nativeElement.children.length - 1 || index >= totalSteps - 1) {
          return;
        }

        this.swipePosition = -((index + 1) * (this.swiperHeight + this.config.slideInView * (this.config.slideGap)));

        this.swiperWrapper.nativeElement.children[index].classList.remove('active');
        this.swiperWrapper.nativeElement.children[index + 1].classList.add('active');
        break;

      case "up":
        if (!index) {
          clearInterval(this.autoplayDuration);
          return;
        }

        this.swipePosition = -((index - 1) * (this.swiperHeight + this.config.slideInView * (this.config.slideGap)));

        this.swiperWrapper.nativeElement.children[index].classList.remove('active');
        this.swiperWrapper.nativeElement.children[index - 1].classList.add('active');
        break;
    }

    this.swiperWrapper.nativeElement.style.transform = `translate3d(0, ${this.swipePosition}px, 0)`;
  }

}
