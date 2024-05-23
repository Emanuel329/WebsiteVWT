const slider = document.querySelector('.slider');
const prevArrow = document.querySelector('.prev');
const nextArrow = document.querySelector('.next');
const slideWidth = document.querySelector('.slide').offsetWidth;
let currentPosition = 0;

prevArrow.addEventListener('click', () => {
  if (currentPosition !== 0) {
    currentPosition += slideWidth;
    slider.style.transform = `translateX(${currentPosition}px)`;
  }
});

nextArrow.addEventListener('click', () => {
  const maxPosition = -(slideWidth * (slider.children.length - 1));
  if (currentPosition !== maxPosition) {
    currentPosition -= slideWidth;
    slider.style.transform = `translateX(${currentPosition}px)`;
  }
});
