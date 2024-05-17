import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css';

const Home = () => {
  const [classifieds, setClassifieds] = useState([]);
  const [selectedFlat, setSelectedFlat] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState('all'); // State variable for filter
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://api.datalabs.info/api/aktulip/GetClassifieds');
        const data = await response.json();
        setClassifieds(data);
      } catch (error) {
        console.error('Error fetching classifieds:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleReadMore = (flat) => {
    setSelectedFlat(flat);
    setShowModal(true);
  };

  const handleEdit = (flat) => {
    setSelectedFlat(flat);
    navigate('/about');
  };
  const handleDelete = async (flat) => {
  try {
    const response = await fetch(`https://api.datalabs.info/api/aktulip/DeleteClassifiedAd/${flat.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // If the delete request is successful, remove the item from the classifieds state
      setClassifieds(classifieds.filter(item => item.id !== flat.id));
      console.log('Item deleted successfully.');
    } else {
      console.error('Error deleting item:', response.status);
    }
  } catch (error) {
    console.error('Error deleting item:', error);
  }
};

  
// Filter classifieds based on selected filter
const filteredClassifieds = classifieds.filter((classified) => {
  if (filter === 'all') {
    return true;
  } else {
    return classified.Title.toLowerCase() === filter.toLowerCase();
  }
});

return (
  <div>
    {/* Filter buttons */}
    <div className="filter-buttons">
      <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
      <button className={filter === 'rent' ? 'active' : ''} onClick={() => setFilter('rent')}>Rent</button>
      <button className={filter === 'sale' ? 'active' : ''} onClick={() => setFilter('sale')}>Sale</button>
    </div>
    
    {/* Classifieds */}
    <section className="articles">
      {isLoading ? (
        <p>Loading classifieds...</p>
      ) : (
        filteredClassifieds.map((classified) => (
          <article key={classified.FlatNo}>
            <div className="article-wrapper">
              <div className="article-body">
                <h2>{classified.Title}</h2>
                <p><strong>Area:</strong> {classified.Area} sq.ft</p>
                <p><strong>Price:</strong> {classified.Price} rupee</p>
                <button onClick={() => handleReadMore(classified)} className="read-more">Read more</button>
                <button onClick={() => handleEdit(classified)} className="edit-btn">Edit</button>
                <button onClick={() => handleDelete(classified)} className="delete-btn">Delete</button>
              </div>
            </div>
          </article>
        ))
      )}
    </section>

    {/* Modal */}
    {showModal && selectedFlat && (
      <div className="modal show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{selectedFlat.Title}</h5>
              <button type="button" className="close" onClick={() => setShowModal(false)} aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p><strong>Flat No:</strong> {selectedFlat.FlatNo}</p>
              <p><strong>Description:</strong> {selectedFlat.Description}</p>
              <p><strong>Bedrooms:</strong> {selectedFlat.BedRooms}</p>
              <p><strong>Bathrooms:</strong> {selectedFlat.BathRooms}</p>
              <p><strong>Furnishing:</strong> {selectedFlat.Furnishing}</p>
              <p><strong>Area:</strong> {selectedFlat.Area} sq.ft</p>
              <p><strong>Bachelors Allowed:</strong> {selectedFlat.BachelorsAllowed}</p>
              <p><strong>Car Parking:</strong> {selectedFlat.CarParking}</p>
              <p><strong>Facing:</strong> {selectedFlat.Facing}</p>
              <p><strong>Price:</strong> {selectedFlat.Price} rupee</p>
              <p><strong>Status:</strong> {selectedFlat.Status}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
);

  
};

export default Home;
