import React, {Component} from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import {AvForm, AvField} from "availity-reactstrap-validation";
import axios from "axios";

class Crud extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            employees: [],
            deleteOpen: false,
            editOpen: false,
            selectedId: ""
        }
    }

    componentDidMount() {
        axios.get("https://60b3eaa04ecdc10017480006.mockapi.io/api/Crud")
            .then((res2) => {
                console.log(res2);
                this.setState({
                    employees: res2.data
                })
            })
    }

    render() {

        const changeModal = () => {
            this.setState({ 
                open: !this.state.open
            })
        }

        const changeDeleteModal = (id) => {
            this.setState({
                deleteOpen: !this.state.deleteOpen,
                selectedId : id
            })
        }
        const changeEditModal = (id) => {
            console.log(id);
            this.setState({
                editOpen: !this.state.editOpen,
                selectedId: id
            })
            
        }

        const editEmployee = () => {

        }
        const saveEmployee = (event, errors, values) => {


            axios.post("https://60b3eaa04ecdc10017480006.mockapi.io/api/Crud", values)
                .then((res) => {
                    getEmployees();
                    changeModal();
                })
        }
        const editSaveEmployee = () =>{

            axios.put("https://60b3eaa04ecdc10017480006.mockapi.io/api/Crud/" + this.state.selectedId)
                .then((res)=> {
                    changeEditModal();
                })
        }

        const deleteEmployee = () => {
            // for (let i = 0; i < 2000; i++) {
            //     axios.delete("https://nimadir.herokuapp.com/api/employee/" + this.state.employees[i].id)
                axios.delete("https://60b3eaa04ecdc10017480006.mockapi.io/api/Crud/" + this.state.selectedId)
                    .then((res) => {
                        // getEmployees();
                        changeDeleteModal();
                    })
            // }
        }

        const getEmployees = () => {
            axios.get("https://60b3eaa04ecdc10017480006.mockapi.io/api/Crud")
                .then((res2) => {
                    console.log(res2);
                    this.setState({
                        employees: res2.data
                    })
                })
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <button type="button" className="btn btn-primary my-5 ml-auto btn-block d-block"
                                onClick={changeModal}>New
                        </button>
                    </div>

            
                            <div className="col-12 mt-1">
                            <table class="table table-dark table-striped">
    <thead>
      <tr>
        <th>Name</th>
        <th>Lastname</th>
        <th>Age</th>
        <th>Number</th>
        <th>Email</th>
        <th>Change</th>
      </tr>
    </thead>
    {this.state.employees.map((item, index) => {
        return (
    <tbody>
      <tr>
        <td>{item.firstName}</td>
        <td>{item.lastName}</td>
        <td>{item.age}</td>
        <td>{item.number}</td>
        <td>{item.email}</td>
        <td>
        <button type="button" className="btn btn-warning mr-1" onClick={() => changeEditModal(item.id)}>Edit</button>
        <button type="button" className="btn btn-danger" onClick={() => changeDeleteModal(item.id)}>Delete</button>
        </td>
      </tr>
    </tbody>
        )
    })}

  </table>
  </div>
  </div>

                <Modal isOpen={this.state.open} toggle={changeModal}>
                    <ModalHeader toggle={changeModal}>
                        Add New Student
                    </ModalHeader>
                    <AvForm onSubmit={saveEmployee}>
                        <ModalBody>
                            <AvField type="text" name="firstName" label="Name"/>

                            <AvField type="text" name="lastName" label="Last Name"/>

                            <AvField type="number" name="age" label="Age"/>

                            <AvField type="number" name="salary" label="Number"/>

                            <AvField type="text" name="position" label="Email">
                            </AvField>

                        </ModalBody>
                        <ModalFooter>
                            <button type="submit" className="btn btn-success">Save</button>
                            <button type="button" className="btn btn-secondary" onClick={changeModal}>Cancel</button>
                        </ModalFooter>
                    </AvForm>
                </Modal>

                <Modal isOpen={this.state.deleteOpen} toggle={changeDeleteModal}>

                    <ModalBody>
                        <h4>Rostdan ham o'chirmoqchimisiz?</h4>
                    </ModalBody>
                    <ModalFooter>
                        <button type="button" className="btn btn-danger" onClick={deleteEmployee}>Ha</button>
                        <button type="button" className="btn btn-secondary" onClick={changeDeleteModal}>Yo'q</button>
                    </ModalFooter>
                </Modal>
               
                <Modal isOpen={this.state.editOpen} toggle={changeEditModal}>
                    <ModalHeader toggle={changeModal}>
                        edit employee
                    </ModalHeader>
                    <AvForm onSubmit={editSaveEmployee}>
                        <ModalBody>
                            <AvField type="text" name="firstName" label="Student name"/>

                            <AvField type="text" name="lastName" label="Student surname"/>

                            <AvField type="number" name="age" label="Student age"/>

                        </ModalBody>
                        <ModalFooter>
                            <button type="submit" className="btn btn-success" onClick={editEmployee}>Edit</button>
                            <button type="button" className="btn btn-secondary" onClick={changeEditModal}>Cancel</button>
                        </ModalFooter>
                    </AvForm>
                </Modal>
                </div>
        );
    }
}

export default Crud;