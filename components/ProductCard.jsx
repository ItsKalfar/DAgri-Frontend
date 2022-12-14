import React, { useState, useContext, useEffect } from "react";
import Modal from "react-modal";
import { MdClose, MdContentCopy } from "react-icons/md";
import { ProjectContext } from "../context/ProjectContext";
import { FaEthereum } from "react-icons/fa";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-hot-toast";
import { ethers } from "ethers";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    padding: "0 0 0 0",
    zIndex: "100",
  },
};

export default function ProductCard({
  name,
  tokenID,
  quantity,
  price,
  Category,
  Seller,
}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newPrice, setNewPrice] = useState(0n);
  const [sellerAddress, setSellerAddress] = useState();
  const {
    currentAccount,
    cancelProduct,
    updateProduct,
    buyProduct,
    purchaseProduct,
    userProfession,
  } = useContext(ProjectContext);

  useEffect(() => {
    if (currentAccount === Seller.toLowerCase()) {
      setSellerAddress("You");
    } else {
      let seller = Seller.slice(0, 5) + "..." + Seller.slice(38, 42);
      setSellerAddress(seller);
    }
  });

  const handleCancel = () => {
    cancelProduct(tokenID);
    setModalIsOpen(!modalIsOpen);
  };

  const handleUpdate = () => {
    updateProduct(tokenID, newPrice);

    setModalIsOpen(!modalIsOpen);
  };

  const handleBuying = () => {
    buyProduct(tokenID, price);
    setModalIsOpen(!modalIsOpen);
  };

  const handlePurchase = () => {
    purchaseProduct(tokenID, price);
    setModalIsOpen(!modalIsOpen);
  };

  return (
    <>
      <Modal isOpen={modalIsOpen} style={customStyles}>
        <div className="bg-white px-12 py-14 rounded shadow-md border-gray-200 border-2 text-blac w-full flex flex-col items-center ">
          <div className="flex flex-col items-start mb-2 w-full">
            <MdClose
              onClick={() => setModalIsOpen(!modalIsOpen)}
              className="absolute top-4 right-6 cursor-pointer"
              size={24}
            />

            <h1 className="uppercase mb-8 text-3xl text-center font-bold ">
              product details
            </h1>

            <div className="block mb-6 text-md font-medium text-gray-900">
              Product Name : {name.toUpperCase()}
            </div>
            <div className="block mb-6 text-md font-medium text-gray-900">
              Product Id : {tokenID}
            </div>
            <div className="block mb-6 text-md font-medium text-gray-900">
              Product Category : {Category.toUpperCase()}
            </div>
            <p className="block mb-6 text-md font-medium text-gray-900">
              Total Quantity : {quantity} Kg
            </p>
            <div className="flex mb-6 text-md font-medium text-gray-900 items-start justify-center">
              Owned By :{" "}
              {currentAccount === Seller.toLowerCase() ? (
                "You"
              ) : (
                <div className="ml-1">{sellerAddress}</div>
              )}
            </div>
            <div>
              <div className="flex mb-6 text-md font-medium text-gray-900 items-start justify-center">
                Price : <FaEthereum className="mt-1 ml-2 mr-1" />{" "}
                {ethers.utils.formatEther(price)}
              </div>
            </div>
          </div>
          {currentAccount === Seller.toLowerCase() &&
          userProfession !== "distributer" ? (
            <div className="w-full ">
              <div className="mb-4 w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  New Price
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-700"
                  type="number"
                  min="0"
                  placeholder="Enter quantity in Kg..."
                  onChange={(e) => setNewPrice(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between w-2/6 md:w-full">
                <button
                  className="bg-red-500 hover:bg-red-900 rounded-full text-white  py-2 px-8 focus:outline-none focus:shadow-outline uppercase flex items-center justify-center cursor-pointer font-semibold"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-600 hover:bg-blue-900 rounded-full text-white  py-2 px-8 focus:outline-none focus:shadow-outline uppercase flex items-center justify-center cursor-pointer font-semibold"
                  onClick={handleUpdate}
                >
                  update
                </button>
              </div>
            </div>
          ) : userProfession == "distributer" ? (
            <div>
              <button
                className="bg-blue-600 hover:bg-blue-900 rounded-full text-white  py-2 px-8 focus:outline-none focus:shadow-outline uppercase flex items-center justify-center cursor-pointer font-semibold"
                onClick={handleBuying}
              >
                buy
              </button>
            </div>
          ) : (
            <div
              className="bg-blue-600 hover:bg-blue-900 rounded-full text-white  py-2 px-8 focus:outline-none focus:shadow-outline uppercase flex items-center justify-center cursor-pointer font-semibold"
              onClick={handlePurchase}
            >
              Purchase
            </div>
          )}
        </div>
      </Modal>
      <div className="bg-white shadow-lg px-6 py-8 rounded-lg z-10">
        <div
          className="py-1 px-4 bg-gray-200 rounded-full text-gray-500 flex items-center  mb-4 cursor-copy  w-1/2 "
          onClick={() => toast.success("Copied to Clipboard")}
        >
          <MdContentCopy className="mr-1" />
          <CopyToClipboard text={Seller.toLowerCase()}>
            <span>{sellerAddress}</span>
          </CopyToClipboard>
        </div>
        <div
          className="mb-4 cursor-pointer px-1"
          onClick={() => setModalIsOpen(!modalIsOpen)}
        >
          {" "}
          <div className="flex flex-col items-start mb-4 text-md font-medium text-gray-900">
            <div>Product Name :</div> <div>{name.toUpperCase()}</div>
          </div>
          <div className="block mb-4 text-md font-medium text-gray-900">
            Product Id : {tokenID}
          </div>
          <div className="block mb-4 text-md font-medium text-gray-900">
            Category : {Category.toUpperCase()}
          </div>
          <div className="block mb-4 text-md font-medium text-gray-900">
            Total Quantity : {quantity} Kg
          </div>
          <div className="flex mb-6 text-md font-medium text-gray-900 items-start">
            Price : <FaEthereum className="mt-1 ml-2 mr-1" />{" "}
            {ethers.utils.formatEther(price)}
          </div>
        </div>
      </div>
    </>
  );
}
