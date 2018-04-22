class BlogSettings {
  constructor(imagePreviewContainer) {
    this.imagePreviewContainer = imagePreviewContainer;
    this.imagePreviewThumb = imagePreviewContainer.querySelector(
      '.featured-image-thumb'
    );
    this.addImageBtn = imagePreviewContainer.querySelector(
      '.change-featured-image'
    );
    this.removeImageBtn = imagePreviewContainer.querySelector(
      '.remove-featured-image'
    );
    this.featuredImgInput = imagePreviewContainer.querySelector(
      '#featuredImage'
    );
    this.removeImageInput = imagePreviewContainer.querySelector(
      'input[name="removeFeaturedImage"]'
    );
    this.postFirstImage = imagePreviewContainer.querySelector('.has-no-image');

    // event listeners
    if (this.featuredImgInput) {
      this.featuredImgInput.addEventListener(
        'change',
        this.showImagePreview.bind(this)
      );
    }

    if (this.removeImageBtn) {
      this.removeImageBtn.addEventListener(
        'click',
        this.removeImage.bind(this)
      );
    }
    if (this.postFirstImage) {
      this.featuredImgInput.addEventListener(
        'change',
        this.showImagePreview.bind(this)
      );
    }
  }

  showImagePreview() {
    const reader = new FileReader();
    reader.onload = (function(image) {
      return function(e) {
        image.src = e.target.result;
      };
    })(this.imagePreviewThumb);
    reader.readAsDataURL(this.featuredImgInput.files[0]);
    this.imagePreviewThumb.classList.remove('hide');
  }

  removeImage() {
    const infoText = document.querySelector('.info-text');
    infoText.innerHTML = 'Press save to remove the image';
    this.imagePreviewThumb.classList.add('hide');
    warningText.innerHTML = 'Press save to remove the image.';
    this.imagePreviewContainer.appendChild(warningText);
  }
}

export default BlogSettings;
