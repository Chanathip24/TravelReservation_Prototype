import React from 'react'


const TourForm = ({ onSubmit }) => {
    return (
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Tour Title</label>
          <input name="title" className="w-full p-2 border rounded-lg" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input name="location" className="w-full p-2 border rounded-lg" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Duration (hours)</label>
          <input name="duration" type="number" className="w-full p-2 border rounded-lg" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Price ($)</label>
          <input name="price" type="number" className="w-full p-2 border rounded-lg" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea name="description" className="w-full p-2 border rounded-lg" rows="4" required />
        </div>
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
          Submit Tour
        </button>
      </form>
    );
  };

export default TourForm