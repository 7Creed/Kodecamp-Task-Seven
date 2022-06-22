function check(){
    let object = localStorage.getItem("viewedPost");

    let set = JSON.parse(object)

    document.querySelector('.post-id').innerHTML = set.id
    document.querySelector('.post-title').innerHTML = set.title
    document.querySelector('.post-body').innerHTML = set.body
}

check()