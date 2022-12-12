import { createPdf } from './pdf'

const onElem = (selector: string): Promise<HTMLElement> => {
    return new Promise((resolve) => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector) as HTMLElement)
        }

        const observer = new MutationObserver((mutations) => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector) as HTMLElement)
                observer.disconnect()
            }
        })

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        })
    })
}

export const addCreatePdfButton = async () => {
    const toolbar = await onElem('mat-toolbar-row')
    const button = document.createElement('div')
    // classes : mat-focus-indicator mat-button mat-button-base ng-star-inserted
    button.classList.add('mat-focus-indicator', 'mat-button', 'mat-button-base', 'ng-star-inserted')
    toolbar.prepend(button)
    button.innerText = 'pages loading'
    await onElem('eed-document')
    button.innerText = 'make pdf'
    button.onclick = () => {
        createPdf(document.title)
    }
}
