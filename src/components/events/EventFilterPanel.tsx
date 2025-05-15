import React from 'react';
import { MapPin, Calendar, Users, Globe, X } from 'lucide-react';
import Button from '../ui/Button';

interface EventFilters {
  location: string;
  dateRange: any; // Would use a proper date range type in a real app
  isPublic: boolean | null;
  hasAvailableSpots: boolean;
}

interface EventFilterPanelProps {
  filters: EventFilters;
  setFilters: React.Dispatch<React.SetStateAction<EventFilters>>;
}

const EventFilterPanel: React.FC<EventFilterPanelProps> = ({ filters, setFilters }) => {
  const resetFilters = () => {
    setFilters({
      location: '',
      dateRange: null,
      isPublic: null,
      hasAvailableSpots: false
    });
  };
  
  return (
    <div className="bg-dark-800 rounded-lg border border-dark-600 p-6 mb-6 animate-fadeIn">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-light-100">Filter Events</h3>
        <button 
          onClick={resetFilters}
          className="text-light-300 hover:text-light-100 flex items-center text-sm"
        >
          <X className="w-4 h-4 mr-1" />
          Reset
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-light-200 mb-2 flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            Location
          </label>
          <input
            type="text"
            placeholder="City or venue"
            value={filters.location}
            onChange={(e) => setFilters({...filters, location: e.target.value})}
            className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-md 
                      focus:outline-none focus:ring-2 focus:ring-primary-400 text-light-100"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-light-200 mb-2 flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            Date Range
          </label>
          <select 
            className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-md 
                      focus:outline-none focus:ring-2 focus:ring-primary-400 text-light-100"
            value={filters.dateRange || ""}
            onChange={(e) => setFilters({...filters, dateRange: e.target.value || null})}
          >
            <option value="">Any date</option>
            <option value="today">Today</option>
            <option value="this-week">This week</option>
            <option value="this-month">This month</option>
            <option value="next-month">Next month</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-light-200 mb-2 flex items-center">
            <Globe className="w-4 h-4 mr-1" />
            Event Type
          </label>
          <select 
            className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-md 
                      focus:outline-none focus:ring-2 focus:ring-primary-400 text-light-100"
            value={filters.isPublic === null ? "" : String(filters.isPublic)}
            onChange={(e) => {
              const value = e.target.value;
              setFilters({
                ...filters, 
                isPublic: value === "" ? null : value === "true"
              });
            }}
          >
            <option value="">All events</option>
            <option value="true">Public only</option>
            <option value="false">Private only</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-light-200 mb-2 flex items-center">
            <Users className="w-4 h-4 mr-1" />
            Availability
          </label>
          <div className="flex items-center h-[42px]">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.hasAvailableSpots}
                onChange={(e) => setFilters({...filters, hasAvailableSpots: e.target.checked})}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-dark-600 peer-focus:outline-none peer-focus:ring-2 
                            peer-focus:ring-primary-400 rounded-full peer peer-checked:after:translate-x-full 
                            peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] 
                            after:left-[2px] after:bg-dark-800 after:border-gray-300 after:border after:rounded-full 
                            after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              <span className="ml-3 text-sm font-medium text-light-200">
                Has available spots
              </span>
            </label>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end mt-4">
        <Button 
          variant="outline" 
          onClick={resetFilters}
          className="mr-2"
        >
          Clear
        </Button>
        <Button>
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default EventFilterPanel;