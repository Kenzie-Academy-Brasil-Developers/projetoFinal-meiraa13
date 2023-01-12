import { getLocalStorage } from "./localStorage.js";
import { checkUserType, userInfo, listUsersCoworkers } from "./requests.js";


// async function verifyPermission(){
    
//     const user = getLocalStorage()
//     const type = await checkUserType()

//     if(user == '' || type.is_admin == false){
//         window.location.replace('../index.html')
//     }

// }
// verifyPermission()

// async function logout(){


//     let button = document.querySelector('.logout')
//     button.addEventListener('click',()=>{

//         localStorage.removeItem('user')
//         window.location.replace('../index.html')
       
//     })

// }
// logout()

async function renderUserInfo(){

    const user = await userInfo()

    console.log(user)
    const section = document.querySelector('.user-area')

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
    button.innerText = 'X'

    div.appendChild(h1)
    div2.append(p1, p2, p3, button)

    section.prepend(div, div2)



}
renderUserInfo()


async function renderUserCoworkers(){

    const coworkers = await listUsersCoworkers()
    console.log(coworkers)

    let section = document.querySelector('.company')

    let divHeader = document.createElement('div')
    divHeader.classList = 'company-header'
    let h2 = document.createElement('h2')
    h2.innerText = 'Company Name - Department Name'

    let divBody = document.createElement('div')
    let ul = document.createElement('ul')

    coworkers.forEach((coworker)=>{

        let li = document.createElement('li')
        let h4 = document.createElement('h4')
        h4.innerText = coworker.users.username
        let p = document.createElement('p')
        p.innerText = coworker.users.professional_level

        ul.appendChild(li)

    })

    divBody.appendChild(ul)
    divHeader.appendChild(h2)

    section.append(divHeader, divBody)

}
renderUserCoworkers()