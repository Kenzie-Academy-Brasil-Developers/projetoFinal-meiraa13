import { register } from "./requests.js";


function registerEvent(){

    const form = document.querySelector('form')
    const arrayForm = [...form.elements]
    console.log(arrayForm)

    form.addEventListener('submit', async(e)=>{
        e.preventDefault()

        const body = {}

        arrayForm.forEach((elt)=>{

            if(elt.tagName == 'INPUT' && elt.value !== ''){

                body[elt.id] = elt.value
            }

        })

        await register(body)

    })

}

registerEvent()