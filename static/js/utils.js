// UTILITIES
Utils = {
    // changes val, a number between oldMin and oldMax, to fit the new range newMin - newMax
    reRange: function(val, oldMin, oldMax, newMin, newMax) {
        return (((val - oldMin) * (newMax - newMin)) / (oldMax - oldMin)) + newMin;
    },

    // matrix transposition http://stackoverflow.com/questions/17428587/transposing-a-2d-array-in-javascript
    transpose: function (a) {
        return Object.keys(a[0]).map(function (c) {
            return a.map(function (r) {
                return r[c];
            });
        });
    }
};