import { openModal } from "./modal.js";
import { listDepartments } from "./requests.js";
import { createDepoForm } from "./form.js";
import { listCompanies } from "./requests.js";
import { listCompaniesDptm } from "./requests.js";
import { editDptmForm } from "./form.js";
import { deleteDptmForm } from "./form.js";
import { listUsers } from "./requests.js";
import { editUserForm } from "./form.js";
import { deleteUserForm } from "./form.js";
import { admViewForm } from "./form.js";


async function renderDepartments(){

    const departments = await listDepartments()
    
    
    const ul = document.querySelector('.department')
    ul.innerHTML = ''

    departments.forEach((depart)=>{

        let template = createDepartment(depart)
        ul.appendChild(template)
    })

}

renderDepartments()

function createDepartment(department){

    let li = document.createElement('li')

    let h4 = document.createElement('h4')
    h4.innerText = department.name
    let p1 = document.createElement('p')
    p1.innerText = department.description
    let p2 = document.createElement('p')
    p2.innerText = department.companies.name
    
    let div = document.createElement('div')
    div.classList = 'adm-buttons'
    let btn1 = document.createElement('button')
    btn1.classList = 'eye'

    btn1.addEventListener('click', async()=>{

        const viewAdm = await admViewForm(department)
        openModal(viewAdm)

    })
    let btn2 = document.createElement('button')
    btn2.classList = 'edit'

    btn2.addEventListener('click', async()=>{

        const editDptm = await editDptmForm(department)
        openModal(editDptm)

    })
    let btn3 = document.createElement('button')
    btn3.classList = 'delete'

    btn3.addEventListener('click', async()=>{

        const deleteDptm = await deleteDptmForm(department)
        openModal(deleteDptm)



    })

    div.append(btn1, btn2, btn3)

    li.append(h4, p1, p2, div)

    return li

}


async function selectCompany(){

    const select = document.querySelector('.select-company')
    const companies = await listCompanies()

    let optionPlaceholder = document.createElement('option')
    optionPlaceholder.innerText = 'Selecionar Empresa'
    select.appendChild(optionPlaceholder)
    companies.forEach((company)=>{

        let option = document.createElement('option')
        option.innerText = company.name
        option.value = company.uuid
        select.appendChild(option)

    })

    select.addEventListener('change',async()=>{


        let ul = document.querySelector('.department')
        ul.innerHTML = ''
        let id = select.value
        let listDptm =  await listCompaniesDptm(id)
        listDptm.forEach((dptm)=>{

            let template = createDepartment(dptm)
            ul.appendChild(template)

        })

    })




}
selectCompany()


function createDepoEvent(){

    let button = document.querySelector('.create-department')

    button.addEventListener('click',async()=>{

        const form = await createDepoForm()
        openModal(form)
    })

}
createDepoEvent()

async function renderUsers(){

    const users = await listUsers()
    const departments = await listDepartments()

    const ul = document.querySelector('.users')
    ul.innerHTML = ''

    users.forEach((user)=>{

        let template = createUser(user, departments)
        ul.appendChild(template)

    })

}
renderUsers()

function createUser(user, dptms){

    let array = dptms.find((dptm)=> dptm.uuid == user.department_uuid)
    
    let li = document.createElement('li')

    let h4 = document.createElement('h4')
    h4.innerText = user.username
    let p = document.createElement('p')
    p.innerText = user.professional_level
    let p2 = document.createElement('p')
    if(array){

        p2.innerText = array.companies.name
    }
    let div = document.createElement('div')
    div.classList = 'adm-buttons'
    let button1 = document.createElement('button')
    button1.classList = 'edit'

    button1.addEventListener('click', async()=>{

        const editUser = await editUserForm(user)
        openModal(editUser)


    })
    let button2 = document.createElement('button')
    button2.classList = 'delete'

    button2.addEventListener('click', async()=>{

        const deleteUser = await deleteUserForm(user)
        openModal(deleteUser)

    })

    div.append(button1, button2)

    li.append(h4, p, p2, div)

    return li

}




export { renderDepartments, renderUsers }