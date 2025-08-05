import type { Diaries } from "../types"

interface DiaryProps {
    diary: Diaries
};

const Diary = ({diary}: DiaryProps) => {
  return (
    <div>
        <h2>{diary.date}</h2>
        <p>visibility: {diary.visibility}</p>
        <p>weather: {diary.weather}</p>
    </div>
  )
}

export default Diary