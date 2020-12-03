// GETS
const aside = document.getElementById('aside')
const menuAside = document.getElementById('menuAside')
const closeAsideBtn = document.getElementsByClassName("close")[0]
const postContainer = document.getElementById('postContainer')
const backBtn = document.getElementById('goBack')
const addPost = document.getElementById('addPost')
const question = document.getElementById("question")
const questionText = document.querySelector(`.modal-content`)
const main = document.querySelector(`.main`)
const creating = document.getElementById('creating')
const title = document.getElementById('title')
const description = document.getElementById('description')
const image = document.getElementById('image')
const send = document.getElementById('send')
const update = document.getElementById('update')
const backToPosts = document.getElementById('backToPosts')

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
let userPostsInfo = JSON.parse(localStorage.getItem('user'))
let postArr
let selectedId
let editingPost

// LISTENERS
window.addEventListener('click', asideTools.closeAside)
menuAside.addEventListener('click', asideTools.openAside)
closeAsideBtn.addEventListener(`click`, asideTools.closeAsideByBtn)
backBtn.addEventListener('click', goBack)
addPost.addEventListener('click', createPost)
send.addEventListener('click', sendToBack)
update.addEventListener('click', updateToBack)
backToPosts.addEventListener('click', goBackToPosts)

// FUNCTIONS

getPost()

function getPost() {
    fetch(`http://167.99.138.67:1111/getuserposts/${userPostsInfo.username}`)
        .then(response => response.json())
        .then(data => {
            postArr = data.data
            generatePost()
        })
}

function generatePost() {

    postArr.map(item => {
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

        let edit = document.createElement(`button`)
        edit.innerText = `Edit post`
        edit.style.marginRight = `10px`
        edit.setAttribute('id', item.id)

        let deletePost = document.createElement(`button`)
        deletePost.innerText = `Delete post`
        deletePost.setAttribute('id', item.id)

        postContainer.appendChild(card)
        card.appendChild(img)
        card.appendChild(time)
        card.appendChild(title)
        card.appendChild(description)
        card.appendChild(edit)
        card.appendChild(deletePost)

        edit.addEventListener(`click`, editPostQestion)
        deletePost.addEventListener(`click`, erasePostQuestion)
    })
}

function goBack() {
    window.location.href = '../index.html'
}

function createPost() {
    main.style.display = "none"
    creating.style.display = "flex"
    send.style.display = "block"
    update.style.display = "none"
}

function editPostQestion(event) {
    selectedId = event.target.id
    question.style.display = "block"
    questionText.innerHTML = ``

    let edit = document.createElement(`h4`)
    edit.innerText = `Are you sure want to edit this post?`

    let yes = document.createElement(`button`)
    yes.innerText = `Yes`

    let cancel = document.createElement(`button`)
    cancel.innerText = `Cancel`

    questionText.appendChild(edit)
    questionText.appendChild(yes)
    questionText.appendChild(cancel)

    yes.addEventListener(`click`, editPost)
    cancel.addEventListener(`click`, closeQuestion)
}

function erasePostQuestion(event) {
    selectedId = event.target.id
    question.style.display = "block"
    questionText.innerHTML = ``

    let edit = document.createElement(`h4`)
    edit.innerText = `Are you sure want to delete this post?`

    let yes = document.createElement(`button`)
    yes.innerText = `Yes`

    let cancel = document.createElement(`button`)
    cancel.innerText = `Cancel`

    questionText.appendChild(edit)
    questionText.appendChild(yes)
    questionText.appendChild(cancel)

    yes.addEventListener(`click`, deletePost)
    cancel.addEventListener(`click`, closeQuestion)
}

function closeQuestion() {
    question.style.display = "none"
    selectedId = null
}

function editPost() {
    fetch(`http://167.99.138.67:1111/getsinglepost/${userPostsInfo.username}/${selectedId}`)
        .then(response => response.json())
        .then(data => {
            editingPost = data.data
            next()
        })

    function next() {
        main.style.display = "none"
        creating.style.display = "flex"
        send.style.display = "none"
        update.style.display = "block"

        closeQuestion()

        title.value = editingPost.title
        image.value = editingPost.image
        description.value = editingPost.description
        selectedId = editingPost.id
    }
}

function deletePost() {
    fetch('http://167.99.138.67:1111/deletepost', {
        method: 'POST',
        mode: `cors`,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            secretKey: userPostsInfo.api_key,
            id: `${selectedId}`
        }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success === false) {
                alert(`Ooops! Something went wrong. Please try again later.`)
            } else {
                alert("Post deleted successfully")
                window.location.href = './userPanel.html'
            }
        })
}

function goBackToPosts() {
    window.location.href = './userPanel.html'
}

function updateToBack() {
    let post = {
        secretKey: userPostsInfo.api_key,
        title: `${title.value}`,
        image: `${image.value}`,
        description: `${description.value}`,
        id: `${selectedId}`
    }

    fetch('http://167.99.138.67:1111/updatepost', {
        method: 'POST',
        mode: `cors`,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success === false) {
                alert(data.message)
            } else {
                alert("Post updated successfully")
                window.location.href = './userPanel.html'
            }
        })
}

function sendToBack() {
    let post = {
        secretKey: userPostsInfo.api_key,
        title: `${title.value}`,
        image: `${image.value}`,
        description: `${description.value}`

    }

    fetch('http://167.99.138.67:1111/createpost', {
        method: 'POST',
        mode: `cors`,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success === false) {
                alert(data.message)
            } else {
                alert("Post added successfully")
                window.location.href = './userPanel.html'
            }
        })
}
