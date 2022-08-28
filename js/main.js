// В index.html
// 1 отримати масив об'єктів з endpoint`а https://jsonplaceholder.typicode.com/users
// 2 Вивести id,name всіх user в index.html. Окремий блок для кожного user.
// 3 Додати кожному блоку кнопку/посилання , при кліку на яку відбувається перехід  на сторінку
// user-details.html, котра має детальну інфорацію про об'єкт на який клікнули

let container = document.createElement('div');
container.className = 'container';
document.body.append(container);
fetch('https://jsonplaceholder.typicode.com/users')
.then((res) => {
    return res.json();
})
.then((data) => data.forEach(user => {

    let block = document.createElement('div');


    let divCont = document.createElement('div');
    let divElementId = document.createElement('h2');
    let divElementName = document.createElement('h2');
    let aLink = document.createElement('div');
    aLink.className = 'aLink';
    let a = document.createElement('a');

    divElementId.innerText = `${user.id} -`;
    divElementName.innerText = `- ${user.name}`;
    a.className = 'link';
    a.innerText = 'Information';
    a.href = `user-details.html?id=${user.id}`;

    divCont.append(block, aLink);
    aLink.appendChild(a);
    divCont.className = 'divContainer';
    block.append(divElementId, divElementName);
    block.className = 'block';
    container.append(divCont);

}));
