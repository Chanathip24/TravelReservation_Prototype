import React from "react";
import { CheckCircle, XCircle } from "lucide-react";
const AdminDashboard = ({
  applications,
  tours,
  onApplicationUpdate,
  onTourUpdate,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>

      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Guide Applications</h3>
        {applications.map((app) => (
          <div key={app.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{app.name}</h3>
                <p className="text-sm text-gray-600">
                  {app.experience} years experience
                </p>
                <p className="text-sm text-gray-600">
                  Languages: {app.languages}
                </p>
                <span
                  className={`inline-block px-2 py-1 text-xs rounded ${
                    app.status === "approved"
                      ? "bg-green-100 text-green-800"
                      : app.status === "rejected"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {app.status}
                </span>

                {/* Display Example Tour Details */}
                <div className="mt-4">
                  <h4 className="font-semibold text-sm">Example Tour</h4>
                  <p className="text-sm text-gray-600">
                    <strong>Title:</strong> {app.exampleTour.title}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Location:</strong> {app.exampleTour.location}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Duration:</strong> {app.exampleTour.duration} hours
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Description:</strong> {app.exampleTour.description}
                  </p>
                </div>
              </div>

              {app.status === "pending" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => onApplicationUpdate(app.id, "approved")}
                    className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    <CheckCircle size={20} />
                  </button>
                  <button
                    onClick={() => onApplicationUpdate(app.id, "rejected")}
                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    <XCircle size={20} />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AdminDashboard;
