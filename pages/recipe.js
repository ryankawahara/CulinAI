import React from 'react';

const GeneratedRecipe = ({ title, ingredients, steps, imageUrl }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ transform: 'scale(0.4)', marginRight: 'auto' }}>
                <div className="recipeContainer">

                    <div className="container"></div>
                    <div style={{ width: '456px', height: '356px', left: '219px', top: '113px', position: 'absolute', background: '#F1B6AD' }}></div>
                    <div style={{ width: '42px', height: '42px', left: '447px', top: '539px', position: 'absolute', borderRadius: '9999px', border: '3px #B0ADAD solid' }}></div>
                    {/* Other HTML elements */}
                    <img style={{ width: '407px', height: '316px', left: '243px', top: '132px', position: 'absolute', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }} src="pasta.png" alt="Food" />
                    <div style={{ width: '688px', height: '80px', left: '716px', top: '138px', position: 'absolute', background: '#FCEAEA', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}></div>
                    <div style={{ width: '621px', height: '51px', left: '761px', top: '152px', position: 'absolute', textAlign: 'center', color: 'black', fontSize: '38px', fontWeight: '700', wordWrap: 'break-word' }}>{title}</div>
                    {/* Other HTML elements */}
                    <div style={{ width: '472px', height: '378px', left: '218px', top: '605px', position: 'absolute', background: '#FCE8E9', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}></div>
                    <div style={{ width: '443px', height: '266px', left: '231px', top: '662px', position: 'absolute' }}>
                        <span style={{ color: '#722626', fontSize: '20px', fontWeight: '700', wordWrap: 'break-word' }}>8 ounces </span>
                        <span style={{ color: '#BC6666', fontSize: '20px', fontWeight: '700', wordWrap: 'break-word' }}>of pasta<br /></span>
                        {/* Other ingredients */}
                    </div>
                    {/* Other HTML elements */}
                    <div style={{ width: '531px', height: '807px', left: '761px', top: '285px', position: 'absolute', background: '#FFE8BD', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}></div>
                    <div style={{ width: '445px', height: '468px', left: '816px', top: '367px', position: 'absolute' }}>
                        <span style={{ color: '#56493D', fontSize: '20px', fontWeight: '700', wordWrap: 'break-word' }}>1. Cook pasta until al dente, then drain, reserving 1/2 cup pasta water.<br /></span>
                        {/* Other steps */}
                        <span style={{ color: '#888888', fontSize: '20px', fontWeight: '700', wordWrap: 'break-word' }}>Enjoy your Lemon Shrimp Pasta!</span>
                    </div>
                    <div style={{ width: '140px', height: '39px', left: '958px', top: '307px', position: 'absolute', color: '#722626', fontSize: '30px', fontWeight: '700', wordWrap: 'break-word' }}>Steps:</div>
                    <div style={{ width: '270px', height: '39px', left: '315px', top: '617px', position: 'absolute', color: '#722626', fontSize: '30px', fontWeight: '700', wordWrap: 'break-word' }}>Ingredients:</div>
                </div>
            </div>
        </div>
    );
}

export default GeneratedRecipe;
