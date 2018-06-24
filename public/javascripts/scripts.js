require('../stylesheets/style.public.scss');

import loadHeroSectionImage from './modules/Hero';
import displayImage from './modules/SinglePost';
import scrollShow from './modules/scrollShow';
import { navDrawerinit } from './modules/navDrawer';

const heroContainer = document.querySelector('.hero');
const postPage = document.querySelector('.post');

window.addEventListener('load', init);

function init() {
  if (heroContainer) {
    loadHeroSectionImage(heroContainer);
  }

  if (postPage) {
    displayImage();
  }

  navDrawerinit();
}

scrollShow();
