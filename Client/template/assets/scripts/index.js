const tokenInfo = localStorage.getItem('accessToken');
(async function () {
  await allGames()
  await checkingAddedGames()
  await popularGames()
  libraryGames()

})();

async function allGames(checker) {

  return fetch('http://localhost:4040/api/v1/games/get', {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokenInfo}`
    }
  }).then(res => {
    if (!res.ok) {
      
      return;
    }
    return res.json();
  }).then(data => {
    if (checker == 'libraryGames' || checker == 'checkingAddedGames') {
      return data.data;
    }
    mostPopularGames(data.data);
    return;
  });
}


function mostPopularGames(cars) {
  
  let downlaods = [2.2, 5, 3.2, 5.2, 1.3, 2.4, 4.3, 4.7]
  let mostPopularGames = document.querySelector('.most-popular .row>div>.row');
  mostPopularGames.innerHTML = '';
  
  try {
    for (let i = 0; i < 8; i++) {

      mostPopularGames.innerHTML += `<div class="col-lg-3 col-sm-6 popularGames">
                      <div class="item">
                        <img src=${cars[i].images[0]} alt="" style='height: 165px;object-fit: cover;'>
                        <h4>${cars[i].name}<br><span>${cars[i].catagory}</span></h4>
                        <ul>
                          <li><i class="fa fa-star"></i>${cars[i].rating}</li>
                          <li><i class="fa fa-download"></i>  ${downlaods[i]}M</li>
                        </ul>
                        <div id='AddToLibrary'>
                        <p class='LibraryGames'>Add to Library</p>
                        <label class="neon-checkbox">
    <input type="checkbox" />
    <div class="neon-checkbox__frame">
      <div class="neon-checkbox__box">
        <div class="neon-checkbox__check-container">
          <svg viewBox="0 0 24 24" class="neon-checkbox__check">
            <path d="M3,12.5l7,7L21,5"></path>
          </svg>
        </div>
        <div class="neon-checkbox__glow"></div>
        <div class="neon-checkbox__borders">
          <span></span><span></span><span></span><span></span>
        </div>
      </div>
      <div class="neon-checkbox__effects">
        <div class="neon-checkbox__particles">
          <span></span><span></span><span></span><span></span> <span></span
          ><span></span><span></span><span></span> <span></span><span></span
          ><span></span><span></span>
        </div>
        <div class="neon-checkbox__rings">
          <div class="ring"></div>
          <div class="ring"></div>
          <div class="ring"></div>
        </div>
        <div class="neon-checkbox__sparks">
          <span></span><span></span><span></span><span></span>
        </div>
      </div>
    </div>
  </label></div>
  
  
  
                      </div>
                    </div>`
    }
    
  } catch (error) {
    
  }
  mostPopularGames.innerHTML += `<div class="col-lg-12">
                    <div class="main-button">
                      <a href="browse.html">Discover Popular</a>
                    </div>
                  </div>`
    

}
async function libraryGamesAnimation(Games) {

  allBtns = document.querySelectorAll('.main-border-button');
  for (e of allBtns) {
    e.classList.remove('border-no-active');
    e.innerHTML = `<a href="#">Download</a>`
  }
  for (let i = 0; i < allBtns.length; i++) {

    allBtns[i].addEventListener('click', async (e) => {
      e.preventDefault();
      if (e.target.classList.contains('border-no-active') || e.target.parentElement.classList.contains('border-no-active')) {
        return
      }
      allBtns[i].parentElement.previousElementSibling.innerHTML = `<h4>Currently</h4><span>Downloading</span>`
      allBtns[i].innerHTML = `<div class="loader">
  <div class="circle">
  <div class="dot"></div>
  <div class="outline"></div>
</div>
<div class="circle">
  <div class="dot"></div>
  <div class="outline"></div>
</div>
<div class="circle">
  <div class="dot"></div>
  <div class="outline"></div>
</div>
<div class="circle">
  <div class="dot"></div>
  <div class="outline"></div>
</div>
</div>
`
      const data = await fetch(`http://localhost:4040/api/v1/games-library/update/${Games[i]._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenInfo}`
        },
        body: JSON.stringify({
          'isDownloaded': true,
        })
      }).then(res => {
        if (!res.ok) {
          setTimeout(() => {
            allBtns[i].classList.add('main-border-button');
            allBtns[i].innerHTML = `<a href="#">Download</a>`
            allBtns[i].parentElement.previousElementSibling.innerHTML = `<h4>Currently</h4><span>Error</span>`

          }, 5000);
        }
        else {
          return res.json()

        }
      })
        .then(result => { return result })

      if (!data) {
        return
      }
      else
        setTimeout(() => {
          allBtns[i].classList.add('border-no-active');
          allBtns[i].innerHTML = `<a href="#">Downloaded</a>`
          allBtns[i].parentElement.previousElementSibling.innerHTML = `<h4>Currently</h4><span>Installed</span>`

        }, 5000);
    })
  }
}
async function popularGames() {
  neonLabel = document.querySelectorAll('label.neon-checkbox');
  neonCheckbox=document.querySelectorAll('.neon-checkbox__borders')
  neonInput = document.querySelectorAll('label.neon-checkbox>input');
  let Allgames=document.querySelectorAll('.popularGames')
  let Games = await allGames('libraryGames');
  if (!Games) {
    return
  }
  
  for (let i = 0; i < neonInput.length; i++) {
    neonInput[i].addEventListener('change', (e) => {
      if (!neonInput[i].checked) {
        removefromLibrary(Games[i]._id, i)
      } else {
        addtoLibrary(Games[i]._id, i)
      }
    });
    Allgames[i].addEventListener('click',(e)=>{
      e.stopPropagation()
      if(e.target.matches('.neon-checkbox__borders')||e.target.matches('input')||e.target.matches('.neon-checkbox__glow')){
        return
      }
      
   gameinfo(Games[i]._id)
  })
  }

}

