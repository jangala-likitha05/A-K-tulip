import React, { useState } from 'react';
import './about.css';

const About = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    FlatNo: '',
    Title: '',
    Description: '',
    BedRooms: '',
    BathRooms: '',
    Furnishing: '',
    Area: '',
    BachelorsAllowed: '',
    CarParking: '',
    Facing: '',
    Price: '',
    Status: ''
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send POST request to backend to register the vehicle
    fetch('https://api.datalabs.info/api/aktulip/PostClassifiedAd', { // Replace with your actual backend URL
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData), // Convert object to JSON string
    })
      .then((response) => {
        if (response.ok) {
          setSuccessMessage('Successfully posted.'); // Set success message
          if (onRegister) {
            onRegister(formData);
          }
          // Clear form data after successful submission
          setFormData({
            FlatNo: '',
            Title: '',
            Description: '',
            BedRooms: '',
            BathRooms: '',
            Furnishing: '',
            Area: '',
            BachelorsAllowed: '',
            CarParking: '',
            Facing: '',
            Price: '',
            Status: ''
          });
        } else {
          console.error('Error registering form');
        }
      })
      .catch((error) => console.error('Error:', error));
  };



  return (
    <div className='mt-3'>
      <form className="form" onSubmit={handleSubmit}>
        <p className="field required">
          <label className="label required" htmlFor="flatNo">Flat No</label>
          <input className="text-input" type="text" id="flatNo" name="FlatNo" value={formData.FlatNo} onChange={handleInputChange} />
        </p>
        <p className="field required">
          <label className="label required" htmlFor="title">Title</label>
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input type="checkbox" name="Title" value="Rent" checked={formData.Title === 'Rent'} onChange={handleInputChange} />
              Rent
            </label>
            <label className="checkbox-label">
              <input type="checkbox" name="Title" value="Sale" checked={formData.Title === 'Sale'} onChange={handleInputChange} />
              Sale
            </label>
          </div>
        </p>
        <p className="field">
          <label className="label" htmlFor="description">Description</label>
          <textarea className="textarea" id="description" name="Description" value={formData.Description} onChange={handleInputChange} cols="50" rows="4"></textarea>
        </p>
        <p className="field required half">
          <label className="label required" htmlFor="bedrooms">Bedrooms</label>
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input type="checkbox" name="BedRooms" value="1" checked={formData.BedRooms === "1"} onChange={handleInputChange} />
              1
            </label>
            <label className="checkbox-label">
              <input type="checkbox" name="BedRooms" value="2" checked={formData.BedRooms === "2"} onChange={handleInputChange} />
              2
            </label>
            <label className="checkbox-label">
              <input type="checkbox" name="BedRooms" value="3" checked={formData.BedRooms === "3"} onChange={handleInputChange} />
              3
            </label>
          </div>
        </p>
        <p className="field required half">
          <label className="label required" htmlFor="bathrooms">Bathrooms</label>
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input type="checkbox" name="BathRooms" value="1" checked={formData.BathRooms === "1"} onChange={handleInputChange} />
              1
            </label>
            <label className="checkbox-label">
              <input type="checkbox" name="BathRooms" value="2" checked={formData.BathRooms === "2"} onChange={handleInputChange} />
              2
            </label>
            <label className="checkbox-label">
              <input type="checkbox" name="BathRooms" value="3" checked={formData.BathRooms === "3"} onChange={handleInputChange} />
              3
            </label>
          </div>
        </p>
        <p className="field required">
          <label className="label required" htmlFor="furnishing">Furnishing</label>
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input type="checkbox" name="Furnishing" value="Full" checked={formData.Furnishing === 'Full'} onChange={handleInputChange} />
              Full
            </label>
            <label className="checkbox-label">
              <input type="checkbox" name="Furnishing" value="Semi" checked={formData.Furnishing === 'Semi'} onChange={handleInputChange} />
              Semi
            </label>
            <label className="checkbox-label">
              <input type="checkbox" name="Furnishing" value="Unfurnished" checked={formData.Furnishing === 'Unfurnished'} onChange={handleInputChange} />
              Unfurnished
            </label>
          </div>
        </p>
        <p className="field required">
          <label className="label required" htmlFor="area">Area (in Number eg:1250)</label>
          <input className="text-input" type="text" id="area" name="Area" value={formData.Area} onChange={handleInputChange} required />
        </p>
        <p className="field required half">
          <label className="label required" htmlFor="bachelorsAllowed">Bachelors Allowed</label>
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input type="checkbox" name="BachelorsAllowed" value="Allowed" checked={formData.BachelorsAllowed === 'Allowed'} onChange={handleInputChange} />
              Allowed
            </label>
            <label className="checkbox-label">
              <input type="checkbox" name="BachelorsAllowed" value="Not Allowed" checked={formData.BachelorsAllowed === 'Not Allowed'} onChange={handleInputChange} />
              Not Allowed
            </label>
          </div>
        </p>
        <p className="field required half">
          <label className="label required" htmlFor="carParking">Car Parking</label>
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input type="checkbox" name="CarParking" value="1" checked={formData.CarParking === "1"} onChange={handleInputChange} />
              1
            </label>
            <label className="checkbox-label">
              <input type="checkbox" name="CarParking" value="2" checked={formData.CarParking ==="2"} onChange={handleInputChange} />
              2
            </label>
            <label className="checkbox-label">
              <input type="checkbox" name="CarParking" value="3" checked={formData.CarParking === "3"} onChange={handleInputChange} />
              3
            </label>
          </div>
        </p>
        <p className="field required">
          <label className="label required" htmlFor="facing">Facing</label>
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input type="checkbox" name="Facing" value="East" checked={formData.Facing === 'East'} onChange={handleInputChange} />
              East
            </label>
            <label className="checkbox-label">
              <input type="checkbox" name="Facing" value="North-East" checked={formData.Facing === 'North-East'} onChange={handleInputChange} />
              North-East
            </label>
            <label className="checkbox-label">
              <input type="checkbox" name="Facing" value="West" checked={formData.Facing === 'West'} onChange={handleInputChange} />
              West
            </label>
          </div>
        </p>
        <p className="field required">
          <label className="label required" htmlFor="price">Price</label>
          <input className="text-input" type="number" id="price" name="Price" value={formData.Price} onChange={handleInputChange} required />
        </p>
        <p className="field required half">
          <label className="label required" htmlFor="status">Status</label>
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input type="checkbox" name="Status" value="Available" checked={formData.Status === 'Available'} onChange={handleInputChange} />
              Available
            </label>
            <label className="checkbox-label">
              <input type="checkbox" name="Status" value="Occupied" checked={formData.Status === 'Occupied'} onChange={handleInputChange} />
              Occupied
            </label>
          </div>
        </p>
        {successMessage && (
          <p className="field success-message">{successMessage}</p>
        )}
        <p className="field">
          <input className="button-post" type="submit" value="Post" />
        </p>
      </form>
    </div>
  );
};

export default About;
