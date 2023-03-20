let statusSelect = document.querySelector('#ResStatus');
let confirmButton = document.querySelector('#btnSaveEdit');

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const { mode } = message;
    if (statusSelect.value == mode || statusSelect.value === 'Cancelled') {
        // Skip Operation
        sendResponse({ status: 400 }); // 400: Operation Aborted due to unecessary steps.
    } else if (mode === 'confirm') {
        statusSelect.value = 'Confirmed';
        chrome.runtime.sendMessage({ status: 'save' });
        confirmButton.click();
    } else if (mode === 'temporary') {
        statusSelect.value = 'Temporary';
        chrome.runtime.sendMessage({ status: 'save' });
        confirmButton.click();
    } else if (mode === 'cancel') {
        statusSelect.value = 'Cancelled';
        chrome.runtime.sendMessage({ status: 'save' });
        confirmButton.click();
    }
});
