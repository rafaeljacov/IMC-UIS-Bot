let selectMode = document.querySelector('#ResStatus');
let saveButton = document.querySelector('#btnSaveEdit');

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const { mode } = message;
    if (selectMode.value == mode || selectMode.value === 'Cancelled') {
        // Skip Operation
        sendResponse({ status: 400 }); // 400: Operation Aborted due to unecessary steps.
    } else if (mode === 'confirm') {
        selectMode.value = 'Confirmed';
        chrome.runtime.sendMessage({ status: 'save' });
        saveButton.click();
    } else if (mode === 'temporary') {
        selectMode.value = 'Temporary';
        chrome.runtime.sendMessage({ status: 'save' });
        saveButton.click();
    } else if (mode === 'cancel') {
        selectMode.value = 'Cancelled';
        chrome.runtime.sendMessage({ status: 'save' });
        saveButton.click();
    }
});
