import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import GetApi from './apiGet/ApiGet';
function App() {
  return (
   <Router>
      <GetApi/>
   </Router>
  );
}

export default App;
