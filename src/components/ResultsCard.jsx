import React, { useState, useEffect } from "react";


function ForecastTile(props) {
    return React.createElement(() =>
    (
        <div value={props[0]}>
            <h3>{props[0]}</h3>
            <p>{props[1]}</p>
        </div>
    ))
}

function ResultsCard({ result, setData }) {

    return (result !== "default") ? (
        result.map((arr) => ForecastTile(arr))
    ) : null;


}

export default ResultsCard;
