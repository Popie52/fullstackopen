export interface Result {
    periodLength : number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

export const calculateExercises = (arr: number[], target: number): Result => {
    const periodLength: number = arr.length;
    const trainingDays: number = arr.filter(a => a > 0).length;
    const average:number = arr.reduce((acc, curr) => acc+curr, 0)/periodLength;
    const success:boolean = average >= target;
    let rating:number;
    let ratingDescription: string;

    if(average >= target) {
        rating = 3;
        ratingDescription = 'great job, target met!';
    } else if(average >= target*0.75) {
        rating = 2;
        ratingDescription = 'not too bad but could be better';
    } else {
        rating = 1;
        ratingDescription = 'you need to push harder';
    }


    return {
        periodLength,
        target,
        average,
        trainingDays,
        success,
        rating,
        ratingDescription
    } 
}

interface CalculteResult {
    target: number,
    hours: number[],
};

const parseArg = (args: string[]) : CalculteResult => {
    if(args.length < 4) throw new Error('Not enough arguments');

    const target: number = Number(args[2]);
    const hours: number[] = args.slice(3).map(Number);

    if(isNaN(target) || hours.some(isNaN)) {
        throw new Error('Provide arguments are not numbers!');
    }

    return {target, hours};
}

try {
    const {target, hours} = parseArg(process.argv);
    console.log(calculateExercises(hours, target));
} catch (error) {
    let errorMessage = 'Something bad happen.';
    if(error instanceof Error) {
        errorMessage += `Error: ${error.message}`;
    }
    console.log(errorMessage)
}
