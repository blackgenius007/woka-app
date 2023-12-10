
// import React, { useState, useCallback, useRef, Fragment,useEffect } from "react";
// import { useDispatch, useSelector } from 'react-redux';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import { useParams,Link } from 'react-router-dom';  
// import axios from 'axios'; 
// import { IconContext} from "react-icons";
// import { FiUserPlus } from "react-icons/fi";
// import {HiOutlineUserAdd} from "react-icons/hi";
// import {GrTableAdd} from "react-icons/gr";
// import { BsFillPersonPlusFill } from "react-icons/bs";     
// import {IoIosPersonAdd} from "react-icons/io";
// import Select from 'react-select';
// import { Popup } from "semantic-ui-react";
// import "semantic-ui-css/semantic.min.css";


// export default function InventoryInsertForm({projectname}) { 

 
//   // let { projectname,id} = useParams();
   
//   console.log( "props=>",projectname)
//   const [open, setOpen] = React.useState(false);
//   const itemCondition = [
//     { value:"Select", label :"Select"},

//     {label :"yes", value :"yes"},
//     {label :"no", value :"no"},
//   ]

//   const handleClickOpen = () => {     
//     setOpen(true);
//   };   

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const [inventory, setInventory] = useState({    
//      email:"",
//     itemName: "",
//      description: "",
//       price: "",
//       quantity: "",
//       // suppliers_email: "",
//       goodCondition: "",
//       id:"",
             
// });

// const { itemName,description,price,quantity,supplier,taxable} = inventory;
// const auth =useSelector(state=>state.auth)

// console.log('user-id =>',projectname)
// function handleChange(e) {
//   const { name, value } = e.target;      
//   setInventory( inventory => ({ ...inventory, [name]: value }));
// }

// const SubmitHandle=e=>{

//   e.preventDefault()
 
//   if (inventory) {   
                 
//     axios.post(`/api/v1/inventory/${auth.user.id}/${projectname}`, inventory)
//     .then(
//       (res) => {   
//         alert('Submitted successfully!');       
//       },
//       (err) => {
//         alert('An error occured! Try submitting the form again.', err);           
//       }
//     );
//   }

// }
//   return (
//     <div>

// <Popup
//         trigger={ <Button variant="info" color="primary" onClick={handleClickOpen}>
//         <IconContext.Provider
//         value={{ color: 'grey', size: '25px' }}     
//       >
//         <div>     
//         <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-forklift" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#9e9e9e" fill="none" stroke-linecap="round" stroke-linejoin="round">
//   <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
//   <circle cx="5" cy="17" r="2" />
//   <circle cx="14" cy="17" r="2" />
//   <line x1="7" y1="17" x2="12" y2="17" />
//   <path d="M3 17v-6h13v6" />
//   <path d="M5 11v-4h4" />
//   <path d="M9 11v-6h4l3 6" />
//   <path d="M22 15h-3v-10" />
//   <line x1="16" y1="13" x2="19" y2="13" />
// </svg>
//         </div>
//       </IconContext.Provider>
//         </Button>}
//         position="bottom center" 
//       >
//         Add new item to store
//       </Popup> 
     
//       <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
//         <DialogTitle  style={{color: 'red'}} id="form-dialog-title">INVENTORY FORM</DialogTitle>
//         <DialogContent >
//           <DialogContentText>
           
//           </DialogContentText>
//           <TextField
//             variant="outlined"
//             autoFocus
//             margin="dense"
//             name="itemName"
//             value={inventory.itemName}
//             onChange={handleChange}
//             required
//             fullWidth
//             label="Item Name"
        
//             autoComplete="off"
//             type="text"
          
//           />
//            <TextField
//             variant="outlined"
//             autoFocus
//             margin="dense"
//             name="description"
//             value={inventory.description}
//             onChange={handleChange}
//             required
//             fullWidth
//             label="Description"
            
//             autoComplete="off"
//             type="text"
          
//           />
//               <TextField
//             variant="outlined"
//             autoFocus
//             margin="dense"
//             name="price"
//             value={inventory.price}
//             onChange={handleChange}
//             required
//             fullWidth
//             label="Price of item"
          
//             autoComplete="off"
//             type="number"
          
//           />
//               <TextField
//             variant="outlined"
//             autoFocus
//             margin="dense"
//             name="quantity"
//             value={inventory.quantity}
//             onChange={handleChange}
//             required
//             fullWidth
//             label="Quantity of item"
            
//             autoComplete="off"
//             type="number"
          
//           />
 
           
//               <TextField
//             variant="outlined"
//             autoFocus
//             margin="dense"
//             name="goodCondition"
//             value={inventory.goodCondition}
//             onChange={handleChange}
//             required
//             fullWidth
//             label="Yes/No"
            
//             autoComplete="on"
//             type="boolean"
          
//           /> 
           
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={SubmitHandle} color="primary">    
//             Add Employee
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }

 
  
         