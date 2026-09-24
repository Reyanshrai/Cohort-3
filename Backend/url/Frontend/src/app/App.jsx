import { useState ,useEffect} from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [urls, setUrls] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [currentUrl, setCurrentUrl] = useState(null);

  async function fetchUrls(){

    const response = await axios.get('http://localhost:5173/api/url')

    const responseData = response.data

    setUrls(responseData.data.urls)
    
  }

  async function createShortUrl(){

    const response = await axios.post("http://localhost:5173/api/url",{
      url : inputValue
    })

    setCurrentUrl({
      originalUrl : response.data.data.originalUrl,
      shortCode : response.data.data.shortCode
    })

    fetchUrls()

  }

  async function deleteUrl(id){

    const response = await axios.delete(`http://localhost:5173/api/url/${id}`)
    fetchUrls()
  }

  useEffect(()=>{
    fetchUrls()
  },[])

  return (
    <main className="p-10 flex flex-col gap-4">
      <div className="w-full max-w-4xl p-2 flex gap-2">
        <input
          type="text"
          placeholder="Enter Long URL"
          value={inputValue}
          className="border rounded w-full p-2"
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <button
          className="rounded p-2 bg-orange-600 text-white cursor-pointer"
          onClick={createShortUrl}
        >
          Shorten
        </button>
      </div>
      <div className="w-full max-w-4xl p-2 "></div>
      <div className="w-full max-w-4xl p-2 flex flex-col gap-2">
        {urls.map((url,index) => {
          return (
            <div  className="border border-neutral-200 p-2 flex gap-8 justify-evenly items-center">
              <a 
                href={`http://localhost:3000/${url.shortCode}`}
                target="_blank"
              >
                {url.shortCode}
              </a>
              <p className="truncate">{url.originalUrl}</p>
              <p>{url.clicks}</p>
              <div className="flex gap-2">
                <button className="p-2 rounded bg-orange-600 text-white cursor-pointer">
                  COPY
                </button>
                <button
                  onClick={() => deleteUrl(url._id)}
                  className="p-2 rounded bg-orange-600 text-white cursor-pointer"
                >
                  DELETE
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default App;
