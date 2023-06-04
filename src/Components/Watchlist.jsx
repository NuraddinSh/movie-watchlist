import React from "react";
import {Link} from "react-router-dom";
import Navbar from "./Navbar";
import Movie from "./Movies";

export default function Watchlist() {
    const [favMovies, setFavMovies] = React.useState([])
    const x= React.useRef(false)


    React.useEffect(()=> {
         setFavMovies(JSON.parse(localStorage.getItem('savedMovies')))
        }, [])

    React.useEffect(()=> {
        if(x.current) {
            localStorage.setItem('savedMovies', JSON.stringify(favMovies))
        }else {
            x.current=true
        }
    }, [favMovies])

    function remove(id) {
        const film = favMovies.find(movie => movie.imdbID === id)
        setFavMovies(prevState => prevState.filter(movie => movie !== film))
    }

    const favoritedMovies = favMovies.map(favMovies => {
        return <Movie
            key={favMovies.imdbID}
            id={favMovies.imdbID}
            image={favMovies.Poster}
            title={favMovies.Title}
            type={favMovies.Type}
            year={favMovies.Year}
            save={()=>remove(favMovies.imdbID)}

        />
    })


    return (
        <div className={"main-content"}>
            <Navbar>
                <div className={"nav-fav"}>
                    <h1>WatchList</h1>
                    <p><Link to={"/"}>Movie Search</Link></p>
                </div>
            </Navbar>
            <div className={"movie-list"}>{favoritedMovies}</div>
        </div>
    )
}