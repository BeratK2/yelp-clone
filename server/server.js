require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");

const morgan = require("morgan");


const app = express();

app.use(cors());
app.use(express.json());

//Get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
    const results = await db.query("SELECT * FROM restaurants");
    try{
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                restaurants: [results.rows],
            }
        })
    } catch(err){
        console.log(err);
        res.status(500).json({
            status: "error",
            message: "Something went wrong"
        })
    }
});

//Get a restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
    
    console.log(req.params.id);

    try{
        const results = await db.query("SELECT * FROM restaurants WHERE id = $1", [req.params.id]);
        res.status(200).json({
            status: "success",
            data: {
                restaurant: results.rows[0],
            },
        });
        console.log(results.rows);
    }

    catch(err){
        console.log(err);
        res.status(500).json({
            status: "error",
            message: "Something went wrong"
        })
}
});

//Create a restaurant
app.post("/api/v1/restaurants", async (req, res) => {
    console.log(req.body);
    try{
        const results = await db.query(
            "INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *", 
            [req.body.name, req.body.location, req.body.price_range]
        );
        console.log(results);
        res.status(201).json({
            status: "success",
            data: {
                restaurant: results.rows[0],
            }
        });
    }

    catch(err){
        console.log(err);
        res.status(500).json({
            status: "error",
            message: "Something went wrong"
        })
    }
});

//Update Restaurants
app.put("/api/v1/restaurants/:id", async (req, res) => {
    console.log(req.params.id);
    console.log(req.body);

    try{
        const results = await db.query(
            "UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *",
            [req.body.name, req.body.location, req.body.price_range, req.params.id]
        );
        res.status(200).json({
            status: "success",
            data: {
                restaurant: results.rows[0],
            }
        });
        console.log(results);
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status: "error",
            message: "Something went wrong"
        })
    }
});

//Delete a restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
    console.log(req.params.id);
    
    try{
        const results = await db.query("DELETE FROM restaurants WHERE id = $1", [req.params.id]);
        res.status(204).json({
            status: "success",
            data: null
        });

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status: "error",
            message: "Something went wrong"
        })
    }   
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});