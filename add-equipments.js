let addButton = document.querySelector(
    '#reserveDetailPager_left > table > tbody > tr > td:nth-child(1) > div > span'
);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const { equipments } = message;
    addButton.click();

    let itemSelect = document.querySelector('#EquipmentID');
    let saveButton = document.querySelector('#btnSave');

    for (const item of equipments) {
        for (const option of itemSelect.options) {
            if (option.label.toLowerCase().indexOf(item) === 0) {
                itemSelect.value = option.value;
                saveButton.click();
                break;
            }
        }
    }
});
