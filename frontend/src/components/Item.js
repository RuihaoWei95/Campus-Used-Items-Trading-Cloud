import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'; // Import useNavigate


function Home() {
    const [data, setData] = useState([]);
   

    const unlist = async (productId) => {
        try{
            const userId=Cookies.get('userId');
            console.log(userId);
            const response = await fetch('https://akw32cdnu2.execute-api.us-west-1.amazonaws.com/beta/unlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "operation":"unlist",
                    "requesterId":userId,
                    "productId":productId
                })
            })
            const data = await response.json();
            console.log(data)
            alert("Product unlisted successfully!")
            window.location.reload()
        }catch (err) {
            console.error('Error fetching data: ', err);
        }
    }

    useEffect(() => {
        const userId=Cookies.get('userId');
        // Example function to fetch data
        const fetchData = async () => {
            try {
                const response = await fetch('https://akw32cdnu2.execute-api.us-west-1.amazonaws.com/beta/find_product_by_seller', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'operation': 'find_product_by_seller',
                        "sellerId":userId
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

        <div >
            <div className={'titleContainer'}>
                    Wanna to sell something ? <Link to="/createitem"> Create An Item </Link>
            </div>
            <br />
            <div className='item-container'>
                {data.map(item => ( item.Quantity>0 && 
                    (<li key={item.ProductID}>
                        {/*<p>{JSON.stringify(item, null, 2)}</p> */}
                        
                        <div className='card'>
                            <h3> Name: {item.Name}</h3> <br /> 
                            <p>Description: {item.Description}</p> <br />
                            <p> $: {item.Price}</p><br />
                            <p> quantity: {item.Quantity}</p><br />
                            <br />
                            <div >
                                <input type="button" value={'Unlist'} onClick={()=>unlist(item.ProductID)}/>
                            </div>   
                        </div>
                    </li>)
                ))}
            </div>
        </div>


      );
      
}

export default Home;
