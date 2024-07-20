let pic = document.getElementById('pic');
let desc = document.getElementById('desc');
let descTitle = document.getElementById('descTitle');
let search = document.getElementById('search-input');
let btn = document.getElementById('search');
let history = document.getElementById('search-history');
const api_key = 'XBG1Y2Xcf6ZDqRDn90WPrO7ICaHqyfyhCGHs5G0b';
let storedHistory=[];

function getCurrentImageOfTheDay() {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${api_key}`).then(res => {
        return res.json()
    }).then(res => {
        pic.setAttribute('src', res.hdurl);
        desc.innerHTML = res.explanation;
        descTitle.innerHTML = res.title;

        console.log(res);
    }).catch(err => {
        alert(err)
    })
}
function getImageOfTheDay(e, d) {
    if (e) {
        e.preventDefault();
    }
    let date = d || search.value;
    if (date) {
        fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${api_key} `).then(res => {
            return res.json()
        }).then(res => {
            pic.setAttribute('src', res.hdurl);
            desc.innerHTML = res.explanation;
            descTitle.innerHTML = res.title;
            if (!d) {
                saveSearch(date);
                addSearchToHistory(date)
            }
        }).catch(err => {
            alert(err)
        })
    }
    else {
        alert('date is required')
    }
}
function saveSearch(search_date){
    let state=true;
    storedHistory.forEach(ele=>{
        if(ele==search_date){
            state=false
        }
    })
    if(state&&search_date){
       storedHistory.push(search_date); 
    }
    displaySearch();
}
function displaySearch() {
    history.innerHTML='';
    storedHistory.forEach(ele=>{
        const listItem = document.createElement('li');
        listItem.textContent = ele;
        listItem.setAttribute('class','searchList')
        listItem.addEventListener('click', () => {
            getImageOfTheDay(null, ele);
        });
        history.appendChild(listItem);
    })
    
}
function addSearchToHistory(date) {
    let prevHistory = localStorage.getItem('history')
    let storedHistory = JSON.parse(prevHistory) || [];
    let state = true;
    storedHistory.forEach(element => {
        if (element == date) {
            state = false;
        }
    });
    if (date && state) {
        storedHistory.push(date);
        localStorage.setItem('history', JSON.stringify(storedHistory));
    }
}
function getLocalHistory() {
    let prevHistory = localStorage.getItem('history')
    storedHistory = JSON.parse(prevHistory) || [];
    displaySearch();
}
document.addEventListener("DOMContentLoaded", () => {
    getCurrentImageOfTheDay()
    getLocalHistory()
})
btn.addEventListener('click', getImageOfTheDay);