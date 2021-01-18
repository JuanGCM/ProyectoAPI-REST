import express from "express";
import morgan from "morgan";
import morganBody from "morgan-body";

const app = express();

app.get('/lists', (req,res)=>{
    return res.send('Recibio un Get')
});

app.get('/list/{id}', (req,res)=>{
    return res.send('Recibio un Get')
});

app.post('/lists', (req,res)=>{
    return res.send('Recibio un Post')
});

app.put('/list/{id}', (req,res)=>{
    return res.send('Recibio un Post')
});

app.delete('/list/{id}', (req,res)=>{
    return res.send('Recibio un Delete')
});