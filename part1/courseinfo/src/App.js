const Header = (props) => {
  return (<h1>{props.course}</h1>)
};

const Part = (props) => {
  return (<p>{props.part} {props.excercise}</p>)
};

const Content = (props) => {
  return(
    <div>
    <Part part={props.parts[0].part} excercise={props.parts[0].Excercise} />
    <Part part={props.parts[1].part} excercise={props.parts[1].Excercise} />
    <Part part={props.parts[2].part} excercise={props.parts[2].Excercise} />
    </div>
  )
};

const Total = (props) => {
  return(
    <p>Total is: {props.parts[0].Excercise + props.parts[1].Excercise + props.parts[2].Excercise}
    </p>
  )
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {part: "Fundamentals of React", Excercise: 10},
      {part: "Using props to pass data", Excercise: 7},
      {part: "State of a component", Excercise: 14}
    ]

  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
};

export default App