import {
  WalletMultiButton,
  WalletDisconnectButton,
} from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

function Navbar() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  return (
    <div className="flex flex-row items-center justify-between w-full p-4 px-10 space-x-4 py-7">
      {/* left container */}
      <div className="flex flex-col items-center justify-center">
        <div className="text-5xl font-black">Exira</div>
      </div>

      {/* right container */}
      <div className="flex flex-row items-center justify-center gap-x-4">
        <div className="flex flex-row mr-6 gap-x-12">
          <p className="text-md ">Home</p>
          <p className="text-md ">About Us</p>
          <p className="text-md ">How it works?</p>
        </div>
        <div className="flex flex-row gap-x-4">
          <WalletMultiButton
            style={{
              backgroundColor: "black",
              padding: "1rem",
              height: "40px",
              marginTop: "5px",
              fontSize: "15px",
              borderRadius: "10px",
            }}
          />
          {connection && publicKey ? (
            <WalletDisconnectButton
              style={{
                backgroundColor: "black",
                padding: "1rem",
                height: "40px",
                marginTop: "5px",
                fontSize: "15px",
                borderRadius: "10px",
              }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
