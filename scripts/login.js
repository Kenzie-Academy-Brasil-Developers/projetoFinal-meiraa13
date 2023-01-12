import { login } from "./requests.js";

async function loginEvent(){

    const form = document.querySelector('form')
    const formArray = [...form.elements]
   
   
    form.addEventListener('submit', async(e)=>{
        e.preventDefault()

        const body = {}

        formArray.forEach((elt)=>{

            if(elt.tagName == 'INPUT' && elt.value !== ''){

                body[elt.id] = elt.value
            }
        })

        await login(body)

    })

}

loginEvent()

function showButtons(){

    const button = document.querySelector('.btn-show')
    const div = document.querySelector('.line-2')
 

    button.addEventListener('click',()=>{

        div.classList.toggle('show-btn')

    })



}
showButtons()