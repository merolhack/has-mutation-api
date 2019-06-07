const getWholePercent = function(percentFor,percentOf) {
    return Math.floor(percentFor / percentOf * 100);
}

module.exports = getWholePercent;
