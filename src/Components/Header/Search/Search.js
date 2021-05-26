import React from "react";

class Search extends React.Component{

   
    render(){
        const {searchName,showStatus} = this.props
        return(
        <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" onChange = {searchName} type="text"  placeholder="Search" />
            <select className="btn btn-secondary my-2 my-sm-0"  onChange = {showStatus}>
                <option>Name</option>
                <option>Status</option>
                <option>Phone</option>
                <option>Email</option>
            </select>
        </form>
        )
    } 
}
export default Search;