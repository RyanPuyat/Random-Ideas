const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea');

//Get all ideas
router.get('/', async (req, res) => {
  try {
    const ideas = await Idea.find();
    res.json({ success: true, data: ideas });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
});

//Get single idea on database
router.get('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    res.json({ success: true, data: idea });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
});

//Add an idea to the database

router.post('/', async (req, res) => {
  const idea = new Idea({
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
  });

  //   console.log(idea);
  try {
    const saveIdea = await idea.save();
    res.json({ success: true, data: saveIdea });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
});

//Update idea

router.put('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    // if username match
    if (idea.username === req.body.username) {
      const updatedIdea = await Idea.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            text: req.body.text,
            tag: req.body.tag,
          },
        },
        { new: true }
      );
      return res.json({ success: true, data: updatedIdea });
    }
    //Username not match
    // console.log(error);
    res.status(403).json({ success: false, error: 'Unauthorized' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
});

//Delete idea on database

router.delete('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    // if username match
    if (idea.username === req.body.username) {
      await Idea.findByIdAndDelete(req.params.id);
      return res.json({ success: true, data: {} });
    }

    // username not match
    // console.log(error);
    res.status(403).json({ success: false, error: 'Unauthorized' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
});

module.exports = router;
