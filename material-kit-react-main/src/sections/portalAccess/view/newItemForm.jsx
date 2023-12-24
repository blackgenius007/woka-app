/* eslint-disable */
import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
 import ItemStatus from './itemStatus';
import { Grid, Button, TextField, Typography, MenuItem } from '@mui/material';
// import { registerInmate } from '../InmateServices/inmateSlice';
 

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '16px',
  overflowX: 'hidden',
};

const formStyle = {
  width: '100%',
};

const columnStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const smallInputStyle = {
  width: '200px',
};

const NewItem = () => {
  const [formData, setFormData] = useState({
    inmate_name: '',
    date_of_birth: '',
    gender: '',
    socialSecurityNumber: ' ',
    raceEthnicity: '',
    nationality: '',
    homeAddress: ' ',
    height: '',
    weight: '',
    eye_color: '',
    hair_color: '',
    distinguishingMarks: '',
    disabilities: '',
    bookingDateTime: '',
    bookingNumber: '',
    bookingOfficer: '',
    arrestingAgency: '',
    arrestingOfficer: '',
    offence_category: '',
    arrestDate: '',
    arrestLocation: '',
    arrestJurisdiction: '',
    personalItems: '',
    contactInformation: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Handle special case for date inputs
    if (
      event.target.type === 'date' ||
      event.target.type === 'datetime-local'
    ) {
      setFormData({
        ...formData,
        [name]: value, // Update directly for date inputs
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

 
  const handleItemStatusChange = (event) => {
    setFormData({
      ...formData,
      ItemStatus: event.target.value,
    });
  };

    // const { user } = useSelector((state) => state.auth);
 

//   const dispatch = useDispatch();

//     const handleSubmit = (values) => {
//     const inmateId = user.data._id;
//     // Handle form submission
//     console.log(user.data._id);
//     // Dispatch registerInmate action
//     dispatch(registerInmate({ inmateData: formData, inmateId }));
//     alert('submit successful!!')
//   };
  

  return (
    <div style={containerStyle}>
      <Typography variant="h5" component="h1" style={{ color: 'grey' }}>
        NEW ITEM FORM
      </Typography>
      <br/>
      <form  style={formStyle}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} style={columnStyle}>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              label="Item Name"
              name="itemName"
              value={formData.itemName}
              onChange={handleInputChange}
            />
               <TextField
              variant="outlined"
              size="small"
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
             <TextField
              variant="outlined"
              size="small"
              fullWidth
              label="SKU Number"
              name="SKU"
              value={formData.SKU}
              onChange={handleInputChange}
            />
          
         
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              label="Unit Price"
              name="price"
              value={formData.price }
              onChange={handleInputChange}
            />

            
          </Grid>
          <Grid item xs={12} sm={4} style={columnStyle}>
          <TextField
              variant="outlined"
              size="small"
              fullWidth
              label="Number in Stock"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
            />
          <TextField
              variant="outlined"
              size="small"
              fullWidth
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              label="Supplier"
              name="supplier"
              value={formData.supplier}
              onChange={handleInputChange}
            />
  
             
  <TextField
              select
              label="Item Status"
              name="status"
              value={formData.status}
              onChange={handleItemStatusChange}
              variant="outlined"
              fullWidth
            >
              {ItemStatus.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

        
          </Grid>
         
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          style={{ marginTop: '20px' }}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default NewItem;






// import React, { useState, Fragment } from 'react';
// import { useSelector } from 'react-redux';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';

// export default function NewInventoryForm() {
//   const [inventory, setInventory] = useState({
//     itemName: '',
//     description: '',
//     price: '',
//     quantity: '',
//     itemStatus: '',
//   });

//   function handleChange(e) {
//     const { name, value } = e.target;
//     setInventory((inventory) => ({ ...inventory, [name]: value }));
//   }

// //   const SubmitHandle = (e) => {
// //     e.preventDefault();

// //     if (inventory) {
// //       axios.post(`/api/v1/inventory/create/${user._id}/${projectname}`, inventory).then(
// //         (res) => {
// //           alert('Submitted successfully!');
// //           handleClose();
// //         },
// //         (err) => {
// //           alert(message, err);
// //         }
// //       );
// //     }
// //   };
//   return (
//     <>
 
//         {/* <Popup
//             trigger={
//               <IconButton variant="info" color="primary" onClick={handleClickOpen}>
//                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-forklift" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#9e9e9e" fill="none" stroke-linecap="round" stroke-linejoin="round">
//      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
//      <circle cx="5" cy="17" r="2" />
//      <circle cx="14" cy="17" r="2" />
//      <line x1="7" y1="17" x2="12" y2="17" />
//      <path d="M3 17v-6h13v6" />
//      <path d="M5 11v-4h4" />
//      <path d="M9 11v-6h4l3 6" />   
//      <path d="M22 15h-3v-10" />
//      <line x1="16" y1="13" x2="19" y2="13" />
//   </svg>
//               </IconButton>
//             }
//             position="bottom center"
//           >
//             Add new item to store
//           </Popup> */}

//         <TextField
//           variant="outlined"
//           margin="normal"
//           name="itemName"
//           value={inventory.itemName}
//           onChange={handleChange}
//           required
//           fullWidth
//           label="item name"
//           autoFocus
//           autoComplete="off"
//           type="text"
//         />
//         <TextField
//           variant="outlined"
//           margin="normal"
//           name="description"
//           value={inventory.description}
//           onChange={handleChange}
//           required
//           fullWidth
//           label="description"
//           autoFocus
//           autoComplete="off"
//           type="text"
//         />
//         <TextField
//           variant="outlined"
//           margin="normal"
//           name="price"
//           value={inventory.price}
//           onChange={handleChange}
//           required
//           fullWidth
//           label="selling price"
//           autoFocus
//           autoComplete="off"
//           type="number"
//         />
//         <TextField
//           variant="outlined"
//           margin="normal"
//           name="quantity"
//           value={inventory.quantity}
//           onChange={handleChange}
//           required
//           fullWidth
//           label="quantity"
//           autoFocus
//           autoComplete="off"
//           type="number"
//         />
//         <TextField
//           variant="outlined"
//           margin="normal"
//           name="itemStatus"
//           value={inventory.itemStatus}
//           onChange={handleChange}
//           required
//           fullWidth
//           label="condition of item"
//           autoFocus
//           autoComplete="off"
//           type="text"
//         />

//         <Button
//           type="submit"
//           fullWidth
//           variant="contained"
//           color="secondary"
//         //   disabled={isLoading}
//           size="large"
//         >
//           Submit
       
//         </Button>
   
//     </>
//   );
// }
