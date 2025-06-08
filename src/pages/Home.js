import React from 'react';
import { Link } from 'react-router-dom';

function Home (){
    return (
    <div style={{backgroundImage: 'url(https://st2.depositphotos.com/3759469/6798/v/450/depositphotos_67982979-stock-illustration-horizontally-seamless-game-background.jpg)', backgroundSize:'cover', backgroundPosition: 'center',  backgroundRepeat: 'no-repeat', height: '80vh', width: '80vw' , padding: '40px', color: '#fff', textAlign: 'center', borderRadius: '8px'}}>
        <h1 style={{color: 'black'}}>Welcome to the Matching Game!</h1>
        <p style={{color: 'black'}}>
            This is a fun and interactive matching game where you can test your memory skills. 
            The objective is to find pairs of matching images by flipping tiles.
        </p>
        <p style={{color: 'black'}}>
            To start playing, either navigate to the <strong>Play</strong> section from the menu above or click the button below. 
            You can also learn more about the game in the <strong>About Us</strong> section.
        </p>
        <p  style={{color: 'green'}}>
            Enjoy the game and have fun!
        </p>
        <Link to="/game">
            <button style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: 'rgb(36, 182, 84)', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Start Playing
            </button>
        </Link>
        
    </div>
    );
}

export default Home;