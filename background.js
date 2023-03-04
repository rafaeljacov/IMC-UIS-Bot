let resId1;
let resId2;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const { status } = message;

    if (status === 200) {
        resId1 = message.resId1;
        resId2 = message.resId2;

        // New Tab for users to select mode and equipments
        chrome.tabs.create({ url: 'equipments.html' });
    } else if (status === 300) {
        loopForAutomate(message);
    }
});

async function loopForAutomate(message) {
    for (let i = resId1; i <= resId2; i++) {
        await automate(i, message);
    }
}

async function automate(id, message) {
    return new Promise((resolve) => {
        chrome.tabs.create(
            {
                url: `https://uislive.uno-r.edu.ph/IMC/Reservation/Edit?ResID=${id}`,
            },
            (newTab) => {
                chrome.scripting.executeScript(
                    {
                        target: { tabId: newTab.id },
                        files: ['automation.js'],
                    },
                    async () => {
                        let response = await chrome.tabs.sendMessage(
                            newTab.id,
                            message
                        );
                        resolve(response);
                    }
                );
            }
        );
    });
}


