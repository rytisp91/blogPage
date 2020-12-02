// GETS
const aside = document.getElementById('aside')
const menuAside = document.getElementById('menuAside')
const closeAsideBtn = document.getElementsByClassName("close")[0]
const regForm = document.getElementById('regForm')
const regSuccess = document.getElementById('regSuccess')
const user = document.getElementById('user')
const pass1 = document.getElementById('pass1')
const pass2 = document.getElementById('pass2')
const regBtn = document.getElementById('regBtn')

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
regBtn.addEventListener('click', register)

// FUNCTIONS

function register() {
    if (user.value.length !== 0 && user.value.length >= 5) {
        if (user.value === user.value.replace(/\s/g, '')) {
            if (pass1.value.length >= 6 && pass1.value === pass2.value) {
                if (pass1.value.replace(/\s/g, '') === pass1.value || pass2.value.replace(/\s/g, '') === pass2.value) {
                    fetch('http://167.99.138.67:1111/createaccount', {
                        method: 'POST',
                        mode: `cors`,
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: user.value,
                            passwordOne: pass1.value,
                            passwordTwo: pass2.value
                        }),
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.message === "Name is already taken") {
                                alert("This user name allready exists")
                            } else {
                                regForm.style.display = `none`
                                regSuccess.style.display = `block`
                            }
                        })
                } else {
                    alert(`Don't use spaces in password!`)
                }
            } else {
                alert(`Password is too short or passwords doesn't match!`)
            }
        } else {
            alert(`User name can't be empty space or have any spaces!`)
        }
    } else {
        alert(`Please enter your username! Min chars is 5.`)
    }
}
