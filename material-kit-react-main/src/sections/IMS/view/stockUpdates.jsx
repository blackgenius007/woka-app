// import React, { useState, useCallback, useRef, Fragment,useEffect } from "react";
// import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
// import Chip from '@material-ui/core/Chip';
// import { makeStyles } from '@material-ui/core/styles';
// import FaceIcon from '@material-ui/icons/Face';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// import ImageIcon from '@material-ui/icons/Image';
// import WorkIcon from '@material-ui/icons/Work';
// import { Typography,Dialog,DialogActions,DialogTitle,DialogContent,
//   DialogContentText,Divider,Box,Button,CardHeader,Avatar,ButtonGroup,
//   Card,Slide,CardContent,Grid,CardActionArea,CardActions,IconButton
// } from "@material-ui/core";
// import Paper from '@material-ui/core/Paper';
// import { IconContext} from "react-icons";
// import SaveIcon from '@material-ui/icons/Save'
// import { TiEdit } from "react-icons/ti";       
// import {FcBusinessContact} from "react-icons/fc";
// import {AiOutlineFire,AiOutlineCalculator,AiOutlineBranches,AiOutlineDislike } from "react-icons/ai";
// import { ImStatsDots,ImTable2} from "react-icons/im"
// import { Link,useParams,useHistory} from 'react-router-dom'; 
// import moment from "moment";
// import Carousel from "./carousel";
// import InventoryManagement from "./stockManagement";
// import Supplier from "./supplierModal";
// import PersonIcon from '@material-ui/icons/Person';           
// import { blue } from '@material-ui/core/colors';
// import { Popup } from "semantic-ui-react";
// import EmailTwoToneIcon from '@material-ui/icons/EmailTwoTone';  
// import Fab from '@material-ui/core/Fab';
// import NavigationIcon from '@material-ui/icons/Navigation';



// require("es6-promise").polyfill()
// require("isomorphic-fetch")

// const useStyles = makeStyles((theme) => ({       
//     root: {
//       display: 'flex',
//       flexWrap: 'wrap',
//       '& > *': {
//         margin: theme.spacing(5),
//         width: theme.spacing(40),
//         height: theme.spacing(40),
//       },
//       extraLargeButton: {
//         paddingTop: theme.spacing(1.5),
//         paddingBottom: theme.spacing(1.5),
//         [theme.breakpoints.up("xs")]: {
//           paddingTop: theme.spacing(1),
//           paddingBottom: theme.spacing(1),
//         }
//         },
      
//       paper: {
//         width: '100%',
//         maxWidth: 360,
//         backgroundColor: theme.palette.background.paper,
//       },
//       avatar: {
//         backgroundColor: blue[100],
//         color: blue[600],
//       },
//       chip: {
//         display: 'flex',
//         justifyContent: 'center',
//         flexWrap: 'wrap',
//         '& > *': {
//           margin: theme.spacing(0.5),
//         },
//       },
//     },
//   }));
  

// function StockUpdates() {
 
//     let history = useHistory();
//     const classes = useStyles();
//     const auth =useSelector(state=>state.auth)
//     const [stock, setStock] = useState([]);
//     const[data,setData]=useState([])
//     const[q,setQ]=useState("")
//     const [Loading, setLoading] = useState(false);  
//     console.log('=>from stock-panel=>',auth.user.email,projectname)       
//     const [open, setOpen] = React.useState(false);
//     const [selectedId, setSelectedId] = React.useState();
//     const[detail,setDetail]=useState([])   
  
//     const handleModalOpen = (id) => {  
      
//       const fetchSupplierDetail= async()=>{
//      const res= await axios.get(`/api/v1/inventory/${id}`,
//      {

//      });
   
//      if(res.data){
//        setDetail(res.data);                    
//       console.log(res.data)
//      }
      
//      }
//      fetchSupplierDetail();          
//       setOpen(true);
//       setSelectedId(id)
//     };   
  
//     const handleModalClose = () => {            
//       setOpen(false);
//     };

//     useEffect(()=>{ 
//         fetch(`/api/v1/inventory/stockbalance/${auth.user.email}/${projectname} `)        
//         .then(response=>response.json())     
//         .then(json=>setData(json))     
//        console.log('stock detail =>',data)          
//         },[])

        
    
        
//      const  openInNewTab = (url) => {
//         		var win = window.open('https://www.amazon.com/', '_blank');
//         		win.focus();
//         	};

//     // const openPriceList=()=>{
//     //   history.push(`/c/merchant/${page}/${projectname}` );       
//     // }

//     return (
//       <>
    
// <Grid container spacing={3}>
        
//         <Grid >                
//         <Card  style={{  borderRadius: 12, minWidth: 256, textAlign: 'center'}}>

//       <CardContent>
//       <h4  className="textItemdashboard">     
//           { data.length  <= 0
           
//             ? `${data.length} item are out of stock`:`${data.length} items is out of stock`}
//             </h4> 
//             <Divider/>
//             { data.map((item) =>(<div  key={item._id}>
            
//                           <List className={classes.paper}>
//     <ListItem>
//          <ListItemAvatar>
//            <Avatar>
//              <Avatar src={item.imagePath} />    
//            </Avatar>         
//          </ListItemAvatar>
//          <ListItemText
//                     primary= {item.itemName}
//                     secondary= {` out of stock : ${moment(`${item.updatedAt}`, "YYYYMMDD").fromNow()}`}
//                   />
//                    <IconContext.Provider
//                     value={{ size: '35px' }}         
//                   >


//                     <Button  onClick={()=>handleModalOpen(item._id)}>

//                       <Popup
//         trigger={ <FcBusinessContact/> }
//         position="bottom center"       
//       >
//           Last supplier's detail 
//       </Popup>                               
//       </Button>
//       </IconContext.Provider>
//       </ListItem>
//       </List>   

     
//                </div>
//                 ))}
//                 <br/>

//                 <div class="btn-group-dynamic">
//                     <Link to={`/c/price-list/${page}/${projectname}`}> 
//                    <Button
//                           variant="contained"
//                           color="secondary"
//                           fullWidth
//                           // onClick={openPriceList}
//                           className={classes.extraLargeButton}
//                           classes={{ label: classes.extraLargeButtonLabel }}
//                           // href="https://github.com/dunky11/react-saas-template"      
//                         >
//                           Order from Local Merchant
//                         </Button>
                   
//                    </Link>
           
       
// </div>
                

//       </CardContent>  
//       <Divider light />
      
//     </Card>
//         </Grid>
      
//       </Grid>
//       <Grid>
//       <Dialog onClose={handleModalClose} aria-labelledby="simple-dialog-title" open={open}>          
//       <DialogTitle id="simple-dialog-title">Current supplier detail</DialogTitle>
//       <List>
       
//           <ListItem>
//             <ListItemAvatar>
//               <Avatar className={classes.avatar}>
//                 <PersonIcon />
//               </Avatar>
//             </ListItemAvatar>
//             <ListItemText primary={detail.supplier} />
//           </ListItem>
      

//         <ListItem autoFocus >
//           <ListItemAvatar>
//             <Avatar>
//               <EmailTwoToneIcon/>
//             </Avatar>     
//           </ListItemAvatar>          
//           <ListItemText primary={detail.supplier_email} />         
//         </ListItem>
//       </List>
     
//     </Dialog>
// <br/>
//     </Grid>
            
   
//       </>          
//     )
// }

// export default StockUpdates