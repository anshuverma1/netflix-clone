import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../constants/movie'
import { Movie } from '../types'
import { FaPlay } from 'react-icons/fa'
import { InformationCircleIcon } from '@heroicons/react/outline'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'

interface Props {
  netflixOriginals: Movie[]
}

const Banner = ({ netflixOriginals }: Props) => {

  const [movie, setMovie] = useState<Movie | null>(null)
  const movieOverview = movie?.overview
  const shortOverview = movieOverview?.substring(0, 250)
  const [showModal, setShowModal] = useRecoilState(modalState) // universal state
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState) // universal state


  useEffect(() => {
    setMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)])
  }, [netflixOriginals]);

  return (

    <div className='flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[75vh] lg:justify-end lg:pb-1'>

      {/* Banner Image */}
      <div className='absolute top-0 left-0 -z-10 h-[95vh] w-screen'>
        <Image src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          layout='fill'
          objectFit='cover'
        />
      </div>

      {/* Movie name and description */}
      <h1 className='text-2xl font-bold md:text-4xl lg:text-6xl lg:max-w-3xl'>
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className='max-w-xs text-shadow-md text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-xl'>
        {`${shortOverview}...`}
      </p>

      {/* Buttons */}
      <div className='flex space-x-3'>
        <button className='bannerButton bg-white text-black'
          onClick={() => {
            setCurrentMovie(movie)
            setShowModal(true)
          }}
        >
          <FaPlay className='h-4 w-4 text-black md:h-6 md:w-6' /> Play
        </button>
        <button className='bannerButton bg-[gray]/70'
          onClick={() => {
            setCurrentMovie(movie)
            setShowModal(true)
          }}
        >
          <InformationCircleIcon className='h-5 w-5 md:h-7 md:w-7' /> More Info
        </button>
      </div>
    </div>
  )
}

export default Banner