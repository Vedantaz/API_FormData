import React from 'react';

import { Typography } from '@mui/material';
import './styles.css'

type BMIProps = {
    height: string;
    weight: string;

}

const BMI: React.FC<BMIProps> = ({ height, weight }) => {

    if (!height || !weight || isNaN(parseFloat(height)) || isNaN(parseFloat(weight))) {
        alert('Please provide valid height and weight values.');
        return;
    }
    const heightInMeters = Number(height) / 100;
    const bmiValue = Number(weight) / (heightInMeters ** 2);

    let category = '';
    if (bmiValue < 18.5) category = 'Underweight';
    else if (bmiValue >= 18.5 && bmiValue < 24.9) category = 'Normal weight';
    else if (bmiValue >= 25 && bmiValue < 29.9) category = 'Overweight';
    else category = 'Obese';

    return (
        <div className='container'
        >
            <div className='result-card'
            >
                <Typography className="bmi-value"
                    variant="h4"
                >
                    Your BMI: {bmiValue.toFixed(2)}
                </Typography>
                <Typography
                    className="category"
                    variant="h6"
                >
                    Category: {category}
                </Typography>
            </div>
        </div>

    );


}

export default BMI;
