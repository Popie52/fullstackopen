import express from 'express';

import { calculateBmi } from './bmiCalculator';
import { calculateExercises, Result } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get("/bmi", async(_req: any, res: {
    json: any;
    status: any;send: (arg0: string) => void; 
}) => {
    const {mass, height} = _req.query;
    if(!mass || !height || isNaN(Number(mass)) || isNaN(Number(height))) {
        return res.status(400).json({error: "malformated parameters"})
    }
    try {
        let ans: string = calculateBmi(Number(mass), Number(height));
        
        let result = {
            mass,
            height,
            bmi: ans,
        }
        res.json(result);
    } catch (error) {
        let errorMessage = "Something Bad happen.";
        if(error instanceof Error) {
            errorMessage += `Error: ${error.message}`
        }
        res.send(JSON.stringify(errorMessage));
    }
})


app.post("/exercises", async (_req: any, res: {
    json: any;
    status: any;send:(arg0: string) => void 
}) => {
    const body: any = _req.body;

    if(!body.daily_exercises || !body.target) {
        return res.status(400).json({error: "parameters missing"})
    }

    const { daily_exercises, target } = body;

    if(!Array.isArray(daily_exercises) || isNaN(Number(target)) || !daily_exercises.every(h => !isNaN(Number(h)))) {
        return res.status(400).json({error: "malformatted parameters"});
    }

    const result: Result = calculateExercises(daily_exercises.map(Number), Number(target));
    res.json(result);

})

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})