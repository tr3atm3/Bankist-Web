'use strict';
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
///////////////////////////////////////
// Modal window



const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};


btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});



btnScrollTo.addEventListener('click',function(){
  section1.scrollIntoView({behavior:'smooth'})
});
///Page navigation
document.querySelector('.nav__links').addEventListener('click',function(e){
  e.preventDefault();
  if(e.target.classList.contains('nav__link')) {
    document.querySelector(`${e.target.getAttribute('href')}`)?.scrollIntoView({behavior:'smooth'}) 
  }
  
});

//Tabbed component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click',function(e){
  const clicked = e.target.closest('.operations__tab');
  if(!clicked) return;
  tabs.forEach(el => el.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  tabsContent.forEach(el => el.classList.remove('operations__content--active'));
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
})

//Menu fade Animation
const nav = document.querySelector('.nav');

const handleHover = function(e){
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if(el !== link) el.style.opacity = this;
    })
    logo.style.opacity = this;
  }
}
nav.addEventListener('mouseover',handleHover.bind(0.5))

nav.addEventListener('mouseout',handleHover.bind(1));
// 1. new Intl.DateTimeFormate({}).format(); -- Format date and time as we want
// 2. section1.getBoundingClientRect -- returns postion of section1 on the page
// 3. section1.scrollIntoView({})
// 4. const observer = new IntersectionObserver({},function(){});
//     oberserver.observe(section1);
// Dom traversing

// section1.getComputedStyle


const header = document.querySelector('.header');

const stickyNav = function(entries){
  const [entry] = entries;
  
  if(!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky')
}
const headerObserver = new IntersectionObserver(stickyNav,{
  root:null,
  threshold: 0,
  rootMargin: `-${nav.getBoundingClientRect().height}px`
});
headerObserver.observe(header)


//Slide in effect or Reveal section
const sections = document.querySelectorAll('.section');

const sectionRevealCallback = function(entries,observer){
  const [entry]=entries;
   
  if(entry.isIntersecting){
    entry.target.classList.remove('section--hidden')
    observer.unobserve(entry.target);
  }
  
} 
const sectionObserver = new IntersectionObserver(sectionRevealCallback,{
  root: null,
  threshold: 0.1,
});
sections.forEach(e => {
  sectionObserver.observe(e)
  e.classList.add('section--hidden')
})


//Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');
const loadImg = function(entries,observer){
  const [entry] =entries;
  if(!entry.isIntersecting) return;
  //Replace src to data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load',function(e){
    entry.target.classList.remove('lazy-img')
  });
  observer.unobserve(entry.target)

}
const imageOberver = new IntersectionObserver(loadImg,{
  root: null,
  threshold:0,
  rootMargin: '200px'
})

imgTargets.forEach(img => imageOberver.observe(img));

//Slider

const slides = document.querySelectorAll('.slide');
console.log(slides)
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots')
let curSlide = 0;
let maxSlide = slides.length ;


const goToSlide = function(curSlide){
  slides.forEach((s,i)=> s.style.transform = `translateX(${(i-curSlide)*100}%)`);
}
goToSlide(0);
const nextSlide = function(){
  
    if(curSlide === maxSlide - 1){
      curSlide = 0;
    } else{
    curSlide++;
    
    }
    goToSlide(curSlide)
    activateDot(curSlide)
  
}
const prevSlide = function(){
  if(curSlide === 0){
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide)
  activateDot(curSlide)
}

btnRight.addEventListener('click',nextSlide)

btnLeft.addEventListener('click',prevSlide);

document.addEventListener('keydown', function(e){
  if(e.key==='ArrowLeft') prevSlide();
  e.key === 'ArrowRight' && nextSlide();
});

const createDots = function(){
  slides.forEach((s,i) => {
    dotContainer.insertAdjacentHTML('beforeend',`<button class="dots__dot" data-Slide="${i}"></button>`)
  })
}
createDots();
const activateDot = function(slide){
  document.querySelectorAll('.dots__dot')
.forEach(dot => dot.classList.remove('dots__dot--active'))
  document.querySelector(`.dots__dot[data-slide='${slide}']`).classList.add('dots__dot--active')
}
activateDot(0)

dotContainer.addEventListener('click',function(e){
  if(e.target.classList.contains('dots__dot')){
    const slide = e.target.dataset.slide;
    goToSlide(slide);
    activateDot(slide)
  }
})