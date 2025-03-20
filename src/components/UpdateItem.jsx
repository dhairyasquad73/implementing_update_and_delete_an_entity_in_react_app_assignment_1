import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateItem = () => {
  const { id: itemID } = useParams(); // Get itemID from the route
  const API_URL = `http://${import.meta.env.VITE_API_URI}/doors`;

  // 1. Create a state for the form
  const [item, setItem] = useState(null);
  const [updateValue, setUpdateValue] = useState("");
  const [updating, setUpdating] = useState(false);

  // 2. Fetch the item details
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`${API_URL}/${itemID}`);
        setItem(response.data);
        setUpdateValue(response.data.name);
      } catch (err) {
        console.error(`Error fetching item: ${err.message}`);
      }
    };
    if (itemID) {
      fetchItem();
    }
  }, [itemID]);

  // 3. Handle input changes
  const handleInputChange = (e) => {
    setUpdateValue(e.target.value);
  };

  // 4. Handle item update
  const handleUpdate = async () => {
    if (!updateValue.trim()) {
      alert("Name cannot be empty.");
      return;
    }

    setUpdating(true);
    try {
      const response = await axios.put(`${API_URL}/${itemID}`, {
        name: updateValue,
      });
      setItem(response.data);
      alert("Item updated successfully!");
    } catch (err) {
      console.error(`Error updating item: ${err.message}`);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div>
      <h2>Update Item</h2>
      {item ? (
        <div>
          <p>Current Name: {item.name}</p>
          <input
            type="text"
            value={updateValue}
            onChange={handleInputChange}
            disabled={updating}
          />
          <button onClick={handleUpdate} disabled={updating}>
            {updating ? "Saving..." : "Update"}
          </button>
        </div>
      ) : (
        <p>Loading item...</p>
      )}
    </div>
  );
};

export default UpdateItem;
