import React, { useState } from 'react';
import { Paper, Tooltip, Typography } from '@mui/material';
import SwapVertIcon from "@mui/icons-material/SwapVert";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import AddBusinessOutlinedIcon from "@mui/icons-material/AddBusinessOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import MoneyOffOutlinedIcon from "@mui/icons-material/MoneyOffOutlined";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import Colevis from './Colevis';
// import P2PPayments from './P2PPayments';

function Home() {
  const iconNames = [
    "P2P Payments",
    "P2P Loans",
    "RO-RO Loans",
    "P2R Surplus Fund Transfer",
    "Payments",
    "R2C Surplus Fund Transfer",
    "Receipt from RO",
    "CO Levis",
    "Asset Funds",
    "Term Loan Set off",
    "Reserves",
  ];

  const [selectedIcon, setSelectedIcon] = useState(null);

  const handleIconClick = (name) => {
    setSelectedIcon(name);
  };

  // Function to get an icon by name with increased size
  function getIconByName(name) {
    const iconSize = 45; // Adjust the size as needed

    const iconStyle = {
      fontSize: `${iconSize}px`,
      cursor: 'pointer',
      boxShadow: selectedIcon === name ? '0px 4px 6px rgba(0, 0, 0, 0.7)' : 'none',
      border: 'none',
      padding: '9px',
      borderRadius: '20%',
      transition:
        'background-color 0.3s, border 0.3s, border-radius 0.3s, opacity 0.3s, padding 0.3s',
    };

    switch (name) {
      case 'P2P Payments':
        return <SwapVertIcon style={iconStyle} />;
      case 'P2P Loans':
        return <CurrencyRupeeIcon style={iconStyle} />;
      case 'RO-RO Loans':
        return <CreditCardIcon style={iconStyle} />;
      case 'P2R Surplus Fund Transfer':
        return <AccountBalanceWalletOutlinedIcon style={iconStyle} />;
      case 'Payments':
        return <PaymentsOutlinedIcon style={iconStyle} />;
      case 'R2C Surplus Fund Transfer':
        return <AddBusinessOutlinedIcon style={iconStyle} />;
      case 'Receipt from RO':
        return <ReceiptOutlinedIcon style={iconStyle} />;
      case 'CO Levis':
        return <RequestQuoteOutlinedIcon style={iconStyle} />;
      case 'Asset Funds':
        return <AccountBalanceOutlinedIcon style={iconStyle} />;
      case 'Term Loan Set off':
        return <MoneyOffOutlinedIcon style={iconStyle} />;
      case 'Reserves':
        return <LocalAtmOutlinedIcon style={iconStyle} />;
      default:
        return null;
    }
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <Paper style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: "#C9CCF9", display: "flex", padding: "9px", justifyContent: "space-around", alignItems: "center", flexWrap: "wrap", height: '8vh' }}>
        <div ><Typography style={{ fontSize: '20px', fontFamily: "Verdana", fontWeight: "500" }} >FUND FLOWS</Typography></div>
        {iconNames.map((name, index) => (
          <Tooltip
            title={name}
            key={index}
            style={{
              border: "none",
              padding: "9px",
              borderRadius: "20%",
              transition: 'background-color 0.3s, border 0.3s, border-radius 0.3s, opacity 0.3s, padding 0.3s',
              cursor: 'pointer',
              boxShadow: selectedIcon === name ? '0px 4px 6px rgba(0, 0, 0, 0.7)' : 'none',
            }}
            onClick={() => handleIconClick(name)}
          >
            {getIconByName(name)}
          </Tooltip>
        ))}
      </Paper>

      {selectedIcon && (
        <Paper style={{ position: 'relative', backgroundColor: "white", paddingTop: "1vh", borderRadius: "2vh", width: '100%' }}>
          {selectedIcon === 'P2P Payments' && (
            // Content for 'P2P Payments' icon
            <div>
              {/* Add your content here */}
            </div>
          )}
          {selectedIcon === 'CO Levis' && (
            <Colevis />
          )}
        </Paper>
      )}
    </div>
  );
}

export default Home;
