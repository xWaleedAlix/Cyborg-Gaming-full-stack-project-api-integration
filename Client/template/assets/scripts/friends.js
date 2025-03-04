const tokenInfo = localStorage.getItem('accessToken');
let count = 0;
(function () {
    allUsers()
    searchUsers()
    Allrequests()
    AllFriends()
}())

function allUsers() {
    fetch('http://localhost:4040/api/v1/friendship/get/all-users', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenInfo}`
        },
    }).then(res => res.json())
        .then(data => userData(data.data))
    function userData(data) {
        document.querySelector('.top-streamers ul').innerHTML =''  

        for (let i = 0; i < data.length; i++) {
            count++;
            if (!data[i].profilePic) {
                data[i].profilePic = 'https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0='
            }
            document.querySelector('.top-streamers ul').innerHTML += `<li>
                        <span>${count}</span>
                        <img src="${data[i].profilePic}" alt="" style="max-width: 46px;height:46px; border-radius: 50%; margin-right: 15px;">
                        <h6><i class="fa fa-check"></i> ${data[i].email}</h6>
                        <div class="main-button">
                          <a href="#" id='requestBtn'>Send request</a>
                        </div>
                      </li>`
                      requestBtn(data)
        }
    }
    document.querySelector('#searchBox').addEventListener('click',(e)=>{
       if(e.target.matches('input')){
        if(e.target.value==''){
                 document.querySelector('#searchArea').style.display='none'
        }
       }
        
    })
}
function searchUsers() {
    let input = document.querySelector('#searchBox input');
    input.addEventListener('keyup', () => {
        let key = input.value

        fetch('http://localhost:4040/api/v1/friendship/search', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenInfo}`
            },
            body: JSON.stringify({
                "email": `${key}`
            })
        }).then(res => {
            if (!res.ok) {
                    document.querySelector('#searchArea').style.display='none'
                if(!input.value){
                    return
                }
                  document.querySelector('#searchArea').style.display='block'
                document.querySelector('#searchArea').classList.add('searchArea')
                document.querySelector('#searchArea ul').innerHTML=`<li style='display:flex;justify-content:space-around;align-items:center;color:white;'>No! user found</li>`
                return
            }
            else
               return res.json()
        })
            .then(data => {
                if(!input.value){
                    document.querySelector('#searchArea').style.display='none'
                    return
                }
                if(!data){return}
                searchArea(data.data)
            })
    })
  function  searchArea(data){
     document.querySelector('#searchArea').style.display='block'
      document.querySelector('#searchArea').classList.add('searchArea')
          if (!data.profilePic) {
              data.profilePic = 'https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0='
            }            
            document.querySelector('#searchArea ul').innerHTML=`<li style='display:flex;justify-content:space-around;align-items:center;'>
                <img src="${data.profilePic}" alt="" style="max-width: 46px; border-radius: 50%; margin-right: 15px;">
                <h6 style='flex:1;'><marquee>${data.email}</marquee>
</h6>
                <div class="main-button">
                  <a href="#" id='requestBtn2'>+</a>
                </div>
              </li>`
        document.querySelector('#requestBtn2').addEventListener('click',(e)=>{
                e.preventDefault();
    fetch(`http://localhost:4040/api/v1/friendship/request/send/${data._id}`,{
        method:"POST",
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${tokenInfo}`
        }
    }).then(res=>{
        if(!res.ok){
            document.querySelector('#requestBtn2').textContent='Error'
            setTimeout(() => {
                document.querySelector('#requestBtn2').textContent='+'                
            }, 1500);
            
        }
        return res.json()
    }).then(data=>{
        document.querySelector('#requestBtn2').textContent='send'
        setTimeout(() => {
            document.querySelector('#requestBtn2').textContent='+'                
        }, 1500);
    })
            
        })
  }
}
function requestBtn(data){
    AddFriendBtns=document.querySelectorAll('#requestBtn')
    for (let i=0; i<AddFriendBtns.length;i++ ){
        AddFriendBtns[i].addEventListener('click',(e)=>{
            e.preventDefault()
            fetch(`http://localhost:4040/api/v1/friendship/request/send/${data[i]._id}`,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${tokenInfo}`
                }
            }).then(res=>{
                if(!res.ok){
                    document.querySelectorAll('#requestBtn')[i].textContent='Error'
                    setTimeout(() => {
                        document.querySelectorAll('#requestBtn')[i].textContent='Send request'                
                    }, 1500);
                }
                return res.json()
            }).then(data=>{
                document.querySelectorAll('#requestBtn')[i].textContent='send'
                setTimeout(() => {
                    document.querySelectorAll('#requestBtn')[i].textContent='Send request'                
                }, 1500);
            })
        })
    }

}
function Allrequests(){
    let icon= document.querySelector('.bellIcon');
    fetch('http://localhost:4040/api/v1/friendship/pending-requests',{
        method:"GET",
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${tokenInfo}`
        }
    }).then(res=>{
        if(!res.ok){
       return
        }
        else return res.json()
    })
    .then(data=>requestModal(data.data))
    function requestModal(data){
     if(data==''){
              return
     }
      
        
        icon.classList.remove('fa-regular')
        icon.classList.add('fa-solid')
        for(let i=0;i<data.length;i++){
            if (!data[i].profilePic) {
                data[i].profilePic = 'https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0='
              }  
              
    document.querySelector('.modal-body ul').innerHTML+=`<li style="display:flex;justify-content:space-around;align-items:center;">
                <img src="${data[i].profilePic}" alt="" style="max-width: 46px; border-radius: 50%; margin-right: 15px;">
                <h6 style="flex:1;">${data[i].sender.email}
</h6>
                <div class="main-button">
                <a href="#" id="PendingAcceptBtn">Accept</a>
                  <a href="#" id="PendingRejectBtn">Reject</a>
                </div>
              </li>`;
              acceptRequest()
              rejectRequest()
}
function acceptRequest(){
    let PendingAcceptBtn=document.querySelectorAll('#PendingAcceptBtn')
    for (let i=0;i<PendingAcceptBtn.length;i++){
        PendingAcceptBtn[i].addEventListener('click',()=>{ 
                fetch(`http://localhost:4040/api/v1/friendship/request/accept/${data[i]._id}`,{
                    method:"POST",
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization':`Bearer ${tokenInfo}`
                    }
                }).then(res=>{
                    if(!res.ok){return}
                     return  res.json()
                })
                .then(data=>{
                    PendingAcceptBtn[i].closest('li').remove()
                })
            })
        }
        }
        AcceptAll()
        function rejectRequest(){
            let PendingRejectBtn=document.querySelectorAll('#PendingRejectBtn')
            for (let i=0;i<PendingAcceptBtn.length;i++){
            PendingRejectBtn[i].addEventListener('click',()=>{

                fetch(`http://localhost:4040/api/v1/friendship/request/cancel/${data[i]._id}`,{
                    method:"POST",
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization':`Bearer ${tokenInfo}`
                    }
                }).then(res=>{
                    if(!res.ok){return}
                     return  res.json()
                })
                .then(data=>{
                    PendingRejectBtn[i].closest('li').remove()
                })
            })
        }
        }
    }
}
function AllFriends(){
    document.querySelector('.top-streamers2').innerHTML='';
    fetch('http://localhost:4040/api/v1/friendship/all-friends',{
        method:"GET",
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${tokenInfo}`
        }
    }).then(res=>res.json())
    .then(data=>AllFriendsData(data.data))
    
    function AllFriendsData(data){
        if(data==''){
            console.log('ok');
            document.querySelector('.top-streamers2').innerHTML=`<div class="heading-section">
            <h4><em>All</em> Friends</h4>
          </div>
          <ul style='display:flex;align-items:center;justify-content:center;margin-top:10rem;flex-direction:column;'><h1 style='font-size:4rem;'>You Are Lonely!</h1><p>Try making friends</p></ul></div>`;
          return
        }
        document.querySelector('.top-streamers2').innerHTML=`<div class="heading-section">
                  <h4><em>All</em> Friends</h4>
                </div>
                <ul></ul></div>`;
        let count=0;
        console.log(data);
        for(let i=0;i<data.length;i++){
            
            if(!data[i].sender.profilePic){
                data[i].sender.profilePic='https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&amp;w=0&amp;k=20&amp;c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=';
            }
            count++;
            document.querySelector('.top-streamers2 ul').innerHTML+=`
                          <li>
                            <span>${count}</span>
                            <img src="${data[i].sender.profilePic}" alt="" style="max-width: 46px;height:46px; border-radius: 50%; margin-right: 15px;">
                            <h6><i class="fa fa-check"></i> ${data[i].sender.username}</h6>
                            <div class="main-button">
                              <a href="#" id="requestBtn">Remove Friend</a>
                            </div>
                          </li>
                          `;
        }
    }
}
function AcceptAll(){
document.querySelector('.modal-footer>button').addEventListener('click',()=>{
    console.log('click');
    let btn = document.querySelectorAll('#PendingAcceptBtn');
    console.log(btn);
    
    for (let i = 0; i < btn.length; i++) {
        setTimeout(() => {
            console.log(`Clicking button ${i}`);
            btn[i].click();
        }, i * 50);
    }
})
   
}