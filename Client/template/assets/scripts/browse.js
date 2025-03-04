const tokenInfo = localStorage.getItem('accessToken');
(function () {
    allGames()
    
})()
async function allGames() {
    const tokenInfo = localStorage.getItem('accessToken');
    return fetch('http://localhost:4040/api/v1/games/get', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenInfo}`
        }
    }).then(res => {
        if (!res.ok) {
            console.log(res);
            return;
        }
        return res.json();
    }).then(data => {
        featuredGames(data.data)
        topDownloads(data.data)
        return;
    });
}
function featuredGames(data) {
    let length = 0;
    document.querySelector('.owl-features.owl-carousel.owl-loaded.owl-drag .owl-stage').innerHTML = '';
  let ids=[];
    function loopagain() {
        for (i = 0; i < data.length; i++) {
            
            if (data[i].isFeatured == true) {
                
                length++;
                document.querySelector('.owl-features.owl-carousel.owl-loaded.owl-drag .owl-stage').innerHTML += `<div class="owl-item cloned" style="width: 218.667px; margin-right: 30px;"><div class="item">
                    <div class="thumb">
                      <img src="${data[i].images[0]}" alt="" style='height:300px;object-fit: cover;'>
                      <div class="hover-effect">
                        <h6>2.4K Streaming</h6>
                      </div>
                    </div>
                    <h4>${data[i].name}<br><span>249K Downloads</span></h4>
                    <ul>
                      <li><i class="fa fa-star"></i>${data[i].rating}</li>
                      <li><i class="fa fa-download"></i> 2.3M</li>
                    </ul>
                  </div></div>`
                ids.push(data[i]._id)
            }
        }
        if(length<12){
            loopagain()
         }  
    }
     loopagain();
     
     gamesIds(ids)
     
}
function gamesIds(ids){
  
  let AllfeaturedGames=  document.querySelectorAll('.owl-item .item')
  for(let i=0;i<AllfeaturedGames.length;i++){
    AllfeaturedGames[i].addEventListener('click',()=>{
      window.location.href=`./details.html?id=${ids[i]}`
    })
  }
}
function topDownloads(data){
  let games=document.querySelector('.top-downloaded>ul')
  games.innerHTML=` <li>
                    <img src="${data[0].images[0]}" alt="" class="templatemo-item" style='height:80px;'>
                    <h4>Fortnite</h4>
                    <h6>${data[0].catagory}</h6>
                    <span><i class="fa fa-star" style="color: yellow;"></i>${data[0].rating}</span>
                    <span><i class="fa fa-download" style="color: #ec6090;"></i> 2.2M</span>
                    <div class="download">
                     <a href="./details.html?id=${data[0]._id}"><i class="fa fa-download"></i></a>
                    </div>
                  </li>
                 <li>
                    <img src="${data[1].images[0]}" alt="" class="templatemo-item" style='height:80px;'>
                    <h4>Fortnite</h4>
                    <h6>${data[1].catagory}</h6>
                    <span><i class="fa fa-star" style="color: yellow;"></i>${data[1].rating}</span>
                    <span><i class="fa fa-download" style="color: #ec6090;"></i> 2.2M</span>
                    <div class="download">
                    <a href="./details.html?id=${data[1]._id}"><i class="fa fa-download"></i></a>
                    </div>
                  </li>
                 <li>
                    <img src="${data[2].images[0]}" alt="" class="templatemo-item" style='height:80px;'>
                    <h4>Fortnite</h4>
                    <h6>${data[2].catagory}</h6>
                    <span><i class="fa fa-star" style="color: yellow;"></i>${data[2].rating}</span>
                    <span><i class="fa fa-download" style="color: #ec6090;"></i> 2.2M</span>
                    <div class="download">
                      <a href="./details.html?id=${data[2]._id}"><i class="fa fa-download"></i></a>
                    </div>
                  </li>`
  
}