let villeChoisie;


setInterval(() => {document.querySelector('#heure').textContent = new Date().toLocaleTimeString();
}, 900)

if("geolocation" in navigator) {

    navigator.geolocation.watchPosition(position => {
        
        const url = 'https://api.openweathermap.org/data/2.5/weather?lon=' + position.coords.longitude +
         '&lat=' + position.coords.latitude + '&appid=0f868e5580784b82715c2c2729f18245&units=metric';

        let requete = new XMLHttpRequest(); // Nous créons un objet qui nous permettra de faire des requêtes
        requete.open('GET', url); // Nous récupérons juste des données
        requete.responseType = 'json'; // Nous attendons du JSON
        requete.send(); // Nous envoyons notre requête
      
        // Dès qu'on reçoit une réponse, cette fonction est executée
        requete.onload = function() {
          if (requete.readyState === XMLHttpRequest.DONE) {
            if (requete.status === 200) {
              let reponse = requete.response;
              // console.log(reponse);
              let temperature = reponse.main.temp;
              let ville       = reponse.name;
              // console.log(temperature);
              document.querySelector('#temperature_label').textContent = temperature + '°C';
              document.querySelector('#ville').textContent = ville;
              document.querySelector('#ventValue').textContent = reponse.wind.speed + 'km/h';
              document.querySelector('#humiditeValue').textContent = reponse.main.humidity + '%';
              document.querySelector('#pressionValue').textContent = reponse.main.pressure + 'hPa';

              if(reponse.weather[0].main == 'Rain') {
                document.querySelector('#meteo').src = 'img/pluie.png';
                document.querySelector('#meteo').alt = 'pluie';
              }
              else if(reponse.weather[0].main == 'Clouds') {
                document.querySelector('#meteo').src = 'img/clouds.png';
                document.querySelector('#meteo').alt = 'nuageux';
              }
              else if(reponse.weather[0].main == 'Clear') {
  
                document.querySelector('#meteo').src = 'img/sun.png';
                document.querySelector('#meteo').alt = 'ensoleillé';
              }
              else if(reponse.weather[0].main == 'Snow') {
        
                document.querySelector('#meteo').src = 'img/snow.png';
                document.querySelector('#meteo').alt = 'neige';
              }
              else if(reponse.weather[0].main == 'Thunderstorm') {
          
                document.querySelector('#meteo').src = 'img/thunderstorm.png';
                document.querySelector('#meteo').alt = 'orage';
              }
              else {
                document.querySelector('#meteo').src = 'img/sun.png'; 
                document.querySelector('#meteo').alt = 'ensoleillé'; 
              }


            }
            else {
              alert('Un problème est intervenu, merci de revenir plus tard.');
            }
          }
        }

    }, error, options)

} else {
    villeChoisie = 'Paris';
}

var options = {
    enableHighAccuracy: true
}

let changerDeVille = document.querySelector('#chercher');
changerDeVille.addEventListener('click', () => {
  villeChoisie = document.querySelector('#villechoisie').value;
  recevoirTemperature(villeChoisie); 
});

function error() { villeChoisie = 'Paris'; recevoirTemperature(villeChoisie)  }

function recevoirTemperature(ville) {
  const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + ville + '&appid=0f868e5580784b82715c2c2729f18245&units=metric';

  let requete = new XMLHttpRequest(); // Nous créons un objet qui nous permettra de faire des requêtes
  requete.open('GET', url); // Nous récupérons juste des données
  requete.responseType = 'json'; // Nous attendons du JSON
  requete.send(); // Nous envoyons notre requête

  // Dès qu'on reçoit une réponse, cette fonction est executée
  requete.onload = function() {
    if (requete.readyState === XMLHttpRequest.DONE) {
      if (requete.status === 200) {
              let reponse     = requete.response;
              console.log(reponse);
              let temperature = reponse.main.temp;
              let ville       = reponse.name;
              // console.log(temperature);
              document.querySelector('#temperature_label').textContent = temperature + '°C';
              document.querySelector('#ville').textContent = ville;
              document.querySelector('#ventValue').textContent = reponse.wind.speed + 'km/h';
              document.querySelector('#humiditeValue').textContent = reponse.main.humidity + '%';
              document.querySelector('#pressionValue').textContent = reponse.main.pressure + 'hPa';

              if(reponse.weather[0].main == 'Rain') {
                document.querySelector('#meteo').src = 'img/pluie.png';
                document.querySelector('#meteo').alt = 'pluie';
              }
              else if(reponse.weather[0].main == 'Clouds') {
                document.querySelector('#meteo').src = 'img/clouds.png';
                document.querySelector('#meteo').alt = 'nuageux';
              }
              else if(reponse.weather[0].main == 'Clear') {
  
                document.querySelector('#meteo').src = 'img/sun.png';
                document.querySelector('#meteo').alt = 'ensoleillé';
              }
              else if(reponse.weather[0].main == 'Snow') {
        
                document.querySelector('#meteo').src = 'img/snow.png';
                document.querySelector('#meteo').alt = 'neige';
              }
              else if(reponse.weather[0].main == 'Thunderstorm') {
          
                document.querySelector('#meteo').src = 'img/thunderstorm.png';
                document.querySelector('#meteo').alt = 'orage';
              }
              else {
                document.querySelector('#meteo').src = 'img/sun.png'; 
                document.querySelector('#meteo').alt = 'ensoleillé'; 
              }
      }
      else {
        alert('Un problème est intervenu, merci de revenir plus tard.');
      }
    }
  }
}