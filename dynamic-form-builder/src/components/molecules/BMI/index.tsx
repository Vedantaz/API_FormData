import React, { useState } from 'react';

import { Typography } from '@mui/material';

const BMI = ({ ht, wt }: { ht: string, wt: string }) => {

    const [bmi, setBmi] = useState<number | null>(null);
    const [category, setCategory] = useState<string>('');


    //calculate BMI when ht and wt changes
    React.useEffect(() => {
        if (ht && wt) {
            const heightInMeters = parseFloat(ht) / 100; // Convert cm to meters
            const bmiValue = parseFloat(wt) / (heightInMeters ** 2);
            setBmi(bmiValue);

            // Determine BMI category
            if (bmiValue < 18.5) setCategory('Underweight');
            else if (bmiValue >= 18.5 && bmiValue < 24.9) setCategory('Normal weight');
            else if (bmiValue >= 25 && bmiValue < 29.9) setCategory('Overweight');
            else setCategory('Obese');
        }
    }, [ht, wt]);

    return (
        
        <div>
            {bmi !== null && (
                <div style={{ marginTop: '20px' }}>
                    <Typography variant="h6">Your BMI: {bmi.toFixed(2)}</Typography>
                    <Typography variant="subtitle1">Category: {category}</Typography>
                </div>
            )}
        </div>
    );


}

export default BMI;
