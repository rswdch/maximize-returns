import React from "react";
import { useState, useEffect, createContext } from "react";
import TableHead from "../components/TableHead.jsx";
import AuthedNavbar from "./AuthedNavbar.jsx";
import ItemForm from "../components/ItemForm.jsx";
import { PurchaseContext } from "../contexts/PurchaseContext.jsx";

const Dashboard = ({ user }) => {
  const [purchases, setPurchases] = useState({});
  const [isFetched, setFetched] = useState(false);
  const [isEmpty, setEmpty] = useState(true);

  useEffect(() => {
    console.log("The token in fetch is");
    console.log(localStorage.getItem("token"));
    fetch(`/api/purchases`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log("Need to log in then");
        const dummyData = {
          product: "Welcome",
          store: "Create your first item",
          price: 0,
          purchase_date: "0",
          return_days: 90,
          warranty_days: 90,
          returned: true,
        };
        console.log(res);
        return res.json() || dummyData;
      })
      .then((data) => {
        if (data.length > 0) {
          setEmpty(false);
        }
        setPurchases(data);
        setFetched(true);
        console.log(Object.keys(data[0]));
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const columns = [
    { label: "Item", accessor: "product" },
    { label: "Store", accessor: "store" },
    { label: "Price", accessor: "price" },
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
          {isFetched && !isEmpty ? (
            purchases.map((el) => (
              <tr key={el.id}>
                <td>{el.product}</td>
                <td>{el.store}</td>
                <td>{el.price}</td>
                <td>{new Date(el.purchase_date).toLocaleDateString()}</td>
                <td>{el.return_days}</td>
                <td>{el.warranty_days}</td>
                <td>{el.returned ? "Returned" : "In your inventory"}</td>
                <td>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(el.id)}
                  >
                    Modify
                  </button>
                  <button className="btn" onClick={() => handleDelete(el.id)}>
                    Delete
                  </button>
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
      <PurchaseContext.Provider value={[purchases, setPurchases]}>
        <ItemForm setEmpty={setEmpty} />
      </PurchaseContext.Provider>
    </div>
  );
};

export default Dashboard;
