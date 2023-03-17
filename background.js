let resId1, resId2;
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const { status } = message;

    if (status === 200) {
        // 200: Step 1: OK.
        resId1 = message.resId1;
        resId2 = message.resId2;
        loopForAutomate(message);
    } else if (status === 300) {
        // 300: Step 2 OK
    } else if (status === 'save') {
        chrome.tabs.create(
            { url: 'https://uislive.uno-r.edu.ph/IMC/Reservation/' },
            (newTab) => {
                // Creates new tab to save edited values
                chrome.scripting.executeScript({
                    target: { tabId: newTab.id },
                    func: () => window.close(),
                });
            }
        );
    }
});

async function loopForAutomate(message) {
    for (let i = resId1; i <= resId2; i++) {
        await automate(i, message);
    }
}

function automate(id, message) {
    return new Promise((resolve) => {
        chrome.tabs.create(
            {
                url: `https://uislive.uno-r.edu.ph/IMC/Reservation/Edit?ResID=${id}`,
            },
            async (newTab) => {
                await chrome.scripting.executeScript({
                    target: { tabId: newTab.id },
                    files: ['automation.js'],
                });
                let response = await chrome.tabs.sendMessage(
                    newTab.id,
                    message
                );
                resolve(response);
            }
        );
    });
}
