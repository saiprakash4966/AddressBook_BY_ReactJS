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
    function sortByCity() {
        services.sortByCity().then((response) => {
            console.log("click");
            const contact = response.data.data;
            setContact(contact);
        })
    }

    function sortByState() {
        services.sortByState().then((response) => {
            const contact = response.data.data;
            setContact(contact);
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
                    <table id="table-display" className="table">
                        <tr>
                            <th>Full Name</th>
                            <th>Address</th>
                            <th onClick={() => sortByCity()}>City</th>
                            <th onClick={() => sortByState()}>State</th>
                            <th>Zip Code</th>
                            <th>Phone Number</th>
                            <th>Actions</th>
                        </tr>


                    <Contact contactArray={contactArray}/>
                </table>

            </div>
            </div>
        </>
    );
}
export default Dashboard;