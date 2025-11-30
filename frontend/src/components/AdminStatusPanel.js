import React, { useState } from 'react';
import axios from 'axios';

// Base URL for your backend (Render)
const API_BASE_URL =
  process.env.REACT_APP_BACKEND_URL || 'https://ayush-portal-backend.onrender.com';

const AdminStatusPanel = ({ startupId, documents, onUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState('');

  // Helper to create the full URL for viewing documents
  const getDocumentUrl = (path) => {
    if (!path) return '#';

    // Normalize Windows-style backslashes to URL-safe slashes
    const normalized = path.replace(/\\/g, '/');
    const trimmed = normalized.startsWith('/') ? normalized.slice(1) : normalized;

    // Example: https://ayush-portal-backend.onrender.com/uploads/xyz.pdf
    return `${API_BASE_URL}/${trimmed}`;
  };

  const updateStatus = async (newStatus) => {
    const ok = window.confirm(
      `Are you sure you want to mark this as ${newStatus}?`
    );
    if (!ok) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('token');

      await axios.put(
        `${API_BASE_URL}/api/admin/update-status/${startupId}`,
        { newStatus, comment },
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );

      alert('Status updated successfully!');
      setComment('');
      if (onUpdate) onUpdate(); // Refresh parent list
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Error updating status.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        marginTop: '15px',
        padding: '10px',
        backgroundColor: '#f8f9fa',
        borderRadius: '5px',
      }}
    >
      {/* --- DOCUMENT LINKS SECTION --- */}
      <h6>Submitted Documents:</h6>
      <div style={{ marginBottom: '10px' }}>
        {/* Registration Certificate */}
        {documents.registrationCertificate ? (
          <p>
            Registration Certificate:{' '}
            <a
              href={getDocumentUrl(documents.registrationCertificate)}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#007bff', fontWeight: 'bold' }}
            >
              View Document
            </a>
          </p>
        ) : (
          <p>
            Registration Certificate:{' '}
            <span style={{ color: '#dc3545' }}>Missing</span>
          </p>
        )}

        {/* Founder ID */}
        {documents.founderId ? (
          <p>
            Founder ID:{' '}
            <a
              href={getDocumentUrl(documents.founderId)}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#007bff', fontWeight: 'bold' }}
            >
              View Document
            </a>
          </p>
        ) : (
          <p>
            Founder ID:{' '}
            <span style={{ color: '#dc3545' }}>Missing</span>
          </p>
        )}

        {/* Compliance Docs (array) */}
        {documents.complianceDocs && documents.complianceDocs.length > 0 ? (
          <div>
            <p>Compliance Documents ({documents.complianceDocs.length}):</p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
              {documents.complianceDocs.map((docPath, index) => (
                <li key={index}>
                  <a
                    href={getDocumentUrl(docPath)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#007bff',
                      textDecoration: 'underline',
                    }}
                  >
                    Document {index + 1}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>
            Compliance Documents:{' '}
            <span style={{ color: '#dc3545' }}>Missing</span>
          </p>
        )}
      </div>

      {/* --- STATUS UPDATE SECTION --- */}
      <h6>Update Status:</h6>
      <textarea
        placeholder="Add optional comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows="2"
        style={{
          width: '100%',
          marginBottom: '10px',
          padding: '5px',
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      />
      <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
        <button
          disabled={loading}
          onClick={() => updateStatus('Verified')}
          style={{
            backgroundColor: '#17a2b8',
            color: 'white',
            border: 'none',
            padding: '5px 10px',
            cursor: 'pointer',
            borderRadius: '4px',
          }}
        >
          Verified
        </button>
        <button
          disabled={loading}
          onClick={() => updateStatus('Accepted')}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '5px 10px',
            cursor: 'pointer',
            borderRadius: '4px',
          }}
        >
          Accepted
        </button>
        <button
          disabled={loading}
          onClick={() => updateStatus('Approved')}
          style={{
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            padding: '5px 10px',
            cursor: 'pointer',
            borderRadius: '4px',
          }}
        >
          Approved
        </button>
        <button
          disabled={loading}
          onClick={() => updateStatus('Rejected')}
          style={{
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            padding: '5px 10px',
            cursor: 'pointer',
            borderRadius: '4px',
          }}
        >
          Rejected
        </button>
      </div>
    </div>
  );
};

export default AdminStatusPanel;
