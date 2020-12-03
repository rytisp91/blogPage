// GETS
const aside = document.getElementById('aside')
const menuAside = document.getElementById('menuAside')
const closeAsideBtn = document.getElementsByClassName("close")[0]
const postContainer = document.getElementById('postContainer')
const backBtn = document.getElementById('goBack')
const author = document.getElementById('author')

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
let userPostsInfo = JSON.parse(localStorage.getItem('userPostsInfo'))
let postArr

// LISTENERS
window.addEventListener('click', asideTools.closeAside)
menuAside.addEventListener('click', asideTools.openAside)
closeAsideBtn.addEventListener(`click`, asideTools.closeAsideByBtn)
backBtn.addEventListener('click', goBack)

// FUNCTIONS

getPost()

function getPost() {
    fetch(`http://167.99.138.67:1111/getuserposts/${userPostsInfo}`)
        .then(response => response.json())
        .then(data => {
            postArr = data.data
            console.log(data);
            generatePost()
        })
}

function generatePost() {

    author.innerHTML = `Post's created by: ${userPostsInfo}`

    postArr.map(item=>{
        let card = document.createElement(`div`)
        card.classList.add(`card`)

        let img = document.createElement(`img`)
        img.src = item.image

        let title = document.createElement(`h3`)
        title.innerHTML = item.title

        let description = document.createElement(`p`)
        description.innerHTML = item.description

        let time = document.createElement(`p`)
        time.innerText = `${new Date(item.timestamp).toLocaleDateString("lt-LT")} ${new Date(item.timestamp).toLocaleTimeString("lt-LT")}` 
        time.style.fontSize = `small`

        postContainer.appendChild(card)
        card.appendChild(img)
        card.appendChild(time)
        card.appendChild(title)
        card.appendChild(description)

    })
}

function goBack(){
    window.location.href = '../index.html'
}