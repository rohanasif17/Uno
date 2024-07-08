import React, { useEffect, useState } from "react";
import useSound from "use-sound";
import cardsArr from "../utils/packOfCards";
import shuffleArray from "../utils/shuffleArray";
import bgMusic from "../sounds/game-bg-music.mp3";
import skipCardSound from "../sounds/skip-sound.mp3";
import draw2CardSound from "../sounds/draw2-sound.mp3";
import wildCardSound from "../sounds/wild-sound.mp3";
import draw4CardSound from "../sounds/draw4-sound.mp3";
import gameOverSound from "../sounds/game-over-sound.mp3";
import "./Game.css";

export default function Game() {
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState("");
  const [turn, setTurn] = useState("Player");
  const [playerDeck, setPlayerDeck] = useState([]);
  const [botDeck, setBotDeck] = useState([]);
  const [currentColor, setCurrentColor] = useState("");
  const [currentNumber, setCurrentNumber] = useState(""); 
  const [playedCardsPile, setPlayedCardsPile] = useState([]);
  const [drawCardPile, setDrawCardPile] = useState([]);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const [playBBgMusic, { pause }] = useSound(bgMusic, {
    volume: 0.4,
    loop: true,
  });
  const [playSkipCardSound] = useSound(skipCardSound, {
    volume: 1,
  });
  const [playDraw2CardSound] = useSound(draw2CardSound, {
    volume: 1,
  });
  const [playWildCardSound] = useSound(wildCardSound, {
    volume: 1,
  });
  const [playDraw4CardSound] = useSound(draw4CardSound, {
    volume: 1,
  });
  const [playGameOverSound] = useSound(gameOverSound, {
    volume: 1,
  });

  const togglePlay = () => {
    if (isMusicPlaying) {
      pause();
    } else {
      playBBgMusic();
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  useEffect(() => {
    const shuffledCards = shuffleArray(cardsArr);
    const playerDeck = [...shuffledCards.splice(0, 7)];
    setPlayerDeck(playerDeck);
    const botDeck = [...shuffledCards.splice(0, 7)];
    setBotDeck(botDeck);

    let startingCardIndex = 0;

    while (
      shuffledCards[startingCardIndex] === "skipR" ||
      shuffledCards[startingCardIndex] === "reveR" ||
      shuffledCards[startingCardIndex] === "D2R" ||
      shuffledCards[startingCardIndex] === "skipG" ||
      shuffledCards[startingCardIndex] === "reveG" ||
      shuffledCards[startingCardIndex] === "D2G" ||
      shuffledCards[startingCardIndex] === "skipB" ||
      shuffledCards[startingCardIndex] === "reveB" ||
      shuffledCards[startingCardIndex] === "D2B" ||
      shuffledCards[startingCardIndex] === "skipY" ||
      shuffledCards[startingCardIndex] === "reveY" ||
      shuffledCards[startingCardIndex] === "D2Y" ||
      shuffledCards[startingCardIndex] === "W" ||
      shuffledCards[startingCardIndex] === "d4W"
    ) {
      startingCardIndex++;
    }

    const startingCard = shuffledCards[startingCardIndex];
    if (startingCard) {
      playedCardsPile.push(startingCard);
      shuffledCards.splice(startingCardIndex, 1);
      setCurrentNumber(startingCard.charAt(0));
      setCurrentColor(startingCard.charAt(1));
      setDrawCardPile(shuffledCards);
    }
  }, []);

  const checkWinner = (playerDeck, playerName) => {
    if (playerDeck.length === 0) {
      setGameOver(true);
      setWinner(playerName);
      playGameOverSound();
    }
  };

  const handleCardPlay = (played_card) => {
    const removeIndexOfPlayer = playerDeck.indexOf(played_card);
    const updatedPlayerDeck = [
      ...playerDeck.slice(0, removeIndexOfPlayer),
      ...playerDeck.slice(removeIndexOfPlayer + 1),
    ];
    setPlayerDeck(updatedPlayerDeck);
    setPlayedCardsPile((prevPile) => [...prevPile, played_card]);
    checkWinner(updatedPlayerDeck, "Player");
  };
  const settingColorAndNumber = (playedColor, playedNumber) => {
    setCurrentColor(playedColor);
    setCurrentNumber(playedNumber);
  };

  const onCardPlayedHandlerForPlayer = (played_card) => {
    switch (played_card) {
      case "0R":
      case "1R":
      case "2R":
      case "3R":
      case "4R":
      case "5R":
      case "6R":
      case "7R":
      case "8R":
      case "9R":
      case "0G":
      case "1G":
      case "2G":
      case "3G":
      case "4G":
      case "5G":
      case "6G":
      case "7G":
      case "8G":
      case "9G":
      case "0Y":
      case "1Y":
      case "2Y":
      case "3Y":
      case "4Y":
      case "5Y":
      case "6Y":
      case "7Y":
      case "8Y":
      case "9Y":
      case "0B":
      case "1B":
      case "2B":
      case "3B":
      case "4B":
      case "5B":
      case "6B":
      case "7B":
      case "8B":
      case "9B": {
        const numberOfPlayedCard = played_card.charAt(0);
        const colorOfPlayedCard = played_card.charAt(1);

        if (
          currentColor === colorOfPlayedCard ||
          currentNumber === numberOfPlayedCard
        ) {
          handleCardPlay(played_card);
          settingColorAndNumber(colorOfPlayedCard, numberOfPlayedCard);
          setTurn("Bot");
        } else {
        }
        break;
      }
      case "skipR":
      case "skipG":
      case "skipB":
      case "skipY":
      case "reveR":
      case "reveY":
      case "reveG":
      case "reveB": {
        const colorOfPlayedCard = played_card.charAt(4);
        const numberOfPlayedCard = played_card.charAt(0);

        if (
          currentColor === colorOfPlayedCard ||
          currentNumber === numberOfPlayedCard
        ) {
          handleCardPlay(played_card);
          settingColorAndNumber(colorOfPlayedCard, numberOfPlayedCard);
          playSkipCardSound();
        } else {
        }
        break;
      }
      case "D2G":
      case "D2B":
      case "D2Y":
      case "D2R": {
        const colorOfPlayedCard = played_card.charAt(2);
        const numberOfPlayedCard = played_card.charAt(0);

        if (
          currentColor === colorOfPlayedCard ||
          currentNumber === numberOfPlayedCard
        ) {
          handleCardPlay(played_card);
          playDraw2CardSound();
          const copiedDrawCardPileArray = [...drawCardPile];
          const drawCard1 = copiedDrawCardPileArray.pop();
          const drawCard2 = copiedDrawCardPileArray.pop();
          setDrawCardPile(copiedDrawCardPileArray);
          const updatedBotDeck = [...botDeck, drawCard1, drawCard2];
          setBotDeck(updatedBotDeck);
          settingColorAndNumber(colorOfPlayedCard, numberOfPlayedCard);
        } else {
        }
        break;
      }
      case "d4W": {
        const numberOfPlayedCard = "d4W";
        const allowedKeys = ["R", "B", "G", "Y"];
        const newColor = prompt("Enter first letter of new color (R/G/B/Y)");
        if (newColor === null) {
          return;
        }
        const uppercasedColor = newColor.toUpperCase();
        if (uppercasedColor && allowedKeys.includes(uppercasedColor)) {
          handleCardPlay(played_card);
          setCurrentColor(uppercasedColor);
          setCurrentNumber(numberOfPlayedCard);
          playDraw4CardSound();
          const copiedDrawCardPileArray = [...drawCardPile];
          const drawCard1 = copiedDrawCardPileArray.pop();
          const drawCard2 = copiedDrawCardPileArray.pop();
          const drawCard3 = copiedDrawCardPileArray.pop();
          const drawCard4 = copiedDrawCardPileArray.pop();
          setDrawCardPile(copiedDrawCardPileArray);
          const updatedBotDeck = [
            ...botDeck,
            drawCard1,
            drawCard2,
            drawCard3,
            drawCard4,
          ];
          setBotDeck(updatedBotDeck);
        } else {
          alert("Invalid Key!");
        }

        break;
      }
      case "W": {
        const numberOfPlayedCard = "W";
        const newColor = prompt("Enter first letter of new color (R/G/B/Y)");
        if (newColor === null) {
          return;
        }
        const uppercasedColor = newColor.toUpperCase();
        if (
          uppercasedColor === "R" ||
          uppercasedColor === "G" ||
          uppercasedColor === "B" ||
          uppercasedColor === "Y"
        ) {
          playWildCardSound();
          handleCardPlay(played_card);
          settingColorAndNumber(uppercasedColor, numberOfPlayedCard);
          setTurn("Bot");
        } else {
          alert("Invalid Key!");
        }
        break;
      }
    }
  };

  const onCardDrawnHandler = () => {
    for (let i = 0; i < playerDeck.length; i++) {
      const card = playerDeck[i];
      const color = card.charAt(card.length - 1);
      const number = card.charAt(0);
      if (
        color === currentColor ||
        number === currentNumber ||
        number === "W" ||
        number === "d"
      ) {
        return;
      }
    }

    const copiedDrawCardPileArray = [...drawCardPile];
    const drawCard = copiedDrawCardPileArray.pop();
    const colorOfDrawnCard = drawCard.charAt(drawCard.length - 1);
    const numberOfDrawnCard = drawCard.charAt(0);
    setDrawCardPile(copiedDrawCardPileArray);
    setPlayerDeck([...playerDeck, drawCard]);

    if (
      numberOfDrawnCard === currentNumber ||
      colorOfDrawnCard === currentColor
    ) {
    } else if (numberOfDrawnCard === "W" || numberOfDrawnCard === "d") {
    } else if (currentNumber === "s" || currentNumber === "r") {
      if (
        colorOfDrawnCard === currentColor ||
        numberOfDrawnCard === currentNumber
      ) {
      } else {
        setTurn("Bot");
      }
    } else {
      setTurn("Bot");
    }
  };

  const findMostRepeatedColor = () => {
    const colorCount = {};
    const colors = ["R", "G", "B", "Y"];
    for (const color of colors) {
      colorCount[color] = 0;
    }

    for (const card of botDeck) {
      if (card === "W" || card === "d4W") {
        colorCount["G"]++;
      } else {
        const color = card.charAt(card.length - 1);
        colorCount[color]++;
      }
    }

    let maxCount = 0;
    let mostRepeatedColor = "";
    for (const key in colorCount) {
      if (colorCount[key] > maxCount) {
        maxCount = colorCount[key];
        mostRepeatedColor = key;
      } else if (colorCount[key] === maxCount && maxCount !== 0) {
        if (colors.indexOf(key) < colors.indexOf(mostRepeatedColor)) {
          mostRepeatedColor = key;
        }
      }
    }
    return mostRepeatedColor;
  };

  const botPlay = () => {
    setTimeout(() => {
      const colorAndNumberCards = botDeck.filter((card) =>
        /^[0-9]+[RGBY]$/.test(card)
      );
      const ColorAndNumberOfCard = colorAndNumberCards.length;
      let botPlayedCardIndexColorAndNumber;

      if (ColorAndNumberOfCard > 0) {
        for (let i = 0; i < ColorAndNumberOfCard; i++) {
          const currentCard = colorAndNumberCards[i];
          const numberOfCurrentCard = currentCard.charAt(0);
          const colorOfCurrentCard = currentCard.charAt(1);

          if (
            colorOfCurrentCard === currentColor ||
            numberOfCurrentCard === currentNumber
          ) {
            botPlayedCardIndexColorAndNumber = i;
            break;
          }
        }
      } else {
        botPlayedCardIndexColorAndNumber = null;
      }

      const botPlayedCardForColorAndNUmber =
        botPlayedCardIndexColorAndNumber !== null
          ? colorAndNumberCards[botPlayedCardIndexColorAndNumber]
          : null;
      const numberOfBotPlayedCard = botPlayedCardForColorAndNUmber
        ? botPlayedCardForColorAndNUmber.charAt(0)
        : null;
      const colorOfBotPlayedCard = botPlayedCardForColorAndNUmber
        ? botPlayedCardForColorAndNUmber.charAt(1)
        : null;

      const drawCards = botDeck.filter((card) => /^D2[RGBY]$/.test(card));
      const NumberOfDrawCards = drawCards.length;
      let botPlayedCardIndexDraw2;
      if (NumberOfDrawCards > 0) {
        for (let i = 0; i < NumberOfDrawCards; i++) {
          const currentCardDraw2 = drawCards[i];
          const numberOfCurrentCardDraw2 = currentCardDraw2.charAt(0);
          const colorOfCurrentCardDraw2 = currentCardDraw2.charAt(2);

          if (
            colorOfCurrentCardDraw2 === currentColor ||
            numberOfCurrentCardDraw2 === currentNumber
          ) {
            botPlayedCardIndexDraw2 = i;
            break;
          }
        }
      } else {
        botPlayedCardIndexDraw2 = null;
      }

      const botPlayedCardForDraw2 =
        botPlayedCardIndexDraw2 !== null
          ? drawCards[botPlayedCardIndexDraw2]
          : null;
      const numberOfBotPlayedCardForDraw2 = botPlayedCardForDraw2
        ? botPlayedCardForDraw2.charAt(0)
        : null;
      const colorOfBotPlayedCardForDraw2 = botPlayedCardForDraw2
        ? botPlayedCardForDraw2.charAt(2)
        : null;

      const reverseCards = botDeck.filter((card) => /^reve[RGBY]$/.test(card));
      const NumberOfReverseCards = reverseCards.length;
      let botPlayedCardIndexReverse;

      if (NumberOfReverseCards > 0) {
        for (let i = 0; i < NumberOfReverseCards; i++) {
          const currentCardReverse = reverseCards[i];
          const numberOfCurrentCardReverse = currentCardReverse.charAt(0);
          const colorOfCurrentCardReverse = currentCardReverse.charAt(4);

          if (
            colorOfCurrentCardReverse === currentColor ||
            numberOfCurrentCardReverse === currentNumber
          ) {
            botPlayedCardIndexReverse = i;
            break;
          }
        }
      } else {
        botPlayedCardIndexReverse = null;
      }

      const botPlayedCardForReverse =
        botPlayedCardIndexReverse !== null
          ? reverseCards[botPlayedCardIndexReverse]
          : null;
      const numberOfBotPlayedCardForReverse = botPlayedCardForReverse
        ? botPlayedCardForReverse.charAt(0)
        : null;
      const colorOfBotPlayedCardForReverse = botPlayedCardForReverse
        ? botPlayedCardForReverse.charAt(4)
        : null;

      const skipCards = botDeck.filter((card) => /^skip[RGBY]$/.test(card));
      const NumberOfSkipCards = skipCards.length;
      let botPlayedCardIndexSkip;

      if (NumberOfSkipCards > 0) {
        for (let i = 0; i < NumberOfSkipCards; i++) {
          const currentCardSkip = skipCards[i];
          const numberOfCurrentCardSkip = currentCardSkip.charAt(0);
          const colorOfCurrentCardSkip = currentCardSkip.charAt(4);

          if (
            colorOfCurrentCardSkip === currentColor ||
            numberOfCurrentCardSkip === currentNumber
          ) {
            botPlayedCardIndexSkip = i;
            break;
          }
        }
      } else {
        botPlayedCardIndexSkip = null;
      }

      const botPlayedCardForSkip =
        botPlayedCardIndexSkip !== null
          ? skipCards[botPlayedCardIndexSkip]
          : null;
      const numberOfBotPlayedCardForSkip = botPlayedCardForSkip
        ? botPlayedCardForSkip.charAt(0)
        : null;
      const colorOfBotPlayedCardForSkip = botPlayedCardForSkip
        ? botPlayedCardForSkip.charAt(4)
        : null;

      const wildCards = botDeck.filter((card) => /^W$/.test(card));
      const NumberOfWildCards = wildCards.length;
      const botPlayedCardForWild = NumberOfWildCards > 0 ? wildCards[0] : null;
      const numberOfBotPlayedCardForWild = botPlayedCardForWild
        ? botPlayedCardForWild.charAt(0)
        : null;

      const drawWildCards = botDeck.filter((card) => /^d4W$/.test(card));
      const NumberOfDrawWildCards = drawWildCards.length;
      const botPlayedCardForDrawWild =
        NumberOfDrawWildCards > 0 ? drawWildCards[0] : null;
      const numberOfBotPlayedCardForDrawWild = botPlayedCardForDrawWild
        ? "d4W"
        : null;

      const reverseCardPlay = (
        cardToPlay,
        numberOfCardToPlay,
        colorOfCardToPlay
      ) => {
        setPlayedCardsPile((prevPile) => [...prevPile, cardToPlay]);
        setBotDeck((prevDeck) => {
          const indexToRemove = prevDeck.indexOf(cardToPlay);
          if (indexToRemove !== -1) {
            return prevDeck
              .slice(0, indexToRemove)
              .concat(prevDeck.slice(indexToRemove + 1));
          }
        });
        setCurrentNumber(numberOfCardToPlay);
        setCurrentColor(colorOfCardToPlay);
        playSkipCardSound();
        setTurn("Bot");
      };

      const skipCardPlay = (
        cardToPlay,
        numberOfCardToPlay,
        colorOfCardToPlay
      ) => {
        setPlayedCardsPile((prevPile) => [...prevPile, cardToPlay]);
        setBotDeck((prevDeck) => {
          const indexToRemove = prevDeck.indexOf(cardToPlay);
          if (indexToRemove !== -1) {
            return prevDeck
              .slice(0, indexToRemove)
              .concat(prevDeck.slice(indexToRemove + 1));
          }
        });
        setCurrentNumber(numberOfCardToPlay);
        setCurrentColor(colorOfCardToPlay);
        playSkipCardSound();
        setTurn("Bot");
      };

      const colorAndNumberCardPlay = (
        cardToPlay,
        numberOfCardToPlay,
        colorOfCardToPlay
      ) => {
        setPlayedCardsPile((prevPile) => [...prevPile, cardToPlay]);
        setBotDeck((prevDeck) => {
          const indexToRemove = prevDeck.indexOf(cardToPlay);
          if (indexToRemove !== -1) {
            return prevDeck
              .slice(0, indexToRemove)
              .concat(prevDeck.slice(indexToRemove + 1));
          }
        });
        setCurrentNumber(numberOfCardToPlay);
        setCurrentColor(colorOfCardToPlay);
        if (botDeck.length === 1) {
          setGameOver(true);
          setWinner("Bot");
          playGameOverSound();
        }
        setTurn("Player");
      };

      const drawCardPlay = (
        cardToPlay,
        numberOfCardToPlay,
        colorOfCardToPlay
      ) => {
        setPlayedCardsPile((prevPile) => [...prevPile, cardToPlay]);
        setBotDeck((prevDeck) => {
          const indexToRemove = prevDeck.indexOf(cardToPlay);
          if (indexToRemove !== -1) {
            return prevDeck
              .slice(0, indexToRemove)
              .concat(prevDeck.slice(indexToRemove + 1));
          }
        });
        const copiedDrawCardPileArray = [...drawCardPile];
        const drawCard1 = copiedDrawCardPileArray.pop();
        const drawCard2 = copiedDrawCardPileArray.pop();
        setDrawCardPile(copiedDrawCardPileArray);
        setPlayerDeck((prevDeck) => [...prevDeck, drawCard1, drawCard2]);
        playDraw2CardSound();
        setCurrentNumber(numberOfCardToPlay);
        setCurrentColor(colorOfCardToPlay);
        setTurn("Bot");
      };
      const wildCardPlay = (cardToPlay, numberOfCardToPlay) => {
        setPlayedCardsPile((prevPile) => [...prevPile, cardToPlay]);
        setBotDeck((prevDeck) => {
          const indexToRemove = prevDeck.indexOf(cardToPlay);
          if (indexToRemove !== -1) {
            return prevDeck
              .slice(0, indexToRemove)
              .concat(prevDeck.slice(indexToRemove + 1));
          }
        });
        playWildCardSound();
        setCurrentNumber(numberOfCardToPlay);
        const mostRepeatedColor = findMostRepeatedColor();
        setCurrentColor(mostRepeatedColor);
        setTurn("Player");
      };

      const draw4WildCardPlay = (cardToPlay, numberOfCardToPlay) => {
        setPlayedCardsPile((prevPile) => [...prevPile, cardToPlay]);
        setBotDeck((prevDeck) => {
          const indexToRemove = prevDeck.indexOf(cardToPlay);
          if (indexToRemove !== -1) {
            return prevDeck
              .slice(0, indexToRemove)
              .concat(prevDeck.slice(indexToRemove + 1));
          }
        });
        setCurrentNumber(numberOfCardToPlay);
        const mostRepeatedColor = findMostRepeatedColor();
        setCurrentColor(mostRepeatedColor);
        playDraw4CardSound();
        const copiedDrawCardPileArray = [...drawCardPile];
        const drawCard1 = copiedDrawCardPileArray.pop();
        const drawCard2 = copiedDrawCardPileArray.pop();
        const drawCard3 = copiedDrawCardPileArray.pop();
        const drawCard4 = copiedDrawCardPileArray.pop();
        setDrawCardPile(copiedDrawCardPileArray);
        setPlayerDeck((prevDeck) => [
          ...prevDeck,
          drawCard1,
          drawCard2,
          drawCard3,
          drawCard4,
        ]);
        playDraw4CardSound();
        setTurn("Bot");
      };

      if (
        NumberOfReverseCards > 0 &&
        (colorOfBotPlayedCardForReverse === currentColor ||
          numberOfBotPlayedCardForReverse === currentNumber)
      ) {
        reverseCardPlay(
          botPlayedCardForReverse,
          numberOfBotPlayedCardForReverse,
          colorOfBotPlayedCardForReverse
        );

        if (botDeck.length === 1) {
          setGameOver(true);
          setWinner("Bot");
          playGameOverSound();
        }
      } else if (
        NumberOfSkipCards > 0 &&
        (colorOfBotPlayedCardForSkip === currentColor ||
          numberOfBotPlayedCardForSkip === currentNumber)
      ) {
        skipCardPlay(
          botPlayedCardForSkip,
          numberOfBotPlayedCardForSkip,
          colorOfBotPlayedCardForSkip
        );

        if (botDeck.length === 1) {
          setGameOver(true);
          setWinner("Bot");
          playGameOverSound();
        }
      } else if (
        botPlayedCardIndexColorAndNumber !== null &&
        (colorOfBotPlayedCard === currentColor ||
          numberOfBotPlayedCard === currentNumber)
      ) {
        colorAndNumberCardPlay(
          botPlayedCardForColorAndNUmber,
          numberOfBotPlayedCard,
          colorOfBotPlayedCard
        );
      } else if (
        NumberOfDrawCards > 0 &&
        (colorOfBotPlayedCardForDraw2 === currentColor ||
          numberOfBotPlayedCardForDraw2 === currentNumber)
      ) {
        drawCardPlay(
          botPlayedCardForDraw2,
          numberOfBotPlayedCardForDraw2,
          colorOfBotPlayedCardForDraw2
        );
        if (botDeck.length === 1) {
          setGameOver(true);
          setWinner("Bot");
          playGameOverSound();
        }
      } else if (NumberOfWildCards > 0) {
        wildCardPlay(botPlayedCardForWild, numberOfBotPlayedCardForWild);

        if (botDeck.length === 1) {
          setGameOver(true);
          setWinner("Bot");
          playGameOverSound();
        }
      } else if (NumberOfDrawWildCards > 0) {
        draw4WildCardPlay(
          botPlayedCardForDrawWild,
          numberOfBotPlayedCardForDrawWild
        );

        if (botDeck.length === 1) {
          setGameOver(true);
          setWinner("Bot");
          playGameOverSound();
        }
      } else {
        const copiedDrawCardPileArray = [...drawCardPile];
        const drawCard1 = copiedDrawCardPileArray.pop();
        setDrawCardPile(copiedDrawCardPileArray);
        const colorOfBotDrawnCard = drawCard1.charAt(drawCard1.length - 1);
        const numberOfBotDrawnCard = drawCard1.charAt(0);
        setBotDeck((prevDeck) => [...prevDeck, drawCard1]);

        if (
          /^[0-9]+[RGBY]$/.test(drawCard1) &&
          (currentColor === colorOfBotDrawnCard ||
            currentNumber === numberOfBotDrawnCard)
        ) {
          colorAndNumberCardPlay(
            drawCard1,
            numberOfBotDrawnCard,
            colorOfBotDrawnCard
          );
        } else if (
          /^D2[RGBY]$/.test(drawCard1) &&
          (currentColor === colorOfBotDrawnCard ||
            currentNumber === numberOfBotDrawnCard)
        ) {
          drawCardPlay(drawCard1, numberOfBotDrawnCard, colorOfBotDrawnCard);
        } else if (
          /^reve[RGBY]$/.test(drawCard1) &&
          (currentColor === colorOfBotDrawnCard ||
            currentNumber === numberOfBotDrawnCard)
        ) {
          reverseCardPlay(drawCard1, numberOfBotDrawnCard, colorOfBotDrawnCard);
        } else if (
          /^skip[RGBY]$/.test(drawCard1) &&
          (currentColor === colorOfBotDrawnCard ||
            currentNumber === numberOfBotDrawnCard)
        ) {
          skipCardPlay(drawCard1, numberOfBotDrawnCard, colorOfBotDrawnCard);
        } else if (/^W$/.test(drawCard1)) {
          wildCardPlay(drawCard1, numberOfBotDrawnCard, colorOfBotDrawnCard);
        } else if (/^d4W$/.test(drawCard1)) {
          draw4WildCardPlay(
            drawCard1,
            numberOfBotDrawnCard,
            colorOfBotDrawnCard
          );
        } else {
          setTurn("Player");
        }
      }

      if (botDeck.length === 0) {
        setGameOver(true);
        setWinner("Bot");
        playGameOverSound();
      }
    }, Math.floor(Math.random() * 2000) + 1000);
  };

  useEffect(() => {
    if (turn === "Bot") {
      botPlay();
    }
  }, [turn, botPlay]);

  return (
    <>
      {/* PlayedCardsPile */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingRight: "550px",
          paddingTop: "220px",
        }}
      >
        <div
          style={{
            position: "relative",
            backgroundColor:
              currentColor === "G"
                ? "#33b84b"
                : currentColor === "B"
                ? "#0098ff"
                : currentColor === "Y"
                ? "#ffc63c"
                : currentColor === "R"
                ? "#ff242c"
                : "transparent",
            width: "115px",
            height: "155px",
            borderRadius: "10px",
          }}
        >
          {playedCardsPile.length > 0 && (
            <img
              className="Card"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
              alt="Played Cards IMG"
              src={require(`../assets/${
                playedCardsPile[playedCardsPile.length - 1]
              }.png`)}
            />
          )}
        </div>
      </div>

      {/* PlayerDeck */}
      <div
        style={{
          position: "fixed",
          bottom: "10px",
          left: "10px",
          padding: "5px 5px",
          alignItems: "center",
        }}
      >
        {playerDeck.map((item, index, card) => (
          <img
            key={`${card}-${index}`}
            className="Card"
            onClick={
              turn === "Player"
                ? () => onCardPlayedHandlerForPlayer(item)
                : null
            }
            src={require(`../assets/${item}.png`)}
            alt="Player Deck Cards IMG"
          />
        ))}
      </div>
      {/* BotDeck */}
      <div
        style={{
          position: "fixed",
          top: "10px",
          right: "10px",
          padding: "5px 5px",
          alignItems: "center",
        }}
      >
        {botDeck.map((item, card, index) => (
          <img
            key={`${card}-${index}`}
            style={{ width: "100px", height: "auto" }}
            src={require(`../images/Deck.png`)}
            alt="Bot Deck Cards IMG"
          />
        ))}
      </div>

      {/* DrawCardHandler */}
      {drawCardPile.length > 0 && (
        <img
          className="Card"
          style={{
            position: "absolute",
            top: "50%",
            left: "40%",
            transform: "translate(-50%, -50%)",
            width: "115px",
          }}
          src={require("../images/Deck.png")}
          alt="Draw Pile"
          onClick={turn === "Player" ? () => onCardDrawnHandler() : null}
        />
      )}

      {gameOver && (
        <div
          id="winBox"
          style={{
            backgroundColor: winner === "Player" ? "#4CAF50" : "red",
            borderRadius: "10px",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <h2>
            {winner === "Player"
              ? "CONGRATULATIONS!"
              : "Better luck next time!"}
          </h2>
          <p>{winner === "Player" ? "YOU WON!" : "BOT WON!"}</p>
          <button
            style={{
              backgroundColor: "#a99985",
              color: "white",
              border: "none",
              borderRadius: "5px",
              padding: "10px 20px",
              cursor: "pointer",
            }}
            onClick={() => window.location.reload()}
          >
            Play Again!
          </button>
        </div>
      )}

      <h1>{turn === "Player" ? "You" : "Bot"}</h1>
      <button className="mute-unmute-btn" onClick={togglePlay}>
        {isMusicPlaying ? <span>&#x1F50A;</span> : <span>&#x1F507;</span>}
      </button>
    </>
  );
}
