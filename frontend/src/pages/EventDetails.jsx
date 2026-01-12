import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventById } from "../services/api";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getEventById(id)
      .then((res) => {
        setEvent(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load event");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="pt-32 text-center">Loading event...</div>;
  }

  if (error) {
    return <div className="pt-32 text-center text-red-600">{error}</div>;
  }

  if (!event) {
    return <div className="pt-32 text-center">Event not found</div>;
  }

  const getStatusColor = (status) =>
    status === 'upcoming'
      ? 'bg-gradient-to-r from-green-500 to-emerald-600'
      : 'bg-gradient-to-r from-slate-500 to-gray-600';

  return (
    <div className="page-wrapper pt-20 bg-white">
      {/* Hero Banner */}
      <div className={`${getStatusColor(event.status)} h-64 flex items-center justify-center`}>
        <div className="text-center text-white">
          <span className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-semibold mb-4">
            {event.status === 'upcoming' ? 'Upcoming Event' : 'Past Event'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
        
        <p className="text-lg text-gray-600 mb-8">{event.description}</p>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase">Date</p>
              <p className="text-lg text-gray-800">{new Date(event.date).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase">Time</p>
              <p className="text-lg text-gray-800">{event.time || 'TBD'}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase">Location</p>
              <p className="text-lg text-gray-800">{event.location}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase">Category</p>
              <p className="text-lg text-gray-800 capitalize">{event.category || 'General'}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase">Difficulty Level</p>
              <p className="text-lg text-gray-800">{event.difficulty || 'All Levels'}</p>
            </div>
            {event.type && (
              <div>
                <p className="text-sm font-semibold text-gray-500 uppercase">Type</p>
                <p className="text-lg text-gray-800 capitalize">{event.type}</p>
              </div>
            )}
          </div>
        </div>

        {/* Tags */}
        {event.tags && event.tags.length > 0 && (
          <div className="mb-8">
            <p className="text-sm font-semibold text-gray-500 uppercase mb-3">Topics</p>
            <div className="flex flex-wrap gap-2">
              {event.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Capacity Info */}
        {event.seats && (
          <div className="bg-slate-50 rounded-2xl p-6 mb-8">
            <p className="text-sm font-semibold text-gray-500 uppercase mb-2">Capacity</p>
            <p className="text-lg text-gray-800">
              {event.registered || 0} / {event.seats} registered
            </p>
          </div>
        )}

        {/* Rating */}
        {event.rating && (
          <div className="flex items-center gap-2 mb-8">
            <p className="text-sm font-semibold text-gray-500 uppercase">Rating</p>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.round(event.rating) ? '⭐' : '☆'}>
                </span>
              ))}
            </div>
            <span className="text-gray-600">({event.rating}/5)</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetails;
