function getValueAndRefresh() {
    chrome.storage.local.get(['aws-color-config']).then((result) => {
        console.log('Value currently is ', result['aws-color-config']);
        const config = result['aws-color-config'];
        const list = document.getElementById('envList');
        Object.keys(config).forEach((key) => {
            const listHtml = document.createElement('div');
            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = 'Delete';
            deleteButton.onclick = () => {
                delete config[key];
                chrome.storage.local.set({ 'aws-color-config': config }).then(() => {
                    console.log('Value is set to ' + config);
                });
            };
            listHtml.innerHTML = `${key}: ${config[key]}`;
            listHtml.appendChild(deleteButton);
            list.appendChild(listHtml);
        });
    });
}

function getFormData() {
    let configSaved
    const environment = document.getElementById('environment').value
    const color = document.getElementById('color').value
    chrome.storage.local.get(['aws-color-config']).then((result) => {
        configSaved = result['aws-color-config']
        const config = {
            ...configSaved,
            [environment]: color
        }
        chrome.storage.local.set({ 'aws-color-config': config }).then(() => {
            console.log('Value is set to ' + config);
        });
    });
}

getValueAndRefresh();

document.getElementById('save').addEventListener('click', getFormData)