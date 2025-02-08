const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  
  const exercises = [exercises1, exercises2, exercises3]
    
  const parts = [part1, part2, part3]

  const Header = () => {
    return (
      <h1>{course}</h1>
    )
  }
  const Content = (props) => {
    return (
      <span>
      {parts[props.index]}
      </span>
    )
  }
  const Total = (props) => {
    return (
      <span>
      {exercises[props.index]}
      </span>
    )
  }

  return (
    <div>
      <Header />
      <p>
        <Content index={0} /> <Total index={0} />
      </p>
      <p>
       <Content index={1} /> <Total index={1} />
      </p>
      <p>
        <Content index={2} /> <Total index={2} />
      </p>
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    </div>
  )
}

export default App