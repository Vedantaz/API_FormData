import React from 'react';

type SuggestProps={
    water_intake:string,
    sleep_hours : string
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

export default SuggestionBox;