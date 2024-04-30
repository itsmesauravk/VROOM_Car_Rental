import React, { useContext, useState, useRef, useEffect } from 'react';
import { RiArrowUpSLine, RiArrowDownSLine } from 'react-icons/ri';
import {VehicleList } from '../Datas'; // Assuming CityList and VehicleList are imported from a file called 'Datas'
import { CityContext } from './CityContext';
import { useNavigate } from 'react-router-dom';
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/theme/default.css";
import "react-date-range/dist/styles.css";
import "../css/filtercar.css";
import { format } from "date-fns";

const FilterCar = () => {
  // useContext to access shared state and functions from CityContext
  const { selectedCity, setSelectedCity, selectedVehicle, setSelectedVehicle, addrentedVehicle, rentedVehicles } = useContext(CityContext);
  
  // State variables
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [isVehicleOpen, setIsVehicleOpen] = useState(false);
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection"
  });
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [app, setApp] = useState("");
  const navigate = useNavigate();
  const [userData,setUserData] = useState({});
  const [cities,setCities]=useState([]);

  // Refs for handling click outside events
  const cityRef = useRef();
  const vehicleRef = useRef();
  const CalendarRef = useRef();

  //for sending the booking request
  const sendBookingRequest = async()=>{
    try {
      const response = await fetch('http://localhost:4000/create-request',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        senderUser:userData._id,
        receiverDistributor:selectedCity,
        bookingDetails:{
          vehicle:selectedVehicle,
          sDate:date.startDate.toISOString().split("T")[0],
          eDate:date.endDate.toISOString().split("T")[0],
          status:"pending"
        }
      })
    })
    const data = await response.json();
    console.log(data)
    } catch (error) {
      console.log("Error sending booking request:",error)
    }
  }



  // Function to fetch user info
const showDistributorsLocations = async()=>{
    const response = await fetch('http://localhost:4000/show-distributors-locations', {
      method: 'GET',
      headers: {
        'Content-Type': 'application'
      }
    });
    const data1 = await response.json();
    setCities(data1.DistributorLocation);
  }

  const getUserInfo = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    const response = await fetch('http://localhost:4000/user-info', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    setUserData(data.user);
  };
  
  // Fetch user info on component mount
  useEffect(() => {
    getUserInfo();
    showDistributorsLocations();
  },[]);

  // Effect to handle click outside city dropdown
  useEffect(() => {
    const handler = (e) => {
      if (!cityRef.current.contains(e.target)) {
        setIsCityOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  // Effect to handle click outside vehicle dropdown
  useEffect(() => {
    const handler = (e) => {
      if (!vehicleRef.current.contains(e.target)) {
        setIsVehicleOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  // Effect to handle click outside calendar
  useEffect(() => {
    const handler = (e) => {
      if (!CalendarRef.current.contains(e.target)) {
        setIsDateOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  // Function to handle city selection
  const handleCity = (city) => {
    setSelectedCity(city);
    setIsCityOpen(false);
  };

  // Function to handle vehicle selection
  const handleVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
    setIsVehicleOpen(false);
  };

  // Function to handle date change in calendar
  const handleChange = (ranges) => {
    setDate(ranges.selection);
  };

  // Function to toggle date picker visibility
  const dateToggle = () => {
    setIsDateOpen(!isDateOpen);
  };

  // Function to handle form submission
  const handleApp = async(e) => {
    e.preventDefault(); // Prevent default form submission behavior
    
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login page if user is not authenticated
      return;
    }

    // Check if both city and vehicle are selected
    if (selectedCity === '- None -' || selectedVehicle === '- None -') {
      setApp('Please select any city or vehicle to make the reservation.');
      setTimeout(() => {
        setApp("");
      }, 4000);
      return;
    }

    // Check if the selected vehicle in the selected city is already booked for the selected date range
    const alreadyBooked = rentedVehicles.find(booking=>
      booking.city===selectedCity&&
      booking.vehicle===selectedVehicle&&
      booking.sDate===date.startDate.toISOString().split("T")[0]
    )

    // If the vehicle is already booked, show a message and return
    if(alreadyBooked){
      setApp("You have already the reservation. Please change any one field.")
      setTimeout(()=>{
        setApp("")
      },4000)
      return
    }

    // Check if the user has already made two bookings before their request is approved
    if(rentedVehicles.length >1){
      setApp("You can only book twice before your request is approved.")
      setTimeout(() => {
        setApp("");
      }, 4000);
      return
    } else {
      // Add the rented vehicle details to the list of rented vehicles
      addrentedVehicle({
        city:selectedCity,
        vehicle:selectedVehicle,
        sDate:date.startDate.toISOString().split("T")[0],
        eDate:date.endDate.toISOString().split("T")[0],
        status:"pending"
      })
    }

    // Send booking request
    sendBookingRequest();

    // Set success message
    setApp(true);
    setTimeout(() => {
      setApp("");
    }, 2000);
  };

  return (
    <form onSubmit={handleApp}>
      {/* Display success or error message */}
      {app && (
        <div className={`message ${app === true ? "success" : "error"} ${app ? "active" : ""}`}>
          {app === true
            ? "You have sent the rental request. Please wait for approval."
            : app}
        </div>
      )}
      <div className="filter-car">
        <div className='two-dropdowns'>
          {/* City dropdown */}
          <div className="dropdown">
            <div className="dropdown-btn" onClick={() => setIsCityOpen(!isCityOpen)}>
              <div className="selection">
                <div className="daysp">Select your city</div>
                <div className="days">{selectedCity === '-None-' ? '-None-' : selectedCity}</div>
              </div>
              {isCityOpen ? <RiArrowDownSLine className="mappinline2" /> : <RiArrowUpSLine className="mappinline2" />}
            </div>
            <div className={`dropdown-menu ${isCityOpen ? 'open' : ''}`} ref={cityRef}>
              {/* Render city options */}
              {cities.map((city, index) => (
                <div key={index} className="dropdown--li city-item" onClick={() => handleCity(city)}>
                  {city}
                </div>
              ))}
            </div>
          </div>
          {/* Vehicle dropdown */}
          <div className="dropdown1">
            <div className="dropdown-btn" onClick={() => setIsVehicleOpen(!isVehicleOpen)}>
              <div className="selection">
                <div className="daysp">Select your Vehicle</div>
                <div className="days">{selectedVehicle === '-None-' ? '-None-' : selectedVehicle}</div>
              </div>
              {isVehicleOpen ? <RiArrowDownSLine className="mappinline2" /> : <RiArrowUpSLine className="mappinline2" />}
            </div>
            <div className={`dropdown-menu ${isVehicleOpen ? 'open' : ''}`} ref={vehicleRef}>
              {/* Render vehicle options */}
              {VehicleList.map((vehicle, index) => (
                <div key={index} className="dropdown--li vehicle-item" onClick={() => handleVehicle(vehicle)}>
                  {vehicle}
                </div>
              ))}
            </div>
          </div>
          {/* Calendar */}
          <div className='calendar' ref={CalendarRef}>
            <p>Select Date <span className='span-1' onClick={dateToggle}>
              {/* Display selected date range */}
              {`${format(date.startDate, "ddMMM,yyyy")} to ${format(date.endDate, "ddMMM,yyyy")} `}
            </span> </p>
            {/* Display date range picker */}
            {isDateOpen && <DateRangePicker onChange={handleChange} ranges={[date]} className='main-calendar' minDate={new Date()}></DateRangePicker>}
          </div>
        </div>
      </div>
      <button type='submit' className='rent-button' style={{marginTop:"10rem"}}>Rent Now</button>
    </form>
  );
};

export default FilterCar;
