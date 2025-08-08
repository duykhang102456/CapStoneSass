// Gọi API lấy danh sách sản phẩm
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
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="product-card__footer">
          <button class="btn">Buy now</button>
          <span class="product-card__price">${product.price}$</span>
        </div>
      </div>
    `).join('');
    document.querySelector('.product-list').innerHTML = html;
  })
  .catch(error => {
    console.error('Error:', error);
  });