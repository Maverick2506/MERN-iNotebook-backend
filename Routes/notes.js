const express = require("express");
const router = express.Router();
const fetchUser = require("../Middleware/fetchUser");
const { body, validationResult } = require("express-validator");
const Note = require("../Models/Note");

// Route 1: Fetch all notes for the current user using: GET "/api/notes/fetchnotes". Login required
router.get("/fetchnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error may have occured");
  }
});

// Route 2: Add a note for the current user using: POST "/api/notes/addnote". Login required
router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "Title must be atleast 3 characters long.").isLength({
      min: 3,
    }),
    body("content", "Content must be atleast 5 characters long.").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const { title, content, tag } = req.body;
    //If there are errors return Bad request and the error message
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const note = new Note({
        title,
        content,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server error may have occured");
    }
  }
);

module.exports = router;
