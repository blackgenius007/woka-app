/* eslint-disable */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveDepartment } from '../../../Services/AuthServices/authSlice';
 
 

const AddDepartment = ({ logoutUser, auth }) => {
  const [state, setState] = useState({
    departments: [''],
    isActive: false,
    isLoading: false,
  });

  const { user } = useSelector((state) => state.auth);
  const email = user.data.email;
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    const departmentData = state.departments.filter((department) => department !== '');

    // Create a new FormData object
    const formData = new FormData();

    // Append the department data to the FormData object
    departmentData.forEach((department) => {
      formData.append('department', JSON.stringify(department));
    });

    dispatch(saveDepartment({ email, department: formData }))
      .then(() => {
        alert('Submitted successfully!');
      })
      .catch((error) => {
        if (error.response && error.response.status === 500) {
          alert(error.response.data);
        } else {
          alert('An error occurred! Try submitting the form again.');
        }
      });
  };

  const handleChange = (i, e) => {
    const { value } = e.target;
    let departments = [...state.departments];
    departments[i] = value;
    setState({ ...state, departments });
  };

  const addClick = () => {
    setState((prevState) => ({
      departments: [...prevState.departments, ''],
    }));
  };

  const removeClick = (i) => {
    let departments = [...state.departments];
    departments.splice(i, 1);
    setState({ ...state, departments });
  };

  const createUI = () => {
    return state.departments.map((department, i) => (
      <div key={i}>
        <input
          style={{
            width: '70%',
            padding: '10px 10px',
            margin: '8px 0',
            display: 'inline-block',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxSizing: 'border-box',
          }}
          placeholder="Engineering"
          type="text"
          name="department"
          value={department}
          onChange={(e) => handleChange(i, e)}
        />
        <input
          style={{
            backgroundColor: '#6495ED',
            border: 'none',
            color: 'white',
            padding: '10px 10px',
            textAlign: 'center',
            textDecoration: 'none',
            display: 'inline-block',
            fontSize: '16px',
            borderRadius: '4px',
          }}
          type="button"
          value="remove"
          onClick={() => removeClick(i)}
        />
      </div>
    ));
  };

  return (
    <>
   CREATE NEW DEPARTMENT 
    
    <form onSubmit={handleSubmit}>
      {createUI()}
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <button
          type="button"
          style={{
            backgroundColor: '#0fc0fc',
            border: 'none',
            color: '#fff',
            padding: '9px 15px',
            margin: '5px 0',
            textAlign: 'center',
            textDecoration: 'none',
            display: 'inline-block',
            fontSize: '14px',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
          onClick={addClick}
        >
          Add more department
        </button>
        
        <button
          type="submit"
          style={{
            backgroundColor: '#0fc0fc',
            border: 'none',
            color: '#fff',
            padding: '9px 15px',
            textAlign: 'center',
            textDecoration: 'none',
            display: 'inline-block',
            fontSize: '14px',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Create
        </button>
      </div>
    </form>
  </>
  
  );
};

export default AddDepartment;
