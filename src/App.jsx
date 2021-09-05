import { useEffect, useRef, useState } from "react";
import Loading from "./Loading";
import NotFound from "./NotFound";

function App() {

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDate()];
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('long an');
  const [weather, setWeather] = useState({})
  const typingTimeOutRef = useRef('');

  const apiObj = {
    key: "c03a2884ff02fbaa93121856af2d6369",
    base: "https://api.openweathermap.org/data/2.5/"
  }

  const handleFetchData = async (value) => {
    try {
      const url = `${apiObj.base}weather?q=${value}&units=metric&appid=${apiObj.key}`;
      const response = await fetch(url)
      const data = response.json();
      return data;

    } catch (error) {
      console.log(error);
    }

    // my old version
    
    // fetch(`${apiObj.base}weather?q=${value}&units=metric&appid=${apiObj.key}`)
    // .then(res => res.json())
    // .then(result => {
    //   console.log(result);
    //   setWeather(result)
    // })
    // .catch(err => console.log(err))

  }

  const handleChange = (e) => {
    let myValue = e.target.value;
    setSearchTerm(myValue);
    setIsLoading(true);
    if(myValue){

      //debounce 
      if(typingTimeOutRef.current){
        clearTimeout(typingTimeOutRef.current)
      }

      typingTimeOutRef.current = setTimeout(() => {
        const myData = handleFetchData(e.target.value)

        myData.then((value) => {
          console.log(value);

          setWeather(value);
        }).catch((err) => {
          console.log(err);
        })
        
      }, 500);
      
    }
    setIsLoading(false);
  }

  useEffect(() => {
    
    const myData = handleFetchData('long an')
    setIsLoading(true)
    myData.then((value) => {
      console.log(value);

      setWeather(value);
    }).catch((err) => {
      console.log(err);
    })

    setIsLoading(false);
  },[]);

  return (
    // weather__warm for warm bg-img
    <div className={`container ${weather?.main?.temp > 20 ? "weather__warm" : ""}`}>

      <div className="weather">

        <div className="weather__input">
          <input value={searchTerm} ref={typingTimeOutRef} onChange={(event) => handleChange(event)} placeholder=" " autoComplete="off" type="text" name="name" />
          <label htmlFor="name">City</label>
        </div>

        <div className="wrapper">
          {
            isLoading ? <Loading/> : 
            
            weather.cod === "404" ? <NotFound /> :

            <div className="weather__wrapper">
              <div className="weather__content">
                <h2 className="weather__place">
                  {weather.name}
                </h2>

                <h4 className="weather__date">
                  {dateBuilder(new Date())}
                </h4>

                <div className="weather__cart">
                  {weather.main?.temp} °C
                </div>

                <div className="weather__sky">
                  {weather.weather?.[0].main}
                </div>
              </div>
            </div>
            
          }
        </div>

      </div>

    </div>
  );
}

export default App;
