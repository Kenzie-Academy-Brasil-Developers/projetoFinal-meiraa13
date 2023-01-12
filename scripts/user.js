import { getLocalStorage } from "./localStorage.js";
import { openModal } from "./modal.js";
import { checkUserType } from "./requests.js";
import { userInfo } from "./requests.js";
import { listUsersCoworkers } from "./requests.js";
import { editUserOnline } from "./requests.js";




async function verifyPermission(){
    
    const user = getLocalStorage()
    const type = await checkUserType()

    if(user == '' || type.is_admin == true){
        window.location.replace('../index.html')
    }

}
verifyPermission()

async function logout(){


    let button = document.querySelector('.logout')
    button.addEventListener('click',()=>{

        localStorage.removeItem('user')
        window.location.replace('../index.html')
       
    })

}
logout()

async function renderUserInfo(){

    const user = await userInfo()

    const section = document.querySelector('.user-area')
    section.innerHTML = ''

    let div = document.createElement('div')
    let h1 = document.createElement('h1')
    h1.innerText = user.username

    let div2 = document.createElement('div')
    div2.classList = 'flex spc-between'
    let p1 = document.createElement('p')
    p1.innerText = user.email
    let p2 = document.createElement('p')
    p2.innerText = user.professional_level
    let p3 = document.createElement('p')
    p3.innerText = user.kind_of_work
    let button = document.createElement('button')
    button.classList = 'edit'

    button.addEventListener('click', async()=>{

        const modal = await editUserLogedIn()
        openModal(modal)

    })

    div.appendChild(h1)
    div2.append(p1, p2, p3, button)

    section.prepend(div, div2)



}
renderUserInfo()


async function renderUserCoworkers(){

    const coworkers = await listUsersCoworkers()
    let arrayCoworkers = coworkers[0].users
    

    let section = document.querySelector('.company')

    let divHeader = document.createElement('div')
    divHeader.classList = 'company-header'
    let h2 = document.createElement('h2')
    h2.innerText = 'Company Name - Department Name'

    let divBody = document.createElement('div')
    let ul = document.createElement('ul')

    arrayCoworkers.forEach((coworker)=>{

        let li = document.createElement('li')
        let h4 = document.createElement('h4')
        h4.innerText = coworker.username
        let p = document.createElement('p')
        p.innerText = coworker.professional_level


        li.append(h4, p)
        ul.appendChild(li)

    })

    divBody.appendChild(ul)
    divHeader.appendChild(h2)

    section.append(divHeader, divBody)

}
renderUserCoworkers()


async function editUserLogedIn(){


    const formulario = document.createElement('form')
    formulario.classList.add('form')

    let h1 = document.createElement('h1')
    h1.innerText = 'Editar Usuário'

    let input1 = document.createElement('input')
    input1.placeholder = 'Nome do usuário'
    input1.name = 'username'
    let input2 = document.createElement('input')
    input2.placeholder = 'Email'
    input2.name = 'email'
    input2.type = 'email'
    let input3 = document.createElement('input')
    input3.placeholder = 'Senha'
    input3.name = 'password'
    
    let button = document.createElement('button')
    button.classList = 'btn-createForm'
    button.innerText = 'Editar usuário'

    formulario.append(h1, input1, input2, input3, button)

    formulario.addEventListener('submit', async(e)=>{

        e.preventDefault()
        e.path[2].remove()

        const inputs = [...e.target]

        const body = {}

        inputs.forEach((input)=>{

           if(input.name){

            body[input.name] = input.value
           }
            
        })
        console.log(body)

       await editUserOnline(body)
       renderUserInfo()
       

    })

    return formulario

}