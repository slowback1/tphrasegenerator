//words is an object with single word strings for keys and integers for values
module.exports = function(words) {
    var sortable = [];
    for(var wrd in words) {
        sortable.push([wrd, words[wrd]]);
    }
    sortable.sort(function(a,b) {
        return a[1] - b[1];
    });
    let length = Math.floor(Math.random() * 25) + 6;
    let response = [];
    for(var i = 0; i < length; i++) {
        response.push(sortable[Math.floor(Math.random() * 50)][0]);
    }
    let result = response.join(" "); 
    return result;
}