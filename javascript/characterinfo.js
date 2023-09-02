window.onload = function () {
  let wrapper = document.getElementById("characterWrapper");
  // console.log(wrapper);

  let winurl = window.location.href;
  let id = winurl.substring(winurl.lastIndexOf("#") + 1) || 1017100;

  // chracter details
  let url = `https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=258282e5e5898a1f175bebec926b8537&hash=03ec89e820191df8a4db608e61fd200a`;
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data.data.results);
      let character = data.data.results[0];
      const {name, description, thumbnail} = character;
      let div = document.createElement("div");
      div.classList.add("character-info-container");

      div.innerHTML = `
        <div class="character-poster">
          <img src="${thumbnail.path}.jpg" alt="">
        </div>
        <div class="character-info">
          <h3>${name}</h3>
          <p>${description || "description not found"}</p>
        </div>
      `;
      wrapper.innerHTML = "";
      wrapper.appendChild(div);
    })
    // if any error occured while fetching data from api then display it on console
    .catch((error) => {
      console.log(error);
    });

  // character related comics
  let comicsWrapper = document.getElementById("comics");
  comicsWrapper.innerHTML = "";
  url = `https://gateway.marvel.com/v1/public/characters/${id}/comics?ts=1&apikey=258282e5e5898a1f175bebec926b8537&hash=03ec89e820191df8a4db608e61fd200a`;

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      let comics = res.data.results;
      // iterate over all the comics and render it on browser
      for (let comic of comics) {
        const { title, thumbnail, description } = comic;
        let div = document.createElement("div");
        div.classList.add("character-info-container");

        div.innerHTML = `
        <div class="character-poster">
          <img src="${thumbnail.path}.jpg" alt="">
        </div>
        <div class="character-info">
          <h3>${title}</h3>
          <p>${description || "description not found"}</p>
        </div>
      `;
        comicsWrapper.appendChild(div);
      }
    })
    // if any error occured while fetching data from api then display it on console
    .catch((error) => {
      console.error(error);
    })
};