import {BrowserRouter,Routes,Route} from "react-router-dom";

import Dashboard  from ".pages/Dashboard";
import RoomService  from ".pages/RoomService";
import Housekeeping  from ".pages/Housekeeping";
import Amenities  from ".pages/Amenities";
import RequestHistory  from ".pages/RequestHistory";

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/room-service" element={<RoomService/>}/>
        <Route path="/housekeeping" element={<Housekeeping/>}/>
        <Route path="/amenities" element={<Amenities/>}/>
        <Route path="/request" element={<RequestHistory/>}/>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;