function handleButton() {
    const resId1 = parseInt(prompt('Enter the starting RES ID'));
    const resId2 = parseInt(prompt('Enter the final RES ID'));

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

    async function startAutomate() {
        const message = {
            status: 200,
            resId1,
            resId2,
            userMode,
            userEquipments,
        };

        chrome.runtime.sendMessage(message);
    }

    if (resId1 && resId2) {
        startAutomate();
    } else {
        alert('Invalid Reservation Id Entry!\n\nOperation Aborted!');
    }
}

const body = document.querySelector('body');

const startButton = document.createElement('button');
startButton.append('Start');

body.appendChild(startButton);
startButton.addEventListener('click', handleButton);
