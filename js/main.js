
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
// Show All Button
  const show_all_button_container = document.getElementById('show_all_button_container');
    if (phones.length > 12) {
      show_all_button_container.classList.remove('hidden');      
    }else{
      show_all_button_container.classList.add('hidden'); 
    }

  phones = phones.slice(0,12);

    // For each loop
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
// Hide loading 
  loadingToggle(false);  


}
  // Search Button

  const handleSearch = () => {
    loadingToggle(true);
    const search_field = document.getElementById('search_field');
    const search_value = search_field.value;
    phoneLoad(search_value);
  }

//  Loading

const loadingToggle = (isLoading) => {
  const loading = document.getElementById('loading');
  if (isLoading) {
    loading.classList.remove('hidden');    
  }else{
    loading.classList.add('hidden');
  }
  
}