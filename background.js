let resId1, resId2;
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const { status } = message;

    if (status === 200) {
        // 200: Step 1: OK.
        resId1 = message.resId1;
        resId2 = message.resId2;

        // New Tab for users to select mode and equipments
        chrome.tabs.create({ url: 'equipments.html' });
    } else if (status === 300) {
        // 300: Step 2 OK
        loopForAutomate(message);
        sendResponse({status: 'done'});
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
        //check if user wants to add equipments
        if (message.addEquip) {
            async function addEquipments(equipments) {
                let queryOptions = { active: true, lastFocusedWindow: true };
                let [tab] = await chrome.tabs.query(queryOptions);
                // Execute script for adding equipments
                chrome.scripting.executeScript(
                    {
                        target: {tabId: tab.id},
                        files: ['add-equipments.js']
                    },
                    () => {
                        chrome.tabs.sendMessage(tab.id, {equipments})
                    }
                );
            }
            setTimeout(() => {
                addEquipments(message.equipments);
            }, 1200);
            
        }
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
