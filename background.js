chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const { status } = message;

    if (status === 200) {
        chrome.tabs.create({ url: 'popup.html' });
    } else if (status === 300) {
        for (let i = message.resId1; i <= message.resId2; i++) {
            // automate(i, userMode, userEquipments); user mode and equipments not yet initialized
        }
    }
});

function automate(id, mode, equipments) {
    chrome.tabs.create(
        {
            url: `https://uislive.uno-r.edu.ph/IMC/Reservation/Edit?ResID=${id}`,
        },
        (newTab) => {
            chrome.scripting.executeScript({
                target: { tabId: newTab.id },
                files: ['automation.js'],
            });
        }
    );
}
