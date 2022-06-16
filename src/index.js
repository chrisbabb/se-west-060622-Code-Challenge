// write your code here
//Call function to get the Flatgram from the server
getFlatgramImageFromServer()
getCommentsFromServer()
addEventListenerToLikeButton()
addEventListenerToPostButton()

function addEventListenerToLikeButton() {
    //Add an Event Listener to the Like Button
    const likeButton = document.getElementById('like-button')
    const likeCounter = document.getElementById('like-count')
    let likeCounterValue = likeCounter.getAttribute('counter')

    likeButton.addEventListener('click', () => {
        likeCounterValue++
        likeCounter.setAttribute('counter', likeCounterValue)
        likeCounter.textContent = `${likeCounterValue} likes`
    })
}


//Grab the Image Object from the server
function getFlatgramImageFromServer() {
    fetch('http://localhost:3000/images')
    .then(rtn => rtn.json())
    .then(formattedImages => addImageAndTitleToPage(formattedImages))
}


function getCommentsFromServer() {
    fetch('http://localhost:3000/comments')
    .then(rtn => rtn.json())
    .then(formattedComments => addCommentsToPage(formattedComments))
}

//Function to Add Image, Title and Likes to Page
function addImageAndTitleToPage(theImageObject) {
    //Grab the Image, Title and Likes elements from the DOM
    const theImage = document.getElementById('card-image')
    const theTitle = document.getElementById('card-title')
    const theLikes = document.getElementById('like-count')

    for(let image of theImageObject) {
        //Apply the Image and Title we got from the API
        theImage.src = image.image
        theTitle.textContent = image.theTitle

        //Apply the Count to the Like Counter
        theLikes.setAttribute('counter', parseInt(image.likes))
        theLikes.textContent = `${image.likes} likes`
    }

}


function addCommentsToPage(theCommentsObject) {
    //Grab the Comments Outter element from the DOM
    const theCommentsUL = document.getElementById('comments-list')

    //Clear current comments
    const commentsLIs = document.querySelectorAll('li')
    for(let commentLI of commentsLIs) {
        commentLI.remove()
    }

    for(let comment of theCommentsObject) {
        const newLI = document.createElement('li')
        newLI.textContent = comment.content
        theCommentsUL.append(newLI)
    }

}

function addEventListenerToPostButton() {
    //Use querySelector to get the first comment-button class on the DOM
    const commentButton = document.querySelector('.comment-button')
    const commentsList = document.getElementById('comments-list')
    const commentForm = document.getElementById('comment-form')

    commentButton.addEventListener('click', (e) => {
        //Stop normal submit button behavior
        e.preventDefault()

        //Get the form data
        let formData = document.getElementById('comment')

        //Add an if statement to ignore the form if it's blank
        if(formData.value !== ""){

            //Create our new LI Element, put the form data into it
            //Append it to the list then clear the form
            const newLI = document.createElement('li')
            newLI.textContent = formData.value
            commentsList.append(newLI)

        }
        else{
            //For fun add an alert to let the user know the form is blank
            alert('The form is blank')
        }
    })
}