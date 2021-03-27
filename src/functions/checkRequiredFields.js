export const checkRequiredFields = (requiredFields, allFields) => {
    const lowerCaseFields = allFields.map(field => field.toLowerCase().trim());

    return requiredFields.every(item => lowerCaseFields.includes(item.toLowerCase()));
}