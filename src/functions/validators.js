import moment from 'moment'
import { USAPostCodes } from '../unitedStatesPostCodes';

const validators = new Map();

const ageValidator = (value) => {
    if(Number.isInteger(+value) && value >= 21) return true;
    return false;
}


const expValidator = (value, record) => {
    if(isFinite(value) && value >= 0 &&
        (!Number.isInteger(+record['age']) || value <= record['age'] - 21 )) return true;     
    return false;
}

const yearlyIncomeValidator = (value) => {
    if(isFinite(value) && value >= 0 && value <= 1000000) {
        return (+value).toFixed(2);
    }

    return false;
}

const expirationDateValidator = (value) => {
    if((moment(value, 'YYYY-MM-DD').isValid() ||
        moment(value, 'MM/DD/YYYY').isValid()) &&
        moment(value).isAfter(moment())
    ) return true;

    return false;
}

const phoneValidator = (value) => {
    if(value.length < 10 || value.length > 12) return false;
    if(!value[0] === '1' && !value[0] === '+') return false;
    if(value.length === 10 && Number.isInteger(+value)) return `+1${value}`
    if(value.length === 11 && 
      Number.isInteger(+value) &&
      value[0] === '1' ) return `+${value}`
    if(value.length === 12 && 
       value.slice(0, 2) === '+1' &&
       Number.isInteger(+value.slice(-10))) return value;
    return false;
}

const childrenValidator = (value) => {
    if(value === 'TRUE' || value === 'FALSE') return value;
    if(value === '') return 'FALSE';
    return false;
}

const licenseNumberValidator = (value) => {
    if(value.length !== 6) return false;
    if(/[()~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(value)) return false;
    
    return true;
}

const emailValidator = (value) => {
    return value.includes('@');
}

const nameValidator = (value) => {
    return value.length > 0
}

const statesLicenseValidator = (value) => {
    const states = value.split('|').filter(item => item.trim().length > 1)
    .map(item => {
        const trimed = item.trim();

        if(trimed.length < 2) return '';
        if(trimed.length === 2) return trimed.toUpperCase();
        if(USAPostCodes[trimed.toLowerCase()]) return USAPostCodes[trimed.toLowerCase()];

        return trimed;
    })

    return states.join(', ');

}

validators.set('age', ageValidator).set('experience', expValidator)
.set('expiration date', expirationDateValidator).set('phone', phoneValidator)
.set('has children', childrenValidator).set('yearly income', yearlyIncomeValidator)
.set('license number', licenseNumberValidator).set('email', emailValidator)
.set('full name', nameValidator).set("license states", statesLicenseValidator);

export default validators;





