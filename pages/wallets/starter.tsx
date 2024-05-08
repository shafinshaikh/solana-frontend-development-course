// imports methods relevant to the react framework
import * as React from 'react';
// library we use to interact with the solana json rpc api
import * as web3 from '@solana/web3.js';
// allows us access to methods and components which give us access to the solana json rpc api and user's wallet data
import * as walletAdapterReact from '@solana/wallet-adapter-react'; 
// allows us to choose from the available wallets supported by the wallet adapter
import * as walletAdapterWallets from '@solana/wallet-adapter-wallets';
// imports a component which can be rendered in the browser
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
// applies the styling to the components which are rendered on the browser
require('@solana/wallet-adapter-react-ui/styles.css');
// imports methods for deriving data from the wallet's data store
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

const Starter = () => {
    const [balance, setBalance ] = React.useState<number | null>(0);

    const endpoint = web3.clusterApiUrl("devnet");

    const wallets = [
        new walletAdapterWallets.PhantomWalletAdapter(),
        new walletAdapterWallets.SolflareWalletAdapter()
    ];

    const { connection } = useConnection();
    const { publicKey } = useWallet();

    React.useEffect( () => {
        const getInfo = async() => {
            if (connection && publicKey) {
            const info = await connection.getAccountInfo(publicKey);
            setBalance(info!.lamports / web3.LAMPORTS_PER_SOL);
            }
        }
        getInfo();

    }, [connection, publicKey]);

    return(
    <>
    <div className='text-white'>hello ur balance is: {balance} </div>
    </>
    )
};

export default Starter;