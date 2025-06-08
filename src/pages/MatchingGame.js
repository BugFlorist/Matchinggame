import React, { useState, useEffect } from "react";
import {Form, Button } from "react-bootstrap";

const allImages = {

  'animal': ['/images/animal1.jpg', '/images/animal2.jpg', '/images/animal3.jpg', '/images/animal4.jpg', '/images/animal5.jpg', '/images/animal6.jpg', '/images/animal7.jpg', '/images/animal8.jpg', '/images/animal9.jpg', '/images/animal10.jpg', '/images/animal11.jpg', '/images/animal12.jpg', '/images/animal13.jpg', '/images/animal14.jpg', '/images/animal15.jpg', '/images/animal16.jpg', '/images/animal17.jpg', '/images/animal18.jpg', '/images/animal19.jpg', '/images/animal20.jpg'],
  'flower': ['/images/flower1.jpg', '/images/flower2.jpg', '/images/flower3.jpg', '/images/flower4.jpg', '/images/flower5.jpg', '/images/flower6.jpg', '/images/flower7.jpg', '/images/flower8.jpg', '/images/flower9.jpg', '/images/flower10.jpg', '/images/flower11.jpg', '/images/flower12.jpg', '/images/flower13.jpg', '/images/flower14.jpg', '/images/flower15.jpg', '/images/flower16.jpg', '/images/flower17.jpg', '/images/flower18.jpg', '/images/flower19.jpg', '/images/flower20.jpg'],
  'random': ['/images/animal1.jpg', '/images/animal2.jpg', '/images/animal3.jpg', '/images/animal4.jpg', '/images/animal5.jpg', '/images/animal6.jpg', '/images/animal7.jpg', '/images/animal8.jpg', '/images/animal9.jpg', '/images/animal10.jpg', '/images/animal11.jpg', '/images/animal12.jpg', '/images/animal13.jpg', '/images/animal14.jpg', '/images/animal15.jpg', '/images/animal16.jpg', '/images/animal17.jpg', '/images/animal18.jpg', '/images/animal19.jpg', '/images/animal20.jpg','/images/flower1.jpg', '/images/flower2.jpg', '/images/flower3.jpg', '/images/flower4.jpg', '/images/flower5.jpg', '/images/flower6.jpg', '/images/flower7.jpg', '/images/flower8.jpg', '/images/flower9.jpg', '/images/flower10.jpg', '/images/flower11.jpg', '/images/flower12.jpg', '/images/flower13.jpg', '/images/flower14.jpg', '/images/flower15.jpg', '/images/flower16.jpg', '/images/flower17.jpg', '/images/flower18.jpg', '/images/flower19.jpg', '/images/flower20.jpg']
}

function shuffle(array) { // shuffle function to randomize the order of images
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickRandomImages(images, count, category) {
  
  const selectedImages = images[category]
  const shuffled = shuffle(selectedImages);
  return shuffled.slice(0, count*4);
}

function Tile({ tile, onClick }) { // Tile component to display each tile
  return (
    <div
      onClick={onClick}
      style={{
        width: 80,
        height: 80,
        margin: 8,
        backgroundColor: "#e9ecef",
        borderRadius: 12,
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 32,
        userSelect: "none",
      }}
    >
      {tile.flipped || tile.matched ? (
          <img
            className="img-fluid"
            src={tile.image}
            alt="tile"
            style={{ width: 64, height: 64 }}
            rounded
          />
      ) : (
        <span>❓</span>
      )}
    </div>
  );
}

export default function MatchingGame() {
  const [category, setCategory] = useState('random'); // category can be 'animal', 'flower', or 'random'
  const [level, setLevel] = useState(1); // level starts at 1 and can go up to 3
  const [tiles, setTiles] = useState([]); // tiles will hold the current game state with images and their flipped/matched status
  const [selected, setSelected] = useState([]); // selected keeps track of the currently selected tiles
  const [lock, setLock] = useState(false); // lock prevents further clicks while checking matches
  const [score, setScore] = useState(0); // score starts at 0 and increases with matches

  useEffect(() => {
    const baseImages = pickRandomImages(allImages, level, category);
    const doubled = [...baseImages, ...baseImages].map((img, index) => ({
      id: index,
      image: img,
      flipped: false,
      matched: false,
    })); 
    // doubled will be an array of objects with id, image, flipped, and matched properties
    setTiles(shuffle(doubled));
    setSelected([]);
    setLock(false);
  }, [level, category]); // useEffect runs when level or category changes to reset the game state

  const handleClick = (index) => {
    if (lock || tiles[index].flipped || tiles[index].matched) return; // ignore clicks on already flipped or matched tiles or if the game is locked

    const newTiles = [...tiles]; // create a copy of the current tiles state
    newTiles[index].flipped = true;
    const newSelected = [...selected, index];

    if (newSelected.length === 2) {
      const [firstIdx, secondIdx] = newSelected;
      if (newTiles[firstIdx].image === newTiles[secondIdx].image) {
        newTiles[firstIdx].matched = true;
        newTiles[secondIdx].matched = true;
        setScore((prev) => prev + 10);
        setSelected([]);
      } else {
        setLock(true); // lock the game for a short period to show the mismatch
        setTimeout(() => {
          newTiles[firstIdx].flipped = false;
          newTiles[secondIdx].flipped = false;
          setTiles([...newTiles]);
          setSelected([]);
          setLock(false); // unlock the game after the timeout
        }, 1000);
        setScore((prev) => Math.max(prev - 2, 0));
      }
    }
    else if (newSelected.length < 2) setSelected(newSelected);
    
    setTiles([...newTiles]);
  };

  const isLevelComplete = tiles.every((tile) => tile.matched); // check if all tiles are matched to determine if the level is complete
  const gridSize = Math.max(4, Math.sqrt(tiles.length)); // calculate grid size based on the number of tiles, ensuring a minimum of 2x2 grid


  return (
    <div className="container align-items-center">
        <h1 className="mb-4">Matching Pair Game</h1>

        <Form.Label column sm="auto">
            Select Level:
        </Form.Label>
        <Form.Select value={level} onChange={(e) => setLevel(Number(e.target.value))} className="mb-3"> // dropdown to select level
            <option value={1}>Level 1</option>
            <option value={2}>Level 2</option>
            <option value={3}>Level 3</option>
        </Form.Select>

        <Form.Label column sm="auto">
            Select Category:
        </Form.Label>
        <Form.Select value={category} onChange={(e) => setCategory(e.target.value)} className="mb-3"> // dropdown to select category
            <option value={'random'}>Random</option>
            <option value={'animal'}>Animal</option>
            <option value={'flower'}>Flower</option>
        </Form.Select>

        <p className="fs-5">Score: {score}</p>
      
        <div
            style={{
            display: "grid",
            gridTemplateColumns: `repeat(${gridSize}, 80px)`,
            gridTemplateRows: `repeat(${gridSize}, 80px)`,
            gap: 12,
            maxWidth: gridSize * 80,
            }}
        >
            {tiles.map((tile, index) => ( // map through tiles to render each Tile component
            <Tile key={tile.id} tile={tile} onClick={() => handleClick(index)} />
            ))}
        </div>

      {isLevelComplete && ( // if all tiles are matched, show the next level button
        <Button
          variant="success"
          className="mt-4"
          onClick={() => setLevel((prev) => Math.min(prev + 1, 3))}
        >
          Next Level
        </Button>
      )}
    </div>
  );
}
