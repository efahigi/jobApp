import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import JobDetail from './pages/JobDetail';
import { createContext, useState, useEffect } from "react"

const router = createBrowserRouter([
  { path: "/job/:id", element: <JobDetail /> },
  { path: "/*", element: <Home /> },
])
export const apiKey = "2631c837e5473ed6344456fb02f9c4afd160e67839433831e01ff82e56e8f785"

export const JobContext = createContext();
function App() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchLocation, setSearchLocation] = useState('');
  const [searchCategories, setSearchCategory] = useState([]);
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPage] = useState(1)

  const fetchJobs = async (page = 1) => {
    try {
      setIsLoading(true);

      let url = `https://www.themuse.com/api/public/jobs?api_key=${apiKey}&page=${page}`;
      if (searchCategories && searchCategories.length > 0) {
        url += `&category=${searchCategories.join("&category=")}`;
      }
      if (searchLocation) {
        url += `&location=${searchLocation}`;
      }

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setJobs(data.results);
        setTotalPage(data.page_count)
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);


  return (
    <div className="App">
      <JobContext.Provider value={{
        jobs, isLoading,
        setSearchLocation, setSearchCategory, searchCategories, fetchJobs, page, setPage, totalPages
      }}>
        <RouterProvider router={router} />
      </JobContext.Provider>
    </div>
  );
}

export default App;
