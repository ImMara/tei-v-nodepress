import React from 'react';
import Table from "../../../components/admin/table/Table";
import Navbar from "../../../components/admin/navbar/Navbar";
import {useState} from "react";
import {getSettings} from "../../../server/queries/settings.queries";
import axios from "axios";
import {useSettingsContext} from "../../../context/settings";

function Index(props) {

    const [body,setBody] = useState();
    const setting = useSettingsContext();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setBody({...body,[name]:value});
    }

    const handleSubmit = (event) => {
        axios.patch("http://localhost:3000/api/settings/" + setting[0]._id, body)
            .then(r  =>console.log(r));
    }

    return (
        <Navbar>
            <h1>Settings</h1>
            <hr/>
            <form>

                <div className="mb-3">
                    <label htmlFor="title" className="form-label">title : </label>
                    <input className="form-control" id="title" type="text" onChange={handleChange} defaultValue={setting&&setting[0].title} name="title"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">email</label>
                    <input className="form-control" id="email" type="email" onChange={handleChange} defaultValue={setting&&setting[0].email} name="email"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="url" className="form-label">url</label>
                    <input className="form-control" id="url" type="text" onChange={handleChange} defaultValue={setting&&setting[0].url} name="url"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="role" className="form-label">role</label>
                    <select className="form-control" id='role' name="defaultRoles" defaultValue={setting&&setting[0].role}>
                        <option onChange={handleChange} value="role_admin">Admin</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="slogan" className="form-label">slogan</label>
                    <textarea className="form-control" id="slogan" onChange={handleChange} name="slogan" defaultValue={setting&&setting[0].slogan} cols="30" rows="10"/>
                </div>

                <div className="mb-3">
                    <input id="comments" className="form-check-input" onChange={handleChange} type="checkbox" name="comments"/>
                    <label htmlFor="comments" className="form-check-label"> comments </label>
                </div>
                <a className="btn btn-primary" onClick={handleSubmit}>Submit</a>
            </form>
        </Navbar>
    );
}

Index.getInitialProps = async ({req,res}) => {
    const settings = await getSettings();
    return {settings};
}

export default Index;