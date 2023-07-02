import React from "react";
import {Link} from "react-router-dom"

export default function Movie(props) {
    const {image, title, year, save, id} = props

    return (

        <div className={'col-md-3'}>
        <Link to={`/watchlist/:${id}`}>
            <img src={image} alt={"movie poster"} width={'240px'} height={'375px'} />
            <div>
                <p>{title}</p>
                <p>{year}</p>
            </div>
        </Link>
        <button onClick={save}>Like</button>
        </div>


    )
}