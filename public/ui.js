export const card = (id, title, description, image) => {
    const div = document.createElement('div');
    let html = 
    `<article class="message is-success mb-2">
    <div class="message-header">
      ${title}
      <button class="delete delet" data-id="${id}"></button>
    </div>
    <div class="message-body">
      ${description}
    </div>`;
    if(image){
      html += `<img src="${image}" class="image">`;
    }
      html += `<button class="edit button is-warning" data-id="${id}">Editar</button>
  </article>`;
    div.innerHTML = html;
    return div;
}