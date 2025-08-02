import { Gender, NewPatient } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
}

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
}

const parseDateOfBirth =(date: unknown):string => {
    if(!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: '+ date);
    }
    return date;
};

const isGender = (gender: string): gender is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(gender);
}

const parseGender = (gender: unknown): string=> {
    if(!gender || !isString(gender) || !isGender(gender)){
        throw new Error('Incorrect or missing gender: '+ gender);
    }
    return gender;
}

const parseOccupation = (occupation: unknown) :string => {
    if(!occupation || !isString(occupation)){
        throw new Error('Incorrect or missing gender: '+ occupation);
    }
    return occupation;    
}

const parseName = (name: unknown) :string => {
    if(!name || !isString(name)){
        throw new Error('Incorrect or missing gender: '+ name);
    }
    return name;    
}

const parseSSN = (ssn: unknown) :string => {
    if(!ssn || !isString(ssn)){
        throw new Error('Incorrect or missing gender: '+ ssn);
    }
    return ssn;    
}


const toNewPatients = (object: unknown): NewPatient => 
{
    if(!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
        const newEntry = {
            name: parseName(object.name),
            ssn: parseSSN(object.ssn),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            occupation: parseOccupation(object.occupation),
            gender: parseGender(object.gender)
        }
        return newEntry;
    }

    throw new Error('Incorrect data: some fields are missing');

} 

export default toNewPatients;