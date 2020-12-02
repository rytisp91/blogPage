// GETS
const aside = document.getElementById('aside')
const menuAside = document.getElementById('menuAside')
const closeAsideBtn = document.getElementsByClassName("close")[0]
const postContainer = document.getElementById('postContainer')

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
let postInfo = JSON.parse(localStorage.getItem('postInfo'))
let postArr

// LISTENERS
window.addEventListener('click', asideTools.closeAside)
menuAside.addEventListener('click', asideTools.openAside)
closeAsideBtn.addEventListener(`click`, asideTools.closeAsideByBtn)

// FUNCTIONS

getPost()

function getPost() {
    fetch(`http://167.99.138.67:1111/getsinglepost/${postInfo.name}/${postInfo.id}`)
        .then(response => response.json())
        .then(data => {
            postArr = [data.data]
            generatePost()
        })
}

function generatePost() {
    postArr.map(item=>{
        let card = document.createElement(`div`)
        card.classList.add(`card`)
        card.setAttribute(`id`, item.id)

        let img = document.createElement(`img`)
        img.src = item.image

        let title = document.createElement(`h3`)
        title.innerHTML = item.title

        let author = document.createElement(`p`)
        author.innerText = `Author: ${item.username}`

        let back = document.createElement(`button`)
        back.innerText = `Go back`

        postContainer.appendChild(card)
        card.appendChild(img)
        card.appendChild(author)
        card.appendChild(title)
        card.appendChild(back)

        back.addEventListener(`click`, goBack)
    })
}

function goBack(){
    window.location.href = '../index.html'
}