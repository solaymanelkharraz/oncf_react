import React, { useRef } from 'react';

function TripCard({ trip }) {
  // Use a ref to trigger the hidden HTML form natively
  const formRef = useRef(null);

  const handleBook = () => {
    // This will trigger actual browser navigation to the Laravel app via a form POST
    // We configured Laravel to accept this cross-origin without CSRF token
    formRef.current.submit();
  };

  return (
    <div className="col-md-4">
      <div className="card trip-card h-100 border-0 shadow-sm rounded-4" style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <span className="badge bg-light border px-2 py-1" style={{ borderColor: 'rgba(10,37,64,0.2) !important', color: 'var(--primary-blue)' }}>
               {trip.code_voyage}
            </span>
            <span className="text-muted small fw-bold">
               <i className="fas fa-bolt text-warning"></i> Rapide
            </span>
          </div>
          
          <div className="position-relative ps-3 border-start border-2 ms-2 mb-3" style={{ borderColor: 'var(--primary-blue)' }}>
            <div className="position-absolute top-0 start-0 translate-middle rounded-circle" style={{ width: '10px', height: '10px', background: 'var(--primary-blue)' }}></div>
            
            <h5 className="fw-bold mb-0" style={{ color: 'var(--primary-blue)' }}>{trip.villeDepart}</h5>
            <div className="text-muted small py-2 ms-1 fw-bold"><i className="fas fa-long-arrow-alt-down me-2"></i>Départ: {trip.heureDepart}</div>
            
            <h5 className="fw-bold mb-0 text-dark">{trip.villeDarrivee}</h5>
            <div className="text-muted small mt-1 ms-1 fw-bold"><i className="fas fa-clock fs-6 me-2"></i>Arrivée: {trip.heureDarrivee}</div>
            
            <div className="position-absolute bottom-0 start-0 translate-middle rounded-circle" style={{ width: '10px', height: '10px', background: 'var(--accent-orange)' }}></div>
          </div>
          
          <div className="bg-light rounded-3 p-3 mt-4 d-flex justify-content-between align-items-center">
            <div>
              <span className="text-muted small d-block mb-1">À partir de</span>
              <span className="h4 fw-bold text-success mb-0">{trip.prixVoyage} <small className="fs-6 text-muted">MAD</small></span>
            </div>
            
            {/* Hidden Form for Cross-Origin Navigation Bridge */}
            <form ref={formRef} action="http://127.0.0.1:8000/cart/add" method="POST" className="m-0 d-none">
                <input type="hidden" name="voyage_id" value={trip.id} />
                <input type="hidden" name="qte" value="1" />
            </form>
            
            <button onClick={handleBook} type="button" className="btn py-2 px-4 shadow-sm text-white" style={{ background: 'var(--primary-blue)', borderRadius: '12px', fontWeight: 500 }}>
                Réserver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TripCard;
