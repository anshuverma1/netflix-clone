import React from 'react'
import { Movie } from '../types'

interface Props {
    title: string,
    movies: Movie[]
}

const Row = ({ title, movies }: Props) => {
    return (
        <div>{title}</div>
    )
}

export default Row