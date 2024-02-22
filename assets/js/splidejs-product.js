var splide = new Splide( '.splide', 
  {
  type   : 'loop',
  pagination: true,
  perMove: 3,
  drag   : 'free',
  padding: { left: 60, right: 60},
   autoScroll: {
    speed: 1,
  },
  lazyLoad: true,
  breakpoints: {
    9000: {
          perPage: Math.min(5,productItems.length),
          
           gap: 65,
    },
    1000: {
          perPage: Math.min(4,productItems.length),
           gap: 65,
    },
    800: {
          perPage: Math.min(3,productItems.length),
           gap: 65,
    },
    640: {
        perPage: Math.min(2,productItems.length),
         gap: 60,
    },
    440: {
        perPage: Math.min(1,productItems.length),
         gap: 65,
    },
  },
} 
);


splide.mount();