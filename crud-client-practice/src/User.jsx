import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";


const User = () => {
    const loadedBooks = useLoaderData();
    console.log(loadedBooks);
    const [books, setBooks] = useState(loadedBooks);
    const handleAddBook = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const author = form.author.value;
        const newBook = {name, author};

        fetch('http://localhost:5000/books', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newBook)
        })
        .then(res => res.json())
        .then(data => {
            if(data.acknowledged) {
                alert("Added successfully!");
                setBooks([...books, newBook]);
            }
        })
        console.log("set Books:", books);
        form.reset();
    }
    const handleDelete = (_id) => {
        fetch(`http://localhost:5000/books/${_id}`, {
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(data => {
            console.log("delete: ",data);
            if(data.deletedCount > 0) {
                alert('Deleted successfully!');
                const remaining = books.filter(book => book._id != _id);
                setBooks(remaining);
            }
        })
    }
    return (
        <div>
            <h2>Books: {loadedBooks.length}</h2>
            <form onSubmit={handleAddBook}>
                <input type="text" name="name" id="" />
                <br />
                <input type="text" name="author" id="" /><br />
                <input type="submit" value="Add user" /><br />
            </form>
            <div>
                {
                    books?.map(book => <p key={book._id}> {book.name} : {book.author} - <Link to={`/update/${book._id}`}>update</Link>
                        <button onClick={() => handleDelete(book._id)}>X</button>
                    </p>)
                }
            </div>
        </div>
    );
};

export default User;