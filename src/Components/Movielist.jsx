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
        const regex =/ /
        if(regex.test(inputValue)){
            setInputValue(inputValue =>inputValue.replace(/ /g, "+"))

        }
    }
        console.log(inputValue)



    return (
        <div className={""}>
            <Navbar>
                    <div className={"navbar container"}>
                    <div className={"container-fluid"}>
                        <p className={"navbar-brand my-auto"}>Movies</p>

                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className={"collapse navbar-collapse"} id={"navbarSupportedContent"}>
                            <ul className={"navbar-nav me-auto mb-2 mb-lg-0"}>
                                <li className={"nav-item"}>
                                    <p className={"my-auto"}><Link to={"/watchlist"} className={"nav-link active"}>Liked</Link></p>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Link</a>
                                </li>
                            </ul>
                            <form onSubmit={handleSubmit} className={"d-flex"}>
                                <input className={"form-control me-2"}
                                       type="text"
                                       placeholder={"Search Movies"}
                                       name={inputValue}
                                       onChange={handleChange}
                                />
                                <button className={"btn btn-outline-success"}>Search</button>
                            </form>
                        </div>
                    </div>
                    </div>





            </Navbar>


            <div className={"container text-center"}><div className={"row align-items-start"}>{searchedMovies}</div></div>
            <Footer />
        </div>

    );
}

export default Movielist;