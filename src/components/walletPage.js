import React, { useState, useEffect } from 'react';

import { useWeb3 } from "../contexts/useWeb3.js"



function WalletPage() {
    const {
        sendCUSD,
        getUserAddress,
        address
    } = useWeb3();

    const [walletAddress, setWalletAddress] = useState('');
    const [amount, setAmount] = useState('');

    const [displayText, setDisplayText] = useState('');

    const handleWalletAddressChange = (event) => {
        setWalletAddress(event.target.value);
    };

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    async function sendingCUSD() {
        if (walletAddress) {
            setDisplayText(`Sending ${amount} to wallet address: ${walletAddress}`);
            try {
                const tx = await sendCUSD(walletAddress, amount);
                console.log(tx)
                setDisplayText(tx.transactionHash);
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        getUserAddress();
    }, []);

    return (
        <div>
            <h1>Wallet Page</h1>
            <h2>{address}</h2>
            <div>
                <label htmlFor="walletAddressInput">Wallet Address:</label>
                <input
                    type="text"
                    id="walletAddressInput"
                    value={walletAddress}
                    onChange={handleWalletAddressChange}
                />
            </div>
            <div>
                <label htmlFor="amountInput">Amount:</label>
                <input
                    type="text"
                    id="amountInput"
                    value={amount}
                    onChange={handleAmountChange}
                />
            </div>
            <button onClick={sendingCUSD}>Send</button>
            <div>
                {/* Text component below the inputs */}
                <p>{displayText}</p>
            </div>
        </div>
    );
}

export default WalletPage;
