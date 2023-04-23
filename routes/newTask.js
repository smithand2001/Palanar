const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.render("newTask");
})

// invoked when user presses "Add Task"
// should add new task to DB
router.post('/create', function(req, res, next) {
    console.log("in task update handler")

    // input validation handled client-side, all incoming information
    // should be valid

    
})



// invoked when the user presses "Delete"
// should delete the task

module.exports = router;