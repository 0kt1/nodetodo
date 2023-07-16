var bodyParser = require('body-parser')
var mongoose = require('mongoose')


mongoose.connect('mongodb+srv://test:test@cluster0.jotwrly.mongodb.net/?retryWrites=true&w=majority')

var todoSchema = new mongoose.Schema({
  item: String
})

var Todo = mongoose.model('Todo', todoSchema)
var itemOne = Todo({item: 'buy flowers'}).save().then(() => {console.log('item saved');})

//var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}]
var urlencodedParser = bodyParser.urlencoded({extended: false})


module.exports = function(app){

  app.get('/todo', function(req, res){
    //get data from mongodb and pass it to view
    Todo.find().then((data) => res.render('todo', {todos: data}))

    })



  app.post('/todo', urlencodedParser, function(req, res){
    //get data from view and add it to mongodb
    var newTodo = Todo(req.body).save().then((data) => res.json(data)).catch((err) => console.log('error'))


  })
  app.delete('/todo/:item', function(req, res){
    //delete the requested item from mongodb
    Todo.find({item: req.params.item.replace(/\-/g, "")}).deleteMany().then((data) => res.json(data)).catch((err) => console.log('error'))
  })
}
