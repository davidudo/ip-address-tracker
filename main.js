// Target input and button element
const user_input = document.getElementById('user-input');
const button = document.getElementById('button');

// IP information displays
const ip_address_display = document.getElementById('ip-address');
const location_display = document.getElementById('location');
const timezone_display = document.getElementById('timezone');
const isp_display = document.getElementById('isp');


/* ============================================= */

let map = null;

getAndDisplayInfo();

// Added event listener to button 
button.addEventListener("click", (e) => {
  getAndDisplayInfo();
});

/* ============================================= */


/* ==≈===== BEGINNING OF ABSTRACTION =========== */

// Function to get IP address information
async function getAddress(url) {
  const response = await fetch(url);
  const result = await response.json();
  return result;
};

// Function to get the IP address location and display it on a map
function getLocation(latitude, longitude) {
  if (map !== undefined && map !== null) {
    map.remove(); 
  }

  map = L.map('map').setView([latitude, longitude], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(map);

  const marker = L.marker([latitude, longitude]).addTo(map);
}


// Function to get IP address info and display it
function getAndDisplayInfo() {
  let ip_address = user_input.value;
  let url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_RUQIhBAq2VXQrToyql3fKxa2olw3B&ipAddress=${ip_address}`;

  getAddress(url)
    .then((result) => {
      // console.log(result);
      
      const ip_addr = result.ip;
      const country = result.location.country;
      const city = result.location.city;
      const postal_code = result.location.postalCode;
      const timezone = result.location.timezone;
      const isp = result.isp;
      const latitude = result.location.lat;
      const longitude = result.location.lng;

      ip_address_display.innerHTML = ip_addr;
      location_display.innerHTML = `${city}, ${country} ${postal_code}`;
      timezone_display.innerHTML = `UTC ${timezone}`;
      isp_display.innerHTML = isp;
      user_input.value = ip_addr;

      getLocation(latitude, longitude);

    }).catch(status => {
       alert("An error occurred! Input correct IPv4 or IPv5 address or check your internet connection."); // Runs on error  
    });
};

/* ========== END OF ABSTRACTION ============ */
