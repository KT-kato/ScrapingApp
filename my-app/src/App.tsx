import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_PROJECT_URL || "",
  import.meta.env.VITE_ANON_KEY || ""
);

function App() {
  const [countries, setCountries] = useState<any[]>([]);

  useEffect(() => {
    getCountries();
  }, []);

  const getCountries = async () => {
    const { data: countries, error } = await supabase
      .from("countries")
      .select("*");
    if (error) {
      console.error(error);
    } else {
      setCountries(countries || []);
    }
  };

  return (
    <ul>
      {countries.map((country) => (
        <li key={country.name}>{country.name}</li>
      ))}
    </ul>
  );
}

export default App;
