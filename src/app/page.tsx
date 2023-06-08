"use client"
import React, { useEffect, useMemo, useState } from "react";
import Card from "@/components/Card";
// import { useEffect } from "react";
import { fetchBooks } from "@/utils/http-request";

function Main() {
  // All books
  const [allBooks, setAllBooks] = useState([]);

  // Search state
  const [search, setSearch] = useState("");

  // Filtered books
  //   const [books, setBooks] = useState([]);
  //   useEffect(() => {
  //     setBooks(
  //       allBooks.filter((book) => book.title.toLowerCase().includes(search))
  //     );
  //   }, [allBooks, search]);
  
  const books = useMemo(() => {
    return allBooks.filter((book) => book.title.toLowerCase().includes(search));
  }, [allBooks, search]);

  // Utility to fetch and set all books data
  const fetchAllBooks = async () => {
    try {
      const booksData = await fetchBooks();
      setAllBooks(booksData);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    if (!allBooks.length) {
      fetchAllBooks();
    }
  });

  return (
    <>
      <div className="header">
        <div className="row1">
          <h1>
            A room without books is like
            <br /> a body without a soul.
            <i className="fa-solid fa-user"></i>

          </h1>
        </div>
        <div className="row2">
          <h2>Find Your Book</h2>
          <div className="search">
            <input
              type="text"
              placeholder="Enter Your Book Name"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <button>
              <i className="fas fa-search"></i>
            </button>
          </div>
          <img src="./images/bg2.png" alt="" />
        </div>
      </div>
      <div className="container">
        {books.map((book) => (
          <Card key={book.id} book={book} onDelete={() => fetchAllBooks()} />
        ))}
      </div>
    </>
  );
}

export default Main;
