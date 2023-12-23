// import React, { useState, Fragment } from 'react';
// import { useSelector } from 'react-redux';
// import Button from '@mui/material ';
// import TextField from '@mui/material ';
 
  
 

// export default function NewInventoryForm({}) {
 

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

//   const SubmitHandle = (e) => {
//     e.preventDefault();

//     if (inventory) {
//       axios.post(`/api/v1/inventory/create/${user._id}/${projectname}`, inventory).then(
//         (res) => {
//           alert('Submitted successfully!');
//           handleClose();
//         },
//         (err) => {
//           alert(message, err);
//         }
//       );
//     }
//   };
//   return (
//     <>
//       <Fragment>
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
//           disabled={isLoading}
//           size="large"
//         >
//           Submit
//           {isLoading && <ButtonCircularProgress />}
//         </Button>
//       </Fragment>
//     </>
//   );
// }
