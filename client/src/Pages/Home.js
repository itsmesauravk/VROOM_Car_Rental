import React from 'react'
import "../css/home.css"
import FilterCar from '../components/UserChoice'
import Nav from '../components/Nav'

const Home = () => {

   
  return (<>
  <Nav />
    <div>
      
      <video src="https://cdn.pixabay.com/video/2023/10/12/184734-873923034_large.mp4" autoPlay loop muted className='video'></video>
    </div>
    <FilterCar/>
    
  </>
  )
}

export default Home

