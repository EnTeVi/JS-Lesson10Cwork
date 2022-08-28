// На странице user-details.html:
// 4 Вивести всю, без виключення, інформацію про об'єкт user на який клікнули


// 5 Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера
// (для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)


//     6 Каждому посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку
// post-details.html, котра має детальну інфу про поточний пост.


let url = new URL(location.href);
let id = url.searchParams.get('id');
console.log(id);


function renderObj(obj, container) {
    for (let key in obj) {
        let value = obj[key];
        if (typeof value === "object") {
            let div = document.createElement('div');
            div.className = 'box';
            div.innerText = `${key}: `;
            container.appendChild(div);
            renderObj(value, div);
        }
        else {
            let divTwo = document.createElement('div');
            divTwo.innerText = `${key}: ${value}`;
            container.appendChild(divTwo);
        }
    }
}

let divContainer = document.createElement('div');
divContainer.className = 'divContainer';
document.body.appendChild(divContainer);

fetch(`https://jsonplaceholder.typicode.com/users/${id}`)

.then((resp) => {
    return resp.json();
})
.then((value) => {
    renderObj(value, divContainer);
})




let contOfBtn = document.createElement('div');
contOfBtn.className = 'contOfBtn';
let button = document.createElement('button');
button.innerText = 'Post of current user';
button.className = 'btn';
contOfBtn.appendChild(button);
document.body.appendChild(contOfBtn);


button.addEventListener('click', loadPost);

let cont = document.createElement('div');
cont.className = 'cont';
document.body.appendChild(cont);

function loadPost() {
    fetch(`http://jsonplaceholder.typicode.com/users/${id}/posts`)
        .then(value => value.json())
        .then(posts => {
            cont.innerHTML = '';

            for (let post of posts) {
                let newPost = document.createElement('div');
                cont.appendChild(newPost);
                newPost.className = ('post');

                let h3 = document.createElement('h3');
                h3.innerText = post.title;
                newPost.appendChild(h3);

                let btnPost = document.createElement('button');
                btnPost.innerText = 'Post detalis';
                btnPost.className = 'btnPost';
                newPost.appendChild(btnPost);

                btnPost.addEventListener('click', (event) => {
                    event.preventDefault();
                    window.location.href = (`post-details.html?date=${JSON.stringify(post)}`);
                })
            }
        })
}