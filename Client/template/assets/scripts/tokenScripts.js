(function () {
    checkToken()
    tokenValidity()
})();

function checkToken() {
    const tokenInfo = localStorage.getItem('refreshToken');
    if (!tokenInfo) {
        window.location.href = './loginsignup.html'
    }
}
function tokenValidity() {
    const tokenInfo = localStorage.getItem('accessToken');

   fetch('http://localhost:4040/api/v1/health/check-token-expiry', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenInfo}`
        }
    })
        .then(res => {
            if (!res.ok) { refreshToken() }
            else return res.json()
        })
        .then(data =>{return data})
}
function refreshToken() {
    
    const refreshTokenKey = localStorage.getItem('refreshToken');
   fetch('http://localhost:4040/api/v1/users/refresh-token', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'refreshToken': `${refreshTokenKey}`
        })
    }).then(res => {
        if (!res.ok) { window.location.href = './loginsignup.html'}
        else return res.json();
    }).then(data => {
        localStorage.setItem('accessToken',`${data.data.accessToken}`)
        localStorage.setItem('refreshToken',`${data.data.refreshToken}`)
    });
}
