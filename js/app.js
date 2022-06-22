let rowPost = document.querySelector('.rowPost')
let btn = document.querySelector('.get-post')
let postForm = document.querySelector('#postform')
let title = document.querySelector('.title')
let body = document.querySelector('.body')


let feedBox = []

btn.addEventListener('click', getFeed)

let url = 'https://jsonplaceholder.typicode.com/posts'

function getFeed() {

    // window.alert('i love my life')
    
    fetch(url)
    .then((response) => {
        return response.json();
    })

    .then((json) => {

        feedBoxSlice = json;

        let feedBox = feedBoxSlice.slice(0, 20);

        blockHtml(feedBox);
        
    })
}


// Posting post

postForm.addEventListener('submit', postFormNow);

function postFormNow(e) {
    e.preventDefault();

    fetch(url, {
  method: 'POST',
  body: JSON.stringify({
    title: title.value,
    body: body.value,
    userId: 1,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())

  .then((json) => {
    feedBox.unshift(json);

    blockHtml(feedBox)

});

document.getElementById('postform').reset();
}


// Updating post

function updateMe(id) {

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
  method: 'PUT',
  body: JSON.stringify({
    id: id,
    title: title.value,
    body: body.value,
    userId: 1,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => {

    let pupils = document.querySelectorAll(".post-title");
    let student = document.querySelectorAll(".post-body");

    pupils.forEach((pupilTitle, index) => {
        if(index + 1 === id) {
            if(json.title !== ""){
                pupilTitle.innerHTML = json.title;
            }
           
        }
    })

    student.forEach((studentTitle, index) => {
        if(index + 1 === id) {
            if(json.title !== ""){
                studentTitle.innerHTML = json.body;
            }
           
        }
    })

  });
}




// function deleteMe(id) {
//     fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
//         method: 'DELETE',
//     })
//         .then((response) => response.json())
//         .then((json) => {
//             console.log(json)
//             feedBox = feedBox.filter(post => post.id !== id)
//             // console.log(postBox)
//             // use a function to display the UI
//             blockHtml(feedBox)  
//         })

// }

// deleting post

function deleteMe(id) {
    fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'DELETE',

  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
 .then((response) => response.json())
 .then((json) => {
    feedBox.shift(json);

    blockHtml(feedBox)
 })
}





function viewMe(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then((response) => response.json())
    .then((json) => {
        localStorage.setItem("viewedPost", JSON.stringify(json));
        window.location.href = "view.html";
    })
}

function blockHtml(arr) {
    let holder = '';
    arr.forEach((post) => {
        holder += `<div class="col-12 mx-auto">
        <div class="card border-0 bgothers p-4 mt-3">
            <div class="text-center">
                <h3 class="id text-light post-id">${post.id}</h3>
                <h3 class="text-dark display-6 fw-bolder title post-title" id="post-title">${post.title}</h3>
            </div>
            <div class="mt-2">
                <p class="body text-justify text-light fs-3 post-body" id="post-body">${post.body}</p>
            </div>
            <div class="d-flex justify-content-between align-items-center mt-4 border-top border-light px-4 pt-2">
                <button id="update-post" onclick="updateMe(${post.id})" class="btn btn-light">Update</button>
                <button id="view-post" onclick="viewMe(${post.id})" class="btn btn-dark border border-2 border-light text-light">View Post</button>
                <button id="delete-post" onclick="deleteMe(${post.id})" class="btn btn-danger">Delete</button>
            </div>
        </div>
   </div>`
    })

    rowPost.innerHTML = holder
}