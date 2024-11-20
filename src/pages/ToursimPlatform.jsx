import React, { useState, useEffect } from 'react';

// Guide Application Form Component
import GuideApplicationForm from '../components/GuideApplicationForm';

// Car Rental Form Component
import CarRentalForm from '../components/CarRentalForm';

// Admin Dashboard Component
import AdminDashboard from '../components/AdminDashboard';

// Main App Component
const TourismPlatform = () => {
  const calculateTotalCost = (booking) => {
    const baseRates = {
      economy: 50,
      suv: 75,
      luxury: 150
    };
    return baseRates[booking.carType.toLowerCase()] * booking.duration;
  };
  
  const [activeTab, setActiveTab] = useState("guide");
  const [guideApplications, setGuideApplications] = useState([]);
  const [carBookings, setCarBookings] = useState([]);

  // Auto update status for car bookings
  useEffect(() => {
    carBookings.forEach(booking => {
      if (booking.status === 'pending') {
        // Random timeout between 5 to 15 seconds 
        const randomTime = Math.floor(Math.random() * (15000 - 5000) + 5000);
        
        setTimeout(() => {
          // 80% approve 20% reject
          const newStatus = Math.random() < 0.8 ? 'approved' : 'rejected';
          
          setCarBookings(prevBookings =>
            prevBookings.map(b =>
              b.id === booking.id ? { ...b, status: newStatus } : b
            )
          );
        }, randomTime);
      }
    });
  }, [carBookings]);

  const handleGuideSubmit = (e) => {
    e.preventDefault()
    const newApplication = {
      id: Date.now(),
      name: e.target.name.value,
      experience: e.target.experience.value,
      languages: e.target.languages.value,
      description: e.target.description.value,
      status: 'pending',

    };
    setGuideApplications([...guideApplications, newApplication]);
    e.target.reset();
    
  };

  const handleCarBooking = (formData) => {
    const newBooking = {
      id: Date.now(),
      name: formData.name,
      date: formData.date,
      carType: formData.carType,
      carName: formData.carName,
      duration: formData.duration,
      status: 'pending',
      totalCost: calculateTotalCost({
        carType: formData.carType,
        duration: formData.duration
      }),
      bookingTime: new Date().toLocaleString(),
      statusUpdateTime: null
    };
    setCarBookings([...carBookings, newBooking]);
  };

  const handleApplicationStatus = (id, status) => {
    setGuideApplications(guideApplications.map(app => 
      app.id === id ? {...app, status} : app
    ));
  };
  console.log(carBookings)


  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex mb-6 bg-white rounded-lg shadow-sm">
          <button 
            onClick={() => setActiveTab("guide")}
            className={`flex-1 py-3 text-center rounded-l-lg ${activeTab === "guide" ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
          >
            Local Guide Application
          </button>
          <button 
            onClick={() => setActiveTab("car")}
            className={`flex-1 py-3 text-center rounded-r-lg ${activeTab === "car" ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
          >
            Car Rental
          </button>
        </div>

        {activeTab === "guide" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <GuideApplicationForm onSubmit={handleGuideSubmit} />
            </div>
            
            <AdminDashboard 
              applications={guideApplications}
              onApplicationUpdate={handleApplicationStatus}

            />
          </div>
        )}

        {activeTab === "car" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CarRentalForm onSubmit={handleCarBooking} />
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-semibold mb-4">Your Bookings</h2>
              <div className="space-y-4">
                {carBookings.map(booking => (
                  <div key={booking.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{booking.carName}</h3>
                          <span className={`inline-flex items-center px-2 py-1 text-xs rounded ${
                            booking.status === 'approved' ? 'bg-green-100 text-green-800' :
                            booking.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {booking.status === 'pending' ? (
                              <>
                                <span className="w-2 h-2 bg-yellow-400 rounded-full mr-1 animate-pulse"></span>
                                Pending
                              </>
                            ) : (
                              booking.status.charAt(0).toUpperCase() + booking.status.slice(1)
                            )}
                          </span>
                        </div>
                        <div className="text-sm space-y-1">
                          <p className="font-medium">Customer: {booking.name}</p>
                          <p className="text-gray-600">Pickup Date: {booking.date}</p>
                          <p className="text-gray-600">Vehicle Type: {booking.carType}</p>
                          <p className="text-gray-600">Duration: {booking.duration} days</p>
                          <p className="text-gray-600">Booking Time: {booking.bookingTime}</p>
                          <p className="font-medium text-blue-600">Total Cost: ${booking.totalCost}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TourismPlatform;