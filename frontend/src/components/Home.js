import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';


function Home() {
    const [data, setData] = useState([]);
    


    const addToCart = async (productId) => {
        try{
            const userId=Cookies.get('userId');
            console.log(userId);
            console.log(productId);
            const response = await fetch('https://akw32cdnu2.execute-api.us-west-1.amazonaws.com/beta/purchase', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'operation': 'purchase',
                    "quantity":1,
                    "userId":userId,
                    "productId":productId
                })
            })
            const data = await response.json();
            console.log(data)
            alert("Product added to cart successfully!")
        }catch (err) {
            console.error('Error fetching data: ', err);
        }
    }

    useEffect(() => {
        // Example function to fetch data
        const fetchData = async () => {
            try {
                const response = await fetch('https://akw32cdnu2.execute-api.us-west-1.amazonaws.com/beta/query', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'operation': 'query'
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
            <div className={'titleContainer'}>
                <div>Welcome to Campus Used Items Trading Center!</div>
            </div>
            <div className='item-container'>
                {data.map(item => (item.Quantity>0 &&
                    (<li key={item.ProductID}>
                        {/*<p>{JSON.stringify(item, null, 2)}</p> */}
                        
                        <div className='card'>
                            <h3> Name: {item.Name}</h3> <br /> 
                            <p>Description: {item.Description}</p> <br />
                            <p> $: {item.Price}</p><br />
                            <p> quantity: {item.Quantity}</p><br />
                        
                            <div >
                                <input type="button" value={'Add to Cart'} onClick={()=>addToCart(item.ProductID)}/>
                            </div>
                            <br />
                            
                        </div>

                    </li>)
                ))}
            </div>
            

      </div>

      );
      
}

export default Home;
