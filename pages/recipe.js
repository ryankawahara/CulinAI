import React from 'react';

const GeneratedRecipe = ({ title, ingredients, steps, imageUrl }) => {

    const stepsLines = steps.split('\n');

    // Map each step line to a span element
    const stepsSpans = stepsLines.map((line, index) => (
        <span key={index} style={{ color: '#56493D', fontSize: '20px', fontWeight: '700', wordWrap: 'break-word' }}>
        </span>
    ));

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ transform: 'scale(0.4)', marginRight: 'auto' }}>
                <div className="recipeContainer">
                    <img className="tinyImage" src={imageUrl} alt="Food" style={{ width: '335px', height: '335px', position: 'absolute', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', left: '280px', top: '125px' }} />

                    <div style={{ minWidth: '100px', padding: '10px', position: 'absolute', background: '#FCEAEA', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', left: '716px', top: '138px', textAlign: 'center', color: 'black', fontSize: '38px', fontWeight: '700', wordWrap: 'break-word' }}>
                        {title}
                    </div>

                    <div style={{ minWidth: '100px', padding: '10px', position: 'absolute', background: '#FCE8E9', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', left: '218px', top: '605px' }}>
                        {ingredients.map((ingredient, index) => (
                            <span key={index} style={{ color: '#BC6666', fontSize: '20px', fontWeight: '700', wordWrap: 'break-word' }}>
                                {ingredient}<br />
                            </span>
                        ))}
                    </div>

                    <div style={{ minWidth: '100px', padding: '10px', position: 'absolute', background: '#FFE8BD', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', left: '761px', top: '285px' }}>
                        {stepsSpans}
                        <span style={{ color: '#888888', fontSize: '20px', fontWeight: '700', wordWrap: 'break-word' }}>
                            Enjoy your {title}!
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GeneratedRecipe;