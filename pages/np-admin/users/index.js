import React, {useState} from 'react';
import {hydration} from "../../../utils/hydration";
import {findAllUsers} from "../../../server/queries/user.queries";
import Layout from "../../../components/layout/Layout";
import Navbar from "../../../components/admin/navbar/Navbar";
import {useAuthContext} from "../../../context/auth";
import Modal from "../../../components/bootstrap-5/modal/Modal";
import Input from "../../../components/bootstrap-5/input/Input";
import Select from "../../../components/bootstrap-5/input/Select";
import {getRoles} from "../../../server/queries/role.queries";
import axios from "axios";
import Alerts from "../../../components/bootstrap-5/alerts/Alerts";


export async function getStaticProps(context) {

    const users = await findAllUsers();
    const roles = await getRoles();

    return {
        props: {users: hydration(users) , roles: hydration(roles)}, // will be passed to the page component as props
    }
}


function Index(props) {

    const [authUser,setAuthUser] = useState(useAuthContext())
    const [users,setUsers] = useState(props.users);

    const [bodyRole,setBodyRole] = useState({
        title:"",
        access:[],
    });
    const [roles,setRoles] = useState(props.roles);
    const [roleId,setRoleId] = useState();
    const [roleIndex,setRoleIndex] = useState();

    const [message, setMessage] = useState();


    // ROLE
        // handle change role
        const handleChangeRole = (event) => {
            const target = event.target;
            const value = target.type === 'checkbox' ? target.checked : target.value;
            const name = target.name;

            setBodyRole({...bodyRole, [name]: value})
        }

        // handle multi selection
        const handleChangeRoleMulti = (event) =>{
            const target = event.target;
            const name = target.name;
            const options = target.options;
            const selectedOptions = [];

            for(let i = 0; i < options.length; i++) {
                if( options[i].selected ) {
                    selectedOptions.push(options[i].value);
                }
            }

            setBodyRole({...bodyRole, [name]: selectedOptions})

        }

        // handle submit new role
        const handleSubmitNewRole = () =>{
            // post new role to db
            axios
                .post("http://localhost:3000/api/settings/role",bodyRole)
                .then(r => {
                    console.log(r)
                    setMessage(r.data);
                    // update locally the state
                    setRoles([...roles,r.data.data])
                    // reset values
                    setBodyRole({
                        title: "",
                        access:[]
                    })
                })
        }

        // handle delete role
        const handleDeleteRole = () =>{
            // delete role in db
            axios
                .delete("http://localhost:3000/api/settings/role/"+roleId)
                .then(r => {
                    console.log(r)
                    setMessage(r.data);
                    // update state
                    roles.splice(roleIndex,1)
                    // reset values
                    setBodyRole({
                        title: "",
                        access:[]
                    })
                    setRoleId(null)
                    setRoleIndex(null)
                })
        }

        // handle update role
        const handleSubmitUpdateRole = (event) => {
            // update the db with body values
            axios
                .patch('/api/settings/role/'+bodyRole._id,bodyRole)
                .then(r => {
                    console.log(r);
                    setMessage(r.data);
                    // update locally the state
                    roles[roleIndex] = bodyRole;
                    // reset index state
                    setRoleIndex(null);
                    // reset body state
                    setBodyRole({
                        title:"",
                        access:[]
                    })
                })
        }

    // END ROLE

    return (
        <>
            <Navbar/>
            <Layout>
                {
                    message && (
                        <Alerts
                            style={message.error ? "danger" : "success"}
                            message={message.error || message.success}
                        />
                    )
                }
                <h1>Administration des utilisateurs</h1>
                <hr/>
                <div className="row">

                    <div className="col-6">
                        <h2>Roles</h2>
                        <hr/>
                        <div className="mb-3">
                            <a className="btn btn-success">Ajouter un role</a>
                        </div>
                        <hr/>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>username</th>
                                    <th>email</th>
                                    <th>role</th>
                                    <th>action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                users.map((user,index) =>(
                                    <tr key={index}>
                                        <td>{index}</td>
                                        <td>{user.username}</td>
                                        <td>{user.local.email}</td>
                                        <td>
                                            <Select
                                                value={user.role}
                                                name={"role"}
                                            >
                                                {roles.map((role,index) =>(
                                                    <option value={role._id} key={index}>{role.title}</option>
                                                ))}
                                            </Select>
                                        </td>
                                        <td>
                                            {
                                                authUser ? (
                                                 user._id !== authUser.sub ? (
                                                    <a className={"btn btn-danger"}>Delete</a>
                                                ) : (
                                                    <a className={"btn btn-primary"}>Profile</a>
                                                )):(
                                                    <p>loading</p>
                                                )
                                            }
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>

                    <div className="col-6">
                        <h2>Roles</h2>
                        <hr/>
                        <div className="mb-3">
                            <a
                                onClick={()=>{
                                    setBodyRole({
                                        title:"",
                                        access:[]
                                    })
                                }}
                                data-bs-toggle="modal"
                                data-bs-target={"#addRoleModal"}
                                className="btn btn-success"
                            >Ajouter un role</a>
                        </div>

                        <Modal
                            target={"addRoleModal"}
                            title={"Ajouter un role"}
                            label="exampleModalLabel"
                            btn={"Ajouter"}
                            submit={handleSubmitNewRole}
                        >
                          <Input
                              label={"titre du role"}
                              type={"text"}
                              name={"title"}
s                              value={bodyRole.title}
                              onChange={handleChangeRole}
                          />
                          <Select
                              name={"access"}
                              label={"autorisation"}
                              multiple={true}
                              value={bodyRole.access}
                              onChange={handleChangeRoleMulti}
                          >
                              <option value="Blog">Blog</option>
                              <option value="Page">Page</option>
                              <option value="Menu">Menu</option>
                              <option value="Users">Users</option>
                              <option value="Settings">Settings</option>
                          </Select>
                        </Modal>

                        <Modal
                            target="updateRole"
                            title="Update role"
                            label="update role"
                            btn={"update"}
                            submit={handleSubmitUpdateRole}
                        >
                            <Input
                                label={"titre du role"}
                                type={"text"}
                                name={"title"}
                                s                              value={bodyRole.title}
                                onChange={handleChangeRole}
                            />
                            <Select
                                name={"access"}
                                label={"autorisation"}
                                multiple={true}
                                value={bodyRole.access}
                                onChange={handleChangeRoleMulti}
                            >
                                <option value="Blog">Blog</option>
                                <option value="Page">Page</option>
                                <option value="Menu">Menu</option>
                                <option value="Users">Users</option>
                                <option value="Settings">Settings</option>
                            </Select>
                        </Modal>

                        <Modal
                            target={'deleteRole'}
                            title={"supprimer un role"}
                            label={"delete modal"}
                            btn={"Delete"}
                            submit={handleDeleteRole}
                        >
                            Are you sure?
                        </Modal>

                        <hr/>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>role</th>
                                    <th>access</th>
                                    <th>action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                roles.map((role,index)=>(
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{role.title}</td>
                                        <td>{role.access.map( (a,i) => (
                                            <span className={"me-2"} key={i}>{a},</span>
                                        ))}</td>
                                        <td>
                                            <button
                                                data-bs-toggle="modal"
                                                data-bs-target="#updateRole"
                                                onClick={()=> {
                                                    setBodyRole(role)
                                                    setRoleIndex(index)
                                                    setRoleId(role._id)
                                                }}
                                                className={"btn btn-success"}
                                            >Update</button>
                                            <a
                                                onClick={()=> {
                                                    setRoleIndex(index)
                                                    setRoleId(role._id)
                                                }}
                                                className={"btn btn-danger"}
                                                data-bs-toggle="modal" data-bs-target="#deleteRole"
                                            >Delete</a>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>

                </div>
            </Layout>
        </>
    );
}

export default Index;