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
let logged = JSON.parse(localStorage.getItem('user'))

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
            generatePosts()
        })
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
        title.style.cursor = `pointer`

        let author = document.createElement(`p`)
        author.innerText = item.username
        author.style.cursor = `pointer`

        let time = document.createElement(`p`)
        time.innerText = `${new Date(item.timestamp).toLocaleDateString("lt-LT")} ${new Date(item.timestamp).toLocaleTimeString("lt-LT")}` 
        time.style.fontSize = `small`

        let edit = document.createElement(`button`)
        edit.innerText = `Edit/Delete`

        postsContainer.appendChild(card)
        card.appendChild(img)
        card.appendChild(time)
        card.appendChild(title)
        card.appendChild(author)
        if(logged.username === item.username){
            card.appendChild(edit)
        }
        
        edit.addEventListener(`click`, openPanel)
        title.addEventListener(`click`, openPost)
        author.addEventListener(`click`, openUserPosts)
    })

}

function openPost(event) {
    localStorage.setItem('postInfo', JSON.stringify({
        name: event.path[1].attributes[2].value,
        id: event.path[1].id
    }))
    window.location.href = './pages/post.html'
}

function openUserPosts(event) {
    localStorage.setItem('userPostsInfo', JSON.stringify(event.path[1].attributes[2].value))
    window.location.href = './pages/userPosts.html'
}

function openPanel() {
    window.location.href = './pages/userPanel.html'
}


