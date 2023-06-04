import React from "react";
import Navbar from "./Navbar";
import Movie from "./Movies";
import Footer from "./Footer";
//import {nanoid} from "nanoid";
import {Link} from "react-router-dom";



function Movielist() {
    const [movies, setMovies] = React.useState([])
    const [inputValue, setInputValue] =React.useState("")
    const [savedMovies, setSavedMovies] = React.useState(JSON.parse(localStorage.getItem('savedMovies')) || [])

    React.useEffect(() => {
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
    }, [savedMovies]);

    function handleSubmit(event) {
        event.preventDefault()
        return fetch(`http://www.omdbapi.com/?s=${inputValue}&apikey=8bc256a`)
            .then(res => res.json())
            .then(data => setMovies(data.Search))
    }

    function check(arr, movie) {
        return arr.indexOf(movie) >= 0;
    }

    function save(id) {
        const film = movies.find(movie => movie.imdbID === id)
        if(check(savedMovies, film)) {
            setSavedMovies(prevState => prevState.filter(x => x!== film))
        } else {
            setSavedMovies(prevMovies => [film, ...prevMovies])
        }
    }


    const searchedMovies = movies.map(movie => {
        return <Movie
            key={movie.imdbID}
            id={movie.imdbID}
            image={movie.Poster}
            title={movie.Title}
            type={movie.Type}
            year={movie.Year}
            save={()=>save(movie.imdbID)}
        />
    })
    function handleChange(event) {
        setInputValue([event.target.name] = event.target.value)
    }




    return (
        <div className={"main-content"}>
            <Navbar>
                <div className={"nav-fav"}>
                    <h1>Find your film</h1>
                    <p className={"nav-link"}><Link to={"/watchlist"}>Movielist</Link></p>
                </div>

                <form onSubmit={handleSubmit} className={"searchbar"}>
                <input className={"input-area"}
                       type="text"
                       placeholder={"Search Movies"}
                       name={inputValue}
                       onChange={handleChange}
                />
                <button className={"search-btn"}>Search</button>
                </form>

            </Navbar>

            <div className={"movie-list"}>{searchedMovies}</div>
            <Footer />
        </div>

    );
}

export default Movielist;