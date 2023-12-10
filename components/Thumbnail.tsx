import Image from 'next/image'
import React from 'react'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
import { Movie } from '../types'

interface Props {
    movie: Movie
    // movie: Movie | DocumentData
}

const Thumbnail = ({ movie }: Props) => {

    const [showModal, setShowModal] = useRecoilState(modalState) // universal state
    const [currentMovie, setCurrentMovie] = useRecoilState(movieState) // universal state

    const formatString = (str: string) => {
        return str.length >= 30 ? str.substring(0, 30) + '...' : str
    }

    return (
        <div>
            <div className='relative h-28 min-w-[180px] cursor-pointer 
        transition duration-200 ease-out md:h-36 md:min-w-[260px]
        md:hover:scale-105'
                onClick={() => {
                    setCurrentMovie(movie)
                    setShowModal(true)
                }}
            >
                <Image src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path
                    }`}
                    className='rounded-sm object-cover md:rounded'
                    layout='fill'
                    alt={movie.title}
                    title={movie.title}
                />
            </div>
            <span className='text-white hidden md:block lg:block'>{formatString(movie.title || movie.name)}</span>

        </div>
    )
}

export default Thumbnail