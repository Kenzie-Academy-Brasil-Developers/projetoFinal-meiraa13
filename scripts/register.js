import { register } from "./requests.js";


function registerEvent(){

    const form = document.querySelector('form')
    const arrayForm = [...form.elements]
    console.log(arrayForm)

    form.addEventListener('submit', async(e)=>{
        e.preventDefault()

        const body = {}

        arrayForm.forEach((elt)=>{

            if(elt.tagName == 'INPUT' || elt.tagName =='SELECT' && elt.value !== ''){

                body[elt.id] = elt.value
            }

        })

        await register(body)

    })

}

registerEvent()

function showButtons(){

    const button = document.querySelector('.btn-show')
    const div = document.querySelector('.line-2')
 

    button.addEventListener('click',()=>{

        div.classList.toggle('show-btn')

    })



}
showButtons()