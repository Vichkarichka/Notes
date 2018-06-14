
module.exports = function(app, db) {

    app.get('/notes', (req, res) => {

        db.collection('notes').find({}).toArray((err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(item);
            }
        });
    });

    app.post('/notes', (req, res) => {
        const note = { text: req.body.name, title: req.body.text };
        db.collection('notes').insert(note, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result.ops[0]);
            }
        });
    });
};