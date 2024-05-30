import React, { useEffect, useState } from 'react';
import square from "../images/square.png";
import rectangle from "../images/rectangle.png";
import parallelogram from "../images/parallelogram.png"
import trapezoid from "../images/trapezoid.png"
import rhombus from "../images/rhombus.png"
import kite from "../images/kite.png"
import triangle from "../images/triangle.png"
import scaleneTriangle from "../images/scaleneTriangle.png"
import irregularQuadrilateral from "../images/irregularQuadrilateral.png"

const shapeFormulas = {
    square: (a) => a * a,
    rectangle: (a, b) => a * b,
    parallelogram: (b, h) => b * h,
    trapezoid: (a, b, h) => ((a + b) / 2) * h,
    rhombus: (d1, d2) => (d1 * d2) / 2,
    kite: (d1, d2) => (d1 * d2) / 2,
    triangle: (b, h) => (b * h) / 2,
    scaleneTriangle: (a, b, c) => {
        const s = (a + b + c) / 2;
        return Math.sqrt(s * (s - a) * (s - b) * (s - c));
    },
    irregularQuadrilateral: (a, b, c, d) => {
        const s = (a + b + c + d) / 2;
        return Math.sqrt((s - a) * (s - b) * (s - c) * (s - d));
    }
};

const unitConversionFactors = {
    cm: 1 / 929.03,
    inches: 1 / 144,
    feet: 1,
};

const landConversionFactors = {
    satak: 436,
    katha: 720,
    bigha: 720 * 20,
    acre: 43560,
};

