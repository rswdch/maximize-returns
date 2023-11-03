import React from "react";
import { useContext } from "react";
import { PurchaseContext } from "../contexts/PurchaseContext.jsx";

const ItemForm = ({ setEmpty }) => {
  const [purchases, setPurchases] = useContext(PurchaseContext);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const formObj = Object.fromEntries(formData.entries());
      formObj.return_days = parseInt(formObj.return_days);
      formObj.warranty_days = parseInt(formObj.warranty_days);
      formObj.price = parseFloat(formObj.price);
      formObj.returned = false;
      const formJson = JSON.stringify(formObj);
      console.log(formJson);
      const result = await fetch("/api/purchases", {
        method: "POST",
        body: formJson,
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      const newItem = await result.json();
      console.log(newItem);
      const newPurchases = purchases.concat(newItem);
      setPurchases(newPurchases);
      document.querySelector(".form").reset();
      setEmpty(false);
    } catch (error) {
      console.error("Item creation error");
    }
  }
  return (
    <section className="section">
      <form method="post" onSubmit={handleSubmit} className="form">
        <div className="form-row">
          <label htmlFor="product_name" className="form-label">
            Product Name
          </label>
          <input
            type="text"
            name="product_name"
            className="form-input"
            id="product_name"
          />
        </div>
        <div className="form-row">
          <label htmlFor="store_name" className="form-label">
            Store Name
          </label>
          <input
            type="text"
            name="store_name"
            className="form-input"
            id="store_name"
          />
        </div>
        <div className="form-row">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            step="0.01"
            name="price"
            className="form-input"
            id="price"
          />
        </div>
        <div className="form-row">
          <label htmlFor="purchase_date" className="form-label">
            Purchase Date
          </label>
          <input
            type="date"
            name="purchase_date"
            className="form-input"
            id="store_name"
          />
        </div>
        <div className="form-row">
          <label htmlFor="return_days" className="form-label">
            Return Policy Days
          </label>
          <input
            type="number"
            name="return_days"
            className="form-input"
            id="return_days"
          />
        </div>
        <div className="form-row">
          <label htmlFor="warranty_days" className="form-label">
            Warranty Period Days
          </label>
          <input
            type="number"
            name="warranty_days"
            className="form-input"
            id="warranty_days"
          />
        </div>
        <button type="submit" className="btn btn-block">
          Submit
        </button>
      </form>
    </section>
  );
};

export default ItemForm;
