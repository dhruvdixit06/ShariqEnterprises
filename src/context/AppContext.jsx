import React, { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [servicemen, setServicemen] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch all initial data
  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [svcRes, bkgRes, techRes] = await Promise.all([
        fetch('/api/services'),
        fetch('/api/bookings'),
        fetch('/api/technicians')
      ]);

      if (svcRes.ok) setServices(await svcRes.json());
      if (bkgRes.ok) setBookings(await bkgRes.json());
      if (techRes.ok) setServicemen(await techRes.json());
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const addBooking = async (bookingData) => {
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });
      if (res.ok) {
        // Refresh bookings after adding
        const updatedBookings = await (await fetch('/api/bookings')).json();
        setBookings(updatedBookings);
      }
    } catch (err) {
      console.error("Failed to add booking:", err);
    }
  };

  const assignServiceman = async (bookingId, servicemanId) => {
    try {
      const res = await fetch(`/api/bookings/${bookingId}/assign`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ servicemanId })
      });
      if (res.ok) {
        setBookings(prev => prev.map(b => 
          b.id === bookingId ? { ...b, servicemanId, status: 'Assigned', technicianName: servicemen.find(s=>s.id === servicemanId)?.name } : b
        ));
      }
    } catch (err) {
      console.error("Failed to assign tech:", err);
    }
  };

  // Service CRUD
  const addService = async (serviceData) => {
    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serviceData)
      });
      if (res.ok) fetchAllData();
    } catch (err) { console.error("Failed to add service", err); }
  };

  const updateService = async (id, serviceData) => {
    try {
      const res = await fetch(`/api/services/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serviceData)
      });
      if (res.ok) fetchAllData();
    } catch (err) { console.error("Failed to update service", err); }
  };

  const deleteService = async (id) => {
    try {
      const res = await fetch(`/api/services/${id}`, { method: 'DELETE' });
      if (res.ok) fetchAllData();
    } catch (err) { console.error("Failed to delete service", err); }
  };

  // Technician CRUD
  const addTechnician = async (techData) => {
    try {
      const res = await fetch('/api/technicians', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(techData)
      });
      if (res.ok) fetchAllData();
    } catch (err) { console.error("Failed to add tech", err); }
  };

  const deleteTechnician = async (id) => {
    try {
      const res = await fetch(`/api/technicians/${id}`, { method: 'DELETE' });
      if (res.ok) fetchAllData();
    } catch (err) { console.error("Failed to delete tech", err); }
  };

  const login = async (username, password) => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (err) {
      return { success: false, message: 'Network error' };
    }
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    services,
    bookings,
    addBooking,
    servicemen,
    assignServiceman,
    addService,
    updateService,
    deleteService,
    addTechnician,
    deleteTechnician,
    user,
    login,
    logout,
    loading
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
