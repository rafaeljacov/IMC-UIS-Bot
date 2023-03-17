function handleButton() {
    const resId1 = parseInt(prompt('Enter the starting RES ID'));
    const resId2 = parseInt(prompt('Enter the final RES ID'));
    const mode = prompt('Select mode: ( confirm, temporary, cancel )');

    switch (mode.toLowerCase()) {
        case 'confirm':
            startAutomate(mode);
            break;
        case 'temporary':
            startAutomate(mode);
            break;
        case 'cancel':
            startAutomate(mode);
            break;
        default:
            alert('Warning: Invalid Mode Entered!');
            break;
    }

    async function startAutomate(mode) {
        const message = {
            status: 200,
            resId1,
            resId2,
            mode,
        };

        chrome.runtime.sendMessage(message);
    }

    if (resId1 > resId2) {
        alert('ID 1 must be smaller than ID 2!');
    } else if (resId1 && resId2) {
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
