
const phoneLoad = async (searchText) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await res.json();
  const phones = data.data;
  displayPhone(phones);
}


const displayPhone = (phones) => {
  // Get the div container
  const phone_container = document.getElementById('phone_container');
  phone_container.textContent = '';

  phones.forEach(phone => {
    // Create a div
    const phone_div = document.createElement('div');
    phone_div.classList = 'card bg-base-100 shadow-xl text-center';
    phone_div.innerHTML = `
    <figure><img src="${phone.image}" alt="Shoes" /></figure>
      <div class="card-body">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-end">
          <button class="btn btn-primary">Buy Now</button>
        </div>
      </div>
    `;
    // AppendChild
    phone_container.appendChild(phone_div);    
  });
}
  // Search Button

  const handleSearch = () => {
    const search_field = document.getElementById('search_field');
    const search_value = search_field.value;
    phoneLoad(search_value);
  }

