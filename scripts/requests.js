import { toast } from "./toast.js"
import { getLocalStorage } from "./localStorage.js"

const baseUrl = 'http://localhost:6278/'


async function listCompanies(){

    try{

        const request = await fetch(baseUrl + 'companies')

        if(request.ok){

            const response = await request.json()
            return response
        }


    }catch(err) {

        console.log(err)
    }

}


async function register(body){

    try {

        const request = await fetch(baseUrl + 'auth/register',{
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })

        if(request.ok){

            const response = await request.json()

            toast('Sucesso!', 'Cadastro realizado')

            localStorage.setItem('user', JSON.stringify(response))

            setTimeout(()=>{

                window.location.replace('./login.html')
            },3500)
        
        }else {
            toast('Erro!', 'cadastro não realizado')
        } 
    
    } catch(err){

        console.log(err)
    }

}

async function login(body){

    try {

        const request = await fetch(baseUrl + 'auth/login',{
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })

        if(request.ok){

            const response = await request.json()

            toast('Sucesso!', 'login realizado')

            localStorage.setItem('user', JSON.stringify(response))

            let userType = await checkUserType()
            
            if(userType.is_admin){

                setTimeout(()=>{

                    window.location.replace('./adminPage.html')
                },3500)


            }else {

                setTimeout(()=>{

                    window.location.replace('./userPage.html')
                },3500)
            
            }

          
        }else {
            toast('Erro!', 'email ou senha incorretos')
        } 
    
    } catch(err){

        console.log(err)
    }

}


async function selectSector(sector){

    try{

        const request = await fetch(`${baseUrl}companies/${sector}`)

        if(request.ok){

            const response = await request.json()
        
            return response
        }


    } catch(err){

        console.log(err)
    }


}

async function checkUserType(){

    const localStorage = getLocalStorage()

    try{

        const request = await fetch(baseUrl + 'auth/validate_user', {
            method:'GET',
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            }
        })

        const response = await request.json()
        return response


    }catch(err) {

        console.log(err)
    }

}

async function listDepartments(){

    const localStorage = getLocalStorage()

    try{

        const request = await fetch(baseUrl + 'departments', {
            method:'GET',
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            }
        })

        const response = await request.json()
        return response


    }catch(err) {

        console.log(err)
    }

}

async function createDepartment(body){

    const localStorage = getLocalStorage()

    try{

        const request = await fetch('http://localhost:6278/departments', {
            method:'POST',
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            },
            body:JSON.stringify(body),
        })

        console.log(request)
        if(request.ok){

            const response = await request.json()
            return response


        }else{
            console.log('oi')
        }
    
    }catch(err) {

        console.log(err)
    }

}

async function listCompaniesDptm(id){

    const localStorage = getLocalStorage()

    try{

        const request = await fetch(`${baseUrl}departments/${id}`, {
            method:'GET',
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            }
        })

        const response = await request.json()
        return response


    }catch(err) {

        console.log(err)
    }

}

async function editDepartment(body, id){

    const localStorage = getLocalStorage()

    try{

        const request = await fetch(`${baseUrl}departments/${id}`, {
            method:'PATCH',
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            },
            body:JSON.stringify(body),
        })

        const response = await request.json()
        return response


    }catch(err) {

        console.log(err)
    }


}

async function deleteDepartment(id){

    const localStorage = getLocalStorage()

    try{

        const request = await fetch(`${baseUrl}departments/${id}`, {
            method:'DELETE',
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            },
        })

        const response = await request.json()
        return response


    }catch(err) {

        console.log(err)
    }


}

async function listUsers(){

    const localStorage = getLocalStorage()

    try{

        const request = await fetch(baseUrl + 'users', {
            method:'GET',
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            }
        })

        const response = await request.json()
        return response


    }catch(err) {

        console.log(err)
    }


}

async function editUsers(body, id){

    const localStorage = getLocalStorage()

    try{

        const request = await fetch(`${baseUrl}admin/update_user/${id}`, {
            method:'PATCH',
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            },
            body:JSON.stringify(body)
        })

        const response = await request.json()
        return response


    }catch(err) {

        console.log(err)
    }

}

async function deleteUser(id){

    const localStorage = getLocalStorage()

    try{

        const request = await fetch(`${baseUrl}admin/delete_user/${id}`, {
            method:'DELETE',
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            },
        })

        const response = await request.json()
        return response


    }catch(err) {

        console.log(err)
    }


}

async function usersNoDptm(){

    const localStorage = getLocalStorage()

    try{

        const request = await fetch(baseUrl + 'admin/out_of_work', {
            method:'GET',
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            }
        })

        const response = await request.json()
        return response


    }catch(err) {

        console.log(err)
    }
}

async function hireUser(body){

    
    const localStorage = getLocalStorage()

    try{

        const request = await fetch(`${baseUrl}departments/hire`, {
            method:'PATCH',
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(body)
        })

        const response = await request.json()
        return response


    }catch(err) {

        console.log(err)
    }


}



export { listCompanies, register, login, selectSector, checkUserType, listDepartments, createDepartment, listCompaniesDptm, editDepartment, deleteDepartment, listUsers, editUsers, deleteUser, usersNoDptm, hireUser }