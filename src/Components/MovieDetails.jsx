import React, {useState} from "react";
import {useParams} from "react-router-dom"

export default function MovieDetails() {
    const [movie, setMovie] = useState("")
    const {movieId} = useParams()

    React.useEffect(() => {
        fetch(`https://www.omdbapi.com/?i=${movieId.substring(1)}&apikey=8bc256a`)
            .then(res => res.json())
            .then(data => setMovie(data))
    }, [])

    return <div>{movie.Plot}</div>


}