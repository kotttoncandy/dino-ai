/*

INPUTS:
    how far is the next block
    how tall is the next block
OUTPUTS:
    if jumping or not

*/

function amIjumping(a, b, weight1, weight2, bias) {
    var weightedsum = ((a * weight1) + (0 * weight2)) + bias
    var activate = Math.cos(weightedsum)
    if (activate < 0.7 && activate > 0.5) {
        return true
    } else {
        return false
    }
}

export { amIjumping }