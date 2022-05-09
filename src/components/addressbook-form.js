import React, {useEffect, useState} from "react";
import './addressbook-form.css'
import logo from '../../src/assets/logo.jpeg';
import cancelLogo from '../../src/assets/cancelButton.jpeg';
import {Link, useParams} from "react-router-dom";
import services from "../services/services";



const AddressBookForm = (props) => {

    let initialValue = {
        fullName: '',
        address: '',
        city: 'Select City',
        state: 'Select State',
        phoneNumber: '',
        zipCode: '',
        isUpdate: false,
        // error: {
        //     fullName: ' ',
        //     address: ' ',
        //     city: ' ',
        //     state: ' ',
        //     phoneNumber: ' ',
        //     zipCode: ' '
        // }
        
    }
    let initialError = {
        fullName: '',
        address: '',
        city: '',
        state: '',
        phoneNumber: '',
        zipCode: '',
    }

    const [formValue, setForm] = useState(initialValue);
    const [formError, setFormError] = useState(initialError);
    const params = useParams();

    const validateData = () => {
        let error = formError;
        if (!formValue.fullName.match('^[A-Z]{1}[A-Za-z\\s]{2,}$')) {
            error.fullName = "Invalid NAME";
        }
        else {
            error.fullName = "";
        }
    
        if (!formValue.address.match('^[a-zA-Z0-9#,&]{4,}$')){
            error.address = "Invalid ADDRESS";
        }
        else {
            error.address = "";
        }
    
        if (!formValue.phoneNumber.match('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$')) {
            error.phoneNumber = "Invalid PHONE NUMBER"
        }
        else {
            error.phoneNumber = "";
        }
    
        if (!formValue.zipCode.match('^[0-9]{3}\\s{0,1}[0-9]{3}$')) {
            error.zipCode = "Invalid ZIP CODE";
        }
        else {
            error.zipCode = "";
        }
    
        setFormError(error);
    }

    useEffect(() => {
        validateData();
    });
    const getContactByID = (id) => {
        services.getContact(id).then((response) => {
            let obj = response.data;
            setData(obj);
        }).catch((error) => {
            alert(error);
        })
    }

    const setData = (obj) => {
        setForm({
            ...formValue,
            ...obj,
            isUpdate: true,
            fullName: obj.fullName,
            address: obj.address,
            city: obj.city,
            state: obj.state,
            phoneNumber: obj.phoneNumber,
            zipCode: obj.zipCode
        })
    }

    useEffect(() => {
        if (params.id) {
            getContactByID(params.id);
        }
    }, []);

    const changeValue = async (event) => {
        setForm({...formValue, [event.target.name]: event.target.value})
    }

    const save = (event) => {
        event.preventDefault();
        let object ={
            fullName:formValue.fullName,
            address: formValue.address,
            city: formValue.city,
            state: formValue.state,
            phoneNumber: formValue.phoneNumber,
            zipCode: formValue.zipCode,
        }
        if (formValue.isUpdate) {
            services.updateContact(params.id, object).then((response) => {
                props.history.push('');
            }).catch((error) => {
                alert(error);
            })
        }
        else {
            services.addContact(object).then((response) => {
                props.history.push('');
            }).catch((error) => {
                alert(error);
            })
        }
    }

    const reset = () => {
        setForm({...initialValue, id: formValue.id, isUpdate: formValue.isUpdate});
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
            <div className="form-content">
                <form action="#" className="form" onSubmit={save}>
                    <div className="form_header">
                        <div className="form_header_text">Person Address Form</div>
                        <Link to="/">
                            <img src={cancelLogo} alt="logo"/>
                        </Link>
                    </div>

                    <div className="form_content">
                        <div className="row_content">
                            <label htmlFor="name" className="label text">Full Name</label>
                            <br/>
                            <input type="text" className="input" id="name" name="fullName" placeholder="Full Name"
                                     value={formValue.fullName} onChange={changeValue} autoComplete="off" required/>
                            <div className="error">{formError.fullName}</div>
                        </div>
                        <div className="row_content">
                            <label htmlFor="phoneNumber" className="label text">Phone Number</label>
                            <br/>
                            <input type="tel" className="input" id="phoneNumber" name="phoneNumber" placeholder="Phone Number"
                                   value={formValue.phoneNumber} onChange={changeValue}  autoComplete="off"/>
                           <div className="error">{formError.phoneNumber}</div>
                        </div>
                        <div className="row_content">
                            <label htmlFor="address" className="label text">Address</label>
                            <br/>
                            <textarea name="address" id="address" placeholder="Address" autoComplete="off"
                                      value={formValue.address} onChange={changeValue} required></textarea>
                            <div className="error">{formError.address}</div>
                        </div>
                        <div className="row_content">
                            <div className="column_constrains">
                                <div className="column_content">
                                    <label htmlFor="city" className="label text">City</label>
                                    <br/>
                                        <select name="city" id="city" value={formValue.city} onChange={changeValue}>
                                            <option selected disabled hidden value="Select City">Select City</option>
                                            <option value="Kurnool">Kurnool</option>
                                            <option value="Bangalore">Bangalore</option>
                                            <option value="Chennai">Chennai</option>
                                            <option value="Delhi">Delhi</option>
                                            <option value="Mumbai">Mumbai</option>
                                            <option value="Hyderabad">Hyderabad</option>
                                        </select>
                                </div>
                                <div className="column_content">
                                    <label htmlFor="state" className="label text">State</label>
                                    <br/>
                                        <select name="state" id="state" value={formValue.state} onChange={changeValue}>
                                            <option selected disabled hidden value="Select State">Select State</option>
                                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                                            <option value="Delhi">Delhi</option>
                                            <option value="Karnataka">Karnataka</option>
                                            <option value="Telangana">Telangana</option>
                                            <option value="Maharashtra">Maharashtra</option>
                                            <option value="Tamil Nadu">Tamil Nadu</option>
                                        </select>
                                </div>
                                <div className="column_content">
                                    <label htmlFor="zip" className="label text">Zip code</label>
                                    <br/>
                                    <input type="text" className="input zipcode" id="zip" name="zipCode"
                                           value={formValue.zipCode} onChange={changeValue} autoComplete="off" placeholder="Zip Code"/>
                                    <div className="error">{formError.zipCode}</div>
                                </div>
                            </div>
                        </div>
                        <div className="button_content">
                            <button type="submit" className="button button_submit" id="submitButton">{formValue.isUpdate ? 'Update' : 'Submit'}</button>
                            <button type="reset" className="button button_reset" id="resetButton" onClick={reset}>Reset</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
export default AddressBookForm;