var Article = require("app/content/article").Article,
    Category = require("app/content/category").Category;

exports.GET = function(env) {
    var db = openDatabase();
    var params = env.request.params();
    
    var article;
    
    if (params.id) {
        article = db.query("SELECT * FROM Article WHERE id=?", params.id).one(Article);
    } else {
        article = new Article();
    }
    
    return {
        title: article.id ? ("Edit '"+article.title+"'") : "New article",
        article: article,
        categories: db.query("SELECT id, label FROM Category ORDER BY label").all(Category)
    }
}
