window.addEventListener('resize', () => {
    const globalHeader = document.querySelector('[aria-label="Global"]')
    chrome.storage.local.get(['aws-color-config']).then((result) => {
        const config = result['aws-color-config']

        if (globalHeader) {
            const user = globalHeader.querySelector('[aria-controls="menu--account"]').getAttribute('aria-label')
            console.log('user', user)
            if (user) {
                const configKeys = Object.keys(config)
                const match = configKeys.filter(c => user.includes(c))

                if (match) {
                    globalHeader.style.backgroundColor = config[match]
                }
            }
        }
    });
})
