import "./Landing.scss"
import { useNavigate } from "react-router-dom"

const Landing = () => {
  const text = "INK AND INSIGHT"
  const navigate = useNavigate();

  const goToNextPage = () => {
    navigate("/editor");
  };


return (
    <div className="">
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
        <div className="absolute top-[20%] md:left-[1%] left-[10%] md:w-1/6 w-3/12 h-full">
          <div className="text-[6vw] md:text-[4vw] text-primary-black font-bold ">
            Where Words Come to Life
          </div>
          <div className="md:text-[1.5vw] text-[2vw] md:w-10/12 w-9/12 italic">
            Transform your thoughts into compelling stories.
            Join our community of passionate writers and 
            readers
          </div>
          <button className="absolute left-10 mt-4 md:text-[1.5vw] text-[2vw] text-primary-off_white  bg-black rounded-md w-40"
          onClick={goToNextPage}>
            Start Writing
            </button>
      </div>
      </div>
    </div>
  )
}

export default Landing



// Three js varun 
//  Sketchfab for models
// 