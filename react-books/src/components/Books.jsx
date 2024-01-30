import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./Books.css";

function BookList() {
  const [booksList, setBooksList] = useState([]);
  const [searchInput, setSearchRes] = useState("");

  useEffect(() => {
    async function getBooks() {
      try {
        const response = await axios.get(
          "https://reactnd-books-api.udacity.com/books",
          {
            headers: { Authorization: "whatever-you-want" },
          }
        );
        setBooksList(response.data.books);
      } catch (error) {
        console.log(error);
      }
    }
    getBooks();
  }, []);

  const filteredBooks = booksList.filter((book) => {
    if (searchInput === "") {
      return true;
    }
    const title = book.title.toLowerCase();
    return title.startsWith(searchInput.toLowerCase());
  });

  const searchRes = (e) => {
    setSearchRes(e.target.value);
  };

  return (
    <div className="booklist-container">
      <div className="header-section">
        <img
          className="logo-pic"
          src="https://kalvium.community/images/sidebar-3d-logo.svg"
          alt="Small-Logo"
        />
        <h2>Kalvium Books</h2>
        <div className="searchbar-container">
          <i className="fas fa-search search-icon"></i>

          <input
            className="search-input"
            type="text"
            placeholder=" Search Books"
            onChange={searchRes}
          />
        </div>

        <NavLink to="/Forms">
          <button className="register-btn">Register</button>
        </NavLink>
      </div>

      <div className="book-list-cont">
        {filteredBooks.length ? (
          filteredBooks.map((book) => (
            <div key={book.id} className="book-card-container">
              <div className="book-image">
                <img
                  className="book-thumbnail-pic"
                  src={book.imageLinks.thumbnail}
                  alt={book.title}
                />
              </div>
              <div className="book-detail">
                <p className="book-title">{book.title}</p>
                <p className="book-authors">
                  {book.authors.map((author, index) => (
                    <span key={index}>
                      {index > 0 && ", "}
                      {author}
                    </span>
                  ))}
                </p>

                <p className="book-ratings">
                  Rating: ★ {book.averageRating || "---"}/5
                </p>
                <p>Free</p>
              </div>
            </div>
          ))
        ) : (
          <p>Loading....</p>
        )}
      </div>
    </div>
  );
}

export default BookList;
