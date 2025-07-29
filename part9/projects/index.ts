import express from 'express';

import { calculateBmi } from './bmiCalculator';

const app = express();

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


const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})