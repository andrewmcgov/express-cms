class SinglePost {
  constructor(post) {
    this.post = post;
    this.postImage = post.querySelector('.post__hero--image');
    this.postTitle = post.querySelector('.info__title');
    this.postDescription = post.querySelector('.info__description');
  }

  imageFadeIn(postImage) {
    postImage.classList.remove('hide');
    postImage.classList.add('fade-image-in');
  }

  titleSlideIn() {
    this.postTitle.classList.add('title-slide-up');
    this.postDescription.classList.add('title-slide-up');
    this.postTitle.classList.remove('hide');
    this.postDescription.classList.remove('hide');
  }
}

function displayImage() {
  const Post = document.querySelector('.post');
  const BlogPost = new SinglePost(Post);
  function checkIfImageLoads() {
    return new Promise(function(resolve) {
      if (BlogPost.postImage && BlogPost.postImage.complete) {
        BlogPost.imageFadeIn(BlogPost.postImage);
        resolve();
      }
    });
  }

  checkIfImageLoads().then(BlogPost.titleSlideIn(BlogPost));
}

export default displayImage;
