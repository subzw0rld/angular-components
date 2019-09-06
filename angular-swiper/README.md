# AngularSwiper

## Introduction
A swiper component written entirely in Angular 7. The idea of this swiper is based on [swiper.js](https://idangero.us/swiper). 

## Dependency
The swiper has a the following dependencies 
 - [Hammer.js](https://hammerjs.github.io/), for handling pan and swipe events.
  - Fontawesome

## Configuration
The swiper has the following configurations:

 - autoplay
 - autoplayDuration - Time in ms after which the swipe will execute automatically (this functionality requires autoplay to be true)
 - direction 
 - slideInView - How many slides (1, 2...) should be shown within the swiper area
 - slideGap - The space between the swipers
 - activeSlide - Setting the active slide in the swiper.

## Swiper in Action

### Basic Use
The swiper uses sub-swiper as the app-selector which you need to use in your application template:

```
    <sub-swiper> </sub-swiper>
```

### Adding Content

```
    <sub-swiper>
        //HTML content goes here. 
    </sub-swiper>
```

### Configuring the swiper

Use the config Input property of the swiper to pass custom config parameters. The parameters accepted are defined above.

```
    <sub-swiper [config] = "custom_config">
    </sub-swiper>
```
