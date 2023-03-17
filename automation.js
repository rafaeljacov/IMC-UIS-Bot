let selectMode = document.querySelector('#ResStatus');
let saveButton = document.querySelector('#btnSaveEdit');

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const { mode } = message;
    if (
        (mode === 'Confirmed' && selectMode.value == mode) ||
        selectMode.value === 'Cancelled'
    ) {
        // Skip Operation
        sendResponse({ status: 400 }); // 400: Operation Aborted due to unecessary steps.
        window.close();
    } else if (mode === 'Confirmed') {
        selectMode.value = 'Confirmed';
        chrome.runtime.sendMessage({ status: 'save' });

        sendRes({ action: 'done' });
        saveButton.click();
    } else if (mode === 'Temporary') {
        selectMode.value = 'temporary';
        chrome.runtime.sendmessage({ status: 'save' });

        sendRes({ action: 'done' });
        saveButton.click();
    } else if (mode === 'Cancelled') {
        selectMode.value = 'Cancelled';
        chrome.runtime.sendMessage({ status: 'save' });
        sendRes({ action: 'done' });
        saveButton.click();
    }
});
