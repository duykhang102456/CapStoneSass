// Gọi API lấy danh sách sản phẩm liên quan
fetch('https://shop.cyberlearn.vn/api/Product', {
  method: 'GET',
  headers: {
    'accept': 'application/json'
  }
})
  .then(response => response.json())
  .then(data => {
    // Hiển thị danh sách sản phẩm ra .product-list
    const html = data.content.map(product => `
      <div class="product-card" data-id="${product.id}">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="product-card__footer">
          <button class="btn">Buy now</button>
          <span class="product-card__price">${product.price}$</span>
        </div>
      </div>
    `).join('');
    document.querySelector('.related-product .product-list').innerHTML = html;

    // Thêm sự kiện click cho từng ảnh sản phẩm
    document.querySelectorAll('.related-product .product-card img').forEach((img, idx) => {
      img.addEventListener('click', () => {
        const product = data.content[idx];
        document.querySelector('.product-detail__image img').src = product.image;
        document.querySelector('.product-detail__info h2').textContent = product.name;
        document.querySelector('.product-detail__desc').textContent = product.description;
        document.querySelector('.product-detail__price span').textContent = product.price + '$';
        // Nếu có size, cập nhật lại size
        const sizeHtml = product.size.map(size => `<button>${size}</button>`).join('');
        document.querySelector('.product-detail__sizes').innerHTML = `<span class="label">Available size</span>${sizeHtml}`;
      });
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });
  // Thêm sản phẩm mới\
  
document.getElementById('btn-create').onclick = function() {
  // Gọi API thêm sản phẩm
    const product = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        price: parseFloat(document.getElementById('price').value),
        image: document.getElementById('image').value,
        size: document.getElementById('size').value.split(',').map(size => size.trim())
    };
    fetch('https://shop.cyberlearn.vn/api/Product', {
    method: 'POST',
    headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(product)
    })
    .then(res => res.json())
    .then(data => console.log('Thêm thành công:', data))
    .catch(err => console.error(err));
    document.getElementById('name').value = '';
    document.getElementById('description').value = '';
    document.getElementById('price').value = '';
    document.getElementById('image').value = '';
    document.getElementById('size').value = '';
    alert('Thêm sản phẩm thành công!');
    document.querySelector('.product-list').innerHTML = '';
    // Cập nhật lại danh sách sản phẩm

};

// Cập nhật sản phẩm
document.getElementById('btn-update').onclick = function() {
  // Gọi API cập nhật sản phẩm
  const productId = document.getElementById('product-id').value;
  const updatedProduct = {
    name: document.getElementById('name').value,
    description: document.getElementById('description').value,
    price: parseFloat(document.getElementById('price').value),
    image: document.getElementById('image').value,
    size: document.getElementById('size').value.split(',').map(size => size.trim())
  };
  
  fetch(`https://shop.cyberlearn.vn/api/Product/${productId}`, {
    method: 'PUT',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedProduct)
  })
  .then(res => res.json())
  .then(data => console.log('Cập nhật thành công:', data))
  .catch(err => console.error(err));
}
document.getElementById('btn-delete').onclick = function() {
  // Gọi API xóa sản phẩm
    const productId = document.getElementById('product-id').value;
    fetch(`https://shop.cyberlearn.vn/api/Product/${productId}`, {
        method: 'DELETE',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => console.log('Xóa thành công:', data))
    .catch(err => console.error(err));
};
    