const config = {
    "pro": "#ae3131",
    "oat": "#31aead"
}

window.addEventListener('resize', () => {
    const globalHeader = document.querySelector('[aria-label="Global"]')

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
})
