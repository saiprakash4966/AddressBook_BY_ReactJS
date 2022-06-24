import React, { useEffect, useState } from "react";
import './dashboard.css';
import logo from '../../src/assets/logo.jpeg';
import editLogo from '../../src/assets/create-black-18dp.svg';
import deleteLogo from '../../src/assets/delete-black-18dp.svg';
import { Link } from "react-router-dom";
import services from "../services/services";
import Contact from "./contact";


function Dashboard() {
    const [contactArray, setContact] = useState([]);

    useEffect(() => {
        getAllContacts();
    }, []);

    const getAllContacts = () => {
        services.getContacts().then((response) => {
            const allContacts = response.data.data;
            setContact(allContacts);
        }).catch((error) => {
            alert(error);
        })
    }
    return (
        <>
            <header className="header-content header">
                <div className="logo-content">
                    <img src={logo} alt="logo"/>
                    <div>
                        <span className="addressBook-text">Address</span><br/>
                        <span className="addressBook-text addressBook-book">Book</span>
                    </div>
                </div>
            </header>
            <div className="main-content">
                <div className="header-content person-header">
                    <div className="person-detail-text">
                        Person Details
                        <div className="person-count">{contactArray.length}</div>
                    </div>
                    <Link to="/form" className="add-button">
                        <img src="..\assets\icons\plus_symbol.svg" alt=""/>+ Add Person
                    </Link>
                </div>
                <div className="table-main">
                    {/* <table id="table-display" className="table">
                        <tr>
                            <th>Full Name</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Zip Code</th>
                            <th>Phone Number</th>
                            <th>Actions</th>
                        </tr>
                        <tr>
                            <td>Saiprakash</td>
                            <td>Kphb colony, Kukatpally</td>
                            <td>Hyderabad</td>
                            <td>Telangana</td>
                            <td>500072</td>
                            <td>91 9676113169</td>
                            <td>
                                <img src={deleteLogo} alt="delete" id="1"
                                     onClick="remove(this)"/>
                                    <img src={editLogo} alt="edit" id="1"
                                         onClick="update(this)"/>
                            </td>
                        </tr>
                    </table> */}
                    <Contact contactArray={contactArray}/>

                </div>
            </div>
        </>
    );
}
export default Dashboard;