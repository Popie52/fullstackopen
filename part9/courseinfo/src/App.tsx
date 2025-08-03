import Header from "./components/Header";
import Content from "./components/Content";
import Total from "./components/Total";

export type CoursePart = {
  name: string,
  exerciseCount: number
};

const App = () => {
  const courseName = "Half Stack application development";

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  const totalExercises = courseParts.reduce((sum, curr) => curr.exerciseCount+sum, 0);

  return <div>
    <Header title={courseName} />
    <Content parts={courseParts} />
    <Total total={totalExercises} />

  </div>;
}

export default App;
