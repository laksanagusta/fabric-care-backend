const { transactionHelper } = require(".")

const generateHexColor = () => {
    const color = "#" + Math.floor(Math.random()*16777215).toString(16)
    return color
}

const mappingIds = async (data) => {
    const ids = data.map(value => value.id)
    return ids
}

const formatDateTimeRange = async (startTime, endTime) => {
    const formattedStartTime = await transactionHelper.formatDate(startTime).slice(0, 10)
    const formattedEndTime = await transactionHelper.formatDate(endTime).slice(0, 10)

    return {
        startTime : formattedStartTime + " 00:00:01",
        endTime : formattedEndTime + " 23:59:59"
    }
}

module.exports = {
    generateHexColor, 
    mappingIds,
    formatDateTimeRange
}