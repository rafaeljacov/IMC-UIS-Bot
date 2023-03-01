

let body = document.querySelector('body');

let button = document.createElement('button');
button.append('Start');
let start = body.appendChild(button);
start.addEventListener('click', startScript);
