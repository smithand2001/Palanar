const express = require('express');
const router = express.Router();

// invoked when user presses an edit button somewhere else
// should bring up the Edit Task screen, fill in with all existing
// task information
router.get('/', function(req, res, next) {
    res.render("editTask");
})

// invoked when user presses "Save Changes"
// should update the task in question with the new values the user
// supplies
router.post('/update', function(req, res, next) {
    console.log("in task update handler")
})

router.post('/delete', function(req, res, next) {
    console.log("in task delete handler")
})

// invoked when the user presses "Delete"
// should delete the task

module.exports = router;