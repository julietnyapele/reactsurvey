
import { Link } from 'react-router-dom';
import Navigation from './Navbar';
import './Dashboard.css';
import {RiSurveyFill} from 'react-icons/ri';

const Dashboard = () => {
  const myStyle={
    backgroundImage:"url('https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_1170/https://quixy.com/wp-content/uploads/2022/06/Top-Form-Automation-Tools.png')",
   
    height:'100vh',
    backgroundSize: '100%',
    backgroundRepeat: '',
    backgroundposition: 'center',
};
 
  

  return (
    
    <div style={myStyle}>
      <Navigation />
 
      
<form>
     
      <Link to="/MarketSurvey">
        <p>Your options and feeback mean alot to us. We have a survey for you, 
          which will take approximately 2 minutes to complete.</p>
          <RiSurveyFill/> Start
      </Link>
</form>
    </div>
    
  );
};

export default Dashboard;
