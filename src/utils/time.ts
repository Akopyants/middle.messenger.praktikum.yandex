
const getTime = (dateString : string) => {
    const dateObject = new Date(dateString);

    const hours = dateObject.getUTCHours();
    const minutes = dateObject.getUTCMinutes();

    return `${hours + 3}:${minutes}`
}
export default getTime;