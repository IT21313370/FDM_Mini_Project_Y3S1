import React, { useState } from 'react'
import { Link } from 'react-scroll';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import Groups2Icon from '@mui/icons-material/Groups2';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WorkIcon from '@mui/icons-material/Work';
import HailIcon from '@mui/icons-material/Hail';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';


export default function Main({ isLightMode, toggleMode }) {
    const [count, setCount] = useState(0);

      // Function to update count
  const updateCount = (newCount) => {
    setCount(newCount);
  };

  return (
    <div>
      <NavBar isLightMode={isLightMode} toggleMode={toggleMode} />
      <About count={count} updateCount={updateCount} />
    </div>
  )
}


function NavBar({ isLightMode, toggleMode }) {
 
  return (
    <div className={`NavBar ${isLightMode ? 'light-mode' : 'dark-mode'}`} id='NavBar'>
      <div className='navbar_1'>
        <span className='app-name'>HR Analytics Dashboard</span>
      </div>
      <div className='navbar-2'>
        <ul>
          <li>
            {isLightMode ? (
              <DarkModeOutlinedIcon onClick={toggleMode} />
            ) : (
              
              <LightModeOutlinedIcon  onClick={toggleMode} />
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

function About({count, updateCount}) {
    return (
        <div className='Area' id='About'>
            <Indicators count={count} />
            <Forms updateCount={updateCount}/>
            <footer className='footer'>
               copyright &copy; 2023 All Rights Reserved
            </footer>

        </div>
    )
}

function Indicators({count}) {
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
                        <span className='card_count'>70.6%</span>
                    </div>
                </div>
                <div className='card' id='card_03'>
                    <span className='card_name'>Stay Count</span>
                    <div className='card-desc'>
                        <div className='card_icon'><HailIcon /></div>
                        <span className='card_count'>390</span>
                    </div>
                </div>
                <div className='card' id='card_04'>
                    <span className='card_name'>Leave Count</span>
                    <div className='card-desc'>
                        <div className='card_icon'><DirectionsWalkIcon /></div>
                        <span className='card_count'>20</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Forms({updateCount}) {
   const [count, setCount] = useState(0);
    // Initialize state for form fields
  const [formData, setFormData] = useState({
    city_development_index: '',
    relevent_experience: '',
    education_level: '',
    total_experience: '',
    last_new_job_gap: '',
  });

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //handle submit button clicks
  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Access the form data in the formData object and send it to your backend or perform any other actions here.
    console.log(formData);

    // Example: Increment count and update it
    updateCount((prevCount) => prevCount + 1);
  };
    return (
        <div className='sub_area_02'>
            <div className='form_body'>
                <span className='form_name'>Data Submission Form</span>
                <form onSubmit={handleSubmit}>
        <label htmlFor="city_development_index">City Development Index (float)</label><br />
        <input
          type="number"
          step="0.01"
          name="city_development_index"
          value={formData.city_development_index}
          onChange={handleInputChange}
          required
        /><br /><br />

        <label htmlFor="relevent_experience">Relevant Experience (Yes/No)</label><br />
        <select
          name="relevent_experience"
          value={formData.relevent_experience}
          onChange={handleInputChange}
          required
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select><br /><br />

        <label htmlFor="education_level">Education Level</label><br />
        <select
          name="education_level"
          value={formData.education_level}
          onChange={handleInputChange}
          required
        >
          <option value="graduate">Graduate</option>
          <option value="masters">Masters</option>
          <option value="high_school">High School</option>
          <option value="phd">PhD</option>
          <option value="primary_school">Primary School</option>
        </select><br /><br />

        <label htmlFor="total_experience">Total Experience (Years)</label><br />
        <input
          type="number"
          name="total_experience"
          value={formData.total_experience}
          onChange={handleInputChange}
          required
        /><br /><br />

        <label htmlFor="last_new_job_gap">Last New Job Gap (Years)</label><br />
        <input
          type="number"
          step="0.01"
          name="last_new_job_gap"
          value={formData.last_new_job_gap}
          onChange={handleInputChange}
          required
        /><br /><br />
        <div className='button-container'>
            <button type="submit">Predict Status</button>
        </div>
      </form>
            </div>
            <div className='result_body'>
                <span className='form_name'>Predicted Results</span>
            </div>
        </div>
    )
}


