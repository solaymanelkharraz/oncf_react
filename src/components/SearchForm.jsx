import React, { useState } from 'react';

function SearchForm({ onSearch }) {
  const [depart, setDepart] = useState('Tanger');
  const [arrivee, setArrivee] = useState('Rabat');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(depart, arrivee);
  };

  return (
    <div className="search-card p-4 p-md-5 mx-auto bg-white rounded-4 shadow-lg" style={{ maxWidth: '1000px', marginTop: '-60px' }}>
      <form onSubmit={handleSubmit} className="row g-4 align-items-end">
        <div className="col-md-4">
          <label className="form-label fw-bold text-muted small text-uppercase">
            <i className="fas fa-map-marker-alt text-oncf-blue me-2" style={{ color: 'var(--primary-blue)' }}></i> Ville de départ
          </label>
          <select 
            className="form-select form-select-lg" 
            value={depart} 
            onChange={(e) => setDepart(e.target.value)}
          >
            <option value="Tanger">Tanger</option>
            <option value="Rabat">Rabat</option>
            <option value="Casablanca">Casablanca</option>
          </select>
        </div>
        
        <div className="col-md-4">
          <label className="form-label fw-bold text-muted small text-uppercase">
            <i className="fas fa-map-pin me-2" style={{ color: 'var(--accent-orange)' }}></i> Ville d'arrivée
          </label>
          <select 
            className="form-select form-select-lg" 
            value={arrivee} 
            onChange={(e) => setArrivee(e.target.value)}
          >
            <option value="Rabat">Rabat</option>
            <option value="Casablanca">Casablanca</option>
            <option value="Marrakech">Marrakech</option>
          </select>
        </div>
        
        <div className="col-md-4">
          <button type="submit" className="btn btn-lg w-100 py-3 shadow text-white fw-bold shadow-sm" style={{ background: 'var(--accent-orange)', borderRadius: '12px' }}>
            RECHERCHER <i className="fas fa-arrow-right ms-2"></i>
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
