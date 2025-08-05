import type { Diaries } from "../types"
import Diary from "./Diary"

interface DiaryEntriesProps {
    diaries: Diaries[]
}

const DiaryEntries = ({diaries}: DiaryEntriesProps) => {
  return (
    <div>
        <h1>Diary Entries</h1>
        {diaries.map(e=>(
            <Diary key={e.id} diary={e} />
        ))}
    </div>
  )
}

export default DiaryEntries