(async function () {
    setupLoginListener();
})();

async function loginUser( email, password) {
    try {
        const response = await fetch('http://localhost:4040/api/v1/users/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password }),
        });

        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error("Login failed:", error);
        return null;
    }
}

function setupLoginListener() {
    document.getElementById('loginBtn').addEventListener('click', async (e) => {
        e.preventDefault();

        // let username = document.getElementById('loginUsername').value;
        let email = document.getElementById('loginEmail').value;
        let password = document.getElementById('loginPassword').value;

        let data = await loginUser(email, password);
        if (!data) return;

        const { accessToken, refreshToken } = data;
        if (!refreshToken) return;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        window.location.href = './index.html';
    });
}
