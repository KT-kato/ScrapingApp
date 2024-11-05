import { useEffect, useState } from "react";
import { Country, getCountries } from "./database/countries/getCountries";

function App() {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getCountries();
      if (res) {
        setCountries(res);
      }
    };

    fetchData();
  }, []);

  return (
    <ul>
      {countries.map((country) => (
        <li key={country.name}>{country.name}</li>
      ))}
    </ul>
  );
}

export default App;
