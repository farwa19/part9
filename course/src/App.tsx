
interface PartProps {
  part: CoursePart;
}
interface Header {
  name: string;

}
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}
interface New extends CoursePartBase {
  description:string
  

}
interface ContentProbs {
  courseParts: CoursePart[];
}

interface CoursePartBasic extends New {
  
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends New{

  backgroundMaterial: string;
  kind: "background"
}
interface Another extends New {
  requirements: string[];
  kind: "special";
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground| Another ;

const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
    kind: "basic"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: "group"
  },
  {
  name: "Backend development",
  exerciseCount: 21,
  description: "Typing the backend",
  requirements: ["nodejs", "jest"],
  kind: "special"
},
  {
    name: "Basics of type Narrowing",
    exerciseCount: 7,
    description: "How to go from unknown to string",
    kind: "basic"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
    kind: "background"
  },
  {
    name: "TypeScript in frontend",
    exerciseCount: 10,
    description: "a hard part",
    kind: "basic",
  },
];

  const Header = (props: Header) => {
  return <h1> {props.name}</h1>;
};
const Content = ({ courseParts }: ContentProbs) => {
  return (
    <>
      {courseParts.map(part => (
        <Part key={part.name} part={part} />
      ))}
    </>
  );
};

const Total = ({ courseParts }: ContentProbs) => {
  let total = 0
   {courseParts.map(part => {
    total += part.exerciseCount
    
})}
console.log("total" ,total);
return(<div>Number of exercises {total}</div>)
};

const Part = ({ part }: PartProps) => {
  switch (part.kind) {
   case "basic":
            return (
              <div key={part.name}>
                <strong>
                  {part.name} {part.exerciseCount}
                </strong>
                <p>{part.description}</p>
              </div>
            );

          case "background":
            return (
              <div key={part.name}>
                <strong>
                  {part.name} {part.exerciseCount}
                </strong>
                <p>{part.description}</p>
                <p>{part.backgroundMaterial}</p>
              </div>
            );

          case "group":
            return (
              <div key={part.name}>
                <strong>
                  {part.name} {part.exerciseCount}
                </strong>
                <p>Group projects: {part.groupProjectCount}</p>
              </div>
            );

          case "special":
            return (
              <div key={part.name}>
                <strong>
                  {part.name} {part.exerciseCount}
                </strong>
                <p>{part.description}</p>
                <p>Required skills: {part.requirements.join(", ")}</p>
              </div>
            );
  }
};

const App = () => {
  const courseName = "Half Stack application development";
  
  
  

  return (
    <div>
       <div>
      <Header name={courseName} />
      <Content courseParts={courseParts}/>
      <Total  courseParts={courseParts}/>
    
    </div>
    </div>
  );
};

export default App;