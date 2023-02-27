const Course = ({course}) =>{
return(
    <div>
        
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </div>
)
}

const Header = ({name}) =>{
    return(
        <h2>{name}</h2>
    )
}

const Total = ({parts}) =>{
// console.log(parts[0].excercises)
    const sum=parts.reduce(
    (acc,curr) => acc + curr.exercises, 0)
return(
    <div><strong>Total of {sum} excercises </strong></div>
)
}
const Content = ({ parts }) => {
    return (
    <div>
        {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
        ))}
    </div>
    );
};

const Part = ({ name, exercises }) => {
    return (
    <p>
        {name} {exercises}
    </p>
    );
};

export default Course;