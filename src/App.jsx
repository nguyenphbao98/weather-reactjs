import { useRef, useState } from "react";

function App() {

  const apiObj = {
    key: "c03a2884ff02fbaa93121856af2d6369",
    base: "https://openweathermap.org/data/2.5/"
  }

  const [searchTerm, setSearchTerm] = useState('');
  const typingTimeOutRef = useRef('')

  const handleChange = (e) => {
    let myValue = e.target.value;
    setSearchTerm(myValue);

    //debounce 
    if(typingTimeOutRef.current){
      clearTimeout(typingTimeOutRef.current)
    }

    typingTimeOutRef.current = setTimeout(() => {
      console.log(e.target.value);
    }, 300);
  }

  return (
    // weather__warm for warm bg-img
    <div className="container ">
      <div className="weather">

        <div className="weather__input">
          <input value={searchTerm} ref={typingTimeOutRef} onChange={(event) => handleChange(event)} placeholder=" " autoComplete="off" type="text" name="name" />
          <label htmlFor="name">City</label>
        </div>

        <div className="weather__content">
          <h2 className="weather__place">
            Long An Province
          </h2>

          <h4 className="weather__date">
            Saturday, 04 September 2021
          </h4>

          <div className="weather__cart">
            9°C
          </div>

          <div className="weather__sky">
            Cloud
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
