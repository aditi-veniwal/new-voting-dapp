import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import Abi from "../contracts/Abi.json";
import { toast } from "sonner";

// Replace with your deployed contract address
const contractAdd = "0x029e6215943e44E78334a5c7b9804FCC35A31dB0";

const Login = ({ wallet }) => {
  const [walletConnected, setWalletConnected] = useState(false);
  const navigate = useNavigate();

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        toast.error("Please install MetaMask");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      if (accounts.length === 0) {
        toast.error("No accounts found");
        return;
      }

      const signer = await provider.getSigner();
      const signerAddress = await signer.getAddress();

      // ✅ Check network
      const network = await provider.getNetwork();
      if (network.chainId !== 11155111) { // Sepolia testnet chainId
        toast.error("Please switch to Sepolia test network");
        return;
      }

      const contract = new ethers.Contract(contractAdd, Abi.abi, signer);

      setWalletConnected(true);
      wallet(provider, contract, signerAddress);

      toast.success(`Wallet connected: ${signerAddress}`);
      navigate("/Dashboard");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Wallet connection failed");
    }
  };

  return (
    <div className="flex h-[90%]">
      <div className="w-[50%] bg-slate-50 flex justify-center items-center dark:bg-slate-800">
        <h1 className="text-[#4263EB] md:text-4xl">Voting Dapp</h1>
      </div>

      <div className="w-[48%] bg-slate-50 flex justify-center items-center dark:bg-slate-800">
        <button
          className="bg-[#4263EB] p-3 text-white rounded-md hover:bg-[#4e6dec]"
          onClick={connectWallet}
        >
          {walletConnected ? "Connected to Wallet" : "Connect Wallet"}
        </button>
      </div>
    </div>
  );
};

export default Login;





//       -------------------------------from here --------------------------------------
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ethers } from "ethers";
// import Abi from "../contracts/Abi.json";
// import { toast } from "sonner";
// import { network } from "../constants";

// // ✅ Your deployed contract address
// const contractAdd = "0x029e6215943e44E78334a5c7b9804FCC35A31dB0";

// const Login = ({ wallet }) => {
//   const [walletConnected, setWalletConnected] = useState(false);
//   const navigate = useNavigate();

//   const connectWallet = async () => {
//     try {
//       let provider, signer;

//       if (window.ethereum) {
//         // ✅ MetaMask
//         provider = new ethers.BrowserProvider(window.ethereum);
//         await provider.send("eth_requestAccounts", []);
//         signer = await provider.getSigner();
//         toast.success("Connected via MetaMask");
//       } else {
//         // ✅ Hardhat Localhost fallback
//         provider = new ethers.JsonRpcProvider(network.rpcUrl);
//         const accounts = await provider.listAccounts();
//         if (!accounts || accounts.length === 0) {
//           toast.error("No accounts found on Hardhat Localhost");
//           return;
//         }
//         signer = provider.getSigner(0);
//         toast.success("Connected to Hardhat Localhost");
//       }

//       // ✅ Contract instance with signer
//       const contract = new ethers.Contract(contractAdd, Abi.abi, signer);

//       setWalletConnected(true);

//       // ✅ Pass provider, contract, signerAddress separately (fixed here)
//       const signerAddress = await signer.getAddress();
//       wallet(provider, contract, signerAddress);

//       navigate("/Dashboard");
//     } catch (error) {
//       console.error(error);
//       toast.error(error.message || error.reason || "Wallet connection failed");
//     }
//   };

//   return (
//     <div className="flex h-[90%]">
//       <div className="w-[50%] bg-slate-50 flex justify-center items-center dark:bg-slate-800">
//         <h1 className="text-[#4263EB] md:text-4xl">Voting Dapp</h1>
//       </div>

//       <div className="w-[48%] bg-slate-50 flex justify-center items-center dark:bg-slate-800">
//         <button
//           className="bg-[#4263EB] p-3 text-white rounded-md hover:bg-[#4e6dec]"
//           onClick={connectWallet}
//         >
//           {walletConnected ? "Connected to Wallet" : "Connect Wallet"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Login;


// -----------------------------till here -----------------------------------------------


