import React from "react";
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

const ContactItem = (props) => {
  const { Avatar, Gender, Name,Status, Phone, Email, onDelete, onEdit,onStatus } = props;
  const image = `https://randomuser.me/portraits/${Gender}/${Avatar}.jpg`

  return (
    <div className="unit">
      <div className="field name">
        <div className="check">
          <input id="cb2" name="cb1" type="checkbox" />
          <label htmlFor="cb2"></label>
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"></svg>

        </div>
        <div>
          <img src={image} alt="image" className="avatar" /> {Name}
        </div>
        <button onClick = {onStatus} className="lab lab-warning">{Status}</button>
      </div>
      <div className="field phone">
        {Phone}
      </div>
      <div className="field email">
        {Email}
        <Link to="/edit-contact"><FontAwesomeIcon onClick={onEdit} icon={faEdit} size="lg" className = "edit_1" /></Link>
        <FontAwesomeIcon onClick={onDelete} icon={faTrash} size="lg" className = "trash_1" />
      </div>
    </div>
  )
}
export default ContactItem;