import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function CreatItem() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState(""); // Added state for email
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate


  const handleCreateItem = async (e) => {
    e.preventDefault();
    const backendUrl = "https://akw32cdnu2.execute-api.us-west-1.amazonaws.com/beta/register";
    const CreateItemData = {
      name,
      description,
      price,
      quantity
    };
    try {
      const response = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(CreateItemData),
      });

      const data = await response.json();
      console.log(data)
      if (data.statusCode === 200) {
        console.log("Creat Item successful");
        navigate('/'); // Use navigate to redirect to home page
      } else {
        console.error("Creat Item failed");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div className='mainContainer'>
      <div className="form">
        <div className={'titleContainer'}>CREATE AN Item</div>
        <br />
        <form>
          <div className='inputContainer'>
            <input
                type="text"
                id="name"
                placeholder="Enter the item name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='inputBox'
            />
            <br />
          </div>
          <div className='inputContainer'>
            <input
                type="text"
                id="description" // Fix the id to match the label
                placeholder="Enter the item Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='inputBox'
            />
            <br />
          </div>
          <div className='inputContainer'>
            <input
                type="text"
                id="price" // Fix the id to match the label
                placeholder="Enter the item price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className='inputBox'
            />
            <br />
          </div>
          <div className='inputContainer'>
            <input
                type="text"
                id="quantity" // Fix the id to match the label
                placeholder="Enter the item quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className='inputBox'
            />
            <br />
          </div>
          <div className='inputButton'>
            <input className={'inputButton'} type="button" onClick={handleCreateItem} value={'Submit'} />
          </div>
        </form>
      </div>
    </div>
  );
}
