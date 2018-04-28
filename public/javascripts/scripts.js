require('../stylesheets/style.public.scss');
require('../stylesheets/style.admin.scss');

import SinglePost from './modules/SinglePost';

const Post = document.querySelector('.post');

const BlogPost = new SinglePost(Post);
const BlogPostImage = document.querySelector('.post__hero--image');

if (BlogPostImage.complete) {
}

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
