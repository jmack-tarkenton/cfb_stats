export const camelCaseToProperCase=(str)=> {
    // Split the string by uppercase letters
    const words = str.split(/(?=[A-Z])/);

    // Capitalize the first letter of each word and join them back together
    const properCaseStr = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    return properCaseStr;
}
