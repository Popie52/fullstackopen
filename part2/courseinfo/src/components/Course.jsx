const Header = ({ course }) => {
  return <h2>{course.name}</h2>;
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((e) => (
        <Part key={e.id} prop={e} />
      ))}
    </div>
  );
};

const Part = ({ prop }) => {
  return (
    <p>
      {prop.name} {prop.exercises}
    </p>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((sum, current) => (sum += current.exercises), 0);
  return <strong> total of {total} exercises</strong>;
};

const Course = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => (
        <div key={course.id}>
          <Header course={course} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      ))}
    </div>
  );
};


export default Course;