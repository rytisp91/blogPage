// GETS
const aside = document.getElementById('aside')
const menuAside = document.getElementById('menuAside')
const closeAsideBtn = document.getElementsByClassName("close")[0]
const postsContainer = document.getElementById('postsContainer')
const userSelector = document.getElementById('userSelector')
const filterBtn = document.getElementById('filter')

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
let authors = []
let userSelected

// LISTENERS
window.addEventListener('click', asideTools.closeAside)
menuAside.addEventListener('click', asideTools.openAside)
closeAsideBtn.addEventListener(`click`, asideTools.closeAsideByBtn)
filterBtn.addEventListener(`click`, filter)
// FUNCTIONS
getPosts()

function getPosts() {
    fetch('http://167.99.138.67:1111/getallposts')
        .then(response => response.json())
        .then(data => {
            postsArr = data.data
            generatePosts()
            filterSelector()
        })
}

function filterSelector() {
    let tempAuthors = []

    postsArr.map(item => {
        tempAuthors.push(item.username)
    })

    tempAuthors.map(el => {
        if (!authors.includes(el)) {
            authors.push(el)
        }
    })

    authors.map(item => {
        let option = document.createElement('option');
        option.value = option.text = item;

        userSelector.add(option); 
    })

}

function filter(){
    if(userSelector.value !== "showAll"){
            fetch(`http://167.99.138.67:1111/getuserposts/${userSelector.value}`)
    .then(response => response.json())
    .then(data => {
        postsArr = data.data
        generatePosts()
    })
    } else {
        fetch('http://167.99.138.67:1111/getallposts')
        .then(response => response.json())
        .then(data => {
            postsArr = data.data
            generatePosts()
        })
    }
}

function generatePosts() {

    postsContainer.innerHTML = ``

    postsArr.map(item => {
        let card = document.createElement(`div`)
        card.classList.add(`card`)
        card.setAttribute(`id`, item.id)
        card.setAttribute(`name`, item.username)

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

        title.addEventListener(`click`, openPost)
    })

}

function openPost(event) {
    localStorage.setItem('postInfo', JSON.stringify({
        name: event.path[1].attributes[2].value,
        id: event.path[1].id
    }))
    window.location.href = './pages/post.html'
}