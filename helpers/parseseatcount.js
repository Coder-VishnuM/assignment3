function parseSeatCount(seatText) {
    return parseInt(seatText.match(/\d+/)[0]);
}

module.exports = { parseSeatCount };