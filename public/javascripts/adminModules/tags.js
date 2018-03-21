function tags(tagsInput, hiddenInput, tagsHolder) {
  function removeTag() {
    // remove the tag value from the hidden input
    const tags = hiddenInput.value.split(',');
    const index = tags.indexOf(this.dataset.tag);
    tags.splice(index, 1);
    hiddenInput.value = tags.join();

    // remove the visual tag
    this.parentElement.remove();
  }

  function checkIfEmpty(newTag) {
    if (newTag.trim() == '') {
      console.log('tag is emppty');
      tagsInput.value = '';
      const message = 'Tags cannot be blank!';
      showErrorMessage(message);
      return true;
    }
  }

  function checkForDuplicate(newTag) {
    const existingTags = hiddenInput.value.split(',');
    if (existingTags.includes(newTag)) {
      tagsInput.value = newTag;
      const message = `<strong>${newTag}</strong> already Exists! You cannot have duplicate tags.`;
      showErrorMessage(message);
      return true;
    }
  }

  function showErrorMessage(message) {
    const messageToShow = document.createElement('p');
    messageToShow.classList.add('tag-error-message');
    messageToShow.innerHTML = message;
    tagsHolder.prepend(messageToShow);
  }

  function clearErrors() {
    const message = document.querySelector('.tag-error-message');
    if (message) message.remove();
  }

  function handleTags(e) {
    // This line doesnt work... yet
    if (e.keyCode === 13) e.preventDefault();
    clearErrors();
    if (![13, 188].includes(e.keyCode)) {
      return;
    }

    // get the value for the new tag
    const newTag = tagsInput.value.slice(0, -1);

    if (checkForDuplicate(newTag) || checkIfEmpty(newTag)) {
      return;
    }

    tagsInput.value = '';

    // add the new tag to the tag holder div
    const newTagSpan = document.createElement('span');
    newTagSpan.classList.add('tag');
    newTagSpan.innerHTML = `
      <span class="tag-text">${newTag}</span>
      <span class="remove-tag" data-tag=${newTag}>&times;</span>
    `;
    newTagSpan
      .querySelector('.remove-tag')
      .addEventListener('click', removeTag);
    tagHolder.appendChild(newTagSpan);

    // Add the new value to the hidden input
    if (hiddenInput.value === '') {
      hiddenInput.value += `${newTag}`;
    } else {
      hiddenInput.value += `,${newTag}`;
    }
  }

  const existingTags = document.querySelectorAll('.remove-tag');

  existingTags.forEach(tag => {
    tag.addEventListener('click', removeTag);
  });

  tagsInput.addEventListener('keyup', handleTags);
}

export default tags;
