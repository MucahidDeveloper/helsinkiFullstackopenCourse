const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const Header = (props) => {
    return <h1>{props.course.name}</h1>
  }

  const Part = (props) => {
    return <p>{props.part.name} {props.part.exercises}</p>
  }

  const Content = (props) => {
    return (
      <div>
        {props.course.parts.map((part, index) => (
          <Part key={index} part={part} />
        ))}
      </div>
    )
  }

  const Total = (props) => {
    return (
      <p>
        <strong>Number of exercises:</strong>{" "}
        {props.course.parts.reduce((sum, part) => sum + part.exercises, 0)}
      </p>
    )
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App
