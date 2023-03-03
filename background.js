chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const { resId1, resId2, status, userMode, userEquipments } = message;

    if (status === 200) {
        chrome.tabs.create({url: "./popup.html"})
        for (let i = resId1; i <= resId2; i++) {
            createNewTab(i, userMode, userEquipments);
        }
    }
});

function createNewTab(index, mode, equipments) {
    chrome.tabs.create(
        {
            url: `https://uislive.uno-r.edu.ph/IMC/Reservation/Edit?ResID=${index}`,
        },
        (newTab) => {
            chrome.scripting.executeScript({
                target: { tabId: newTab.id },
                files: ['automation.js'],
            });
        }
    );
}
