import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import axios from "axios";
import { Input, Button } from "antd";

interface IResult<T> {
  data: T;
  isLoading: boolean;
  isError: boolean;
}

interface IData {
  hits: any[];
}

// const useHackerNewsApi = <T extends any>(
//   initialData: T,
//   initialSearch: string
// ): [IResult<T>, Dispatch<SetStateAction<string>>] => {
//   const [data, setData] = useState<T>(initialData);
//   const [search, setSearch] = useState(initialSearch);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isError, setIsError] = useState(false);
//   useEffect(() => {
//     const fetchData = async () => {
//       setIsError(false);
//       setIsLoading(true);
//       try {
//         const result = await axios(
//           `https://hn.algolia.com/api/v1/search?query=${search}`
//         );
//         let key = "data";
//         setData(result[key]);
//       } catch (error) {
//         setIsError(true);
//       }
//       setIsLoading(false);
//     };
//     fetchData();
//   }, [search]);

//   return [{ data, isLoading, isError }, setSearch];
// };



const MyHook = <T extends any> (
    initialData: T,
    initialSearch: string
):[IResult<T>,Dispatch<SetStateAction<string>>] => {
    const [data, setData] = useState(initialData);
    const [search, setSearch] = useState(initialSearch);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);
            try{
                const result = await axios(`https://hn.algolia.com/api/v1/search?query=${search}`);
                let key = 'data';
                setData(result[key])
            }catch(error){
                setIsError(true)
            }
            setIsLoading(false);
        }
        fetchData();
    },[search]);

    return [{data, isLoading, isError},setSearch];
}

function App() {
  const [query, setQuery] = useState("redux");
  const [{ data, isLoading, isError }, setSearch] = MyHook<IData>(
    { hits: [] },
    "redux"
  );
  return (
    <>
    <form onSubmit={(e) => {
        e.preventDefault();
        // e.stopPropagation();
        setSearch(query)
    }}>
      <Input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <Button onClick={() => setSearch(query)}>Search</Button>
      {isError && <div>Something went wrong....</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {data.hits.map(
            (item: { objectID: string; url: string; title: string }) => (
              <li key={item.objectID}>
                <a href={item.url}>{item.title}</a>
              </li>
            )
          )}
        </ul>
      )}
      <Button htmlType="submit">Submit</Button>
    </form>
    </>
  );
}

export default App;
