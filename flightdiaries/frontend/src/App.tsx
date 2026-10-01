import { useState,useEffect} from "react";
import type { Diary,DiaryForm } from "./types";
import Notify from './notify';
import { Weather, Visibility } from "./types";
import diaryService from './diaryService'

const App = () => {
  const [notification, setNotification] = useState('');
  
  const [diarys, setDiary] = useState<Diary[]>([]);
  const [newDiary, setNewDiary] = useState<DiaryForm>({
  date: '',
  weather: '',
  visibility: ''
});

    useEffect(() => {
    diaryService.getAll().then(initialNotes => {
      setDiary(initialNotes)
    })
  }, [])
 


   const diaryCreation = (event: React.SyntheticEvent) => {
  event.preventDefault();

  if (!newDiary.weather || !newDiary.visibility) {
    alert('Please select weather and visibility');
    return;
  }

  diaryService.create({
    date: newDiary.date,
    weather: newDiary.weather,
    visibility: newDiary.visibility,
    comment: newDiary.comment
  })
   .then(returnedDiary => {
    setDiary(diarys.concat(returnedDiary));
    setNotification('Diary entry added successfully');

    setTimeout(() => {
      setNotification('');
    }, 5000);
  })
  .catch(error => {
    console.log("farwa");
    console.log(error)
     setNotification(
      `Error: ${JSON.stringify(error.message)}`
    );

    setTimeout(() => {
      setNotification('');
    }, 5000);
  });

  setNewDiary({
    date: '',
    weather: '',
    visibility: ''
  });
};
   

  return (
    <div>
      <h1>Add new Entry</h1>
      <Notify message={notification} />
     
      <form onSubmit={diaryCreation}>
 <div>
  date
  <input
    type="date"
    id="date"
    name="date"
    value={newDiary.date}
    min="2000-01-01"
    max="2040-01-01"
    onChange={(event) =>
      setNewDiary({
          ...newDiary,
        date: event.target.value
      })
    }
  />
</div>

  
   
   <fieldset>
  <legend>Visibility</legend>

  <div>
    <input
      type="radio"
      id="great"
      name="visibility"
      value="great"
      checked={newDiary.visibility === "great"}
      onChange={(event) =>
        setNewDiary({
          ...newDiary,
          visibility: event.target.value as Visibility
        })
      }
    />
    <label htmlFor="great">great</label>
  </div>

  <div>
    <input
      type="radio"
      id="good"
      name="visibility"
      value="good"
      checked={newDiary.visibility === "good"}
      onChange={(event) =>
        setNewDiary({
          ...newDiary,
          visibility: event.target.value as Visibility
        })
      }
    />
    <label htmlFor="good">good</label>
  </div>

  <div>
    <input
      type="radio"
      id="ok"
      name="visibility"
      value="ok"
      checked={newDiary.visibility === "ok"}
      onChange={(event) =>
        setNewDiary({
          ...newDiary,
          visibility: event.target.value as Visibility
        })
      }
    />
    <label htmlFor="ok">ok</label>
  </div>

  <div>
    <input
      type="radio"
      id="poor"
      name="visibility"
      value="poor"
      checked={newDiary.visibility === "poor"}
      onChange={(event) =>
        setNewDiary({
          ...newDiary,
          visibility: event.target.value as Visibility
        })
      }
    />
    <label htmlFor="poor">poor</label>
  </div>
</fieldset>
    
  <fieldset>
  <legend>weather</legend>

  <div>
    <input
      type="radio"
      id="rainy"
      name="weather"
      value="rainy"
      checked={newDiary.weather === "rainy"}
      onChange={(event) =>
        setNewDiary({
          ...newDiary,
          weather: event.target.value as Weather
        })
      }
    />
    <label htmlFor="rainy">rainy</label>
  </div>

  <div>
    <input
      type="radio"
      id="sunny"
      name="weather"
      value="sunny"
      checked={newDiary.weather === "sunny"}
      onChange={(event) =>
        setNewDiary({
          ...newDiary,
          weather: event.target.value as Weather
        })
      }
    />
    <label htmlFor="sunny">sunny</label>
  </div>

  <div>
    <input
      type="radio"
      id="cloudy"
      name="weather"
      value="cloudy"
      checked={newDiary.weather === "cloudy"}
      onChange={(event) =>
        setNewDiary({
          ...newDiary,
          weather: event.target.value as Weather
        })
      }
    />
    <label htmlFor="cloudy">cloudy</label>
  </div>

  <div>
    <input
      type="radio"
      id="stormy"
      name="weather"
      value="stormy"
      checked={newDiary.weather === "stormy"}
      onChange={(event) =>
        setNewDiary({
          ...newDiary,
          weather: event.target.value as Weather
        })
      }
    />
    <label htmlFor="stormy">stormy</label>
  </div>
</fieldset>


  <div>
    comment
    <textarea
      name="comment"
      value={newDiary.comment || ''}
      onChange={(event) =>
        setNewDiary({ ...newDiary, comment: event.target.value })
      }
    />
  </div>

  <button type="submit">Submit</button>
</form>
<h1>Dairy Entries</h1>
 <ul>
        {diarys.map(note => (
         <div>
            <h3>{note.date} </h3>
             <p>{note.weather} </p>
             <p>{note.visibility}</p>
             </div>
          
        ))}
      </ul>
    </div>
  );


};

export default App;