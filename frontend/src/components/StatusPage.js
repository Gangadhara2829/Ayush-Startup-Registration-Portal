// frontend/src/components/StatusPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import UserStatusTracker from './UserStatusTracker';

const API_BASE = 'https://ayush-portal-backend.onrender.com';

const StatusPage = () => {
  const [startupData, setStartupData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // ----------------------
  // 1. Load initial status
  // ----------------------
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const res = await axios.get(
          `${API_BASE}/api/dashboard/my-application`,
          {
            headers: { 'x-auth-token': token },
          }
        );

        setStartupData(res.data);
      } catch (err) {
        console.error('Error loading application data:', err);
        setError('Could not load application data.');
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  // ----------------------
  // 2. Real-time updates
  // ----------------------
  useEffect(() => {
    if (!startupData || !startupData._id) return;

    const socket = io(API_BASE, {
      transports: ['websocket'], // more reliable on Render/Vercel
    });

    // Join room with startup's ID
    socket.emit('joinRoom', startupData._id);

    // Listen for updates from admin
    socket.on('statusUpdate', (data) => {
      console.log('Real-time status update received:', data);
      setStartupData((prev) => ({
        ...prev,
        applicationStatus: data.applicationStatus,
        statusTimeline: data.statusTimeline,
      }));
    });

    return () => {
      socket.disconnect();
    };
  }, [startupData && startupData._id]);

  // ----------------------
  // 3. UI
  // ----------------------
  if (loading) {
    return <div style={{ padding: '20px' }}>Loading status...</div>;
  }

  if (error) {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        {error}
      </div>
    );
  }

  if (!startupData) {
    return (
      <div style={{ padding: '20px' }}>
        No application found.
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Application Status</h2>

      <div style={{ marginBottom: '20px' }}>
        <strong>Startup Name:</strong> {startupData.startupName}
      </div>

      <UserStatusTracker
        currentStatus={startupData.applicationStatus}
        timeline={startupData.statusTimeline}
      />
    </div>
  );
};

export default StatusPage;
