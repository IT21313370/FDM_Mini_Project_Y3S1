import './App.css';
import Main from './Main';
import { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { ScaleLoader } from 'react-spinners';



const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function App() {
  const [loading, setLoading] = useState(true);
  const [isLightMode, setIsLightMode] = useState(false);

  const toggleMode = () => {
      setIsLightMode(!isLightMode);
  }; 

  useEffect(() => {
    // Simulate a loading delay
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  return (
    <div className={`App ${isLightMode ? 'light-mode' : 'dark-mode'}`}>
      {loading ? (
        <div className="loader">
          <ScaleLoader color={'#D65A31'} loading={loading} css={override} size={150} />
        </div>
      ) : (
        <Main isLightMode={isLightMode} toggleMode={toggleMode} />
      )}
    </div>
  );
}

export default App;
