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
const userEquipments = [];


// Getting values of equipments selected by the user as well as mode of operation
let okButton = document.querySelector('#ok');
okButton.addEventListener('click', (e) => {
    userMode = document.querySelector('#selection').value;
    if (userMode !== 'Cancelled') {
        for (const id of allEquipments) {
            let counterId = document.getElementById(id);
            let counterValue = parseInt(counterId.textContent);

            for (let i = 0; i < counterValue; i++) {
                userEquipments.push(id);
            }
        }
    }

    // Send values as message to the background script
    sendValues();
});

// Creating list items with counters for all equipments
for (const item of allEquipments) {
    let count = 0;

    let decrement = document.createElement('button');
    decrement.append('-');
    decrement.addEventListener('click', (e) => {
        e.preventDefault();
        count-- ? count > 0 : (count = 0);
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
    counter.setAttribute('id', item);

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

async function sendValues() {
    chrome.runtime.sendMessage({
        status: 300,
        mode: userMode,
        equipments: userEquipments,
    });
}
