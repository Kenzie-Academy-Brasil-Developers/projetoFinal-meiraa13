
function toast (title, message) {
    const body = document.querySelector('body')

    const container = document.createElement('div')
    container.classList.add('toast-container')



    const textContainer = document.createElement('div')
    textContainer.classList = 'text-container'

    let div = document.createElement('div')
    div.classList = 'flex gap'
    const h3 = document.createElement('h3')
    h3.innerText = title
    h3.classList = 'toast-title'
    
    const span = document.createElement('span')
    span.innerText = message

    if(title == 'Sucesso!'){
        container.classList.add('sucessToast')

    } else{
        container.classList.add('errorToast')
    }


    div.append(h3)
    textContainer.append(div, span)

    container.append(textContainer)

    body.appendChild(container)
    
}

export { toast }