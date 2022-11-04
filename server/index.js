const express = require('express')
const app = express()
// client axios -> server에서 데이터 가져오기
const cors = require('cors')
const { Article } = require('./api')
const PORT = 3000

// client에서
app.use(cors());
// app.use(cors({origin: true, credentials: true}));
// body parser post로 들어오는 값 변환
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Success!!!')
})  

app.get('/read', Article.articleRead)

app.get('/read/:id', Article.articleFindOne)
    
app.post('/create', Article.articleCreate)

app.patch('/update', Article.articleUpdate)
  
app.delete('/delete/:id', Article.articleDelete)

app.listen(PORT, 'localhost', () => {
    console.log(`App listening at http://localhost:${PORT}`);
})   