const fs = require('fs');

var uniqid = require('uniqid');

// routing
module.exports = function (app){
    app.get('./notes', (req, res) => {
        console.log('notes app working');

        let data = fs.readFileSync('./assets/db/db.json', 'utf8')

        res.json(JSON.parse(data));
    })
    app.post('./assets/db/db.json', (req, res) => {
        const newNote = {
            ...req.body,
            id: uniqid(),
        };

    let data = fs.readFileSync('./assets/db/db.json', 'utf8')
    
    const dataJSON = JSON.parse(data);

    dataJSON.push(newNote);
    

    fs.writeFile(
        './assets/db/db.json',
        JSON.stringify(dataJSON),
        (err, text) => {
            if (err) {
                console.error(err);
                return;
            }
        }
    );
    console.log('done', text)
    res.json(data);
});

    // deleting
    app.delete('./notes/:id', (req,res) => {
        let data = fs.readFileSync('assets/db/db.json', 'utf8');

        const dataJSON = JSON.parse(data);

        const newNotes = dataJSON.filter((note) => {
            return note.id !== req.params.id;
        });

        fs.writeFile('./assets/db/db.json', Json.stringify(newNotes),(err,text) => {
            if (err) {
                console.error(err)
                return;
            }
        })
        res.json(newNotes);
    });
};