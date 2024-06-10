

const express = require('express');
const router = express.Router();
const axios = require('axios');


router.get('/characters', async (req, res) => {
  try {
   
    const response = await axios.get('https://swapi.dev/api/people');
        
         const { page } = req.query;
  
    if (page) {
        url += `?page=${page}`;
      }

      const characters = response.data.results;
      const nextPage = response.data.next;
      const previousPage = response.data.previous;
    
    res.status(200).json({ characters, nextPage, previousPage});
  } catch (error) {
    console.error('Error fetching characters:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
