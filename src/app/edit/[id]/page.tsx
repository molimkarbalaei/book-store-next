"use client"
import React, { useState, useEffect } from 'react';
import { updateBook, fetchBook } from "@/utils/http-request";
import Link from 'next/link';
import { useParams } from 'next/navigation'


const Edit = () => {
    const {id} = useParams()

    const bookFields = [
        { key: 'title', type: 'string', title: 'Title' },
        { key: 'first_publish_year', type: 'string', title: 'First Publish Year' },
        { key: 'number_of_pages_median', type: 'string', title: 'Number of Pages' },
        { key: 'author_name', type: 'string', title: 'Author Name' },
    ]

    // Bring the data from the API:
    const [bookData, setBookData] = useState({
        id: '',
        title: '',
        first_publish_year: '',
        number_of_pages_median: '',
        covers: {
          S: '',
          M: '',
          L: '',
        },
        author_name: ''
      });

      useEffect(() => {
        const fetchData = async () => {
            // const books = await fetchBooks()
            // setBookData(books.find(book => id === book.id))
            setBookData(await fetchBook(id));
        }
        fetchData();
      }, [id])

      // Updating the data:
      const updateBookData = async () => {
        try {
          const bookInfo = await updateBook(id, bookData);
          setBookData(bookInfo);
        } catch (error) {
            console.error('Error fetching books:', error);
            }
      }
      // Submiting the data and send it to the API:
      const handlerSubmit = (event) => {
        event.preventDefault();
        updateBookData();
      }


    //   bookData.covers
    // bookData['covers']
  return (
    <div className='edit-form'>
        <div className='edit-form-container'>
            <Link href='/' > 
            Go back
            </Link>
            <h3>Edit Book</h3>
            <form onSubmit={handlerSubmit}>
        {
            bookFields.map(field => 
                <div key={field.key}>
                <label className='input-label' htmlFor={'input' + field.key}>
                    {field.title}
                </label>
                <input className='input-field' id={'input' + field.key} type={field.type} value={bookData[field.key] || ''} onChange={(event) => {
                    setBookData({
                        ...bookData, 
                        // cause we have dynamic key
                        [field.key]: event.target.value
                    })
                }} />
                </div>
            )
        }
          <button className='submit-button' type="submit">Submit</button>
        </form>
            
        </div>
    </div>
  )
}

export default Edit