// --------------------------------------------------------------





// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ethers } from "ethers";
// import Abi from "../contracts/Abi.json";
// import { toast } from "sonner";
// import { network } from "../constants";

// const contractAdd = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // deployed contract

// const Login = ({ wallet }) => {
//   const [walletConnected, setWalletConnected] = useState(false);
//   const navigate = useNavigate();

//   const connectWallet = async () => {
//     try {
//       const provider = new ethers.JsonRpcProvider(network.rpcUrl);
//       const accounts = await provider.listAccounts();
//       const signer = provider.getSigner(accounts[0]); // use first Hardhat account

//       // Contract with signer for transactions
//       const contract = new ethers.Contract(contractAdd, Abi.abi, signer);

//       toast.success("Connected to Hardhat Localhost");
//       setWalletConnected(true);

//       // Pass provider, contract, signer address back to App.js
//       wallet(provider, contract, accounts[0]);

//       navigate("/Dashboard");
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   return (
//     <div className="flex h-[90%]">
//       <div className="w-[50%] bg-slate-50 flex justify-center items-center dark:bg-slate-800">
//         <h1 className="text-[#4263EB] md:text-4xl">Voting Dapp</h1>
//       </div>

//       <div className="w-[48%] bg-slate-50 flex justify-center items-center dark:bg-slate-800">
//         <button
//           className="bg-[#4263EB] p-3 text-white rounded-md hover:bg-[#4e6dec]"
//           onClick={connectWallet}
//         >
//           {walletConnected ? "Connected to Wallet" : "Connect Wallet"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Login;





















// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ethers } from "ethers";
// import Abi from "../contracts/Abi.json";
// import { toast } from "sonner";
// import { network } from "../constants"; // your constants.js

// // const contractAdd = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; // deployed contract address
// const contractAdd = "0x5FbDB2315678afecb367f032d93F642f64180aa3";


// const Login = ({ wallet }) => {
//   const [walletConnected, setWalletConnected] = useState(false);
//   const navigate = useNavigate();

//   const connectWallet = async () => {
//     try {
//       // Connect to Hardhat localhost via JsonRpcProvider
//       const provider = new ethers.JsonRpcProvider(network.rpcUrl);
//       const signer = provider.getSigner();
//       const contract = new ethers.Contract(contractAdd, Abi.abi, signer);

//       toast.success("Connected to Hardhat Localhost");
//       setWalletConnected(true);

//       // Pass provider, contract, signer back to App.js
//       wallet(provider, contract, signer.address);

//       navigate("/Dashboard");
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   return (
//     <div className="flex h-[90%]">
//       <div className="invisible md:visible w-[50%] bg-slate-50 h-[90%] flex flex-col justify-center items-center flex-wrap dark:bg-slate-800">
//         <div className="grid grid-rows-2 grid-flow-col w-[50%]">
//           <div>
//             <h1 className="text-[#4263EB] md:text-4xl">Voting Dapp</h1>
//           </div>
//           <div className="bg-yellow md:w-[90%] text-left">
//             <p className="font-extralight dark:text-white">
//               A decentralized Polling system for electing candidates in the
//               election, built completely using{" "}
//               <span className="font-bold">Blockchain Technology</span>.
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="w-[100%] h-[100%] -mt-10 md:mt-0 md:w-[48%] md:h-[90%] bg-slate-50 flex justify-center items-center absolute md:relative dark:bg-slate-800">
//         <div className="bg-white w-[90%] h-[80%] md:p-10 md:w-[70%] md:h-[95%] flex flex-col justify-center items-center space-y-20 rounded-xl dark:bg-slate-900 shadow-2xl dark:shadow-cyan-500/50">
//           <div>
//             <img
//               className="h-[95%] md:h-[100%] mr-1 md:mr-0"
//               src="https://voting-dapp.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fimage%2Fpublic%2Fsvg%2Flogo.b954829cff7fddca2bb11cc74a1876a5.svg&w=384&q=75"
//               alt=""
//             ></img>
//             <h1 className="text-[#4263EB] font-bold md:text-3xl text-2xl">
//               Votechain
//             </h1>
//           </div>

//           <div>
//             {walletConnected ? (
//               <button className="bg-[#4263EB] p-3 text-xl md:text-base rounded-md text-white hover:bg-[#4e6dec] shadow-2xl shadow-[#4e6dec] transition-all duration-700 hover:shadow-[0_3px_10px_rgb(0.4,0.4,0.4,0.4)] dark:hover:shadow-cyan-500/50">
//                 Connected to Wallet
//               </button>
//             ) : (
//               <button
//                 className="bg-[#4263EB] p-3 text-xl md:text-base rounded-md text-white hover:bg-[#4e6dec] shadow-2xl shadow-[#4e6dec] transition-all duration-700 hover:shadow-[0_3px_10px_rgb(0.4,0.4,0.4,0.4)] dark:hover:shadow-cyan-500/50"
//                 onClick={connectWallet}
//               >
//                 Connect Wallet
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;



















// // import React from "react";
// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { ethers } from "ethers";
// // import Abi from "../contracts/Abi.json";
// // import { toast } from "sonner";


// // const contractAdd = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

// // const Login = ({ wallet }) => {
// //   const [walletConnected, setWalletConnected] = useState(false);
// //   const navigate = useNavigate();

// //   const connectWallet = async () => {
// //     // console.log(window.ethereum.chainId)
// //     if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
// //       if (window.ethereum.chainId === "0xaa36a7") {
// //         try {
// //           const provider = new ethers.BrowserProvider(window.ethereum);
// //           await provider.send("eth_requestAccounts", []);
// //           const signer = await provider.getSigner();
// //           const contract = new ethers.Contract(contractAdd, Abi.abi, signer);
// //           toast.success("Metamask connected");
// //           setWalletConnected(true);
// //           wallet(provider, contract, signer.address);
// //           navigate("/Dashboard");
// //         } catch (error) {
// //           toast.error(error.message);
// //         }
// //       } else {
// //         toast.error("Please select Sepolia test network");
// //       }
// //     } else {
// //       toast.error("Please install metamask");
// //     }
// //   };

// //   return (
// // <div className="flex h-[90%]  ">
// //   <div className="invisible md:visible w-[50%] bg-slate-50 h-[90%] flex flex-col justify-center items-center flex-wrap dark:bg-slate-800 ">

// //     <div className="grid grid-rows-2 grid-flow-col w-[50%] ">
// //       <div>
// //         <h1 className=" text-[#4263EB] md:text-4xl  ">Voting Dapp</h1>
// //       </div>
// //       <div className="bg-yellow md:w-[90%] text-left ">
// //         <p className="font-extralight dark:text-white">
// //           A deccentralized Polling system for electing candidates in the
// //           election, build complelety using{" "}
// //           <span className="font-bold ">Blockchain Technology</span>.{" "}
// //         </p>
// //       </div>
// //     </div>

// //   </div>

// //   <div className="w-[100%] h-[100%] -mt-10 md:mt-0 md:w-[48%] md:h-[90%] bg-slate-50 flex justify-center items-center  absolute md:relative dark:bg-slate-800  ">
    
// //     <div className="bg-white w-[90%] h-[80%] md:p-10 md:w-[70%] md:h-[95%] flex flex-col justify-center items-center space-y-20  rounded-xl dark:bg-slate-900 shadow-2xl  dark:shadow-cyan-500/50  ">
// //       <div>
// //         <img
// //           className="h-[95%] md:h-[100%] mr-1 md:mr-0"
// //           src="https://voting-dapp.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fimage%2Fpublic%2Fsvg%2Flogo.b954829cff7fddca2bb11cc74a1876a5.svg&w=384&q=75"
// //           alt=""
// //         ></img>
// //         <h1 className=" text-[#4263EB] font-bold md:text-3xl text-2xl">
// //           Votechain
// //         </h1>
// //       </div>

// //       <div>
// //         {walletConnected ? 
// //         (
// //           <button className=" bg-[#4263EB] p-3 text-xl md:text-base  rounded-md text-white hover:bg-[#4e6dec] shadow-2xl shadow-[#4e6dec]  transition-all duration-700 hover:shadow-[0_3px_10px_rgb(0.4,0.4,0.4,0.4)] dark:hover:shadow-cyan-500/50">
// //             Connected to Wallet
// //           </button>
// //         ) : (
// //           <button
// //             className=" bg-[#4263EB] p-3 text-xl md:text-base  rounded-md text-white hover:bg-[#4e6dec] shadow-2xl shadow-[#4e6dec] transition-all duration-700 hover:shadow-[0_3px_10px_rgb(0.4,0.4,0.4,0.4)] dark:hover:shadow-cyan-500/50"
// //             onClick={connectWallet}
// //           >
// //             Connect Wallet
// //           </button>
// //         )}

// //       </div>
// //     </div>
// //   </div>

// // </div> 
// //   );
// // };

// // export default Login;

// // // localStorage.setItem("provider",JSON.stringify(provider))
// // // sessionStorage.setItem("contract",JSON.stringify(contract))
// // // sessionStorage.setItem("signer",JSON.stringify(signer))
// // // console.log(JSON.parse(localStorage.getItem("provider")))
// // // console.log(JSON.parse(sessionStorage.getItem("contract")))
// // // console.log((JSON.parse(sessionStorage.getItem("signer"))).address)
// // // console.log( typeof provider)
// // // console.log(signer.address)
// // // console.log(contract)

// // // Storage.prototype.setObject = function(key, value) {
// // //   this.setItem(key, JSON.stringify(value));
// // // }
// // // wallet(provider,JSON.parse(sessionStorage.getItem("contract")),JSON.parse(sessionStorage.getItem("signer")))

// // {/* <div className="flex h-[90%] ">
// // <div className="w-[50%] bg-slate-50 h-[90%] flex flex-col justify-center items-center flex-wrap dark:bg-slate-800 ">

// //   <div className="grid grid-rows-2 grid-flow-col w-[50%] ">
// //     <div>
// //       <h1 className=" text-[#4263EB] md:text-4xl  ">Voting Dapp</h1>
// //     </div>
// //     <div className="bg-yellow md:w-[90%] text-left ">
// //       <p className="font-extralight dark:text-white">
// //         A deccentralized Polling system for electing candidates in the
// //         election, build complelety using{" "}
// //         <span className="font-bold ">Blockchain Technology</span>.{" "}
// //       </p>
// //     </div>
// //   </div>

// // </div>

// // <div className="w-[48%] h-[90%] bg-slate-50 flex justify-center items-center flex-col relative dark:bg-slate-800  ">
  
// //   <div className="bg-white w-[70%] h-[95%] flex flex-col justify-center items-center space-y-20  rounded-xl dark:bg-slate-900 shadow-2xl  dark:shadow-cyan-500/50  ">
// //     <div>
// //       <img
// //         className="h-[100%]  "
// //         src="https://voting-dapp.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fimage%2Fpublic%2Fsvg%2Flogo.b954829cff7fddca2bb11cc74a1876a5.svg&w=384&q=75"
// //         alt=""
// //       ></img>
// //       <h1 className=" text-[#4263EB] font-bold md:text-3xl  ">
// //         Votechain
// //       </h1>
// //     </div>

// //     <div>
// //       {walletConnected ? 
// //       (
// //         <button className=" bg-[#4263EB] p-3 rounded-md text-white hover:bg-[#4e6dec] shadow-2xl shadow-[#4e6dec]  transition-all duration-700 hover:shadow-[0_3px_10px_rgb(0.4,0.4,0.4,0.4)] dark:hover:shadow-cyan-500/50">
// //           Connected to Wallet
// //         </button>
// //       ) : (
// //         <button
// //           className=" bg-[#4263EB] p-3 rounded-md text-white hover:bg-[#4e6dec] shadow-2xl shadow-[#4e6dec] transition-all duration-700 hover:shadow-[0_3px_10px_rgb(0.4,0.4,0.4,0.4)] dark:hover:shadow-cyan-500/50"
// //           onClick={connectWallet}
// //         >
// //           Connect Wallet
// //         </button>
// //       )}

// //     </div>
// //   </div>
// // </div>

// // </div> */}