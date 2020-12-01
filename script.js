// GETS
const aside = document.getElementById('aside')
const menuAside = document.getElementById('menuAside')
const closeAsideBtn = document.getElementsByClassName("close")[0]
const postsContainer = document.getElementById('postsContainer')

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
let postsArr

// LISTENERS
window.addEventListener('click', asideTools.closeAside)
menuAside.addEventListener('click', asideTools.openAside)
closeAsideBtn.addEventListener(`click`, asideTools.closeAsideByBtn)

// FUNCTIONS
getPosts()

function getPosts() {
    fetch('http://167.99.138.67:1111/getallposts')
        .then(response => response.json())
        .then(data => {
            postsArr = data.data
            console.log(postsArr);
            generatePosts()
        })
}

function generatePosts() {
    postsArr.map(item=>{
        let card = document.createElement(`div`)
        card.classList.add(`card`)

        let img = document.createElement(`img`)
        img.src = item.image

        let title = document.createElement(`h3`)
        title.innerHTML = item.title

        let author = document.createElement(`p`)
        author.innerText = item.username

        postsContainer.appendChild(card)
        card.appendChild(img)
        card.appendChild(title)
        card.appendChild(author)
    })

}


