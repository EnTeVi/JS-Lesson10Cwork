//     На странице post-details.html:-->
// 7 Вивести всю, без виключення, інформацію про об'єкт post на який клікнули .
// 8 Нижчє інформаці про пост, вивести всі коментарі поточного поста (ендпоінт  -
//     https://jsonplaceholder.typicode.com/posts/POST_ID/comments)
//
// Стилизація проєкта -
// index.html - всі блоки з user - по 2 в рядок. кнопки/аосилвння розташувати під інформацією про user.
//     user-details.html - блок з інфою про user зверху сторінки. Кнопка нижчє, на 90% ширини сторінки, по центру.
//     блоки з короткою іфною про post - в ряд по 5 .
//     post-details.html - блок з інфою про пост зверху. Коментарі - по 4 в ряд.
//     Всі елементи котрі характеризують users, posts, comments візуалізувати, так, щоб було видно що
// це блоки (дати фон. марджини і тд)


let url = new URL(location.href);
let postDate = JSON.parse(url.searchParams.get('date'));
console.log(postDate);


function postUs(item, box) {
    for (let itemKey in item) {
        if (typeof item[itemKey] !== 'object') {
            let p = document.createElement('p');
            p.innerText = `${itemKey}: ${item[itemKey]}`;
            box.appendChild(p);
        } else {
            postUs(item[itemKey], box);
        }
    }
}

let postBox = document.createElement('div');
postBox.className = 'postBox';
document.body.appendChild(postBox);
postUs(postDate, postBox);


fetch(`https://jsonplaceholder.typicode.com/posts/${postDate.id}/comments`)
    .then(value => value.json())
    .then(posts => {
        let comCon = document.createElement('div');
        comCon.className = 'comCon';
        document.body.appendChild(comCon);
        for (let post of posts) {
            let newCom = document.createElement('div');
            newCom.className = 'blokCom';
            postUs(post, newCom);
            comCon.appendChild(newCom);
        }
})