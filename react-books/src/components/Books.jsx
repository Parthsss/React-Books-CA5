import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./Books.css";


function BookList() {
  const [booksArray, setBooksArray] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  
  useEffect(() => {
    async function getBooks() {
      try {
        const response = await axios.get(
          "https://reactnd-books-api.udacity.com/books",
          {
            headers: { Authorization: "whatever-you-want" },
          }
        );
        setBooksArray(response.data.books);
        console.log("Books: ", response.data.books);
      } catch (error) {
        console.log(error);
      }
    }
    getBooks();
  }, []);
  
  
  const filteredBooks = booksArray.filter((book) => {
    if (searchInput === "") {
      return true;
    }
    const title = book.title.toLowerCase();
    return title.startsWith(searchInput.toLowerCase());
  });

  
  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="book-list-container">
      <div className="header">
        <img className="logo-pic" src="https://camo.githubusercontent.com/7798ac9816844b12782b0a86e183dd4029f2070daf2dc3fcd77a1c1138d2ffd7/68747470733a2f2f73332e61702d736f7574682d312e616d617a6f6e6177732e636f6d2f6b616c76692d656475636174696f6e2e6769746875622e696f2f66726f6e742d656e642d7765622d646576656c6f706d656e742f4b616c7669756d2d4c6f676f2e706e67" alt="" />
       
        <div className="search-bar-container">
          
          <input
            className="search-input"
            type="text"
            placeholder=" Search Books"
            onChange={handleSearch}
          />
        </div>
        
        <NavLink to="/Forms">
          <button className="register-button">Register</button>
        </NavLink>
      </div>

    </div>
  );
}

export default BookList;