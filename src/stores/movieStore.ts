import {IMovie} from "@/types/movie";
import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";

interface ZActionStateInterface {
    movies: IMovie[],
    deleteMovie: (name: string) => void,
    addMovie: (name: IMovie) => void,
    watchMovie: (name: string) => void,
    unwatchMovie: (name: string) => void,
}


const useMovieStore = create(
    persist<ZActionStateInterface>(
        (set) => ({
            addMovie: (movie) => {
                set((state)=>({
                    movies: [
                        ...state.movies,
                        movie
                    ]
                }))
            },
            deleteMovie: (movie) => {
                set((state)=>({
                    movies: state.movies.filter((a)=> a.name !== movie)
                }))
            },
            watchMovie: (name) => {
                set((state)=>({
                    movies: state.movies.map((a)=> {
                        if (a.name === name){
                            a.watched = true;
                        }
                        return a
                    })
                }))
            },
            unwatchMovie: (name) => {
                set((state)=>({
                    movies: state.movies.map((a)=> {
                        if (a.name === name){
                            a.watched = false;
                        }
                        return a
                    })
                }))
            },
            movies: []
        }),
        {
            name: 'food-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        }
    ),
)


export default useMovieStore;