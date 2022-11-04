const {Article} = require('../mongoose/model')

// Q id만 필요한 경우 vs content 필요한 경우
// id만 필요하면 /delete/:id params 식으로 주소 가져옴?
// CREATE
const articleCreate = async (req, res) => {
    const {content} = req.body
    const newArticle = await Article({ content })
    const saveRequest = await newArticle.save()
    console.log('만든 콘텐츠: ', saveRequest);
    res.send(saveRequest)
}

// READ
const articleRead = async (req, res) => {
    const articles = await Article.find({})
 
    res.send(articles)
}

// FIND ONE
const articleFindOne = async (req, res) => {
    const {id} = req.params
    const article = await Article.findById(id)

    res.send(article)
}

// UPDATE
const articleUpdate = async (req, res) => {
    const { id, content } = req.body
    const updateArticle = await Article.findByIdAndUpdate(id, { content })
    // const updateArticle = await Article.find({})
    res.send(updateArticle)
}

// DELETE
const articleDelete = async (req, res) => {
    // const { id } = req.body;
    const { id } = req.params
    await Article.findByIdAndDelete(id)
    const deleteArticle = await Article.find({})
    
    res.send(deleteArticle)
}

module.exports = {
    articleCreate,
    articleRead,
    articleFindOne,
    articleUpdate,
    articleDelete
}