import type { CoursePart } from "../App"
import Part from "./Part"

interface ContentProps {
    parts: CoursePart[]
};

const Content = ({parts}: ContentProps) => {
  return (
    <div>
        {parts.map(e => <Part key={e.name} part={e} /> )}
    </div>
  )
}

export default Content