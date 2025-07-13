import React from 'react'
import { useParams } from 'react-router'

function shuffle(array) {
  let arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const CARD_EMOJIS = [
  "❤️", "❤️", "😍", "😍",
  "💕", "💕", "⭐", "⭐",
  "😘", "😘", "🥰", "🥰",
  "💌", "💌", "🫀", "🫀"
];

const NextPage = () => {
  const name = useParams().name;
  const [cards, setCards] = React.useState(() =>
    shuffle(CARD_EMOJIS).map((emoji, idx) => ({
      id: idx,
      emoji,
      flipped: false,
      matched: false,
    }))
  );
  const [flippedIndices, setFlippedIndices] = React.useState([]);
  const [lock, setLock] = React.useState(false);
const[allMatched, setAllMatched] = React.useState(false);
  const handleClick = (idx) => {
    if (lock) return;
    if (cards[idx].flipped || cards[idx].matched) return;

    const newCards = cards.slice();
    newCards[idx].flipped = true;
    const newFlipped = [...flippedIndices, idx];
    setCards(newCards);
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setLock(true);
      setTimeout(() => {
        const [i1, i2] = newFlipped;
        if (newCards[i1].emoji === newCards[i2].emoji) {
          newCards[i1].matched = true;
          newCards[i2].matched = true;
        } else {
          newCards[i1].flipped = false;
          newCards[i2].flipped = false;
        }
        setCards(newCards);
        setFlippedIndices([]);
        setLock(false);
        if (newCards.every(card => card.matched)) {
          setAllMatched(true);
        }
      }, 900);
    }
  };
const handlesubmit = () => {
    setCards(shuffle(CARD_EMOJIS).map((emoji, idx) => ({
      id: idx,
      emoji,
      flipped: false,
      matched: false,
    })));
    setFlippedIndices([]);
    setLock(false);
    setAllMatched(false);
}
  return (
    <div className="h-screen w-screen fixed flex gap-y-2 flex-col animated-bg">
      <div className="flex justify-center mt-10">
        <h1 className="text-4xl font-bold text-white animate-bounce-custom">
          Welcome {name} ❤️
        </h1>
      </div>
      <p className="text-white text-xl mt-5 text-center">
        Find all the matching pairs! Flip two cards to test your memory.
      </p>
      <div className="flex justify-center mt-5">
        <div className="grid grid-cols-4 gap-4">
          {cards.map((card, idx) => (
            <div
              key={card.id}
              onClick={() => handleClick(idx)}
              className={`cursor-pointer flex items-center justify-center h-20 w-20 rounded-lg shadow-lg transition-all duration-300
                ${card.flipped || card.matched ? "bg-white bg-opacity-80 text-black text-5xl" : "bg-white bg-opacity-20 text-3xl text-transparent"}
                ${card.matched ? "border-4 border-green-400" : ""}
              `}
              style={{ userSelect: "none" }}
            >
              {card.flipped || card.matched ? card.emoji : "?"}
            </div>
          ))}
          {allMatched && (
            <div className="text-2xl text-green-500 font-bold col-span-4 text-center">
              Congratulations {name}! You've matched all pairs! 🎉
            </div>
          )}
          
      </div>
      
    </div>
    <div className='flex justify-center mt-10'>
        <button className="mt-4 flex justify-center p-2 rounded-xl bg-blue-800 w-1/6 text-white hover:translate-y-1 hover:bg-blue-600 transition-all duration-300 ease-in-out text-2xl font-bold" onClick={handlesubmit}>
          Once More
        </button>
    </div>
  </div>
  )
}

export default NextPage;