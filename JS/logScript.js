// GETS
const aside = document.getElementById('aside')
const menuAside = document.getElementById('menuAside')
const closeAsideBtn = document.getElementsByClassName("close")[0]
const user = document.getElementById('user')
const pass = document.getElementById('pass')
const logBtn = document.getElementById('logBtn')

// VARS
let asideTools = {
    openAside: () => {
        aside.style.display = "block"
    },
    closeAside: (event) => {
        if (event.target == aside) {
            aside.style.display = "none";
        }
    },
    closeAsideByBtn: () => {
        aside.style.display = "none"
    }
}

// LISTENERS
window.addEventListener('click', asideTools.closeAside)
menuAside.addEventListener('click', asideTools.openAside)
closeAsideBtn.addEventListener(`click`, asideTools.closeAsideByBtn)
logBtn.addEventListener(`click`, login)

// FUNCTIONS

function login() {
    fetch('http://167.99.138.67:1111/login', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: user.value,
            password: pass.value
        }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success === false) {
                alert(data.message)
            } else {
                alert(data.message)
                localStorage.setItem('user', JSON.stringify({
                    username: user.value,
                    password: pass.value,
                    api_key: data.secretKey
                })
                )
                window.location.href = '../index.html'
            }
        })
}