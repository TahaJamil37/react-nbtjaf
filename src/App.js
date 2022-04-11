import React, { useEffect, useState } from 'react';
import './style.css';

export default function App() {
  const [MSISDN, setMSISDN] = useState(null);
  var currentTime = new Date()
    .toLocaleTimeString()
    .replace('/.*(d{2}:d{2}:d{2}).*/', '$1');
  useEffect(() => {
    var req = new XMLHttpRequest();
    req.open('GET', document.location, false);
    req.send(null);
    var data = new Object();
    var headers = req.getAllResponseHeaders().toLowerCase();
    var aHeaders = headers.split('\n');
    for (var i = 0; i < aHeaders.length; i++) {
      var thisItem = aHeaders[i];
      var key = thisItem.substring(0, thisItem.indexOf(':'));
      var value = thisItem.substring(thisItem.indexOf(':') + 1);
      data[key] = value;
    }
    if (data['X-MSISDN']) {
      let result = data['X-MSISDN']?.replace('92', '0');
      setMSISDN(result);
    }
  }, []);
  return (
    <div>
      <p>
        This is the MSISDN using header enrichment: {MSISDN} at {currentTime}{' '}
      </p>
    </div>
  );
}
