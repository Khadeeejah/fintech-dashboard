import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  IconButton,
  MenuItem,
  Paper,
  Typography,
} from "@material-ui/core";
import { useStyles } from "../styles";
import SelectInput from "../components/SelectInput";
import Input from "../components/Input";
import { KeyboardArrowDown, Notifications } from "@material-ui/icons";
import axios from "axios";
import { useToasts } from "react-toast-notifications";

const PAYSTACK_SECRET = "sk_test_b09a6ceda2014992597f2aa1c015387224c74f1d";

const Accounts = () => {
  const {addToast} = useToasts();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [banks, setBanks] = useState([]);
  const [bank, setBank] = useState();
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  useEffect(() => {
    // fetch bank
    const fetchBanks = () => {
      setLoading(true);
      setError(null);
      axios
        .get("https://api.paystack.co/bank", {
          headers: {
            Authorization: `Bearer ${PAYSTACK_SECRET}`,
          },
        })
        .then((res) => {
          setLoading(false);
          setError(null);
          setBanks(res.data.data);
        })
        .catch(() => {
          setLoading(false);
          setError("cannot fetch list of banks");
        });
    };
    fetchBanks();
  }, []);

  console.log(loading);
  console.log(error);
  console.log(recipient);

  const createTransferReciept = async () => {
    try {
      const data = {
        type: "nuban",
        name: accountName,
        account_number: accountNumber,
        bank_code: bank,
        currency: "NGN",
      };
      const response = await axios.post(
        "https://api.paystack.co/transferrecipient",
        data,
        {
          headers: {
            Authorization: `Bearer ${PAYSTACK_SECRET}`,
          },
        }
      );

      const responseData = await response.data;
      setRecipient(responseData.data.recipient_code);
    } catch (e) {
      throw new Error("Transfer failed, Try Again");
    }
  };

  const intiateTransfer = async () => {
    try {
      const data = {
        source: "balance",
        amount: amount * 100,
        recipient: recipient,
        reason: "",
      };
      const response = await axios.post(
        "https://api.paystack.co/transfer",
        data,
        {
          headers: {
            Authorization: `Bearer ${PAYSTACK_SECRET}`,
          },
        }
      );

      const responseData = await response.data;
    } catch (e) {
      throw new Error(e.response.data.message);
    }
  };

  const makeTransfer = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError();
      await createTransferReciept();
      await intiateTransfer();
      setLoading(false);
      setError();
    } catch (e) {
      setLoading(false);
      addToast(e.message,{
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };




  useEffect(() => {
    // fetch Accountname
    const verifyAccount = () => {
      setLoading(true);
      setError(null);
      axios
        .get(`https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bank}`, {
          headers: {
            Authorization: `Bearer ${PAYSTACK_SECRET}`,
          },
        })
        .then((res) => {
          
          setAccountName(res.data.data.account_name);
        })
        // .catch(() => {
        //   setLoading(false);
        //   setError("verifyAccount");
        // });
    };
    verifyAccount();
  }, [accountNumber, bank]);

    
  return (
    <form onSubmit={makeTransfer}>
      <div className={classes.inputSection}>
        <Paper className={classes.mainCont} elevation={0}>
          <Typography variant="h5" className={classes.mainTitle}>
            Create New Payment
          </Typography>
          <Paper className={classes.formSection} elevation={0}>
            <div className={classes.inputSection}>
              <SelectInput
                value={bank}
                onChange={(e) => setBank(e.target.value)}
                label="Select bank"
              >
                {banks.map((bank) => (
                  <MenuItem key={bank.code} value={bank.code}>
                    {bank.name}
                  </MenuItem>
                ))}
              </SelectInput>
              &nbsp; &nbsp; &nbsp; &nbsp;
              <Input
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                label="Account number"
              />
            </div>
            <Input
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              label="Account name"
            />

            <Input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              label="Amount"
            />

            <Button
              type="submit"
              variant="contained"
              disabled ={!accountName}
              className={classes.primaryBtn}
              fullWidth
            >
              Create
            </Button>
          </Paper>
        </Paper>

        <Paper elevation={0} className={classes.aside}>
          <div className={classes.inputSection}>
            <IconButton className={classes.iconBtn}>
              <Notifications />
            </IconButton>
            <Avatar sx={{ width: 56, height: 56 }}>KA</Avatar>
            <div>
              <Typography variant="p" className={classes.avatarName}>
                Khadijah Amusat
              </Typography>
              <Typography variant="p" className={classes.userName}>
                @_khadeeejah
              </Typography>
            </div>
            <KeyboardArrowDown />
          </div>

          <div className={classes.walletBal}>
            <Typography variant="p" className={classes.wallet}>
              Wallet balance
            </Typography>
            <Typography variant="p" className={classes.bal}>
              $30,782.90
            </Typography>
          </div>

          <div className={classes.inputSection}>
            <Button
              variant="contained"
              className={classes.secondaryGreenBtn}
              fullWidth
            >
              Deposit
            </Button>
            &nbsp; &nbsp; &nbsp; &nbsp;
            <Button
              variant="contained"
              className={classes.secondaryGhostBtn}
              fullWidth
            >
              Withdraw
            </Button>
          </div>
        </Paper>
      </div>
    </form>
  );
};

export default Accounts;