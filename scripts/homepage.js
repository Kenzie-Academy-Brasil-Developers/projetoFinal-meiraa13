import { listCompanies } from "./requests.js";
import { selectSector } from "./requests.js";



async function renderJobs(){

    const jobsAPI = await listCompanies()
  
    const ul = document.querySelector('ul')

    jobsAPI.forEach((job)=>{

        let template = createJob(job)
        ul.appendChild(template)

    })

}

renderJobs()

function createJob(job){

    let li = document.createElement('li')

    let h4 = document.createElement('h4')
    h4.innerText = job.name
    let div = document.createElement('div')
    div.classList = 'flex column gap'
    let p1 = document.createElement('p')
    p1.innerText = job.opening_hours
    let p2 = document.createElement('p')
    p2.innerText = job.sectors.description
    p2.classList = 'setor'

    div.append(p1, p2)
    li.append(h4, div)

    return li

}

function selectEvent(){


    let select = document.querySelector('select')
    let ul = document.querySelector('ul')

    select.addEventListener('change',async ()=>{

        ul.innerHTML = ''
        let sectors = await selectSector(select.value)
        sectors.forEach((job)=>{

            let template = createJob(job)
            ul.appendChild(template)


        })
    
    })

}

selectEvent()

