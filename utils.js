
//shuffles an array randomly
module.exports.shuffle = function(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//gets a random int between [min, max]
module.exports.randomInt = function(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}
