function Search({searchKey, setSearchKey}){
    return (
        <div className="user-search-area">
            <input type="text" 
            // placeholder="Search users"
            placeholder="Type a name to start chatting..."
                className="user-search-text"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)} />
            <i className="fa fa-search user-search-btn" aria-hidden="true"></i>
        </div>
    )
}

export default Search;

