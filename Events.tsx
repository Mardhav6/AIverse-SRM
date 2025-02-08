import React, { useEffect, useState } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { useAuth } from '../context/AuthContext';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
}

interface EventRegistration {
  id: string;
  event_id: string;
  user_id: string;
  created_at: string;
}

const Events = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
    if (user) {
      fetchUserRegistrations();
    }
  }, [user]);

  const fetchEvents = async () => {
    try {
      let { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true });
      
      if (error) throw error;

      // If no events in database, use default events
      if (!data || data.length === 0) {
        data = [
          {
            id: '1',
            title: 'Aaruush 2025',
            description: 'Annual National Level Techno-Management Fest featuring competitions, workshops, and guest lectures',
            date: '2025-03-15',
            time: '09:00 AM',
            location: 'Main Ground',
            image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
          },
          {
            id: '2',
            title: 'Milan 2025',
            description: 'Cultural festival celebrating diversity through music, dance, and art performances',
            date: '2025-04-10',
            time: '10:00 AM',
            location: 'Dr. T.P. Ganesan Auditorium',
            image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80'
          },
          {
            id: '3',
            title: 'Tech Summit 2025',
            description: 'Industry experts share insights on emerging technologies and future trends',
            date: '2025-05-20',
            time: '11:00 AM',
            location: 'Tech Park',
            image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=2012&q=80'
          },
          {
            id: '4',
            title: 'Sports Meet 2025',
            description: 'Annual inter-department sports competition featuring various athletic events',
            date: '2025-06-05',
            time: '08:00 AM',
            location: 'Main Ground',
            image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
          }
        ];
      }
      
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserRegistrations = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('event_registrations')
        .select('*')
        .eq('user_id', user.id);
      
      if (error) throw error;
      setRegistrations(data || []);
    } catch (error) {
      console.error('Error fetching registrations:', error);
    }
  };

  const handleRegister = async (eventId: string) => {
    if (!user) {
      alert('Please login to register for events');
      return;
    }

    setRegistering(eventId);
    try {
      const { error } = await supabase
        .from('event_registrations')
        .insert([
          {
            event_id: eventId,
            user_id: user.id
          }
        ]);

      if (error) throw error;
      
      await fetchUserRegistrations();
      alert('Successfully registered for the event!');
    } catch (error) {
      console.error('Error registering for event:', error);
      alert('Failed to register for the event. Please try again.');
    } finally {
      setRegistering(null);
    }
  };

  const isRegistered = (eventId: string) => {
    return registrations.some(reg => reg.event_id === eventId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Upcoming Events</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-semibold mb-4">{event.title}</h2>
                  {isRegistered(event.id) && (
                    <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                      Registered
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mb-4">{event.description}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center text-gray-700">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{event.location}</span>
                  </div>
                </div>
                
                <button
                  onClick={() => handleRegister(event.id)}
                  disabled={isRegistered(event.id) || registering === event.id}
                  className={`mt-6 px-6 py-2 rounded-lg transition-colors ${
                    isRegistered(event.id)
                      ? 'bg-gray-100 text-gray-600 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {registering === event.id ? (
                    <span className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Registering...
                    </span>
                  ) : isRegistered(event.id) ? (
                    'Already Registered'
                  ) : (
                    'Register Now'
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;