import React, { useState } from 'react';
import axios from 'axios';

type SuggestProps={
    water_intake:string,
    sleep_hours : string
}

interface NutritionItem {
    name: string;
    calories: number;
    protein: number;
    fat: number;
    carbohydrates: number;
}

const SuggestionBox: React.FC<SuggestProps> = ({water_intake, sleep_hours}) =>{

    const intake = ()=>{
        if(water_intake<= '6') return "Good going, keep it up. Make the double of it to enahnce your health";
    }
    const sleep = ()=>{
        if(sleep_hours<= '6') return "Good sleep you got today";
    }

    return (
        <div>

            <h3>Look out for your helpful suggestions. </h3>
            <p>{sleep()} </p>
            <p>{intake()} </p>
        </div>

    );
}

const NutritionFood: React.FC = ()=>{
    const [query, setQuery] = useState<string>('');
    const [nutritionData, setNutritionData] = useState<NutritionItem[]>([]);

    const [error, setError] = useState<string>('');

    const fetchNutritionData = async() =>{
        try{
            setError('');
            const response = await axios.post('http://localhost:4000/nutrition', {query});
            setNutritionData(response.data);

        }catch (err: any) {
            setError(err.response?.data?.error || 'Failed to fetch data');
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <h2>Nutrition Tracker</h2>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter food items (e.g., 2 eggs and toast)"
                style={{
                    width: '100%',
                    padding: '10px',
                    marginBottom: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                }}
            />
            <button
                onClick={fetchNutritionData}
                style={{
                    padding: '10px 20px',
                    borderRadius: '5px',
                    backgroundColor: '#4caf50',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                }}
            >
                Fetch Nutrition Data
            </button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div style={{ marginTop: '20px' }}>
                {nutritionData.length > 0 ? (
                    nutritionData.map((item, index) => (
                        <div
                            key={index}
                            style={{
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                padding: '10px',
                                marginBottom: '10px',
                                backgroundColor: '#f9f9f9',
                            }}
                        >
                            <h4 style={{ margin: 0 }}>{item.name}</h4>
                            <p>Calories: {item.calories}</p>
                            <p>Protein: {item.protein}g</p>
                            <p>Fat: {item.fat}g</p>
                            <p>Carbohydrates: {item.carbohydrates}g</p>
                        </div>
                    ))
                ) : (
                    <p>No data to display.</p>
                )}
            </div>
        </div>
    );
}

export default NutritionFood;