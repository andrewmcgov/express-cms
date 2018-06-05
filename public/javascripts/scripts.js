require('../stylesheets/style.public.scss');
require('../stylesheets/style.admin.scss');

import Hero from './modules/Hero';
import SinglePost from './modules/SinglePost';
import scrollShow from './modules/scrollShow';
import NavDrawer from './modules/navDrawer';
import TopBar from './modules/topBar';

const heroContainer = document.querySelector('.hero');
const BlogPostImage = document.querySelector('.post__hero--image');
const drawer = document.querySelector('.nav-drawer');
const trigger = document.querySelector('.trigger');
const topBar = document.querySelector('.top-bar');

if (heroContainer) {
  const HeroSection = new Hero(heroContainer);

  function showHero() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        HeroSection.imageFadeIn(HeroSection.heroImage);
        resolve();
      }, 10);
    });
  }
  showHero().then(() => {
    setTimeout(() => {
      HeroSection.contentIn();
    }, 100);
  });
}

if (BlogPostImage) {
  const Post = document.querySelector('.post');
  const BlogPost = new SinglePost(Post);
  function displayImage() {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        BlogPost.imageFadeIn(BlogPost.postImage);
        resolve();
      }, 300);
    });
  }

  displayImage().then(function() {
    BlogPost.titleSlideIn(BlogPost);
  });
}

scrollShow();
new NavDrawer(drawer, trigger);
