import validators from './validators'

export const foundMatches = (arr) => {
    const copyArray = JSON.parse(JSON.stringify(arr));

    for(let i = 0; i < copyArray.length; i++) {
        if(copyArray[i]['duplicate with']) continue;

        const emailToFind = copyArray[i]['email'].toLowerCase();
        const phone = copyArray[i]['phone'];
        const validatedPhoneToFind = validators.get('phone')(phone) === false ? 
            phone : 
            validators.get('phone')(phone);

        for(let j = 0; j < copyArray.length; j++) {
            if(i === j ) continue;
            if(copyArray[j]['email'].toLowerCase() === emailToFind) {
                if(!copyArray[i]['duplicate with']) copyArray[i]['duplicate with'] = { 
                    match: 'email',
                    id: j + 1
                };

                if(!copyArray[j]['duplicate with']) copyArray[j]['duplicate with'] = {
                    match: 'email',
                    id: i + 1
                }
            }

            const validatedPhoneToCompare = validators.get('phone')(copyArray[j]['phone']) === false ? 
                copyArray[j]['phone'] : 
                validators.get('phone')(copyArray[j]['phone']);

            if(validatedPhoneToCompare === validatedPhoneToFind) {
                if(!copyArray[i]['duplicate with']) copyArray[i]['duplicate with'] = { 
                    match: 'phone',
                    id: j + 1
                };

                if(!copyArray[j]['duplicate with']) copyArray[j]['duplicate with'] = {
                    match: 'phone',
                    id: i + 1
                }
            }
        }
    }

    return copyArray;
}