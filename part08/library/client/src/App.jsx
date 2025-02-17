import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Recommend from "./components/Recommend";
import Notification from "./components/Notification";

const App = () => {
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [page, setPage] = useState("login");

  useEffect(() => {
    const token = localStorage.getItem("user-token");
    if (token) {
      setToken(token);
      setPage("authors");
    }
  }, []);

  const handleLogout = () => {
    setToken(null);
    setPage("login");
    localStorage.clear();
  };  

  if (!token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage("authors")}>authors</button>
          <button onClick={() => setPage("books")}>books</button>
          <button onClick={() => setPage("login")}>login</button>
        </div>

        <Notification errorMessage={error} />
        <LoginForm 
          show={page === "login"} 
          setError={setError} 
          setToken={setToken} 
          setPage={setPage}
        />
        <Authors show={page === "authors"} />
        <Books show={page === "books"} />
      </div>
    );
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={() => setPage("recommend")}>recommend</button>
        <button onClick={handleLogout}>logout</button>
      </div>

      <Notification errorMessage={error} />
      <Authors show={page === "authors"} />
      <Books show={page === "books"} />
      <NewBook show={page === "add"} />
      <Recommend show={page === "recommend"} />
    </div>
  );
};

export default App;
