"use client"

import {MouseEventHandler, useEffect, useState} from "react";
import {IMovie} from "@/types/movie";
import useMovieStore from "@/stores/movieStore";


interface CustomButtonProps {
    onClick?: MouseEventHandler<HTMLButtonElement>,
    text?: String
    className?: String
}

const CustomButton = ({onClick, text, className}: CustomButtonProps) => {
    return <button onClick={onClick}
                   className={` rounded-md px-8 py-2 bg-teal-500 text-white ${className!}`}>{text}</button>
}


interface CustomMoviesSectionProps {
    tittle: "Watched" | "Watchlist",
    movies: IMovie[]
}

const CustomMoviesSection = ({movies, tittle}: CustomMoviesSectionProps) => {

    const {
        watchMovie, unwatchMovie, deleteMovie
    } = useMovieStore();

    const [filteredMovies, setFilteredMovies] = useState<IMovie[]>([])


    useEffect(() => {
        setFilteredMovies(movies);
    }, [movies]);

    const handleSearch = (term: string) => {
        if (term.trim() === "") {
            setFilteredMovies(movies);
        } else {
            const filter = movies.filter((a) => a.name.toLowerCase().includes(term))
            setFilteredMovies(filter);
        }

    }

    return (
        <div className={"flex flex-col gap-12"}>

            <div className={"font-bold text-lg"}>
                {tittle}
                <span className={"rounded-lg ml-3 px-2 border border-gray-800"}>{movies?.length}</span>
            </div>


            <div className={"rounded-md border border-gray-400 flex flex-col w-auto pr-1"}>
                <div className={"flex border-b border-gray-400  "}>
                    <div className={"m-5 flex-1"}>
                    </div>


                    <input type="text"
                           className={"w-auto  border-l border-gray-400 bg-transparent h-full outline-0 p-2"}
                           placeholder={"Search movies ..."} onChange={(e) => {
                        handleSearch(e.target.value);
                    }}/>
                </div>

                <div className={"p-5 w-auto flex flex-col gap-5"}>
                    {
                        filteredMovies?.map((movie, index) => (
                            <div
                                key={index}
                                className={"flex justify-between items-center space-x-16 border-b border-gray-400 pb-4"}>
                                <div>
                                    {
                                        movie.name
                                    }
                                </div>

                                <div className={"flex gap-3"}>
                                    <CustomButton

                                        onClick={() => {
                                            tittle == "Watchlist" ? watchMovie(movie.name) : unwatchMovie(movie.name)
                                        }}

                                        text={
                                            tittle === "Watchlist" ? "Watch" : "Unwatch"
                                        }/>
                                    <CustomButton onClick={() => {
                                        deleteMovie(movie.name)
                                    }} text={"Delete"} className={"bg-red-500"}/>
                                </div>
                            </div>
                        ))
                    }


                </div>


            </div>


        </div>
    )
}

export default function Home() {
    const {movies, addMovie} = useMovieStore();
    const [name, setName] = useState("")
    return (
        <main className="flex min-h-screen flex-col p-10 gap-8">

            <div className={"flex gap-2"}>
                <input className={"rounded-md p-2 outline-0 border-gray-400 border"} type="text"
                       placeholder={"Movie..."} value={name} onChange={(e) => setName(e.target.value)}/>
                <CustomButton text={"Add"} onClick={(e) => {
                    addMovie({
                        watched: false,
                        name: name
                    })
                }}/>
            </div>

            <div className={"w-auto flex gap-28"}>
                <CustomMoviesSection tittle={"Watchlist"} movies={movies.filter((a) => !a.watched)}/>
                <CustomMoviesSection tittle={"Watched"} movies={movies.filter((a) => a.watched)}/>
            </div>

        </main>
    );
}

