chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'add') {
        const { item } = message;
        const addButton = document.querySelector(
            '#reserveDetailPager_left > table > tbody > tr > td:nth-child(1) > div > span'
        );
        addButton.click();
        const selection = document.querySelector('#EquipmentID');
        const saveButton = document.querySelector('#btnSave');

        for (option of selection.options) {
            if (option.label.toLowerCase().indexOf(item) === 0) {
                selection.value = option.value;
                sendResponse('ok');
                setTimeout(() => {
                    saveButton.click();
                }, 0);
                break;
            }
        }
    }
});
async () => {
    let response = await chrome.tabs.sendMessage(newTab.id, message);
    //check if user wants to add equipments
    if (response.action === 'add-equipment') {
        const { equipments } = response;
        async function addEquipments(item) {
            let queryOptions = {
                active: true,
                currentWindow: true,
            };
            let [tab] = await chrome.tabs.query(queryOptions);
            await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ['add-equipments.js'],
            });
            let response = await chrome.tabs.sendMessage(tab.id, {
                action: 'add',
                item,
            });
            console.log(response);
            return response;
        }
        for (const item of equipments) {
            await addEquipments(item);
        }
    }
    resolve(response);
};
