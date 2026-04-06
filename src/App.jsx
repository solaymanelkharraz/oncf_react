import React, { useState, useEffect } from 'react';
import SearchForm from './components/SearchForm';
import TripCard from './components/TripCard';

function App() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredTrips, setFilteredTrips] = useState([]);

  // Fetch all trips when component mounts
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/voyages')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setTrips(data);
        setFilteredTrips(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Handle Search function
  const handleSearch = (depart, arrivee) => {
    const results = trips.filter(trip => 
      trip.villeDepart === depart && trip.villeDarrivee === arrivee
    );
    setFilteredTrips(results);
  };

  return (
    <div className="react-app-root">
      {/* Hero Section */}
      <div className="hero-section">
          <div className="container position-relative z-index-1">
              <span className="badge bg-warning text-dark mb-3 px-3 py-2 rounded-pill fw-bold" style={{ letterSpacing: '1px' }}>L'EXPÉRIENCE PREMIUM</span>
              <h1 className="display-3 fw-bold mb-3 text-white" style={{ textShadow: '0 4px 15px rgba(0,0,0,0.5)' }}>VOYAGEZ AU COEUR DU MAROC</h1>
              <p className="lead mb-0 fs-4 text-white" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                  Réservez vos billets <span className="fw-bold" style={{ color: 'var(--accent-orange)' }}>Al Boraq</span> au meilleur prix.
              </p>
          </div>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 20 }}>
        
        {/* Search Form component */}
        <SearchForm onSearch={handleSearch} />

        <div className="d-flex justify-content-between align-items-end mb-4 mt-5">
            <h3 className="text-dark fw-bold mb-0">
                <span style={{ color: 'var(--primary-blue)' }}>OFFRES</span> <span style={{ color: 'var(--accent-orange)' }}>SPÉCIALES</span>
            </h3>
        </div>
        
        {/* Content Area */}
        <div className="row g-4 mb-5">
          {loading && (
            <div className="col-12 text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Chargement...</span>
              </div>
              <p className="mt-3 text-muted fw-bold">Recherche de vos trajets...</p>
            </div>
          )}

          {error && (
            <div className="col-12">
              <div className="alert alert-danger shadow-sm rounded-4 border-0 p-4">
                <h5><i className="fas fa-exclamation-triangle me-2"></i>Erreur de connexion</h5>
                <p className="mb-0">{error}</p>
                <small className="d-block mt-2 opacity-75">Assurez-vous que votre backend Laravel fonctionne sur le port 8000.</small>
              </div>
            </div>
          )}

          {!loading && !error && filteredTrips.length === 0 && (
            <div className="col-12 text-center py-5">
              <div className="display-1 text-muted opacity-25 mb-3"><i className="fas fa-search-minus"></i></div>
              <h4 className="fw-bold text-dark">Aucun trajet trouvé</h4>
              <p className="text-muted">Essayez de modifier vos critères de recherche.</p>
              <button onClick={() => setFilteredTrips(trips)} className="btn btn-outline-primary rounded-pill px-4 mt-2">Afficher tous les trajets</button>
            </div>
          )}

          {!loading && !error && filteredTrips.map(trip => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
