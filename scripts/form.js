import { createDepartment } from "./requests.js";
import { renderDepartments } from "./adm.js";
import { listCompanies } from "./requests.js";
import { editDepartment } from "./requests.js";
import { deleteDepartment } from "./requests.js";
import { editUsers } from "./requests.js";
import { renderUsers } from "./adm.js";
import { deleteUser } from "./requests.js";

async function createDepoForm(){

    let companies = await listCompanies()
  

    const formulario = document.createElement('form')
    formulario.classList.add('form')

    let h1 = document.createElement('h1')
    h1.innerText = 'Criar Departamento'

    let input1 = document.createElement('input')
    input1.placeholder = 'Nome do departamento'
    input1.name = 'name'
    let input2 = document.createElement('input')
    input2.placeholder = 'Descrição'
    input2.name = 'description'
    let select = document.createElement('select')
    select.name = 'company_uuid'
    let optionPlaceholder = document.createElement('option')
    optionPlaceholder.innerText = 'Selecionar Empresa'
    select.appendChild(optionPlaceholder)


    companies.forEach((company)=>{

        let option = document.createElement('option')
        option.value = company.uuid
        option.innerText = company.name
        select.appendChild(option)

    })


    let button = document.createElement('button')
    button.innerText = 'Criar o departamento'

    formulario.append(h1, input1, input2, select, button)

    formulario.addEventListener('submit', async(e)=>{

        e.preventDefault()
        e.path[2].remove()

        const inputs = [...e.target]

        const newDepo = {}

        inputs.forEach((input)=>{

           if(input.name){

            newDepo[input.name] = input.value
           }
            
        })

        await createDepartment(newDepo)
        await renderDepartments()
       

    })

    return formulario

}

async function editDptmForm(department){

    const formulario = document.createElement('form')
    formulario.classList.add('form')

    let h1 = document.createElement('h1')
    h1.innerText = 'Editar Departamento'

    let input1 = document.createElement('input')
    input1.placeholder = department.description
    input1.name = 'description'
    let button = document.createElement('button')
    button.innerText = 'Editar o departamento'

    formulario.append(h1, input1, button)

    formulario.addEventListener('submit', async(e)=>{
        e.preventDefault()

        e.path[2].remove()

        const inputs = [...e.target]
        
        const postBody = {}

        inputs.forEach((input)=>{

            if(input.name){

                postBody[input.name] = input.value
            }
        })

        await editDepartment(postBody, department.uuid)
        await renderDepartments()



    })


    return formulario

}

async function deleteDptmForm(department){

    const formulario = document.createElement('form')
    formulario.classList = 'form'

    let h2 = document.createElement('h2')
    h2.innerText = `Realmente deseja deletar o departamento ${department.name} e demitir seus funcionários?`
    let button = document.createElement('button')
    button.innerText = 'Confirmar'

    formulario.append(h2, button)

    formulario.addEventListener('submit', async(e)=>{

        e.preventDefault()
        e.path[2].remove()

        await deleteDepartment(department.uuid)
        await renderDepartments()

    })

    return formulario

}

async function editUserForm(user){

    const formulario = document.createElement('form')
    formulario.classList = 'form'

    let h1 = document.createElement('h1')
    h1.innerText = 'Editar Usuário'

    let select1 = document.createElement('select')
    select1.name = 'kind_of_work'
    let optionPlaceholder = document.createElement('option')
    optionPlaceholder.innerText = 'Selecione modalidade de trabalho'
    let option1 = document.createElement('option')
    option1.value = 'hibrido'
    option1.innerText = 'hibrido'
    let option2 = document.createElement('option')
    option2.value = 'presencial'
    option2.innerText = 'presencial'
    let option3 = document.createElement('option')
    option3.value = 'home office'
    option3.innerText = 'home office'
    select1.append(optionPlaceholder, option1, option2, option3)

    let select2 = document.createElement('select')
    select2.name = 'professional_level'
    let optionPlaceholder2 = document.createElement('option')
    optionPlaceholder2.innerText = 'Selecione nível profissional'
    let option4 = document.createElement('option')
    option4.value = 'estágio'
    option4.innerText = 'estágio'
    let option5 = document.createElement('option')
    option5.value = 'júnior'
    option5.innerText = 'júnior'
    let option6 = document.createElement('option')
    option6.value = 'pleno'
    option6.innerText = 'pleno'
    select2.append(optionPlaceholder2, option4, option5, option6)

    let button = document.createElement('button')
    button.innerText = 'Editar'

    formulario.append(h1, select1, select2, button)

    formulario.addEventListener('submit', async(e)=>{

        e.preventDefault()
        e.path[2].remove()

        const inputs = [...e.target]
        const userInfo = {}

        inputs.forEach((input)=>{

            if(input.name){

                userInfo[input.name] = input.value
            }
        })

        await editUsers(userInfo, user.uuid)
        await renderUsers()

    })

    return formulario

}

async function deleteUserForm(user){

    const formulario = document.createElement('form')
    formulario.classList = 'form'

    let h2 = document.createElement('h2')
    h2.innerText = `Realmente deseja remover o usuário ${user.username}?`
    let button = document.createElement('button')
    button.innerText = 'Confirmar'

    formulario.append(h2, button)

    formulario.addEventListener('submit', async(e)=>{

        e.preventDefault()
        e.path[2].remove()

        await deleteUser(user.uuid)
        await renderUsers()

    })

    return formulario

}


export { createDepoForm, editDptmForm, deleteDptmForm, editUserForm, deleteUserForm }