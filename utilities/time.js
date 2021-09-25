/**
 * Converts string to timestamp
 * @param {string} string time in format 2013/09/05 15:34:00
 */
export const strToTime = (string) => {
    Math.round(new Date(string).getTime() / 1000)
}
