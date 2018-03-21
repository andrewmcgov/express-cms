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

  function handleTags(e) {
    // This line doesnt work... yet 
    if (e.keyCode === 13) e.preventDefault();
    if (![13, 32, 188].includes(e.keyCode)) {
      return;
    }

    // get the value for the new tag
    const newTag = tagsInput.value.slice(0, -1);
    tagsInput.value = '';

    // add the new tag to the tag holder div
    const newTagSpan = document.createElement('span');
    newTagSpan.classList.add('tag');
    newTagSpan.innerHTML = `
      <span class="tag-text">${newTag}</span>
      <span class="remove-tag" data-tag=${newTag}>&times;</span>
    `
    newTagSpan.querySelector('.remove-tag').addEventListener('click', removeTag);
    tagHolder.appendChild(newTagSpan)

    // Add the new value to the hidden input
    if (hiddenInput.value === '') {
      hiddenInput.value += `${newTag}`;
    } else {
      hiddenInput.value += `,${newTag}`;
    }
  }

  tagsInput.addEventListener('keyup', handleTags);
}

export default tags;