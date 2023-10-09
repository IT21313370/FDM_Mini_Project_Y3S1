import React, { useState, useEffect } from 'react';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import Groups2Icon from '@mui/icons-material/Groups2';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import HailIcon from '@mui/icons-material/Hail';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import businessLogo2 from './assets/businessLogo2.png';
import businessLogo1 from './assets/businesssLogo1.png';
import Swal from 'sweetalert2';

export default function Main({ isLightMode, toggleMode }) {
  const [count, setCount] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [onesCount, setOnesCount] = useState(0); // Initialize onesCount
  const [zerosCount, setZerosCount] = useState(0); // Initialize zerosCount

  const updateCount = (newCount) => {
    setCount(newCount);
  };

  return (
    <div>
      <NavBar isLightMode={isLightMode} toggleMode={toggleMode} />
      <About
        count={count}
        updateCount={updateCount}
        submitted={submitted}
        onesCount={onesCount} 
        zerosCount={zerosCount}
        setSubmitted={setSubmitted}
        setOnesCount={setOnesCount} // Pass setOnesCount
        setZerosCount={setZerosCount} // Pass setZerosCount
      />
      {/* <Indicators count={count} onesCount={onesCount} zerosCount={zerosCount} /> */}
    </div>
  );
}


// ... Rest of the code remains the same


// ... Rest of the code remains the same