const Main = () => {
    const [shape, setShape] = useState('null');
    const [dimensions, setDimensions] = useState({});
    const [unit, setUnit] = useState('null');
    const [area, setArea] = useState(null);
    const [conversionUnit, setConversionUnit] = useState('null');
    const [convertedArea, setConvertedArea] = useState(null);

    useEffect(() => {
        setConvertedArea(0);
    }, [area]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDimensions({
            ...dimensions,
            [name]: parseFloat(value),
        });
    };

    const calculateArea = () => {
        const formula = shapeFormulas[shape];
        if (!formula) return;
        const dimensionValues = Object.values(dimensions);
        if (dimensionValues.some((val) => isNaN(val) || val <= 0)) {
            alert('Please enter valid dimensions.');
            return;
        }
        const calculatedArea = formula(...dimensionValues);
        const areaInFeet = calculatedArea * unitConversionFactors[unit];
        setArea(areaInFeet);
    };

    const convertArea = () => {
        if (area === null) return;
        const converted = area / landConversionFactors[conversionUnit];
        setConvertedArea(converted);
    };

    const shapeInfo = {
        square: {
            img: square,
        },
        rectangle: {
            img: rectangle,
        },
        parallelogram: {
            img: parallelogram,
        },
        trapezoid: {
            img: trapezoid,
        },
        rhombus: {
            img: rhombus,
        },
        kite: {
            img: kite,
        },
        triangle: {
            img: triangle,
        },
        scaleneTriangle: {
            img: scaleneTriangle,
        },
        irregularQuadrilateral: {
            img: irregularQuadrilateral,
        },
    };

    return (
        <>
            <div className="calculator-container">
                <h1 className="title">Land Area Calculator</h1>
                <label className="label">
                    <select className="select" value={shape} onChange={(e) => setShape(e.target.value)}>
                        <option disabled value="null" selected>Select Shape</option>
                        <option value="square">Square</option>
                        <option value="rectangle">Rectangle</option>
                        <option value="parallelogram">Parallelogram</option>
                        <option value="trapezoid">Trapezoid</option>
                        <option value="rhombus">Rhombus</option>
                        <option value="kite">Kite</option>
                        <option value="triangle">Triangle</option>
                        <option value="scaleneTriangle">Scalene Triangle</option>
                        <option value="irregularQuadrilateral">Irregular Quadrilateral</option>
                    </select>
                </label>
                <div className="input-container">
                    {['square', 'rectangle', 'parallelogram', 'trapezoid', 'rhombus', 'kite', 'triangle', 'scaleneTriangle', 'irregularQuadrilateral'].map(
                        (shapeType) => {
                            if (shape === shapeType) {
                                return (
                                    <div key={shapeType}>
                                        {['square'].includes(shapeType) && (
                                            <input
                                                type="number"
                                                name="a"
                                                placeholder="Side Length (a)"
                                                onChange={handleChange}
                                                className="input"
                                            />
                                        )}
                                        {['rectangle', 'parallelogram'].includes(shapeType) && (
                                            <>
                                                <input
                                                    type="number"
                                                    name="a"
                                                    placeholder="Length (a)"
                                                    onChange={handleChange}
                                                    className="input"
                                                />
                                                <input
                                                    type="number"
                                                    name="b"
                                                    placeholder="Width/Height (b)"
                                                    onChange={handleChange}
                                                    className="input"
                                                />
                                            </>
                                        )}
                                        {['trapezoid'].includes(shapeType) && (
                                            <>
                                                <input
                                                    type="number"
                                                    name="a"
                                                    placeholder="Base1 (a)"
                                                    onChange={handleChange}
                                                    className="input"
                                                />
                                                <input
                                                    type="number"
                                                    name="b"
                                                    placeholder="Base2 (b)"
                                                    onChange={handleChange}
                                                    className="input"
                                                />
                                                <input
                                                    type="number"
                                                    name="h"
                                                    placeholder="Height (h)"
                                                    onChange={handleChange}
                                                    className="input"
                                                />
                                            </>
                                        )}
                                        {['kite', 'rhombus'].includes(shapeType) && (
                                            <>
                                                <input
                                                    type="number"
                                                    name="d1"
                                                    placeholder="Diagonal1 (d1)"
                                                    onChange={handleChange}
                                                    className="input"
                                                />
                                                <input
                                                    type="number"
                                                    name="d2"
                                                    placeholder="Diagonal2 (d2)"
                                                    onChange={handleChange}
                                                    className="input"
                                                />
                                            </>
                                        )}
                                        {['triangle'].includes(shapeType) && (
                                            <>
                                                <input
                                                    type="number"
                                                    name="b"
                                                    placeholder="Base (b)"
                                                    onChange={handleChange}
                                                    className="input"
                                                />
                                                <input
                                                    type="number"
                                                    name="h"
                                                    placeholder="Height (h)"
                                                    onChange={handleChange}
                                                    className="input"
                                                />
                                            </>
                                        )}
                                        {['scaleneTriangle'].includes(shapeType) && (
                                            <>
                                                <input
                                                    type="number"
                                                    name="a"
                                                    placeholder="Side1 (a)"
                                                    onChange={handleChange}
                                                    className="input"
                                                />
                                                <input
                                                    type="number"
                                                    name="b"
                                                    placeholder="Side2 (b)"
                                                    onChange={handleChange}
                                                    className="input"
                                                />
                                                <input
                                                    type="number"
                                                    name="c"
                                                    placeholder="Side3 (c)"
                                                    onChange={handleChange}
                                                    className="input"
                                                />
                                            </>
                                        )}
                                        {['irregularQuadrilateral'].includes(shapeType) && (
                                            <>
                                                <input
                                                    type="number"
                                                    name="a"
                                                    placeholder="Side1 (a)"
                                                    onChange={handleChange}
                                                    className="input"
                                                />
                                                <input
                                                    type="number"
                                                    name="b"
                                                    placeholder="Side2 (b)"
                                                    onChange={handleChange}
                                                    className="input"
                                                />
                                                <input
                                                    type="number"
                                                    name="c"
                                                    placeholder="Side3 (c)"
                                                    onChange={handleChange}
                                                    className="input"
                                                />
                                                <input
                                                    type="number"
                                                    name="d"
                                                    placeholder="Side4 (d)"
                                                    onChange={handleChange}
                                                    className="input"
                                                />
                                            </>
                                        )}
                                    </div>
                                );
                            }
                            return null;
                        }
                    )}
                </div>
                <label className="label">
                    <select className="select" value={unit} onChange={(e) => setUnit(e.target.value)}>
                        <option disabled value="null" selected>Select Unit</option>
                        <option value="cm">cm</option>
                        <option value="inches">inches</option>
                        <option value="feet">feet</option>
                    </select>
                </label>
                <button className="button" onClick={calculateArea}>Calculate Area</button>
                {area !== null && (
                    <div className="result">
                        <p>Area: {area.toFixed(2)} sq. ft.</p>
                        <label className="label">
                            <select className="select" value={conversionUnit} onChange={(e) => setConversionUnit(e.target.value)}>
                                <option disabled value="null" selected>Convert {area.toFixed(2)} sq. ft. to</option>
                                <option value="satak">Satak</option>
                                <option value="katha">Katha</option>
                                <option value="bigha">Bigha</option>
                                <option value="acre">Acre</option>
                            </select>
                        </label>
                        <button className="button" onClick={convertArea}>Convert</button>
                        {convertedArea !== 0 && <p>Converted Area: {convertedArea.toFixed(2)} {conversionUnit}</p>}
                    </div>
                )}
            </div>
            <div className="references-container">
                <h2 className="references-title">Shape References and Formulas</h2>
                {Object.entries(shapeInfo).map(([shapeKey, info]) => (
                    <div className="shape-info" key={shapeKey}>
                        <h3>{shapeKey.charAt(0).toUpperCase() + shapeKey.slice(1)}</h3>
                        <img src={info.img} alt={shapeKey} className="shape-image" />
                    </div>
                ))}
                <h3>
                    1 decimal (satak) = 436 sft,

                    1 katha = 720 sft,

                    1 bigha = 20 katha = 33 decimals,

                    1 acre = 100 decimals.(west bengal standard)
                </h3>
            </div>
        </>
    );
};

export default Main;
