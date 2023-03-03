chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const { resId1, resId2, status } = message;

    if (status === 200) {
        for (let i = resId1; i <= resId2; i++) {
            createNewTab(i);
        }
    }
});

function createNewTab(index) {
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
