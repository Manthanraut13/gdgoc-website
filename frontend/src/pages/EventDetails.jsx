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

  return (
    <div className="page-wrapper pt-20 bg-white max-w-5xl mx-auto px-4">
      <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
      <p className="text-gray-600 mb-4">{event.description}</p>

      <div className="space-y-2 text-gray-700">
        <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
        <p><strong>Time:</strong> {event.time}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Difficulty:</strong> {event.difficulty}</p>
      </div>
    </div>
  );
};

export default EventDetails;
