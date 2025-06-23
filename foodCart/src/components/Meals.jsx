import MealItem from "./MealItem.jsx";
// import { useEffect, useState } from "react";
import useHttp from "../hooks/useHttp.js";
import Error from "./Error.jsx";
const getObject = {};


export default function Meals() {
  // const [loadedMeals, setLoadedMeals] = useState([])
  // useEffect(() => {
  //     async function fetchMeals() {
  //         const response = await fetch("http://localhost:3000/meals")

  //         if(!response.ok){
  //             //
  //         }

  //         const meals = await response.json()
  //         setLoadedMeals(meals)
  //     }
  //     fetchMeals()

  // }, [])

  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", getObject, []);

  if(error) {
    return <Error title="Unable to fetch" error={error} />
  }

  return (

    
    <ul id="meals">
      {loadedMeals.map((item) => (
        <MealItem key={item.id} meal={item} />
      ))}
    </ul>
  );
}
