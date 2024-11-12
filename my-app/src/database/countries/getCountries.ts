import { createClient } from "@supabase/supabase-js";

export type Country = {
  id: number;
  name: string;
};

export const getCountries = async (): Promise<Country[] | undefined> => {
  const supabase = createClient(
    import.meta.env.VITE_LOCAL_PROJECT_URL || "",
    import.meta.env.VITE_LOCAL_ANON_KEY || ""
  );

  const { data: countries, error } = await supabase
    .from("countries")
    .select("*");
  if (error) {
    console.error(error);
    return;
  } else {
    return countries || [];
  }
};
