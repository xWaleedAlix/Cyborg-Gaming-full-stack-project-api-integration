const tokenInfo = localStorage.getItem('accessToken');
url = new URLSearchParams(window.location.search);
id = url.get('id')
if (!id) {
  window.location.href = './index.html'
}
(async function () {
  await GameDetails()

})();
async function GameDetails() {
  let Data = await fetch(`http://localhost:4040/api/v1/games/get/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokenInfo}`
    },
  }).then(res => {
    if (!res.ok) { window.location.href = './index.html' }
    return res.json()
  }).then(data => { return data.data })
  heroSection(Data)
}
function heroSection(data) {
  // let dataCategory = data.catagory.split(",")[0] + ", ...";
  let mainImgVideo = document.querySelector('.feature-banner.header-text>div.row');
  mainImgVideo.innerHTML = `<div class="col-lg-4">
                    <img src="${data.images[0]}" alt="" style="border-radius: 23px;height:100%;">
                  </div>
                  <div class="col-lg-8">
                    <div class="thumb">
                      <img src="assets/images/feature-right.jpg" alt="" style="border-radius: 23px;">
                      <a href="https://www.youtube.com/watch?v=r1b03uKWk_M" target="_blank"><i class="fa fa-play"></i></a>
                    </div>
                  </div>`

  document.querySelector('.game-details').innerHTML = `
              <div class="col-lg-12">
                <h2>${data.name}</h2>
              </div>
              <div class="col-lg-12">
                <div class="content">
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="left-info">
                        <div class="left">
                          <h4>${data.name}</h4>
                          <span>${data.catagory}</span>
                        </div>
                        <ul>
                          <li><i class="fa fa-star"></i> ${data.rating}</li>
                          <li><i class="fa fa-download"></i> 2.3M</li>
                        </ul>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="right-info">
                        <ul>
                          <li><i class="fa fa-star"></i> ${data.rating}</li>
                          <li><i class="fa fa-download"></i> 2.3M</li>
                          <li><i class="fa fa-server"></i> 36GB</li>
                          <li><i class="fa fa-gamepad"></i> ${data.catagory}</li>
                        </ul>
                      </div>
                    </div>
                    <div class="col-lg-4 imgDiv">
                      <img src=${data.images[1]} alt="" style="border-radius: 23px; margin-bottom: 30px;height: 280px;">
                    </div>
                    <div class="col-lg-4 imgDiv">
                      <img src=${data.images[2]} alt="" style="border-radius: 23px; margin-bottom: 30px;height: 280px;">
                    </div>
                    <div class="col-lg-4 imgDiv">
                      <img src=${data.images[3]} alt="" style="border-radius: 23px; margin-bottom: 30px;height: 280px;">
                    </div>
                    <div class="col-lg-12">
                      <p>This is Funnel Kingdom website, a free HTML CSS website template provided by Funnel Kingdom. This is a custom layout built with the latest web standards. If you want to get the source files, please contact us. Lorem ipsum dolor sit consectetur es dispic dipiscingei elit, sed doers eiusmod lisum hored tempor.
                      </p>
                    </div>
                    <div class="col-lg-12">
                      <div class="main-border-button">
                        <a href="#">Download ${data.name.toLowerCase()} Now!</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`
  otherGames(data.catagory)
}


async function otherGames(data) {
  document.querySelector('.other-games>div.row').innerHTML = `<div class="col-lg-12">
                <div class="heading-section">
                  <h4><em>Other Related</em> Games</h4>
                </div>
              </div>`
  let categories = [data];

  let idData = [];

  let Data = await fetch('http://localhost:4040/api/v1/games/get', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokenInfo}`
    }
  }).then(res => res.json())
    .then(data => { return data.data })
  for (let i = 0; i < categories.length; i++) {
    for (let j = 0; j < Data.length; j++) {
      if (categories[i] == 'undefined' || categories[i] == undefined) { break }
      if (categories[i] == Data[j].catagory) {
        if (Data[j]._id == id) { continue }
        otherGamesinner(Data[j])
        idData.push(Data[j]._id)
      }
    }

  }


  redirectOtherGames(idData)

}
function otherGamesinner(game) {

  document.querySelector('.other-games>div.row').innerHTML += `
              <div class="col-lg-6">
                <div class="item relatedGamesItem" >
                 <img src="${game.images[0]}" alt="" class="templatemo-item" style="height: 80px;">
                  <h4>${game.name}</h4><span>${game.catagory}</span>
                  <ul>
                    <li><i class="fa fa-star"></i> ${game.rating}</li>
                    <li><i class="fa fa-download"></i> 2.3M</li>
                  </ul>
                </div>
              </div>`
}


function redirectOtherGames(id) {

  let games = document.querySelectorAll('.relatedGamesItem')
  for (let i = 0; i < games.length; i++) {
    games[i].addEventListener('click', () => {
      window.location.href = `./details.html?id=${id[i]}`
    })
  }

}
