
let currentTab;

function setUpEventHandlers(){
    const pedidostab=document.querySelector("#pedidosTab");
    const pedidotab=document.querySelector("#pedidoTab");
    const nuevostab=document.querySelector("#nuevoTab");
    pedidostab.addEventListener('click', putFocusOnTab);
    pedidotab.addEventListener('click', putFocusOnTab);
    nuevostab.addEventListener('click', putFocusOnTab);
}

function putFocusOnTab(event){
    let buttonId=event.currentTarget.id;
    let tabId=buttonId.split('T')[0];
    showTab(tabId);
}

function hideCurrentTab(){
    if(currentTab!==undefined){
        currentTab.classList.add("hidden");
    }
}

function showTab(tabId){
    hideCurrentTab();
    const tab=document.querySelector("#"+tabId);
    tab.classList.remove("hidden");
    currentTab=tab;
}

//showTab("nuevo");
//setUpEventHandlers();