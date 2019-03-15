//about page functionality

let aboutPage = document.getElementById('aboutPage');
let aboutTrigger = document.getElementById('aboutTrigger');
let span = document.getElementsByClassName("close")[0];

aboutTrigger.onclick = function() {
    aboutPage.style.display = "block";
}
span.onclick = function() {
    aboutPage.style.display = "none";   
}
window.onclick = function(e) {
    if(e.target == aboutPage) {
        aboutPage.style.display = "none";
    }
}

//post to server functionality

document.getElementById('handleSubmit').onclick = function(e) {
    e.preventDefault();
    fetch('http://tphrasegenerator.fun/backend?user='+document.getElementById('handle').value, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({handle: document.getElementById('handle').value})
    }).then(response => response.json())
    //.then(result=> document.getElmenetById('responseText').innerHTML = JSON.stringify(result.text))
    .then(result=> result.text)
    .then(finRes => document.getElementById('responseText').innerHTML = finRes)
    .then(res => document.getElementById('responseUser').innerHTML = "<a href='https://twitter.com/"+document.getElementById('handle').value+"'>@"+document.getElementById('handle').value+"</a>")
    .then(sRes => document.getElementById('handle').value = "");
    return true;
}