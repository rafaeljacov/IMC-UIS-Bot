let resId1, resId2;
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const { status } = message;
    if (status === 200) {
        // Change Status ( confirm, temporary, cancel )
        resId1 = message.resId1;
        resId2 = message.resId2;
        loopForMode(message);
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
    } else if (status === 300) {
        chrome.tabs.create({ url: 'equipments.html' });
        resId1 = message.resId1;
        resId2 = message.resId2;
    } else if (status === 'add') {
        sendResponse('done');
        loopForEquip(message);
    } else if (status === 'close') {
        async function closeTabs() {
            let tabs = chrome.tabs.query({
                url: 'https://uislive.uno-r.edu.ph/IMC/Reservation/Edit?ResID=${id}',
                currentWindow: true,
            });
            for (let tab of tabs) {
                chrome.tabs.remove(tab.id);
            }
        }
        closeTabs();
    }
});

async function loopForMode(message) {
    for (let i = resId1; i <= resId2; i++) {
        await automateMode(i, message);
    }
}

async function loopForEquip(message) {
    for (let i = resId1; i <= resId2; i++) {
        await automateEquip(i, message);
    }
}

function automateMode(id, message) {
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

function automateEquip(id, message) {
    return new Promise((resolve) => {
        chrome.tabs.create(
            {
                url: `https://uislive.uno-r.edu.ph/IMC/Reservation/Edit?ResID=${id}`,
            },
            async (tab) => {
                await chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    files: ['add-equipments.js'],
                });
                let response = await chrome.tabs.sendMessage(tab.id, {
                    equipments: message.equipments,
                });
                resolve(response);
            }
        );
    });
}
