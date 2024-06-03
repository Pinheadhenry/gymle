import { useEffect, useState, useRef } from 'react'

import './App.css'
import { NewGuessForm } from './NewGuessForm'
import { GuessList } from './GuessList'
import { Popup } from './Popup'

async function getCorrectExercise(options) {
  const types = ['cardio','olympic_weightlifting','plyometrics','powerlifting','strength','stretching','strongman'];
  const muscles = ['abdominals','abductors','adductors','biceps','calves','chest','forearms','glutes','hamstrings','lats','lower_back','middle_back','neck','quadriceps','traps','triceps']
  const difficulty = ['beginner', 'intermediate', 'expert']
  const catagories = [types, muscles, difficulty]
  var x = Math.floor(Math.random()*3)
  var catagory = catagories[x][Math.floor(Math.random()*catagories[x].length)];
  //console.log(catagory);
  switch(x) {
      case 0:
        try {
          // Simulate an asynchronous operation, like a network request
          const response = await fetch(import.meta.env.VITE_API_URL + 'type=' + catagory, options)
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          return data[Math.floor(Math.random()*10)];
        } catch (error) {
          console.error('Error fetching exercise:', error);
          return null; // or handle the error appropriately
        }
      case 1:
        try {
          // Simulate an asynchronous operation, like a network request
          const response = await fetch(import.meta.env.VITE_API_URL + 'muscle=' + catagory, options)
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          return data[Math.floor(Math.random()*10)];
        } catch (error) {
          console.error('Error fetching exercise:', error);
          return null; // or handle the error appropriately
        }
      case 2:
        try {
          // Simulate an asynchronous operation, like a network request
          const response = await fetch(import.meta.env.VITE_API_URL + 'difficulty=' + catagory, options)
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          return data[Math.floor(Math.random()*10)];
        } catch (error) {
          console.error('Error fetching exercise:', error);
          return null; // or handle the error appropriately
        }
  }
}
const options = {
  method:  "GET",
  headers: { 'X-Api-Key': import.meta.env.VITE_API_KEY},
}
const TOTAL_ATTEMPTS = 6;

function App() {
  const [guesses, setGuesses] = useState([])
  const [correct, setCorrect] = useState({name:""})
  const [count, setCount] = useState(0)
  const [won, setWon] = useState(false)
  const [popupContent, setPopupContent] = useState({
    title: "Welcome to GYMLE!",
    text: <p>Guess the gym exercise ranging from all types of muscles, difficulty, equipment and more.<br></br>GREEN - That catagory is correct! <br></br>YELLOW - Close! The name of the correct exersice has a similar name or the muscle targeted is on the same body part as the correct muscle.<br></br>GREY - Incorrect. Try another guess.<br></br><big>You only have {TOTAL_ATTEMPTS} attempts. Good Luck!</big></p>
  })
  const hasFetchedCorrectExercise = useRef(false);

  const [isOpen, setIsOpen] = useState(true);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Open the pop-up when trigger changes to true
    if (count >= TOTAL_ATTEMPTS && !won) {
      setIsOpen(true);
      setPopupContent({
        title: "Not Quite",
        text: <p>The correct exercise was: <br></br><br></br><big>{correct.name}</big><br></br><br></br>Better luck next time!</p>
      })
    }
    if (count <= TOTAL_ATTEMPTS && won) {
      setIsOpen(true);
      setPopupContent({
        title: "You Got It!",
        text: <p>The correct exercise was: <br></br><br></br><big>{correct.name}</big><br></br><br></br>You know your stuff!</p>
      })
    }
  }, [count]); // Dependency array includes trigger

  useEffect(() => {
    async function fetchCorrectExercise() {
      try {
        const data = await getCorrectExercise(options);
        setCorrect(data);
        //console.log(data)
      } catch (error) {
        console.error('Error fetching correct exercise:', error);
        // Optionally, you can set an error state or handle the error accordingly
      }
    }

    fetchCorrectExercise();
    hasFetchedCorrectExercise.current = true;
  }, []);
  
  //console.log(correct.name)

  // var correct = "";
  // getCorrectExercise(options).then(data => {correct = data})

  // async function findExercise(name) {
  //   fetch('https://api.api-ninjas.com/v1/exercises?name=' + name, options)
  //   .then (response => {
  //       if (!response.ok) {
  //           throw new Error('Something went wrong');
  //       }
  //       return response.json();
  //   })
  //   .then(data => {
  //       //console.log(data[0]);
  //       return data[0]
  //   })
    
  // }
  async function findExercise(exerciseName) {
    // Example implementation
    try {
      // Simulate an asynchronous operation, like a network request
      const response = await fetch(import.meta.env.VITE_API_URL + 'name=' + exerciseName, options)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data[0];
    } catch (error) {
      console.error('Error fetching exercise:', error);
      return null; // or handle the error appropriately
    }
  }

  async function addGuess(exerciseName) {
    if (exerciseName === correct.name) {
      setWon(true)
    }
    setCount(prevCount => prevCount + 1)
    var exercise = await findExercise(exerciseName)
    //console.log(exercise)
    setGuesses(currentGuesses => {
       return [
        ...currentGuesses,
        { id: crypto.randomUUID(), exercise: exercise},
      ]
    })

    
    
  }
  // async function addGuess(exerciseName) {
  //   try {
  //     var exercise = await findExercise(exerciseName);
  //     if (!exercise) {
  //       console.error('No exercise found or an error occurred');
  //       return;
  //     }
  //     console.log('Exercise found:', exercise);
  //     setGuesses(currentGuesses => {
  //       return [
  //         ...currentGuesses,
  //         { id: crypto.randomUUID(), exercise: exercise },
  //       ];
  //     });
  //   } catch (error) {
  //     console.error('Error in addGuess:', error);
  //   }
  // }

  return (
    <>
    <div className="container">
      <div className="header-container">
          <img src="https://gymle.s3.amazonaws.com/gym-7000637_1280.png" alt="Description" className="header-image"></img>
          <h1 className="header-title">GYMLE</h1>
      </div>
    </div>
    
    {/* <h1>{correct.name}</h1> */}
    <p>Attemps: {count}/{TOTAL_ATTEMPTS}</p>
    <NewGuessForm onSubmit={addGuess} options={options} />
    <GuessList guesses={guesses} correct={correct} />
    {isOpen && <Popup 
    content={<div>
      <h2>{popupContent.title}</h2>
      {popupContent.text}
    </div>} 
      handleClose={togglePopup}
      
    />}
    </>
  )
}

export default App
