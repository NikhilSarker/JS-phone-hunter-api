
const phoneLoad = async (searchText='13', isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await res.json();
  const phones = data.data;
  displayPhone(phones, isShowAll);
}


const displayPhone = (phones, isShowAll) => {
  // Get the div container
  const phone_container = document.getElementById('phone_container');
  phone_container.textContent = '';
// Show All Button
  const show_all_button_container = document.getElementById('show_all_button_container');
    if (phones.length > 12 && !isShowAll) {
      show_all_button_container.classList.remove('hidden');      
    }else{
      show_all_button_container.classList.add('hidden'); 
    }

    // console.log('Is show all', isShowAll);
    // 
    if (!isShowAll) {
       phones = phones.slice(0,12);      
    }

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
        <div class="card-actions justify-center">
          <button onclick="showDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
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

  const handleSearch = (isShowAll) => {
    loadingToggle(true);
    const search_field = document.getElementById('search_field');
    const search_value = search_field.value;
    phoneLoad(search_value, isShowAll);
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

// Handle show all

const handleShowAll = () => {
  handleSearch(true);

}

// Show details

const showDetails = async (id) => {
  // console.log('clicked', id);
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  // console.log(data);
  const phones = data.data;
  showDetailsPhone(phones)
}

// Show details products
const showDetailsPhone =  (phone) => {
  console.log(phone);
  show_detail_modal.showModal();
  const show_details_phone_name = document.getElementById('show_details_phone_name');
  show_details_phone_name.innerText = phone.name;

  const show_detail_container = document.getElementById('show_detail_container');
  show_detail_container.innerHTML = 
  `
  <img class="mx-auto" src="${phone.image}" alt="">
  <p><strong>Storage: </strong> ${phone?.mainFeatures?.storage || 'No Storage'} </p>
  <p><strong>Display Size: </strong> ${phone?.mainFeatures?.displaySize || 'No Display Size'} </p>
  <p><strong>ChipSet: </strong> ${phone?.mainFeatures?.chipSet || 'No Chip Set'} </p>
  <p><strong>Memory: </strong> ${phone?.mainFeatures?.memory || 'No Memory'} </p>
  <p><strong>Slug: </strong> ${phone?.slug || 'No Slug'} </p>
  <p><strong>Release Date: </strong> ${phone?.releaseDate || 'No Release Date'} </p>
  <p><strong>Brand: </strong> ${phone?.brand || 'No Brand'} </p>
  <p><strong>GPS: </strong> ${phone?.others?.GPS || 'No GPS'} </p>
  `;


}

phoneLoad();