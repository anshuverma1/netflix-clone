import React, { useEffect, useState } from 'react'
import MuiModal from '@mui/material/Modal'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
import { XIcon } from '@heroicons/react/outline'
import { Element, Genre } from '../types'
import ReactPlayer from 'react-player/lazy'

const Modal = () => {
    const [showModal, setShowModal] = useRecoilState(modalState)
    const [movie, setMovie] = useRecoilState(movieState)
    const [trailer, setTrailer] = useState('')
    const [geners, setGeners] = useState<Genre[]>([])
    const [muted, setMuted] = useState(true)

    async function fetchMovei() {
        const data = await fetch(`https://api.themoviedb.org/3/${movie?.media_type === 'tv' ? 'tv' : 'movie'
            }/${movie?.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY
            }&language=en-US&append_to_response=videos`
        ).then((response) => response.json())       

        if (data?.videos) {
            const index = data.videos?.results?.findIndex((element: Element) => {
                element.type === 'Trailer'
            })

            setTrailer(data.videos?.results[index]?.key)
        }

        if (data?.geners) {
            setGeners(data.geners)
        }
    }

    useEffect(() => {
        if (!movie) return
        fetchMovei()
    }, [movie])

    const handleClose = () => {
        setShowModal(false)
    }

    console.log(trailer);

    return (
        <MuiModal open={showModal} onClose={handleClose} >
            <>
                <button onClick={handleClose} className='modalButton absolute right-5 top-5 !z-40
            h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]' >
                    <XIcon className='h-6 w-6' />
                </button>

                <div>
                    <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${trailer}`}
                        width="100%"
                        height="100%"
                        style={{ position: 'absolute', top: '0', left: '0' }}
                        playing
                        muted={muted}
                    />
                </div>
            </>
        </MuiModal>
    )
}

export default Modal