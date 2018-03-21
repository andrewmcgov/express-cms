import tags from './tags';

function postForm() {
  const featuredImgInput = document.getElementById('featuredImage');
  const featuredImgMsg = document.querySelector('.featured-image-message');
  const removeImgBtn = document.querySelector('.remove-featured-image');
  const featuredThumb = document.querySelector('.featured-image-thumb');
  const uploadImgBtn = document.querySelector('.change-featured-image');

  function handleImage(file) {
    const reader = new FileReader();
    reader.onload = (function (img) {
      return function (e) {
        img.src = e.target.result;
      };
    })(featuredThumb);
    reader.readAsDataURL(file);
    featuredThumb.classList.remove('hide');
    featuredThumb.parentElement.querySelector('hr').classList.remove('hide');
  }

  function featuredImageChange() {
    if (featuredImgInput.files.length) {
      featuredImgMsg.textContent = 'Save post to upload image.';
      if (featuredThumb) featuredThumb.classList.add('hide');
      if (removeImgBtn) removeImgBtn.classList.add('hide');
      handleImage(featuredImgInput.files[0]);
      uploadImgBtn.textContent = 'Change Image';
    } else {
      featuredImgMsg.textContent = '';
      if (featuredThumb.dataset.hasImage) {
        featuredThumb.src = featuredThumb.dataset.ogSrc;
      } else {
        if (featuredThumb) featuredThumb.classList.add('hide');
        if (removeImgBtn) removeImgBtn.classList.remove('hide');
        uploadImgBtn.textContent = 'Add Featured Image';
        featuredThumb.parentElement.querySelector('hr').classList.add('hide');
      }
    }
  }

  function removeImage() {
    let removeBtnData = removeImgBtn.dataset;
    if (removeBtnData.removing === 'true') {
      featuredThumb.classList.add('hide');
      featuredImgMsg.textContent = 'Save post to remove image.';
      featuredThumb.parentElement.querySelector('hr').classList.add('hide');
      uploadImgBtn.classList.add('hide');
      removeImgBtn.textContent = 'Cancel';
      removeBtnData.removing = 'false';
    } else {
      featuredThumb.classList.remove('hide');
      featuredImgMsg.textContent = '';
      featuredThumb.parentElement.querySelector('hr').classList.remove('hide');
      uploadImgBtn.classList.remove('hide');
      removeImgBtn.textContent = 'Remove Image';
      removeBtnData.removing = 'true';
    }
  }

  if (removeImgBtn) removeImgBtn.addEventListener('click', removeImage);
  featuredImgInput.addEventListener('change', featuredImageChange);

  // Get variables for tag function, and call it
  const tagsInput = document.getElementById('enterTags');
  const hiddenTagsInput = document.querySelector('input[name="tags"]');
  const tagsHolder = document.querySelector('#tagHolder');
  tags(tagsInput, hiddenTagsInput, tagsHolder);

}

export default postForm;
