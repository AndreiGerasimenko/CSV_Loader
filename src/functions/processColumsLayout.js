import validators from './validators'

export const processColumnsLayout = (fields) => {

    //add ID column
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        }
    ];

    fields.forEach(item => {
        const lowerCaseTrimed = item.trim().toLowerCase();

        const column = {
            title: item.trim(),
            dataIndex: lowerCaseTrimed,
            key: lowerCaseTrimed,
            render: (text, record) => {

                let content = text.trim();
                const validator = validators.get(lowerCaseTrimed);
                let validationResult = true;

                if(validator) {
                    validationResult = validator(text.trim(), record);
                    if(validationResult !== true && validationResult !== false) {
                        content = validationResult;
                    }
                }

                const highlightCell = record['duplicate with']?.match === lowerCaseTrimed ||
                    validationResult === false

                return {
                    props: {
                        className: highlightCell ? 'validation-error' : ''
                    },
                    children: content
                }
            }
        }
        columns.push(column);
    })

    //Add duplicate with

    columns.push({
        title: 'Duplicate with',
        dataIndex: 'duplicate with',
        key: 'duplicate with',
        align: 'center',
        render: (text) => {
            if(text?.id) {
                return {
                    children: text.id
                }
            }
        }
    })

    return columns;
}