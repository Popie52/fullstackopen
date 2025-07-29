interface Values {
    val1: number,
    val2: number

}
const parseArguments = (args: string[]): Values => {
    if(args.length < 4) throw new Error('Not enough argumments');
    if(args.length > 4) throw new Error('Not enough arguments');
    if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            val1: Number(args[2]),
            val2: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}


export const calculateBmi = (height: number, mass: number):string => {
    height *= height/(100*100);
    let val: number= mass/height;
    
    if(val < 16.0) {
        return "Underweight (Severe thinness";
    } else if(val < 17.0) {
        return "Underweight (Moderate thinness)";
    } else if(val < 18.5) {
        return "Underweight (Mild thinness)";
    } else if(val < 25.0) {
        return "Normal range";
    } else if(val < 30.0) {
        return "Overweight (Pre-obese)";
    } else if(val < 35.0) {
        return "Obese (Class I)";
    } else if(val < 40.0) {
        return "Obese (Class II)"; 
    } else {
        return "Obese (Class III)";
    }
}

try {
    const {val1, val2} = parseArguments(process.argv);
    console.log(calculateBmi(val1, val2));   
} catch (error) {
    let errorMessage: string = 'Something bad happened.';
    if(error instanceof Error) errorMessage += "Error:" +error.message;
    console.log(errorMessage);
}