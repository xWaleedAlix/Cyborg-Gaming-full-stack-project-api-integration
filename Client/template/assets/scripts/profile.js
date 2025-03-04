const tokenInfo = localStorage.getItem('accessToken');
( function(){
  allData()
})();
async function allData() {

        fetch('http://localhost:4040/api/v1/users/profile', {
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
       allProfileData(data.data)

    });
  }
  function allProfileData(data){
    // console.log(data);
    document.querySelector('.page-content').innerHTML=` <div class="row">
            <div class="col-lg-12">
              <div class="main-profile ">
                <div class="row">
                  <div class="col-lg-4">
                    <img src="${data.profilePic}" alt="" style="border-radius: 23px;">
                  </div>
                  <div class="col-lg-4 align-self-center">
                    <div class="main-info header-text">
                      <span>Online</span>
                      <h4>${data.username}</h4>
                      <p>You Haven't Gone Live yet. Go Live By Touching The Button Below.</p>
                      <div class="main-border-button">
                        <a href="#" id='logOutBtn'>Log out</a>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 align-self-center">
                    <ul>
                      <li>Games Downloaded <span>${data.gamesDownloaded}</span></li>
                      <li>Friends Online <span>16</span></li>
                      <li>Live Streams <span>None</span></li>
                      <li>Clips <span>${data.clipsCreated}</span></li>
                    </ul>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-12">
                    <div class="clips">
                      <div class="row">
                        <div class="col-lg-12">
                          <div class="heading-section">
                            <h4><em>Your Most Popular</em> Clips</h4>
                          </div>
                        </div>
                        <div class="col-lg-3 col-sm-6">
                          <div class="item">
                            <div class="thumb">
                              <img src="assets/images/clip-01.jpg" alt="" style="border-radius: 23px;">
                              <a href="https://www.youtube.com/watch?v=r1b03uKWk_M" target="_blank"><i class="fa fa-play"></i></a>
                            </div>
                            <div class="down-content">
                              <h4>First Clip</h4>
                              <span><i class="fa fa-eye"></i> 250</span>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-3 col-sm-6">
                          <div class="item">
                            <div class="thumb">
                              <img src="assets/images/clip-02.jpg" alt="" style="border-radius: 23px;">
                              <a href="https://www.youtube.com/watch?v=r1b03uKWk_M" target="_blank"><i class="fa fa-play"></i></a>
                            </div>
                            <div class="down-content">
                              <h4>Second Clip</h4>
                              <span><i class="fa fa-eye"></i> 183</span>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-3 col-sm-6">
                          <div class="item">
                            <div class="thumb">
                              <img src="assets/images/clip-03.jpg" alt="" style="border-radius: 23px;">
                              <a href="https://www.youtube.com/watch?v=r1b03uKWk_M" target="_blank"><i class="fa fa-play"></i></a>
                            </div>
                            <div class="down-content">
                              <h4>Third Clip</h4>
                              <span><i class="fa fa-eye"></i> 141</span>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-3 col-sm-6">
                          <div class="item">
                            <div class="thumb">
                              <img src="assets/images/clip-04.jpg" alt="" style="border-radius: 23px;">
                              <a href="https://www.youtube.com/watch?v=r1b03uKWk_M" target="_blank"><i class="fa fa-play"></i></a>
                            </div>
                            <div class="down-content">
                              <h4>Fourth Clip</h4>
                              <span><i class="fa fa-eye"></i> 91</span>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-12">
                          <div class="main-button">
                            <a href="#">Load More Clips</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="gaming-library profile-library">
            <div class="col-lg-12">
              <div class="heading-section">
                <h4><em>Your Gaming</em> Library</h4>
              </div>
              <div class="item">
                <ul>
                  <li><img src="assets/images/game-01.jpg" alt="" class="templatemo-item"></li>
                  <li><h4>Dota 2</h4><span>Sandbox</span></li>
                  <li><h4>Date Added</h4><span>24/08/2036</span></li>
                  <li><h4>Hours Played</h4><span>634 H 22 Mins</span></li>
                  <li><h4>Currently</h4><span>Downloaded</span></li>
                  <li><div class="main-border-button border-no-active"><a href="#">Donwloaded</a></div></li>
                </ul>
              </div>
              <div class="item">
                <ul>
                  <li><img src="assets/images/game-02.jpg" alt="" class="templatemo-item"></li>
                  <li><h4>Fortnite</h4><span>Sandbox</span></li>
                  <li><h4>Date Added</h4><span>22/06/2036</span></li>
                  <li><h4>Hours Played</h4><span>745 H 22 Mins</span></li>
                  <li><h4>Currently</h4><span>Downloaded</span></li>
                  <li><div class="main-border-button border-no-active"><a href="#">Donwloaded</a></div></li>
                </ul>
              </div>
              <div class="item last-item">
                <ul>
                  <li><img src="assets/images/game-03.jpg" alt="" class="templatemo-item"></li>
                  <li><h4>CS-GO</h4><span>Sandbox</span></li>
                  <li><h4>Date Added</h4><span>21/04/2022</span></li>
                  <li><h4>Hours Played</h4><span>632 H 46 Mins</span></li>
                  <li><h4>Currently</h4><span>Downloaded</span></li>
                  <li><div class="main-border-button border-no-active"><a href="#">Donwloaded</a></div></li>
                </ul>
              </div>
            </div>
          </div>`
          alllibraryGames()
  }
// 
function alllibraryGames(){
fetch('http://localhost:4040/api/v1/games-library/get', {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokenInfo}`
    }
  })
    .then(res => res.json())
    .then(data => {
        uninstallBtn(data.data)
        libraryGamesAnimation(data.data)
        startUpLibrary(data.data)
    })

    
}
// 
async function libraryGamesAnimation(Games) {
    
    if (!Games) {
        return
      }
    allBtns = document.querySelectorAll('.gaming-library .main-border-button');
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
//   
// 
async function startUpLibrary(Games) {

    let allBtns = document.querySelectorAll('.gaming-library .main-border-button');
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
         console.log("no data");
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
   function uninstallBtn(Games){
    document.querySelector('.gaming-library>div').innerHTML = ''
    for (let i = 0; i < Games.length; i++) {
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
   logOut() 
}
//    
function logOut(){
  document.querySelector('#logOutBtn').addEventListener('click',(e)=>{
   e.preventDefault();
    fetch('http://localhost:4040/api/v1/users/logout',{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        'Authorization':`Bearer ${tokenInfo}`}
    }).then(res=>{
      if(!res.ok){
        console.log(res);
        return
      }
    })
    .then(data=>{
      console.log(data);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href='./loginsignup.html'
    })
  })
}