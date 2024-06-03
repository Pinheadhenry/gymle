export function GuessItem({ id, exercise, correct }) {
    let nameColor = "";
    let muscleColor = "";
    let difficultyColor = "";
    let equipmentColor = "";
    let typeColor = "";

    function haveCommonWords(string1, string2) {
        // Split the strings into arrays of words
        const words1 = string1.split(/\s+/);
        const words2 = string2.split(/\s+/);
      
        // Convert the first array of words into a Set for efficient lookup
        const wordsSet = new Set(words1);
      
        // Check if any word in the second array is present in the Set
        for (const word of words2) {
          if (wordsSet.has(word)) {
            return true;
          }
        }
      
        return false;
      }

    if (exercise.name === correct.name) {
        nameColor = "green";
        muscleColor = "green";
        difficultyColor = "green";
        equipmentColor = "green";
        typeColor = "green";
        
    } else if (haveCommonWords(exercise.name, correct.name)) {
        nameColor = "yellow"
    }
    if (exercise.muscle === correct.muscle) {
        muscleColor = "green"
    } 
    else if ((exercise.muscle === 'biceps' || exercise.muscle === 'triceps'|| exercise.muscle === 'shoulders' || exercise.muscle === 'forearms') && (correct.muscle === 'biceps' || correct.muscle === 'triceps'|| correct.muscle === 'shoulders'|| correct.muscle === 'forearms')) {
        muscleColor = "yellow"
    }
    else if ((exercise.muscle === 'lats' || exercise.muscle === 'lower_back'|| exercise.muscle === 'middle_back') && (correct.muscle === 'lats' || correct.muscle === 'lower_back'|| correct.muscle === 'middle_back')) {
        muscleColor = "yellow"
    }
    else if ((exercise.muscle === 'neck' || exercise.muscle === 'traps' ) && (correct.muscle === 'neck' || correct.muscle === 'traps')) {
        muscleColor = "yellow"
    }
    else if ((exercise.muscle === 'quadriceps' || exercise.muscle === 'hamstrings'|| exercise.muscle === 'calves' || exercise.muscle === 'glutes' || exercise.muscle === 'abductors' || exercise.muscle === 'adductors') && (correct.muscle === 'quadriceps' || correct.muscle === 'hamstrings'|| correct.muscle === 'calves'|| correct.muscle === 'glutes' || correct.muscle === 'abductors' || correct.muscle === 'adductors')) {
        muscleColor = "yellow"
    }
    
    if (exercise.difficulty === correct.difficulty) {
        difficultyColor = "green"
    }
    if (exercise.equipment === correct.equipment) {
        equipmentColor = "green"
    }
    if (exercise.type === correct.type) {
        typeColor = "green"
    }

    return (
        <>
        <tr className="new-row">
            <td className={nameColor}>{exercise.name}</td>
            <td className={muscleColor}>{exercise.muscle.replace(/_/g, ' ')}</td>
            <td className={difficultyColor}>{exercise.difficulty}</td>
            <td className={equipmentColor}>{exercise.equipment.replace(/_/g, ' ')}</td>
            <td className={typeColor}>{exercise.type.replace(/_/g, ' ')}</td>
        </tr>
        </>
      )
    }
