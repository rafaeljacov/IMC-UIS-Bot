let selectMode = document.querySelector('#ResStatus');
let saveButton = document.querySelector('#btnSaveEdit');

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const { mode, equipments } = message;
    if (
        (mode === 'Confirmed' && selectMode.value == mode) ||
        selectMode.value === 'Cancelled'
    ) {
        // Skip Operation
        sendResponse({ status: 400 }); // 400: Operation Aborted due to unecessary steps.
        window.close();
    } else if (mode === 'Confirmed') {
        modeConfirmed(sendResponse, equipments);
    } else if (mode === 'Temporary') {
        modeTemporary(sendResponse, equipments);
    } else if (mode === 'Cancelled') {
        selectMode.value = 'Cancelled';
        sendResponse({ status: 700 }); // 700: Operation Success.
        chrome.runtime.sendMessage({ status: 'save', addEquip: false });
        saveButton.click();
    }
});

// CONVERT THIS FUNCTION TO A SCRIPT INJECTION!!!
function addEquipments(equipments) {
    console.log('TO DO');
}

async function modeTemporary(sendResponse, equipments) {
    if (equipments.length !== 0 && selectMode.value !== 'Temporary') {
        selectMode.value = 'Temporary';
        chrome.runtime.sendMessage({ status: 'save', addEquip: true });
        addEquipments(equipments);
        saveButton.click();
    } else if (equipments.length === 0 && selectMode.value !== 'Temporary') {
        selectMode.value = 'Temporary';
        chrome.runtime.sendMessage({ status: 'save', addEquip: false });
        saveButton.click();
    } else if (equipments.length !== 0 && selectMode.value === 'Temporary') {
        chrome.runtime.sendMessage({ status: 'save', addEquip: true });
        addEquipments(equipments);
        saveButton.click();
    }
}

async function modeConfirmed(sendResponse, equipments) {
    if (equipments.length !== 0) {
        addEquipments(equipments);
        chrome.runtime.sendMessage({ status: 'save', addEquip: true });
        saveButton.click();
    } else {
        selectMode.value = 'Confirmed';
        chrome.runtime.sendMessage({ status: 'save', addEquip: false });
        saveButton.click();
    }
}
