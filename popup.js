const allEquipments = [
    'acr',
    'audio jack',
    'audio system',
    'dcam',
    'dvd',
    'dvd writer',
    'ec',
    'fsp',
    'laptop',
    'laser pointer',
    'lcd',
    'led-tv',
    'mp',
    'ohp',
    'rca',
    'remote',
    'rgb',
    'screen',
    'slp',
    'speaker',
    'still cam',
    'table',
    'tab-tv',
    'tripod',
    'usb ext',
    'vcam',
    'vhs',
];

let userMode;
let userEquipments = [];

document.querySelector('#ok').addEventListener('click', (e) => {
    userMode = document.querySelector('#selection').value;
});

for (const item of allEquipments) {
    let count = 0;

    let decrement = document.createElement('button');
    decrement.append('-');
    decrement.addEventListener('click', (e) => {
        e.preventDefault()
        count-- ? count > 0 : count = 0;
        counter.textContent = count;
    });

    let increment = document.createElement('button');
    increment.append('+');
    increment.addEventListener('click', (e) => {
        e.preventDefault();
        count++;
        counter.textContent = count;
    });

    let counter = document.createElement('span');
    counter.append(count);
    counter.setAttribute('id', `${item}-counter`);

    let span = document.createElement('span');
    span.appendChild(decrement);
    span.appendChild(counter);
    span.appendChild(increment);

    let li = document.createElement('li');
    li.append(item.toUpperCase());
    li.appendChild(span);

    let ul = document.querySelector('#equipments');
    ul.appendChild(li);
}
