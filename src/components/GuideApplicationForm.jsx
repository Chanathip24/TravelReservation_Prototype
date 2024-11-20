import React from 'react';

const GuideApplicationForm = ({ onSubmit }) => {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold mb-4">Apply as Local Guide</h2>
        <form onSubmit={onSubmit} id='guide-form' className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input name="name" className="w-full p-2 border rounded-lg" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Years of Experience</label>
            <input name="experience" type="number" className="w-full p-2 border rounded-lg" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Languages Spoken</label>
            <input name="languages" className="w-full p-2 border rounded-lg" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">About You</label>
            <textarea name="description" className="w-full p-2 border rounded-lg" rows="4" required />
          </div>

          {/* Example Tour Information Section */}
          <h3 className="text-xl font-semibold mt-6">Example Tour Information</h3>
          <div>
            <label className="block text-sm font-medium mb-1">Tour Title</label>
            <input name="exampleTourTitle" className="w-full p-2 border rounded-lg" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tour Location</label>
            <input name="exampleTourLocation" className="w-full p-2 border rounded-lg" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tour Duration (hours)</label>
            <input name="exampleTourDuration" type="number" className="w-full p-2 border rounded-lg" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tour Description</label>
            <textarea name="exampleTourDescription" className="w-full p-2 border rounded-lg" rows="4" required />
          </div>
          
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
            Submit Application
          </button>
        </form>
      </div>
    );
};

export default GuideApplicationForm;
