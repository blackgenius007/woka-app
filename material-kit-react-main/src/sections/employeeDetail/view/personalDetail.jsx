 /* eslint-disable */
 import React, { useEffect, useState } from 'react';
 
 import { useParams, Link } from 'react-router-dom';
 import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Grid,
   
  } from '@mui/material';
 import { useSelector } from 'react-redux';
 import IconButton from '@mui/material/IconButton';
 import Dialog from '@mui/material/Dialog';
 import DialogActions from '@mui/material/DialogActions';
 import DialogContent from '@mui/material/DialogContent';
 import DialogContentText from '@mui/material/DialogContentText';
 import DialogTitle from '@mui/material/DialogTitle';
 import Paper from '@mui/material/Paper';
 import Draggable from 'react-draggable';
 
 
 
 function PaperComponent(props) {
 
 
   return (
     <Draggable
       handle="#draggable-dialog-title"
       cancel={'[class*="MuiDialogContent-root"]'}
     >
       <Paper {...props} />
     </Draggable>
   );
 }
 
 
 
 export default function PersonalDetail({ 
   open,
 
  close,
  score,
  verify,
  id,
  name,
  number,
  code,
  origin,
  bank,
  address,
  dateOfBirth,
  sex,
  nextName,
  nextAddress,
  nextNumber,
  Relation
 }) {
 
   const { user } = useSelector((state) => state.auth);
 
   return (
     <div>
       <Dialog
         open={open}
         onClose={close}
         PaperComponent={PaperComponent}
         // style={{color:'#ffcc00'}}
         aria-labelledby="draggable-dialog-title"
       >
         <DialogTitle
           style={{ cursor: 'move', backgroundColor: 'purple', color: '#fff' }}
           id="draggable-dialog-title"
         >
           <div style={{ color: '#fff' }}>{name}'s Personal Details</div>
         </DialogTitle>
         <DialogContent>
           <DialogContentText>
         
           </DialogContentText>
           <TableContainer>
            <Table sx={{ minWidth: 400 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Category</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Full Name</TableCell>
                  <TableCell>{name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Location</TableCell>
                  <TableCell>{origin}</TableCell>
                </TableRow>
                
              
                </TableBody>
            </Table>
          </TableContainer>
         </DialogContent>
         <DialogActions>
           <IconButton onClick={close} >
             <svg
               xmlns="http://www.w3.org/2000/svg"
               class="icon icon-tabler icon-tabler-x"
               width="32"
               height="32"
               viewBox="0 0 24 24"
               stroke-width="2.5"
               stroke="#6f32be"
               fill="none"
               stroke-linecap="round"
               stroke-linejoin="round"
             >
               <path stroke="none" d="M0 0h24v24H0z" fill="none" />
               <line x1="18" y1="6" x2="6" y2="18" />
               <line x1="6" y1="6" x2="18" y2="18" />
             </svg>
           </IconButton>
 
           
         </DialogActions>
       </Dialog>
     </div>
   );
 }
 









// /* eslint-disable */
// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import IconButton from '@mui/material/IconButton';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import Paper from '@mui/material/Paper';
// import Draggable from 'react-draggable';

// function PaperComponent(props) {
//   return (
//     <Draggable
//       handle="#draggable-dialog-title"
//       cancel={'[class*="MuiDialogContent-root"]'}
//     >
//       <Paper {...props} />
//     </Draggable>
//   );
// }

// export default function PersonalDetail({
//   open,
//   projectname,
//   close,
//   score,
//   verify,
//   id,
//   name,
//   number,
//   code,
//   origin,
//   bank,
//   address,
//   dateOfBirth,
//   sex,
//   nextName,
//   nextAddress,
//   nextNumber,
//   Relation
// }) {
//   const { user } = useSelector((state) => state.auth);
//   const coded = [code].map((codes) => {
//     return codes;
//   });

//   return (
//     <div>
//       <Dialog
//         open={open}
//         onClose={close}
//         PaperComponent={PaperComponent}
//         style={{color:'#ffcc00'}}
//         aria-labelledby="draggable-dialog-title"
//       >
//         <DialogTitle
//           style={{ cursor: 'move', backgroundColor: '#20B2AA', color: '#fff' }}
//           id="draggable-dialog-title"
//         >
//           <div style={{ color: '#fff' }}>Personal Details</div>
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             <div style={{ outline: 'none' }}>
//               <ul>
//                 <li><strong>Name</strong> - {name}</li>
//                 <li><strong>Employee Number</strong> - {code}</li>
//                 <li><strong>Birth Date</strong> - {dateOfBirth}</li>
//                 <li><strong>Sex</strong> - {sex}</li>
//                 <li><strong>Phone</strong> - {number}</li>
//                 <li><strong>Address</strong> - {address}</li>
//                 <li><strong>Hometown</strong> - {origin}</li>
//                 <li>
//                   <strong>
//                     <p>Next of kin Details</p>
//                   </strong>
//                   <p>Name - {nextName}</p>
//                   <p>Relationship - {Relation}</p>
//                   <p>Address - {nextAddress}</p>
//                   <p>mobile - {nextNumber}</p>
//                 </li>
//                 <li><strong>Bank Details</strong> - {bank}</li>
//               </ul>
//             </div>
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <IconButton onClick={close} >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               class="icon icon-tabler icon-tabler-x"
//               width="32"
//               height="32"
//               viewBox="0 0 24 24"
//               stroke-width="2.5"
//               stroke="#6f32be"
//               fill="none"
//               stroke-linecap="round"
//               stroke-linejoin="round"
//             >
//               <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//               <line x1="18" y1="6" x2="6" y2="18" />
//               <line x1="6" y1="6" x2="18" y2="18" />
//             </svg>
//           </IconButton>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }
