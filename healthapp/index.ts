import express from 'express';
import type { Request, Response } from 'express';
import calculateBmi from './calculateBmi.ts';
import calculateExercises from './calculateExercises.ts';
const app = express();
app.use(express.json());


app.get('/ping', (_req: Request, res: Response) => {
  res.send('pong');
});
app.get('/hello', (_req: Request, res: Response) => {
    console.log("here");
  res.send('Hello Full Stack!');
});

app.post('/exercises', (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (daily_exercises === undefined || target === undefined) {
    return res.status(400).json({
      error: 'parameters missing'
    });
  } else if (
    !Array.isArray(daily_exercises) ||
    !daily_exercises.every((value) => typeof value === 'number') ||
    typeof target !== 'number'
  ) {
    return res.status(400).json({
      error: 'malformatted parameters'
    });
  }

  const result = calculateExercises(daily_exercises, target);

  return res.status(200).json(result);
});

app.get('/bmi', (req: Request, res: Response) => {
   const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  console.log(height);
  console.log(weight);
 if (
  !req.query.height ||
  !req.query.weight ||
  isNaN(height) ||
  isNaN(weight)
) {
    res.status(400).json({
      error: 'malformatted parameters'
    });
    return;
  }

  const c = {
  'weight': weight,
  'height': height,
  'bmi': calculateBmi( height,weight)
};

  res.send(c);
});
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
