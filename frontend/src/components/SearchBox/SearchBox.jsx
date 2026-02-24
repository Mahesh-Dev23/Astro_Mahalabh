import "./searchBox.css";

const SearchBox = () => {

    const searchFunction = (searchValue) => {
        console.log(searchValue);
    };

    return (
        <input className='search-box' placeholder="Search" onChange={(e) => searchFunction(e.target.value)} />
    )
}

export default SearchBox