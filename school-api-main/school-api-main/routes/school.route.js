import { Router } from "express";
import db_pool from "../database/connect.js";
import { errorHandler } from "../utils/error.js";
import { calculateAndSortByDistance } from "../utils/helpers.js";

const router = Router()

router.post('/addSchool', async (req, res, next) => {
  const { name, address, latitude, longitude } = req.body
  
  if (!name || !address || !latitude || !longitude || !name.length || !address.length) {
    return next(errorHandler(400, 'All fields are required!'))
  }

  const existingSchoolQuery = `SELECT name FROM schools WHERE latitude=${latitude} AND longitude=${longitude}`;
  const insertSchoolQuery = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
  
  try {
    const existingSchool = await db_pool.query(existingSchoolQuery, [latitude, longitude]);

    if (existingSchool) 
      return next(errorHandler(400, 'School already exists!'))


    const resp = await db_pool.query(insertSchoolQuery, [name, address, latitude, longitude]);

    res.status(201).json('School added successfully!');

  } catch (e) {
    next(e)
  } 
})

router.get('/listSchools', async (req, res, next) => {
  const user = req.body
  const { userLat, userLon }  = user

  if (!userLat || !userLon)
    return next(errorHandler(400, 'All fields are required!'))

  try {
    const [schools] = await db_pool.query('SELECT * FROM schools')

    const sortedSchoolData = calculateAndSortByDistance(user, schools)
    res.status(200).json(sortedSchoolData)
    
  } catch (e) {
    next(e)
  }
})

export default router