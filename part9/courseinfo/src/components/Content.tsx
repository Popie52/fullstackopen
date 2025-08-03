import type { CoursePart } from "../App"

interface ContentProps {
    parts: CoursePart[]
};

const Content = ({parts}: ContentProps) => {
  return (
    <div>
        {parts.map(e => <p key={e.name}>{e.name} {e.exerciseCount}</p>)}
    </div>
  )
}

export default Content