function addtoLibrary(id, i) {
  neonLabel = document.querySelectorAll('label.neon-checkbox');
  neonInput = document.querySelectorAll('label.neon-checkbox>input');
  let p = document.querySelectorAll('.LibraryGames');
  fetch(`http://localhost:4040/api/v1/games-library/add/${id}`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokenInfo}`
    }
  }).then(res => {
    if (!res.ok) {
      p[i].textContent = 'Error! while adding';
      neonInput[i].checked = false;
    }
    else  return res.json() ;
  }).then(data => { return data })
  p[i].textContent = 'Added'
 setTimeout(() => {
  libraryGames()
}, 300); 

}

function removefromLibrary(id, i) {
  neonLabel = document.querySelectorAll('label.neon-checkbox');
  neonInput = document.querySelectorAll('label.neon-checkbox>input');
  let p = document.querySelectorAll('.LibraryGames');
  fetch(`http://localhost:4040/api/v1/games-library/remove/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokenInfo}`
    }
  }).then(res => {
    if (!res.ok) {
      p[i].textContent = 'Error! while removing';
      
      neonInput[i].checked = true;
    }
    else { return res.json() }
  }).then(data => { return data })
  p[i].textContent = 'removed'
  setTimeout(() => {
    p[i].textContent = 'Add to Library'
  }, 1500);
  setTimeout(() => {
    libraryGames()
  }, 300); 

}
async function checkingAddedGames() {
  fetch('http://localhost:4040/api/v1/games-library/get', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokenInfo}`
    }
  }).then(res => {
    if(!res.ok){
      
    }
    return res.json()
  })
    .then(data => { checking(data.data) })
  async function checking(data) {
    
    neonLabel = document.querySelectorAll('label.neon-checkbox');
    neonInput = document.querySelectorAll('label.neon-checkbox>input');
    let p = document.querySelectorAll('.LibraryGames');
    const Games = await allGames('checkingAddedGames');
    if (!Games) {
      return
    }
    
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < Games.length; j++) {
        if (data[i].game._id == Games[j]._id) {
          
          neonInput[j].checked = true;
          p[j].textContent = 'Added';
        }
      }
    }

  }
}
async function libraryGames() {
  
  fetch('http://localhost:4040/api/v1/games-library/get', {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokenInfo}`
    }
  })
    .then(res => res.json())
    .then(data => AddedGames(data.data))
  async function AddedGames(Games) {
    if (!Games) {
      return
    }
  
    document.querySelector('.gaming-library>div').innerHTML = ''
    for (let i = 0; i < 3; i++) {
      try {
        let isoDate = Games[i].createdAt;
        let dateOnly = isoDate.split("T")[0];
        
        
        document.querySelector('.gaming-library>div').innerHTML += `
  <div class="item">
    <ul>
    <li><img src=${Games[i].game.images[0]} alt="" class="templatemo-item" style='height:4.5rem;'></li>
    <li><h4>${Games[i].game.name}</h4><span>${Games[i].game.catagory}</span></li>
    <li><h4>Date Added</h4><span>${dateOnly}</span></li>
    <li><h4>Hours Played</h4><span>${Games[i].hoursPlayed}Mins</span></li>
    <li><h4>Currently</h4><span>Available</span></li>
    <li style='display:inline-flex'><div class="main-border-button"><a href="#">Download</a></div><button class="UninstallBtn">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-miterlimit="2" stroke-linejoin="round" fill-rule="evenodd" clip-rule="evenodd"><path fill-rule="nonzero" d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 1.5c-4.69 0-8.497 3.807-8.497 8.497s3.807 8.498 8.497 8.498 8.498-3.808 8.498-8.498-3.808-8.497-8.498-8.497zm0 7.425 2.717-2.718c.146-.146.339-.219.531-.219.404 0 .75.325.75.75 0 .193-.073.384-.219.531l-2.717 2.717 2.727 2.728c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.384-.073-.53-.219l-2.729-2.728-2.728 2.728c-.146.146-.338.219-.53.219-.401 0-.751-.323-.751-.75 0-.192.073-.384.22-.531l2.728-2.728-2.722-2.722c-.146-.147-.219-.338-.219-.531 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"></path></svg>
              </span>
              </button></li>
  </ul>
  </div>`
      } catch (error) {
  
        
      }
    
    }
    await libraryGamesAnimation(Games)
   await startUpLibrary(Games)
  }
}
async function startUpLibrary(Games) {

 let allBtns = document.querySelectorAll('.main-border-button');
  for (let i = 0; i < allBtns.length; i++) {
    if (Games[i].isDownloaded === true) {
      allBtns[i].classList.add('border-no-active');
      allBtns[i].innerHTML = `<a href="#">Downloaded</a>`
      allBtns[i].parentElement.previousElementSibling.innerHTML = `<h4>Currently</h4><span>Installed</span>`
    }
  }

 let uninstallBtns= document.querySelectorAll('.UninstallBtn');
 let data;
  for(let i=0;i<uninstallBtns.length;i++){
    
    
    uninstallBtns[i].addEventListener('click', async(e) => {
      
      if(e.target.closest('button').previousElementSibling.classList.contains('border-no-active')){
    data= await  fetch(`http://localhost:4040/api/v1/games-library/update/${Games[i]._id}`,{
        method:"PATCH",
        headers:{
          'Content-Type':'application/json',
          'Authorization': `Bearer ${tokenInfo}`
        },
        body:JSON.stringify({
          "isDownloaded": false
        })
      }).then(res=>res.json())
      .then(data=>{
        return data
      })
    
    if(!data){
      
      return
    }
    

    e.target.closest('button').previousElementSibling.classList.remove('border-no-active')
    e.target.parentElement.classList.remove('border-no-active')
    e.target.closest('button').previousElementSibling.children[0].innerText='Download'
    e.target.closest('li').previousElementSibling.innerHTML=`<h4>Currently</h4><span>removed</span>`
    setTimeout(() => {
      e.target.closest('li').previousElementSibling.innerHTML=`<h4>Currently</h4><span>Available</span>`
    }, 3000);
  }
    })
  }
  
}

function gameinfo(id){
window.location.href=`./details.html?id=${id}`
}