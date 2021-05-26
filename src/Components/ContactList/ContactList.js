import React from "react";

// ContactItem
import ContactItem from "./ContactItem/ContactItem";

const ContactList = ({ ContactList, onDelete,onStatus}) => {
    const item = ContactList.map(contact => {
        return <ContactItem key={contact.Id} {...contact} onDelete={() => onDelete(contact.Id)} onStatus={()=>onStatus(contact.Id)}/>
    })
    return (
        <div className="container bootstrap snippets bootdeys bootdey">
            <div className="row decor-default">
                <div className="col-sm-12">
                    <div className="contacts-list">
                        <h5 className="title">Contact List</h5>
                        <div className="unit head">
                            <div className="field name">
                                <div className="check">
                                    <input id="cb1" name="cb1" type="checkbox" />
                                    <label htmlFor="cb1"></label>
                                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"></svg></div>
                                Name
                                </div>
                            <div className="field phone">
                                Phone
                                </div>
                            <div className="field email icons">
                                Email
                                <i className="fas fa-user-edit"></i>
                            </div>
                        </div>
                        {ContactList.length > 0 ? item : <h2 className="empty-list">Contact list is empty.</h2>}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ContactList;