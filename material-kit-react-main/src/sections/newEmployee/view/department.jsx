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

    const formData = new FormData();

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
      <div key={i} style={{ marginBottom: '10px' }}>
        <input
          style={{
            width: '100%',
            padding: '10px 10px',
            margin: '8px 0',
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
            padding: '10px 15px',
            textAlign: 'center',
            textDecoration: 'none',
            fontSize: '16px',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
          type="button"
          value="Remove"
          onClick={() => removeClick(i)}
        />
      </div>
    ));
  };

  return (
    <div>
      <h3>CREATE NEW DEPARTMENT</h3>
      <form onSubmit={handleSubmit}>
        {createUI()}
        <input
          type="button"
          style={{
            backgroundColor: '#0fc0fc',
            border: 'none',
            color: '#fff',
            padding: '9px 15px',
            textDecoration: 'none',
            fontSize: '14px',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
          value="Add more department"
          onClick={addClick}
        />
        <input
          style={{
            backgroundColor: '#0fc0fc',
            border: 'none',
            color: '#fff',
            padding: '9px 15px',
            textDecoration: 'none',
            fontSize: '14px',
            borderRadius: '4px',
            cursor: 'pointer',
            marginLeft: '10px',
          }}
          type="submit"
          value="Create"
        />
      </form>
    </div>
  );
};

export default AddDepartment;
