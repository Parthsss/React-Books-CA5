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
        <img
          className="logo-pic"
          src="https://kalvium.community/images/sidebar-3d-logo.svg"
          alt=""
        />
        <h2>Kalvium Books</h2>
        <div className="search-bar-container">
          <i className="fas fa-search search-icon"></i>

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

      <div className="book-list">
        {filteredBooks.length ? (
          filteredBooks.map((book) => (
            <div key={book.id} className="book-card">
              <div className="book-image">
                <img
                  className="book-thumbnail"
                  src={book.imageLinks.thumbnail}
                  alt={book.title}
                />
              </div>
              <div className="book-details">
                <p className="book-title">{book.title}</p>
                <p className="book-authors">
                  {book.authors.map((author, index) => (
                    <span key={index}>
                      {index > 0 && ", "}
                      {author}
                    </span>
                  ))}
                </p>

                <p className="book-rating">
                  Rating: ★ {book.averageRating || "--"}/5
                </p>
                <p>Free</p>
              </div>
            </div>
          ))
        ) : (
          <p>Please enter valid name</p>
        )}
      </div>
    </div>
  );
}

export default BookList;
