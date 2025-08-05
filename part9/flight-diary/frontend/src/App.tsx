import DiaryEntries from "./components/DiaryEntries"
import { useEffect, useState } from "react"
import type { Diaries } from "./types";
import { getDiaries } from "./service/diaryService";
import DiaryForm from "./components/DiaryForm";


const App = () => {
  const [diaries, setDiaries] = useState<Diaries[]>([]);

  useEffect(()=> {
    getDiaries().then(data => setDiaries(data));
  }, []);

  const updateDiaries = (object: Diaries) => {
    setDiaries(diaries.concat(object));
  }

  return (
    <div>
      <DiaryForm update={updateDiaries} />
      <DiaryEntries diaries={diaries} />
    </div>
  )
}

export default App