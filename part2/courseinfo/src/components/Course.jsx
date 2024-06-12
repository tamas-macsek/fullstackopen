
const Header = ({ title }) => {
    return (
        <h1>{title}</h1>
    )
}

const Part = ({ part }) => {
    return <p>{part.name} {part.exercises}</p>
}

const Content = ({ parts }) => {
    return (
        <>
            {parts.map((x) => <Part key={x.id} part={x} />)}
        </>
    )
}

const Total = ({ parts }) => {
    const total = parts.reduce((a, c) => a + c.exercises, 0)
    return <strong>Number of exercises {total}</strong>
}

const Course = ({ course }) => {
    return (
        <div>
            <Header title={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course