import React from "react";
import { useState, useEffect } from "react";
import TableHead from "../components/TableHead.jsx";
import AuthedNavbar from "./AuthedNavbar.jsx";

const Dashboard = ({ user }) => {
  const [purchases, setPurchases] = useState({});
  const [isFetched, setFetched] = useState(false);

  useEffect(() => {
    console.log("The token in fetch is");
    console.log(localStorage.getItem("token"));
    fetch(`/api/purchases`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPurchases(data);
        setFetched(true);
        console.log(Object.keys(data[0]));
      });
  }, []);

  const columns = [
    { label: "Item", accessor: "product" },
    { label: "Price", accessor: "price" },
    { label: "Store", accessor: "store" },
    { label: "Purchase Date", accessor: "purchase_date" },
    { label: "Return", accessor: "return_days" },
    { label: "Warranty", accessor: "warranty_days" },
    { label: "Item Location", accessor: "returned" },
    { label: "Action", accessor: "action" },
  ];

  const handleDelete = async (id) => {
    fetch(`/api/purchases/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }).then((res) => {
      const newPurchases = purchases.filter((el) => el.id !== id);
      setPurchases(newPurchases);
    });
  };

  return (
    <div>
      <AuthedNavbar />
      <h2>Welcome, {user}</h2>
      <h3>Here are your products</h3>
      <table className="table">
        <TableHead columns={columns} />
        <tbody>
          {isFetched ? (
            purchases.map((el) => (
              <tr key={el.id}>
                <td>{el.product}</td>
                <td>{el.price}</td>
                <td>{el.store}</td>
                <td>{new Date(el.purchase_date).toLocaleDateString()}</td>
                <td>{el.return_days}</td>
                <td>{el.warranty_days}</td>
                <td>{el.returned ? "Returned" : "In your inventory"}</td>
                <td>
                  <button onClick={() => handleDelete(el.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
