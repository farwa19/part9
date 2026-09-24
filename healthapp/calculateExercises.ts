

interface exerciseArguments {
  value1: number;
  value2:Array<number>;
}
const parseArguments = (args: string[]): exerciseArguments => {
  if (args.length < 4) throw new Error('Not enough arguments');
   const target = Number(args[2]);
  const hours = args.slice(3).map(Number);


   if (!isNaN(target) && hours.every(hour => !isNaN(hour))) {
    return {
      value1: target,
      value2: hours
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }

};


const calculateExercises = (info: Array<number>, target: number) => {
  const days = info.length;
  let trainingdays  = 0;
  let human = 'KJJ';
  let met =0;
  let hn = false;
  for (const hours of info) {
  if (hours > 0) {
    trainingdays++;
  }
}
let average = 0; 
for (const hours of info) {
  if (hours > 0) {
    average += hours;
  }
}
if ((average/days)>target) {
    hn = true;
    met = 3;
    human = "Great job!";
  }
  else if((average/days)<target) {
    hn = false;
    met =2; 
    human = "Not too bad, but could be better";
  }
  else if((average/days)==target) {
    hn = true;
    met = 1;
    human = "You should exercise more";
  }
  const hy = {
    "periodLength": days,
    "trainingDays":trainingdays,
    "success": hn,
  "rating":met,
  "ratingDescription": human,
  "target": target,
  "average":  average / days
  };
  return hy;
};
try {
  const { value1, value2 } = parseArguments(process.argv);
console.log(calculateExercises  (value2, value1));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

export default calculateExercises;