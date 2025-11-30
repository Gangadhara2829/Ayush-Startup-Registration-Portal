import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../apiConfig';
import AdminStatusPanel from './AdminStatusPanel';

const AdminDashboardPage = () => {
  const [applications, setApplications] = useState([]); // always an array
  const [selectedApp, setSelectedApp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchApplications = async () => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');

      const res = await axios.get(
        `${API_BASE_URL}/api/admin/applications`,
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );

      // Backend might return array or wrapped object – normalize to array
      const data = res.data;
      let list = [];

      if (Array.isArray(data)) {
        list = data;
      } else if (Array.isArray(data.applications)) {
        list = data.applications;
      }

      setApplications(list);
      setSelectedApp(list.length > 0 ? list[0] : null);
    } catch (err) {
      console.error('Error loading applications:', err);
      setError('Failed to load applications. Server may be offline.');
      setApplications([]); // keep it as array, avoid .map crash
      setSelectedApp(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleSelect = (app) => {
    setSelectedApp(app);
  };

  return (
    <div className="admin-dashboard">
      <div className="app-list-panel">
        <h2>Applications</h2>

        {loading && <p>Loading applications...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {!loading && !error && applications.length === 0 && (
          <p>No applications found.</p>
        )}

        {!loading &&
          !error &&
          applications.length > 0 &&
          applications.map((app) => (
            <div
              key={app._id}
              className={
                'app-list-item ' +
                (selectedApp && selectedApp._id === app._id
                  ? 'selected'
                  : '')
              }
              onClick={() => handleSelect(app)}
            >
              <div>
                <strong>{app.startupName}</strong>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                  {app.email}
                </div>
              </div>
              <div>{app.verificationStatus || 'Pending'}</div>
            </div>
          ))}
      </div>

      <div className="app-detail-panel">
        {loading && <p>Loading details...</p>}
        {!loading && !selectedApp && !error && (
          <p>Select an application from the left to view details.</p>
        )}
        {!loading && error && (
          <p style={{ color: 'red' }}>{error}</p>
        )}

        {!loading && selectedApp && !error && (
          <>
            <h2>{selectedApp.startupName}</h2>
            <p>
              <strong>Sector:</strong> {selectedApp.sector}
            </p>
            <p>
              <strong>Founder:</strong> {selectedApp.founderName}
            </p>
            <p>
              <strong>Email:</strong> {selectedApp.email}
            </p>
            <p>
              <strong>Contact:</strong> {selectedApp.contactNumber}
            </p>
            <p>
              <strong>Location:</strong> {selectedApp.location}
            </p>
            <p>
              <strong>Status:</strong>{' '}
              {selectedApp.verificationStatus || 'Pending'}
            </p>

            {/* Documents & status controls */}
            <AdminStatusPanel
              startupId={selectedApp._id}
              documents={selectedApp.documents || {}}
              onUpdate={fetchApplications}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
