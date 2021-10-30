import React,{useState} from "react";
const sum=(prevval,curval)=>{
  return(prevval+parseInt(curval.exercises))
}
const ulstyle={
  listStyleType: "none", /* Remove bullets */
  padding: "0", /* Remove padding */
  margin: "0" /* Remove margins */
}
const Part=({cont,no,exer})=> <li key={no}>{cont} {exer}</li>
  

const Content=({content})=>
{console.log(content)
 let total=content.reduce(sum,0)
return(<>
<ul style={ulstyle}>{content.map(part=><Part cont={part.name} no={part.id} exer={part.exercises} />)}</ul>
<strong>Total of {total} Exercises</strong>
</>
)
}
const Headers=({headers})=>
{console.log(headers)
return(<div>
<ul style={ulstyle}>{headers.map(header=><li key={header.id}><h1>{header.name}</h1>
<Content content={header.parts} />
</li>
)}
</ul>
</div>
)
}
const Course=({course})=>{
 console.log(course)

  return(
  <>
  <Headers headers={course} />

</>
  )

}

function App() {
  const course = [
    {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  },
  {
    name: 'Node.js',
    id: 2,
    parts: [
      {
        name: 'Routing',
        exercises: 3,
        id: 1
      },
      {
        name: 'Middlewares',
        exercises: 7,
        id: 2
      }
    ]
  }
]

  return (
    <div>
    <Course course={course} />
    </div>
  );
}

export default App;
