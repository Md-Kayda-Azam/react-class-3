import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'

const Signup = () => {

    const [input, setInput ] = useState({
        name : '',
        username : '',
        email : '',
        gender : '',
        photo : ''
    });
    

/// get all user data

const [ users, setUsers ] = useState([]);



/// data input
    let { name, username, email, gender, photo } = input;

/// Alert Management
const [ alert, setAlert ] = useState({
    msg : 'This is an alert',
    type : 'danger',
    status : false
});


// form submit 
const handleFormSubmit =  (e) => {
    e.preventDefault(e);

        if( name === '' || username === '' || email === '' || photo === ''){
            setAlert({
                msg : 'All fields are required',
                type : 'danger',
                status : true
            })

        }else{

            axios.post('http://localhost:5478/user', input).then(res => {
                setAlert({
                    msg : 'Data Stable',
                    type : 'success',
                    status : true
                });
    
                setInput({
                    name : '',
                    username : '',
                    email : '',
                    photo : ''
                })
    
            }).catch(error => {
                console.log(error);
            });
        }
} 

/// Alert close

const handleAlertClose = () => {
    setAlert({
        msg : '',
        type : 'danger',
        status : false
    })
}

// User Data Delete

const handleUserDelete = (id) => {
    axios.delete('http://localhost:5478/user/' + id);
}


/// get all data 

useEffect(() => {
    
    axios.get('http://localhost:5478/user').then(res => {
        
    setUsers(res.data)


    }).catch(error => {
        console.log(error);
    })


},[users])

  return (
    <Container className='my-5'>
        <Row className='justify-content-center'>
            <Col lg={4}>
            <Card className='shadow'>
                <Card.Body>
                    <h2>Create new Account</h2>
                </Card.Body>
                <Card.Body>

                    {
                        alert.status && <p className={`btn btn-sm btn-${ alert.type} d-flex justify-content-between`}>{ alert.msg}<button onClick={ handleAlertClose } className='btn-close'></button></p>
                    }

                   <form action="" onSubmit={ handleFormSubmit }>
                      <div className="my-3">
                          <label htmlFor="">Name</label>
                          <input className='form-control' type="text" value={name} onChange={ e => setInput({ ...input, name : e.target.value})}/>
                      </div>
                      <div className="my-3">
                          <label htmlFor="">UserName</label>
                          <input className='form-control' type="text" value={username}  onChange={ e => setInput({ ...input, username : e.target.value})}/>
                      </div>
                      <div className="my-3">
                          <label htmlFor="">Email</label>
                          <input className='form-control' type="text"  value={email}  onChange={ e => setInput({ ...input, email : e.target.value})}/>
                      </div>
                      <div className="my-3">
                          <label htmlFor="">Photo</label>
                          <input className='form-control' type="text"  value={photo}  onChange={ e => setInput({ ...input, photo : e.target.value})}/>
                      </div>
                      <div className="my-3">
                          <label htmlFor="">Gender</label>
                          <hr />
                          <input name='gender' type="radio"  value='Male' id='Male' onChange={ e => setInput({ ...input, gender : e.target.value})}/> <label htmlFor="">Male</label>
                          <input name='gender' type="radio"  value='Female' id='Female' onChange={ e => setInput({ ...input, gender : e.target.value})}/> <label htmlFor="">Female</label>
                      </div>
                    
                      <div className="my-3">
                          <input className='btn btn-sm btn-primary' type="submit"  />
                      </div>
                   </form>
                </Card.Body>
            </Card>
            </Col>
            <Col lg={8}>
            <Card>
                <Card.Header>
                    <h2>All User Data</h2>
                </Card.Header>
                <Card.Body>
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>UserName</th>
                                <th>Email</th>
                                <th>Photo</th>
                                <th>Gender</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((data, index ) => 
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{data.name}</td>
                                    <td>{data.username}</td>
                                    <td>{data.email}</td>
                                    <td>{data.gender}</td>
                                    <td><img style={{width:'50px', height: '50px'}} src={data.photo} alt="" /></td>
                                    <td>
                                        <button onClick={ () => handleUserDelete(data.id)} className='btn btn-danger'>Delete</button>
                                    </td>
                                </tr>
                                
                                )
                            }
                        </tbody>
                    </table>
                </Card.Body>
            </Card>
            </Col>
        </Row>
    </Container>
  )
}

export default Signup