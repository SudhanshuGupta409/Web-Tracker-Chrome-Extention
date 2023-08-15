let myLeads = [];
const inputEl = document.getElementById("input-el");
const btnEl = document.getElementById("input-btn");
const delBtnEl = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
const ulEl = document.getElementById("ul-el");

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

function render(leads) {
    let listItems = "";
    for(let i=0; i<leads.length; i++){
    listItems += `<li><a target='_blank' href='${leads[i]}'>${leads[i]}</a></li>`;
    }
    ulEl.innerHTML = listItems;
}

tabBtn.addEventListener("click", ()=>{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    })
    
})

btnEl.addEventListener("click", ()=>{
    myLeads.push(inputEl.value);
    inputEl.value = "" ;
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
})

delBtnEl.addEventListener("dblclick", ()=>{
    localStorage.clear();
    myLeads = [];
    render(myLeads);
})


