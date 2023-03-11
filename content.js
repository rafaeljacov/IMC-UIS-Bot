function handleButton() {
    const resId1 = parseInt(prompt('Enter the starting RES ID'));
    const resId2 = parseInt(prompt('Enter the final RES ID'));

    async function startAutomate() {
        const message = {
            status: 200,
            resId1,
            resId2,
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
