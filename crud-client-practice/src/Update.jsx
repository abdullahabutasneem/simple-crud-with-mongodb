import { Link, useLoaderData } from "react-router-dom";


const Update = () => {
    const loadedBooks = useLoaderData();
    console.log("update:",loadedBooks);
    const handleUpdate = (e) => {
        const form = e.target;
        const name = form.name.value;
        const author = form.author.value;
        const updatedUser = {name, author};

        fetch(`http://localhost:5000/books/${loadedBooks._id}`,{
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
    }
    return (
        <div>
            <h2>Update books for: {loadedBooks.name} : {loadedBooks.author}</h2>
            <h2><Link to="/books" >Go to Book list</Link></h2>
            <form onSubmit={handleUpdate}>
                <input type="text" name="name" id="" /><br />
                <input type="text" name="author" id="" /><br />
                <input type="submit" value="Update" />
            </form>
        </div>
    );
};

export default Update;