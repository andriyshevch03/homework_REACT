import React, { Fragment } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Redirect } from "react-router-dom";
import { updateContacts } from "../../Services/api-services";
import { withRouter } from "react-router"
class EditContact extends React.Component {

    state = {
        "Id":0,
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
    sendFormEdit = (e) =>{
        const{onEditCurrentContact} = this.props
        e.preventDefault();
        const {Id,Avatar, Gender, Name, Phone, Email, Status } = this.state;
        console.log('SendForm',this)
        const editContact = {
            Id:Id,
            "Avatar": parseInt(Avatar),
            "Gender": Gender,
            "Name": Name,
            "Phone": Phone,
            "Email": Email,
            "Status": Status,
        }
      onEditCurrentContact(editContact)
      this.setState({
          "isRedirect":true
      })
    }
   

    render() {
        if (this.props.Contact === null){
            return <Redirect to="/" />
        }
        const{isRedirect} = this.state;
        const {Id,Avatar, Gender, Name, Phone, Email, Status} = this.props.Contact;
        const image = `https://randomuser.me/portraits/${Gender}/${Avatar}.jpg`
        if (isRedirect) {
            return <Redirect to="/" />
        }
        return (
            <Fragment>
                <div className="container">
                    <h2>Edit  contact</h2>
                    <form onSubmit={this.sendFormEdit}>
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
                            <input className="form-control form-control-lg" required onChange={this.getGender} type="text" placeholder={Gender} />
                        </div>

                        <div className="form-group">
                            <label className="col-form-label mt-4" >Avatar</label>
                            <input type="number" min="0" max="99" required  onChange={this.getAvatar} className="form-control" placeholder={Avatar} />
                        </div>
                        <div>
                            <img src={image} alt="image" className="avatar" /> 
                        </div>
                        <button type="submit" className="btn btn-success">Save</button>
                    </form>
                </div>
            </Fragment>
        )
    }
}

export default withRouter(EditContact);