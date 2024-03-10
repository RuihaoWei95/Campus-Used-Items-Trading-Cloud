import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Cookies from 'js-cookie';


function Home() {
    const [data, setData] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate
    

    const checkout = async () => {
        try{
            const userId=Cookies.get('userId');
            console.log(userId);
            const response = await fetch('https://akw32cdnu2.execute-api.us-west-1.amazonaws.com/beta/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "operation":"checkout",
                    "userId":userId,
                })
            })
            const data = await response.json();
            console.log(data)
            navigate('/order'); // Use navigate to redirect to login page
        }catch (err) {
            console.error('Error fetching data: ', err);
        }
    }

    useEffect(() => {
        const userId=Cookies.get('userId');
        // Example function to fetch data
        const fetchData = async () => {
            try {
                const response = await fetch('https://akw32cdnu2.execute-api.us-west-1.amazonaws.com/beta/show_cart', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'operation': 'show_cart',
                        "userId":userId
                    })
                })

                const jsonData = await response.json();
                const arr=JSON.parse(jsonData.body);
                setData(arr);
                console.log(arr);
            } catch (err) {
                console.error('Error fetching data: ', err);
            }
            
        };

        fetchData();
        console.log(data)
    }, []);

    return (
        <div>
            <div className='item-container'>
                {data.map(item => (
                    <li key={item.ProductID}>
                        {/*<p>{JSON.stringify(item, null, 2)}</p> */}
                        
                        <div className='card'>
                            <h3> Name: {item.ProductName}</h3> <br /> 
                            <p> $: {item.TotalPrice}</p><br />
                            <p> quantity: {item.Quantity}</p><br />
                            <br />
                            
                        </div>

                    </li>
                ))}
            </div>
            <div >
                <input type="button" value={'CheckOut'} onClick={()=>checkout()}/>
            </div>

      </div>

      );
      
}

export default Home;
