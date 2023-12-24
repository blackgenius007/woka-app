/* eslint-disable */
import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { Grid, Button, TextField, Typography, MenuItem } from '@mui/material';
// import { registerInmate } from '../InmateServices/inmateSlice';
// import Nationality from '../Inmate/dropdownOptions/nationality';
// import Ethnicity from '../Inmate/dropdownOptions/ethnicity';
// import Offence from '../Inmate/dropdownOptions/offenceCategories';
// import Gender from '../Inmate/dropdownOptions/gender';
// import YesNo from './dropdownOptions/yesNo';
// import EyeColors from './dropdownOptions/eyeColor';
// import HairColors from './dropdownOptions/hairColor';

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

//   const handleGenderChange = (event) => {
//     setFormData({
//       ...formData,
//       gender: event.target.value,
//     });
//   };

//   const handleEthnicityChange = (event) => {
//     setFormData({
//       ...formData,
//       raceEthnicity: event.target.value,
//     });
//   };

//   const handleNationalityChange = (event) => {
//     setFormData({
//       ...formData,
//       nationality: event.target.value,
//     });
//   };

//   const handleOffencesChange = (event) => {
//     setFormData({
//       ...formData,
//       offence_category: event.target.value,
//     });
//   };

//   const handleDistinguishingMarksChange = (event) => {
//     setFormData({
//       ...formData,
//       distinguishingMarks: event.target.value,
//     });
//   };

//   const handleDisabilitiesChange = (event) => {
//     setFormData({
//       ...formData,
//       disabilities: event.target.value,
//     });
//   };

//   const handleEyeColorChange = (event) => {
//     setFormData({
//       ...formData,
//       eye_color: event.target.value,
//     });
//   };

//   const handleHairColorChange = (event) => {
//     setFormData({
//       ...formData,
//       hair_color: event.target.value,
//     });
//   };

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
        NEW INMATE BOOKING FORM
      </Typography>
      <br/>
      <form  style={formStyle}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} style={columnStyle}>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              label="Full Name"
              name="inmate_name"
              value={formData.inmate_name}
              onChange={handleInputChange}
            />
            <TextField
              name="date_of_birth"
              label="Birthday"
              type="date"
              variant="outlined"
              fullWidth
              value={formData.date_of_birth || ''} // Ensure value is not undefined
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
            />
            {/* <TextField
              select
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleGenderChange}
              variant="outlined"
              fullWidth
            >
              {Gender.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField> */}
            {/* <TextField
              select
              label="Ethnicity"
              name="raceEthnicity"
              value={formData.raceEthnicity}
              onChange={handleEthnicityChange}
              variant="outlined"
              fullWidth
            >
              {Ethnicity.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField> */}
            {/* <TextField
              select
              label="Nationality"
              name="nationality"
              value={formData.nationality}
              onChange={handleNationalityChange}
              variant="outlined"
              fullWidth
            >
              {Nationality.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField> */}
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              label="Home Address"
              name="homeAddress"
              value={formData.homeAddress}
              onChange={handleInputChange}
            />

                <TextField
              variant="outlined"
              size="small"
              fullWidth
              label="Social Security Number"
              name="socialSecurityNumber"
              value={formData.socialSecurityNumber}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={4} style={columnStyle}>
            
          <TextField
              variant="outlined"
              size="small"
              fullWidth
              label="Height"
              name="height"
              value={formData.height}
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              label="Weight"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
            />
  {/* <TextField
              select
              label="Eye color"
              name="eye_color"
              value={formData.eye_color}
              onChange={ handleEyeColorChange }
              variant="outlined"
              fullWidth
            >
              {EyeColors.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField> */}
            {/* <TextField
              variant="outlined"
              size="small"
              fullWidth
              label="Eye color"
              name="eye_color"
              value={formData.eye_color}
              onChange={handleInputChange}
            /> */}

{/* <TextField
              select
              label="Hair color"
              name="hair_color"
              value={formData.hair_color}
              onChange={handleHairColorChange}
              variant="outlined"
              fullWidth
            >
              {HairColors.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField> */}

            {/* <TextField
              variant="outlined"
              size="small"
              fullWidth
              label="Hair color"
              name="hair_color"
              value={formData.hair_color}
              onChange={handleInputChange}
            /> */}
            {/* <TextField
              select
              label="Distinguishing Marks"
              name="distinguishingMarks"
              value={formData.distinguishingMarks}
              onChange={handleDistinguishingMarksChange}
              variant="outlined"
              fullWidth
            >
              {YesNo.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField> */}

            {/* <TextField
              variant="outlined"
              size="small"
              fullWidth
              label=" Distinguishing Marks"
              name="distinguishingMarks"
              value={formData.distinguishingMarks}
              onChange={handleInputChange}
            /> */}
             {/* <TextField
              select
              label="Disabilities"
              name="disabilities"
              value={formData.disabilities}
              onChange={handleDisabilitiesChange}
              variant="outlined"
              fullWidth
            >
              {YesNo.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField> */}
            {/* <TextField
              variant="outlined"
              size="small"
              fullWidth
              label="Disabilities"
              name="disabilities"
              // value={formData.disabilities}
              onChange={handleInputChange}
            /> */}
            <TextField
              label="Booking Date and Time"
              name="bookingDateTime"
              value={formData.bookingDateTime}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
              type="datetime-local"
            />
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              label="Booking Number"
              name="bookingNumber"
              value={formData.bookingNumber}
              onChange={handleInputChange}
            />

            <TextField
              variant="outlined"
              size="small"
              fullWidth
              label="Booking Officer"
              name="bookingOfficer"
              value={formData.bookingOfficer}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={4} style={columnStyle}>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              label="Arresting agency"
              name="arrestingAgency"
              value={formData.arrestingAgency}
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              label="Arresting Officer"
              name="arrestingOfficer"
              value={formData.arrestingOfficer}
              onChange={handleInputChange}
            />
            {/* <TextField
              select
              label="Offence category"
              name="offence_category"
              value={formData.offence_category}
              onChange={handleOffencesChange}
              variant="outlined"
              fullWidth
            >
              {Offence.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Arrest Date and Time"
              name="arrestDate"
              value={formData.arrestDate}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
              type="datetime-local"
            />
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              label="Arrest Location"
              name="arrestLocation"
              value={formData.arrestingLocation}
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              label="Court or Jurisdiction Issuing the Arrest Warrant"
              name="arrestJurisdiction"
              value={formData.arrestJurisdiction}
              onChange={handleInputChange}
            /> */}
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              label="Tag number for personal belongings"
              name="personalItems"
              value={formData.personalItems}
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              label="Contact Information"
              name="contactInformation"
              value={formData.contactInformation}
              onChange={handleInputChange}
            />
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
