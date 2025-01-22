import "./Landing.scss"
import { useNavigate } from "react-router-dom"

const Landing = () => {
  const text = "INK AND INSIGHT"
  const navigate = useNavigate();

  const goToNextPage = () => {
    navigate("/editor");
  };


return (
    <>
      <div className='wrapper '>
        <div className="item item1 "> 
        {text.split('').map((char, index) => (
          <span
            key={index}
            style={{ '--index': index } as React.CSSProperties}
            className=""
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
          </div>
        <div className="item item2 "> 
          {text.split('').map((char, index) => (
            <span
            key={index}
            style={{ '--index': index } as React.CSSProperties}
            className=""
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>
        <div className="container container-md">
          <div className="heading heading-md">
            Where Words Come to Life
          </div>
          <div className="subheading subheading-md">
            Transform your thoughts into compelling stories.
            Join our community of passionate writers and readers
          </div>
          <button className="button button-md" onClick={goToNextPage}>
            Start Writing
          </button>
        </div>
      </div>
    </>
  )
}

export default Landing

