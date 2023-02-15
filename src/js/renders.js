export function createCardMarkup(item) {
  return `
<div class="photo-card" data-src="${item.largeImageURL}">
  <div class="photo-wrapper">
    <img class="photo" src="${item.webformatURL}" alt="${item.tags}" />
  </div>
  <ul class="info">
    <li class="info-item">
      <p>Likes</p>
      <p>${item.likes}</p>
    </li>
    <li class="info-item">
      <p>Views</p>
      <p>${item.views}</p>
    </li>
    <li class="info-item">
      <p>Comments</p>
      <p>${item.comments}</p>
    </li>
    <li class="info-item">
      <p>Downloads</p>
      <p>${item.downloads}</p>
    </li>
  </ul>
</div>`;
}
