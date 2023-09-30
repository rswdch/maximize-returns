import React from "react";
import { useState, useEffect } from "react";

const Dashboard = ({user}) => {
  const [purchases, setPurchases] = useState({});
  const [isFetched, setFetched] = useState(false);

  useEffect(() => {
    console.log('The token in fetch is')
    console.log(localStorage.getItem('token'));
      fetch(`/api/purchases`, {
        headers: {
          'Authorization': localStorage.getItem('token'),
        }
      }).then((res) => {
        return res.json();
      }).then(data => {
        setPurchases(data);
        setFetched(true);
        console.log(Object.keys(data[0]));
      })
  }, [])

  return (
    <div>
      <h2>Welcome, {user}</h2>
      <h3>Here are your products</h3>
      { isFetched ? purchases.map(el => <tr>
        <th>{el.name}</th>
      </tr>) : <p>Loading...</p>}
    </div>
  )
}

export default Dashboard;
