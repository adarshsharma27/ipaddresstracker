import React from "react";
import { useState ,useEffect} from "react";

import Maps from "../Map/Maps";
const Search = () => {
    const [search, setSearch] = useState("");
    const[ipaddress,setIpAddress]=useState("");
   

    useEffect(()=>{
        const getIpAddress=async()=>{
             const ApiUrl= `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_API_KEY}&ipAddress=49.14.119.81`
             const res = await fetch(ApiUrl);
             const data =await res.json()
             setIpAddress(data);
            }
            getIpAddress();
    },[])
  const getIpAddress =async()=>{
    const regex =/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    if(!search){
        alert("Please Enter Ip Address");
    }
    else if(!regex.test(search)){
        alert("Enter Proper Ip Address");
    }
    else{
        const ApiUrl= `https://geo.ipify.org/api/v2/country,city?apiKey=at_nyWA42nzP5ywRD1wxiDODoHukdXoe&ipAddress=${search}`
        const res = await fetch(ApiUrl);
        const data =await res.json()
        setIpAddress(data);
    }
            
  }
  const handeleSubmit=()=>{
    getIpAddress();
    setSearch("");
  }
    return (
        <>
            <div className="form py-3 bg-light bg-image">
                <h2 className="py-3 text-center">IP Address Tracker</h2>
                <div className="form-container w-50 mx-auto">
                    <input type="search" className="form-control   mx-auto" placeholder="search" autoComplete="off" id="search" onChange={(event) => setSearch(event.target.value)} value={search} />
                    <i className="fas fa-chevron-right" onClick={() => handeleSubmit()}></i>
                </div>
                {
                      <div className="complete-data">
                     <div className="container py-4">
                         <div className="row">
                             <div className="col-lg-3 col-md-3 col-sm-12" style={{borderRight: '1px solid #999'}}>
                                 <div className="content">
                                     <h3 className="text-muted">IP ADDRESS</h3>
                                     <p>{ipaddress?.ip}</p>
                                     </div>
                                     </div>
                             <div className="col-lg-3 col-md-3 col-sm-12" style={{borderRight: '1px solid #999'}}>
                                 <div className="content">
                                     <h3>Location</h3>
                                     <p>{ipaddress.location?.city},{ipaddress.location?.region}</p>
                                     </div>
                                     </div>
                             <div className="col-lg-3 col-md-3 col-sm-12" style={{borderRight: '1px solid #999'}}>
                                 <div className="content">
                                     <h3>Timezone</h3>
                                     <p>UTC{ipaddress.location?.timezone}</p>
                                     </div>
                                     </div>
                             <div className="col-lg-3 col-md-3 col-sm-12">
                                 <div className="content">
                                     <h3>ISP</h3>
                                     <p>{ipaddress?.isp}</p>
                                     </div>
                                     </div>
                             </div>
                         </div>
                         </div>

                }
                

            </div>
            {
                               (ipaddress.location?.lat!==undefined) &&
                              <Maps  lat={ipaddress.location?.lat} lng={ipaddress.location?.lng}  region={ipaddress.location?.region}/>
                      }
                    </>
    );
};

export default Search;
