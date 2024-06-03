// import { useState } from 'react'


// export function NewGuessForm({ onSubmit, options }) {
//     const [newItem, setNewItem] = useState("")
//     const [searchExercise, setSearchExercise] = useState([[]])
    

//     function handleSubmit(e) {
//       e.preventDefault()
//       if (newItem === "") return
  
//       onSubmit(newItem)
  
//       setNewItem("")
//     }
  
//     return (
//       <form onSubmit={handleSubmit} className="new-item-form">
//         <div className="form-row">
//           <label htmlFor="guess">Guess Exercise: </label>
//           <input
//             value={newItem}
//             onChange={e =>  {
//                 setNewItem(e.target.value)
//                 fetch(import.meta.env.VITE_API_URL + 'name=' + newItem, options)
//                 .then (response => {
//                     if (!response.ok) {
//                         throw new Error('Something went wrong');
//                     }
//                     return response.json();
//                 })
//                 .then(data => {
                    
//                     setSearchExercise(currentExercises => {
//                         return ([...currentExercises, data])
//                     })
//                     //console.log(searchExercise);
//                 })
                
//             }}
//             list='available-exercises'
//             id="guess"
//             name = "guess"
//           />
//           <datalist id='available-exercises'>
            
//             {searchExercise[searchExercise.length-1].map(e => {
//                 return (
//                     <option
//                     key={crypto.randomUUID()} 
                    
//                     >{e.name}</option>
//                 )
//             })}
//           </datalist>
//         </div>
//         <button className="btn">Add</button>
//       </form>
//     )
// }

import { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';
import './NewGuessForm.css'; // Import the CSS file

export function NewGuessForm({ onSubmit, options }) {
    const [newItem, setNewItem] = useState("");
    const [searchExercise, setSearchExercise] = useState([[]]);

    const fetchExercises = useCallback(
        debounce((value) => {
            fetch(`${import.meta.env.VITE_API_URL}name=${value}`, options)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Something went wrong');
                    }
                    return response.json();
                })
                .then(data => {
                    setSearchExercise([data]);  // Set the fetched exercises
                })
                .catch(error => {
                    console.error(error);
                });
        }, 300),
        []
    );

    function handleChange(e) {
        const value = e.target.value;
        setNewItem(value);
        if (value) {
            fetchExercises(value);
        } else {
            setSearchExercise([[]]);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (newItem === "") return;

        onSubmit(newItem);
        setNewItem("");
    }

    return (
        <form onSubmit={handleSubmit} className="new-item-form">
            <div className="form-row">
                <label htmlFor="guess">Guess Exercise: </label>
                <input
                    value={newItem}
                    onChange={handleChange}
                    list="available-exercises"
                    id="guess"
                    name="guess"
                    className='rounded-textbox'
                />
                <button className="button">Add</button>
                <datalist id="available-exercises">
                    {searchExercise[0].map((e) => {
                        return (
                            <option key={crypto.randomUUID()}>{e.name}</option>
                        );
                    })}
                </datalist>
            </div>
            
        </form>
    );
}
