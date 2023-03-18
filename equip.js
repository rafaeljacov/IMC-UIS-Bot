const allEquipments = [
    'acr',
    'audio jack',
    'audio system',
    'dcam',
    'dvd',
    'dvd writer',
    'ec',
    'fsp',
    'hdmi',
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

const userEquipments = [];

// Getting values of equipments selected by the user as well as mode of operation
let confirm = document.querySelector('#confirm');
confirm.addEventListener('click', (e) => {
    for (const id of allEquipments) {
        let counterId = document.getElementById(id);
        let counterValue = parseInt(counterId.textContent);

        for (let i = 0; i < counterValue; i++) {
            userEquipments.push(id);
        }
    }

    // Send values as message to the background script
    sendValues();
});

// Creating list items with counters for all equipments
for (let i = 0; i < allEquipments.length; i++) {
    let item = allEquipments[i];

    let count = 0;

    let decrement = document.createElement('button');
    decrement.append('-');
    decrement.addEventListener('click', (e) => {
        e.preventDefault();
        count-- ? count > 0 : (count = 0);
        counter.textContent = count;
    });

    decrement.setAttribute('id', 'decrement');

    let increment = document.createElement('button');
    increment.append('+');
    increment.addEventListener('click', (e) => {
        e.preventDefault();
        count++;
        counter.textContent = count;
    });

    increment.setAttribute('id', 'increment');

    let counter = document.createElement('span');
    counter.append(count);
    counter.setAttribute('id', item);
    counter.setAttribute('class', 'counter');

    let span = document.createElement('span');
    span.appendChild(decrement);
    span.appendChild(counter);
    span.appendChild(increment);

    let li = document.createElement('li');
    li.append(item.toUpperCase());
    li.appendChild(span);

    if (i < 14) {
        li.setAttribute('class', 'column1');
    } else {
        li.setAttribute('class', 'column2');
        li.style.gridRow = i - 13;
    }

    let ul = document.querySelector('#equipments');
    ul.appendChild(li);
}

async function sendValues() {
    if (userEquipments.length === 0) {
        alert('NO EQUIPMENTS ADDED, This window will now close...');
        window.close();
    } else {
        let response = await chrome.runtime.sendMessage({
            status: 'add',
            equipments: userEquipments,
        });
        if (response === 'done') {
            window.close();
        }
    }
}
