import React from 'react';
import { useParams } from 'react-router-dom';

const EventDetails = () => {
  const { id } = useParams();

  return (
    <div className="pt-20">
      <div className="page-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Event Details</h1>
          <p className="text-xl text-blue-100">Event ID: {id}</p>
        </div>
      </div>
      <div className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Information</h2>
            <p className="text-gray-600 mb-4">Detailed information about the event will be displayed here.</p>
            <div className="space-y-2">
              <p><strong>Event ID:</strong> {id}</p>
              <p><strong>Date:</strong> Coming soon</p>
              <p><strong>Location:</strong> TBA</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;