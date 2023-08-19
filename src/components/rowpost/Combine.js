import React from 'react'
import Rowpost from './Rowpost'
const originals =`trending/movie/day?api_key=5ee426334d2a65170e91b3ab1bb7fb1a`
 const action =`discover/movie?api_key=5ee426334d2a65170e91b3ab1bb7fb1a&with_genres=28`
 const comedy =`discover/movie?api_key=5ee426334d2a65170e91b3ab1bb7fb1a&with_genres=35`
 const romance=`discover/movie?api_key=5ee426334d2a65170e91b3ab1bb7fb1a&with_genres=10749`

const Combine = () => {
  return (
    <>
      <div>
      <Rowpost url={originals} title={'Trending'} />
      <Rowpost url={action} title= {'Action'} isSmall/>
      <Rowpost url={comedy} title= {'Comedy'} isSmall/>
      <Rowpost url={romance} title= {'Romance'} isSmall/>
      </div>
    </>
  )
}

export default Combine