import React from "react";
import { Avatar, Button, Checkbox, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@material-ui/core";
import { useStyles } from "../styles";
import { ChevronLeftOutlined, ChevronRightOutlined, CloudDownloadOutlined, DeleteOutline, FileCopyOutlined, KeyboardArrowDown, Notifications } from "@material-ui/icons";

const Transactions = () => {
  const classes = useStyles();
  function createData(id, details, amount, date, action) {
    return {
      id,
      details,
      amount,
      date,
      action,
    };
  }
  
  const rows = [
    createData('PD82901A9', 'Hawa M. Adejoro', '$100', 'December 02, 2021'),
    createData('PD82901A9', 'Hawa M. Adejoro', '$100', 'December 02, 2021'),
    createData('PD82901A9', 'Hawa M. Adejoro', '$100', 'December 02, 2021'),
    createData('PD82901A9', 'Hawa M. Adejoro', '$100', 'December 02, 2021'),
    createData('PD82901A9', 'Hawa M. Adejoro', '$100', 'December 02, 2021'),
    createData('PD82901A9', 'Hawa M. Adejoro', '$100', 'December 02, 2021'),
    createData('PD82901A9', 'Hawa M. Adejoro', '$100', 'December 02, 2021'),
  ];


  return (
    <div className={classes.inputSection}>
      <Paper className={classes.mainCont} elevation={0}>
        <div className={classes.inputSection}>
          <Typography variant="h5" className={classes.mainTitle}>
            All Payments <span className={classes.paymentCount}></span>
          </Typography>
          <div>
            <Typography variant="p" className={classes.avatarName}>
              Sort by: Date <KeyboardArrowDown/>
            </Typography>
            <div className={classes.dateStamp}>Nov 02, 2021 - Dec 02, 2021</div>
          </div>
        </div>
        
        <Paper className={classes.formSection} elevation={0}>
          <div className={classes.inputSection}>
            <TextField 
            id="outlined-basic" 
            className={classes.searchBar} 
            variant="outlined"  
            placeholder="Search for payments"
            />
            <p class={classes.inputSection}>
              <ChevronLeftOutlined /> Sheet 1 <ChevronRightOutlined/>
            </p>
          </div>
        
          <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    inputProps={{
                      'aria-label': 'select all desserts',
                    }}
                  />
                </TableCell>
                <TableCell><b>Payment ID</b></TableCell>
                <TableCell align="left"><b>Account Details</b></TableCell>
                <TableCell align="left"><b>Amount</b></TableCell>
                <TableCell align="left"><b>Date Created</b></TableCell>
                <TableCell align="left"><b>Action</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    inputProps={{
                      'aria-label': 'select all desserts',
                    }}
                  />
                </TableCell>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="left">{row.details}</TableCell>
              <TableCell align="left">{row.amount}</TableCell>
              <TableCell align="left">{row.date}</TableCell>
              <TableCell align="left">
                <FileCopyOutlined color="primary" fontSize="small" />
                <DeleteOutline color="error" fontSize="small"/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
          </Table>
          </TableContainer>
          <br/>
        </Paper>
      </Paper>




      <Paper elevation={0} className={classes.aside}>
        <div className={classes.inputSection}>
          <IconButton className={classes.iconBtn}>
            <Notifications/>
          </IconButton>
          <Avatar sx={{width:56, height:56}}>KA</Avatar>
          <div>
            <Typography variant="p" className={classes.avatarName}>Khadijah Amusat</Typography>
            <Typography variant="p" className={classes.userName}>@_khadeeejah</Typography>
          </div>
          <KeyboardArrowDown/>
        </div>

        <div className={classes.paymentDeets}>
          <div className={classes.inputSection}>
                    <p><b>Payment Details</b></p>
                    <p className={classes.inputSection}><b>Download</b> &nbsp;<CloudDownloadOutlined color="primary"/></p>
          </div>

          <div className={classes.inputSection}>
            <div className= {classes.inputSectiontxt}>
              <p>Payment ID</p> 
              <p>Account name</p> 
              <p>Bank Details</p> 
              <p>Account Number</p> 
              <p>Amount</p> 
              <p>Status</p>    
            </div>     
            <div>
              <p className={classes.paymentValues}>PD82901A9</p> 
              <p className={classes.paymentValues}>Hawa M. Adejoro</p> 
              <p className={classes.paymentValues}>Access Bank</p> 
              <p className={classes.paymentValues1}>01827345372</p> 
              <p className={classes.paymentValues}>$100.00</p> 
              <p className={classes.paymentValues2}>Success</p>    
            </div>     
          </div>

          
        </div>



      </Paper>
    </div>
  );
};

export default Transactions;