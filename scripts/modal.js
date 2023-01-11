
export function openModal(content){

    const body = document.querySelector('body')

    const backgroundContainer = document.createElement('section')
    const mainContainer = document.createElement('section')
    const closeModalButton = document.createElement('button')  

    backgroundContainer.classList.add('modal-background')
    mainContainer.classList.add('modal-container')
    closeModalButton.classList.add('modal-close')

    closeModalButton.innerText = 'X'

    closeModalButton.addEventListener('click', ()=>{

        backgroundContainer.remove()

    })

    mainContainer.appendChild(closeModalButton)
    mainContainer.append(content)
    backgroundContainer.appendChild(mainContainer)
    body.appendChild(backgroundContainer)

}

