import React, { Fragment } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Redirect } from "react-router-dom";
class AddContact extends React.Component {

    state = {
        "Avatar": "",
        "Gender": "",
        "Name": "",
        "Phone": "",
        "Email": "",
        "Status": "",
        "isRedirect": false
    }

    getName = (e) => {
        const name = e.target.value;
        this.setState({
            Name: name
        })
    }

    getEmail = (e) => {
        const email = e.target.value;
        this.setState({
            Email: email
        })
    }

    getPhone = (e) => {
        const phone = e.target.value;
        this.setState({
            Phone: phone
        })
    }

    getStatus = (e) => {
        const status = e.target.value;
        this.setState({
            Status: status
        })
    }

    getGender = (e) => {
        const gender = e.target.value;
        this.setState({
            Gender: gender
        })
    }

    getAvatar = (e) => {
        const avatar = e.target.value;
        this.setState({
            Avatar: avatar
        })
    }

    sendForm = (e) => {
        e.preventDefault();
        const { Avatar, Gender, Name, Phone, Email, Status } = this.state;
        const { onAddContact } = this.props;
        const newContact = {
            "Id": uuidv4(),
            "Avatar": parseInt(Avatar),
            "Gender": Gender,
            "Name": Name,
            "Phone": Phone,
            "Email": Email,
            "Status": Status,
        }
        this.setState({
            "isRedirect": true
        })
        onAddContact(newContact)
    }

    render() {
        
        const { Avatar, Gender, Name, Phone, Email, Status, isRedirect } = this.state;
        const image = `https://randomuser.me/portraits/${Gender}/${Avatar}.jpg`
        if (isRedirect) {
            return <Redirect to="/" />
        }
        return (
            <Fragment>
                <div className="container">
                    <h2>Add new contact</h2>
                    <form onSubmit={this.sendForm}>
                        <div className="form-group">
                            <fieldset disabled="">
                                <label className="form-label">Name</label>
                                <input className="form-control" required type="text" onChange={this.getName} placeholder={Name} />
                            </fieldset>
                        </div>

                        <div className="form-group">
                            <fieldset>
                                <label className="form-label mt-4">Email</label>
                                <input className="form-control" required type="email" onChange={this.getEmail} placeholder={Email} />
                            </fieldset>
                        </div>

                        <div className="form-group has-success">
                            <label className="form-label mt-4" >Phone</label>
                            <input type="tel" placeholder={Phone} required onChange={this.getPhone} className="form-control is-valid" />
                        </div>

                        <div className="form-group has-danger">
                            <label className="form-label mt-4" >Status</label>
                            <input type="text" placeholder={Status} required onChange={this.getStatus} className="form-control is-invalid" />
                        </div>

                        <div className="form-group">
                            <label className="col-form-label col-form-label-lg mt-4">Gender</label>
                            <select required onChange={this.getGender}>
                                <option>men</option>
                                <option>women</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="col-form-label mt-4" >Avatar</label>
                            <input type="number" min="0" max="99" required onChange={this.getAvatar} className="form-control" placeholder={Avatar} />
                        </div>
                        <div>
                            <img src={image} alt="image" className="avatar" /> 
                        </div>
                        <button type="submit" className="btn btn-success qp">Save</button>
                    </form>
                </div>
            </Fragment>
        )
    }
}

export default AddContact;