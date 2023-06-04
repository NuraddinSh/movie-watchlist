import React from "react";
import {Link} from "react-router-dom"

export default function Movie(props) {
    const {image, title, type, year, save, id} = props
    const styles = {
        backgroundImage: `url(${image})`,





    }
    return (
        <div className={"movie"} style={styles}>
            <div className={"movie-info"}>
                <Link to={`/watchlist/:${id}`} className={"movie-link show"}>
                    <p className={"movie-title"}>{title}</p>
                    <p>{year}</p>
                </Link>
                <button className={"fav-icon show"} onClick={save}>Watchlist</button>
            </div>


        </div>
    )
}