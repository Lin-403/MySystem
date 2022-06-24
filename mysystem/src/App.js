import React, { useEffect } from 'react';
import './App.scss'
import axios from 'axios'
import IndexRouter from './router/IndexRouter.js';


export default function App() {
  
  // useEffect(() => {
  //   axios({
  //      url:'/ajax/moreCinemas?movieId=0&day=2022-06-23&offset=0&limit=20&districtId=-1&lineId=-1&hallType=-1&brandId=-1&serviceId=-1&areaId=-1&stationId=-1&item=&updateShowDay=true&reqId=1655988442997&cityId=105&optimus_uuid=C6AAD3B0D71211EC8039CFEDCEDF43D6227119FD6A4D4EC0A73898637D9F2826&optimus_risk_level=71&optimus_code=10'
  //   }).then(res=>{
  //     console.log(res)
  //   })
  // })
  return (
      <IndexRouter />
  );
}
