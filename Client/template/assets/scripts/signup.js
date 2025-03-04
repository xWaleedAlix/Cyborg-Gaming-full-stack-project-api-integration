let registerForm=document.querySelectorAll('.signup input');

function addUser(username,password,email){
fetch('http://localhost:4040/api/v1/users/register',{
    method:"POST",
    headers:{
        'Content-Type':'application/json',
    },
    body:JSON.stringify({
        username,
        password,
         email,
    })
}).then(res=>res.json()).then(data=>console.log(data))
}

registerForm[4].addEventListener("click",()=>{
   if(registerForm[0].value==''||registerForm[1].value==''||registerForm[2].value==''||registerForm[3].value==''){
    return
   }
    if(registerForm[2].value===registerForm[3].value){
        registerUSer(registerForm[0].value,registerForm[1].value,registerForm[2].value)
   }
   else{
    return
   }
})
function registerUSer(name ,email,password){
 addUser(name,password,email)
}



