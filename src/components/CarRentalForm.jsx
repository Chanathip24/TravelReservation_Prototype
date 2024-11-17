import React, { useState } from 'react';
import { Car, Clock, Calendar, User } from 'lucide-react';

const cars = [
  {
    id: 1,
    name: "Toyota Camry",
    type: "economy",
    price: 50,
    seats: 5,
    transmission: "Automatic",
    image: "https://toyotabuzz.com/img/upload/car/color/20211103105354_466899619.png",
  },
  {
    id: 2,
    name: "Honda CR-V",
    type: "suv",
    price: 75,
    seats: 7,
    transmission: "Automatic",
    image: "https://www.honda.co.th/uploads/articles/4c37156ba1ac0b05b594c06eddc2e470.jpg",
  },
  {
    id: 3,
    name: "Mercedes E-Class",
    type: "luxury",
    price: 150,
    seats: 5,
    transmission: "Automatic",
    image: "https://www.mercedes-benz.co.th/content/dam/hq/passengercars/cars/e-class/e-class-saloon-w214-pi/overview/highlights/02-2023/images/mercedes-benz-e-class-w214-highlights-videostill-3302x1858-02-2023.jpg",
  }
];

const CarCard = ({ car, selected, onClick }) => (
  <div 
    onClick={() => onClick(car)}
    className={`cursor-pointer border rounded-lg p-4 transition-all ${
      selected ? 'border-blue-500 shadow-lg' : 'border-gray-200 hover:shadow-md'
    }`}
  >
    <img src={car.image} alt={car.name} className="w-full h-40 object-cover rounded-lg mb-4" />
    <h3 className="text-lg font-semibold">{car.name}</h3>
    <div className="space-y-2 mt-2 text-gray-600">
      <div className="flex items-center gap-2">
        <Car size={16} />
        <span className="capitalize">{car.type}</span>
      </div>
      <div className="flex items-center gap-2">
        <User size={16} />
        <span>{car.seats} seats</span>
      </div>
      <div className="flex items-center gap-2">
        <Clock size={16} />
        <span>{car.transmission}</span>
      </div>
      <div className="text-lg font-semibold text-blue-600 mt-2">
        ${car.price}/day
      </div>
    </div>
  </div>
);

const CarRentalForm = ({ onSubmit }) => {
  const [selectedCar, setSelectedCar] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    duration: '',
    carType: '',
    carName: ''
  });

  const handleCarSelect = (car) => {
    setSelectedCar(car);
    setFormData(prev => ({
      ...prev,
      carType: car.type,
      carName: car.name
    }));
  };

  const handleSubmit = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    
    // Call the parent's onSubmit with the form data
    if (onSubmit) {
      onSubmit(formData);
    }

    // Reset form
    setSelectedCar(null);
    setFormData({
      name: '',
      date: '',
      duration: '',
      carType: '',
      carName: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* Car Selection Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold mb-4">Select a Car</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cars.map(car => (
            <CarCard
              key={car.id}
              car={car}
              selected={selectedCar?.id === car.id}
              onClick={handleCarSelect}
            />
          ))}
        </div>
      </div>

      {/* Booking Form */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold mb-4">Complete Your Booking</h2>
        {selectedCar && (
          <div className="mb-4 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold">Selected: {selectedCar.name}</h3>
            <p className="text-gray-600">Daily Rate: ${selectedCar.price}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input 
              name="name" 
              className="w-full p-2 border rounded-lg" 
              required 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Pickup Date</label>
            <div className="flex items-center">
              <Calendar size={20} className="text-gray-500 mr-2" />
              <input 
                name="date" 
                type="date" 
                className="w-full p-2 border rounded-lg" 
                required 
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
            </div>
          </div>
          <input 
            type="hidden" 
            name="carType" 
            value={formData.carType}
          />
          <input 
            type="hidden" 
            name="carName" 
            value={formData.carName}
          />
          <div>
            <label className="block text-sm font-medium mb-1">Duration (days)</label>
            <input 
              name="duration" 
              type="number" 
              min="1"
              className="w-full p-2 border rounded-lg" 
              required 
              value={formData.duration}
              onChange={(e) => setFormData({...formData, duration: e.target.value})}
            />
          </div>
          {selectedCar && formData.duration && (
            <div className="text-lg font-semibold">
              Total Cost: ${selectedCar.price * formData.duration}
            </div>
          )}
          <button 
            type="submit" 
            disabled={!selectedCar}
            className={`w-full py-2 rounded-lg transition-colors ${
              selectedCar 
                ? 'bg-blue-500 text-white hover:bg-blue-600' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {selectedCar ? 'Book Now' : 'Select a Car First'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CarRentalForm;