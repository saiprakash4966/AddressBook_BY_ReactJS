import React from "react";
import './dashboard.css';
import editLogo from '../../src/assets/create-black-18dp.svg';
import deleteLogo from '../../src/assets/delete-black-18dp.svg';
import {withRouter} from "react-router-dom";
import services from "../services/services";


const Contact = (props) => {

    const remove = (contactId) => {
        services.deleteContact(contactId).then((response) => {
            console.log(response.data);
            window.location.reload();
        }).catch((error) => {
            alert(error);
        })
    }

    const update = (contactId) => {
        props.history.push(`form/${contactId}`);
    }

    return (
        <table id="table-display" className="table">
            <tr key={-1}>
                <th>Full Name</th>
                <th>Address</th>
                <th>City</th>
                <th>State</th>
                <th>Phone Number</th>
                <th>Zip Code</th>
                <th>Actions</th>
            </tr>
            {
                props.contactArray && props.contactArray.map((element, index) => (
                    <tr key={index}>
                        <td>{element.fullName}</td>
                        <td>{element.address}</td>
                        <td>{element.city}</td>
                        <td>{element.state}</td>
                        <td>{element.phone}</td>
                        <td>{element.zip}</td>
                        <td>
                            <img src={editLogo} alt="edit" onClick={() => update(element.contactId)}/>
                            <img src={deleteLogo} alt="delete" onClick={() => remove(element.contactId)}/>
                        </td>
                    </tr>
                ))
            }
        </table>
    );
}
export default withRouter(Contact);