import React from 'react'
import './Homepage.css';
import {Link} from 'react-router-dom'
function Homepage() {

  return (
     <div className="background">
         <h1 className="main-heading">Embark on a Thrilling Uno Adventure!</h1>
      <p className="main-paragraph">
      Welcome to the exciting world of Uno! Dive into the fun of this classic card game right on your screen.
       Our Uno game is not just a game; it's an adventure waiting for you. Click the button below and start the
        excitement. Can you outsmart your opponents and become the Uno champion? Let's play and find out! </p> 
     <Link to="/play"><button className="start-btn">Click Here to Play!</button></Link>
    </div>
  );
}

export default Homepage;
