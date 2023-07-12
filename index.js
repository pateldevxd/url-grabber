let url = []
let inPt = document.getElementById("input-el")
let btn = document.getElementById("input-btn")
let ulEl = document.getElementById("ul-el")
let deleteBtn = document.getElementById("delete-btn")
let localtrg = JSON.parse( localStorage.getItem("url") )
let tabBtn = document.getElementById("tab-btn")

if (localtrg) {
    url = localtrg
    refreh(url)
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        url.push(tabs[0].url)
        localStorage.setItem("url", JSON.stringify(url) )
        refreh(url)
    })
})

function refreh(leads) {
    let list = ""
    for (let i = 0; i < leads.length; i++) {
        list += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = list
}

deleteBtn.addEventListener("click", function() {
    localStorage.clear()
    url = []
    refreh(url)
})

btn.addEventListener("click", function() {
    url.push(inPt.value)
    inPt.value = ""
    localStorage.setItem("url", JSON.stringify(url) )
    refreh(url)
})