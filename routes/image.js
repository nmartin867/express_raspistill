var express = require('express');
var router = express.Router();
var exec = require('child_process').exec;


router.get('/', function (req, res) {
    var options = {
        root: './public/captures'
    };
    res.sendFile('image.jpg', options, function (err) {
        if (err) {
            res.status(err.status).end();
        }
    });
});

// POST /image/:width/:height
router.post('/:width/:height', function (req, res) {
    var cmd = 'raspistill -w ' + req.params.width + ' -h ' + req.params.height + ' -o ./public/captures/image.jpg --timeout 1 --nopreview';
    exec(cmd, function (err, stdout, stderr) {
        if (err) {
            res.status(500);
            res.json({cmd: cmd, errmessage: err.message});
        } else if (stderr) {
            res.status(500);
            res.json({cmd: cmd, errmessage: stdout});
        } else {
            res.status(200);
            res.end();
        }
    });
});

module.exports = router;