const express = require('express');
const st = require('./salahTimings');

var app = express();
var port = 3000;

app.get('/namazTimings ',async(req,res)=>{
    var data = await st.getSalahTimes();
    res.send(data);
})

app.listen(port,()=>{
    console.log(`listing on port ${port}`);

})