function NavBar({ isLightMode, toggleMode }) {
  return (
    <div className={`NavBar ${isLightMode ? 'light-mode' : 'dark-mode'}`} id='NavBar'>
      <div className='navbar_1'>
        {isLightMode ? (
          <img src={businessLogo2} alt='logo' />
        ) : (
          <img src={businessLogo1} alt='logo' />
        )}
        <span className='app-name'>HR Analytics Dashboard</span>
      </div>
      <div className='navbar-2'>
        <ul>
          <li>
            {isLightMode ? (
              <DarkModeOutlinedIcon onClick={toggleMode} />
            ) : (
              <LightModeOutlinedIcon onClick={toggleMode} />
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

function About({ count, updateCount, submitted, setSubmitted, setOnesCount, setZerosCount, onesCount, zerosCount }) {
  return (
    <div className='Area' id='About'>
      <Indicators count={count} onesCount={onesCount} zerosCount={zerosCount} />
      <Forms
        updateCount={updateCount}
        submitted={submitted}
        setSubmitted={setSubmitted}
        setOnesCount={setOnesCount} // Pass setOnesCount
        setZerosCount={setZerosCount} // Pass setZerosCount
      />
      <footer className='footer'>
        copyright &copy; 2023 All Rights Reserved
      </footer>
    </div>
  );
}


function Indicators({ count, onesCount, zerosCount }) {
  return (
    <div className='sub_area_01'>
      <div className='indicator_cards'>
        <div className='card' id='card_01'>
          <span className='card_name'>Total Headcount</span>
          <div className='card-desc'>
            <div className='card_icon'><Groups2Icon /></div>
            <span className='card_count'>{count}</span>
          </div>
        </div>
        <div className='card' id='card_02'>
          <span className='card_name'>Model Accuracy</span>
          <div className='card-desc'>
            <div className='card_icon'><TrendingUpIcon /></div>
            <span className='card_count'>76%</span>
          </div>
        </div>
        <div className='card' id='card_03'>
          <span className='card_name'>Stay Count</span>
          <div className='card-desc'>
            <div className='card_icon'><HailIcon /></div>
            <span className='card_count'>{zerosCount}</span>
          </div>
        </div>
        <div className='card' id='card_04'>
          <span className='card_name'>Leave Count</span>
          <div className='card-desc'>
            <div className='card_icon'><DirectionsWalkIcon /></div>
            <span className='card_count'>{onesCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Forms({ updateCount, submitted, setSubmitted,   setOnesCount, setZerosCount }) {
  const [data, setData] = useState({});

  const [formData, setFormData] = useState({
    city_development_index: '',
    relevent_experience: '',
    education_level: '',
    total_experience: '',
    last_new_job_gap: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Submission Successful',
      showConfirmButton: false,
      timer: 2000,
    });
    setSubmitted(true);
    updateCount((prevCount) => prevCount + 1);
    // const predictionValue = data.prediction >= 0.5 ? 1 : 0;
    // if (predictionValue === 0) {
    //   setZerosCount((prevCount) => prevCount + 1); // Increase Stay Count
    //   // setZerosCount((prevCount) => prevCount);
    // } else {
    //   setOnesCount((prevCount) => prevCount + 1); // Increase Leave Count
    //   // setOnesCount((prevCount) => prevCount);
    // }
    fetchData()
  };

  const handleClear = () => {
    setFormData({
      city_development_index: '',
      relevent_experience: '',
      education_level: '',
      total_experience: '',
      last_new_job_gap: '',
    });
    setData({});
    setSubmitted(false);
  };

  useEffect(() => {
    if (submitted) {
      fetchData();
    }
  }, [submitted]);

  const fetchData = async () => {
    try {
      const url = `http://localhost:5000/predict?city_development_index=${formData.city_development_index}&relevent_experience=${formData.relevent_experience}&education_level=${formData.education_level}&total_experience=${formData.total_experience}&last_new_job_gap=${formData.last_new_job_gap}`;

      const response = await fetch(url);
      if (response.ok) {
        const jsonData = await response.json();
        setData(jsonData);

        // Update onesCount and zerosCount based on the prediction
        if (jsonData.prediction >= 0.5) {
          setOnesCount((prevCount) => prevCount + 1); // Increase Leave Count
        } else {
          setZerosCount((prevCount) => prevCount + 1); // Increase Stay Count
        }
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='sub_area_02'>
      <div className='form_body'>
        <form action='/predict' method='GET' onSubmit={handleSubmit}>
          <label htmlFor='city_development_index'>City Development Index</label>
          <input
            type='number'
            step='0.01'
            name='city_development_index'
            value={formData.city_development_index}
            onChange={handleInputChange}
            placeholder='ex: 1.42'
            required
          /><br /><br />

          <label htmlFor='relevent_experience'>Relevant Experience <span className='label_desc'>(Yes/No)</span></label>
          <select
            name='relevent_experience'
            value={formData.relevent_experience}
            onChange={handleInputChange}
            required
          >
            <option value='Yes'>Yes</option>
            <option value='No'>No</option>
          </select><br /><br />

          <label htmlFor='education_level'>Education Level</label>
          <select
            name='education_level'
            value={formData.education_level}
            onChange={handleInputChange}
            required
          >
            <option value='graduate'>Graduate</option>
            <option value='masters'>Masters</option>
            <option value='high_school'>High School</option>
            <option value='phd'>PhD</option>
            <option value='primary_school'>Primary School</option>
          </select><br /><br />

          <label htmlFor='total_experience'>Total Experience <span className='label_desc'>(Years)</span></label>
          <input
            type='number'
            name='total_experience'
            value={formData.total_experience}
            onChange={handleInputChange}
            placeholder='ex: 2'
            required
          /><br /><br />

          <label htmlFor='last_new_job_gap'>Last New Job Gap <span className='label_desc'>(Years)</span></label>
          <input
            type='number'
            name='last_new_job_gap'
            value={formData.last_new_job_gap}
            onChange={handleInputChange}
            placeholder='ex: 3'
            required
          /><br /><br />
          <div className='button-container'>
            <button type='submit'>Predict</button>
            <button
            type='button'
            onClick={handleClear}
              style={{
                background: 'white',
                color: 'black',
                transition: 'background 0.3s',
                border: '1px solid grey',
              }}
            >
              Clear
            </button>
          </div>
        </form>
      </div>
      <div className='result_body'>
        <div className='box_body'>
          <div className='result_box'>
            <span className='box_name'>Result</span><br />
            {submitted && (
              <span className='box_result' id='result_status_box' >{data.prediction >= 0.5 ? '0' : '1'}</span>
            )}
          </div>
          <div className='result_box'>
            <span className='box_name'>Status</span><br />
            {submitted && (
              <span className='box_result' style={{ color: data.prediction >= 0.5 ? 'red' : '#16FF00' }}>{data.prediction >= 0.5 ? 'Exit' : 'Stay'}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}