//Import Packages
const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')
const noteModel = require('./models/note')

//Parser for form   (2 Built-In Middlewares same as express.static)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Import static file
app.use(express.static(path.join(__dirname, 'public')))

//Setting EJS view engine
app.set('view engine', 'ejs')


//Database Routes
app.get('/', async(req, res) => {
    let files = await noteModel.find();
    res.render('index',{files})
})

app.post('/create', async(req, res) => {
    let { title, details } = req.body
    let fileCreated = await noteModel.create({ title, details })
    res.redirect('/')
})

app.get('/file/:id', async(req, res) => {
    let note = await noteModel.findOne({ _id: req.params.id })
    res.render('detail',{note})
})

app.post('/edit/:id', async(req, res) => {
    let note = await noteModel.findOneAndUpdate({ _id: req.params.id }, { title: req.body.new }, { new: true })
    res.redirect('/')
})

app.get('/edittitle/:id', async (req, res) => {
    let note = await noteModel.findOne({ _id: req.params.id })
    res.render('edittitle',{note})
})

app.get('/editdetails/:id', async(req, res) => {
    let note = await noteModel.findOne({ _id: req.params.id })
    res.render('editdetails',{note})
});

app.post('/details/:id', async(req, res) => {
    let note = await noteModel.findOneAndUpdate(
        { _id: req.params.id },
        { details: req.body.details },
        { new: true }
    )
    res.redirect('/')
})

app.get('/delete/:id', async(req, res) => {
    let note = await noteModel.findOneAndDelete({ _id: req.params.id })
    res.redirect('/')
});


app.listen(3000, () => {
    console.log("Server listening at port 3000")
})












// app.get('/', (req, res) => {
//     fs.readdir('./files', (err, files) => {
//         res.render('index', {files:files})
//     })
// })

// app.post('/create', (req, res) => {
//     fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, (err) => {
//         res.redirect('/')
//     })
// })

// app.get('/file/:filename', (req, res) => {
//     fs.readFile(`./files/${req.params.filename}`, 'utf-8', (err, data) => {
//         res.render('detail', {
//             filename: req.params.filename,
//             filedata: data
//         })
//     })
// })

// app.post('/edittitle', (req, res) => {
//     fs.rename(`./files/${req.body.previous}`, `./files/${req.body.new.split(' ').join('')}.txt`, (err) => {
//         res.redirect('/')
//     })
// })

// app.get('/edittitle/:filename', (req, res) => {
//     res.render('edittitle', {
//         filename: `${req.params.filename}`
//     })
// })

// app.get('/editdetails/:filename/:filedata', (req, res) => {
//     res.render('editdetails', {
//         filename: req.params.filename,
//         filedata: req.params.filedata
//     })
// });

// app.post('/editdetails', (req, res) => {
//     fs.writeFile(`./files/${req.body.title}`, req.body.details, (err) => {
//         res.redirect('/')
//     })
// })

// app.get('/delete/:filename', (req, res) => {
//     res.render('delete', {
//         filename: req.params.filename
//     });
// });

// app.post('/delete', (req, res) => {
//     const filename = `./files/${req.body.filename}`;
//     fs.unlink(filename, (err) => {
//         res.redirect('/');
//     });
// });
