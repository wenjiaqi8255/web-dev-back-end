db.products.insertOne({
    _id:2,
    name:"pencil",
    price:0.8,
    stock:12,
    reviews:[
        {
            authorName: "Sally",
            rating:5,
            review:"good pencil"
        },
        {
            authorName: "John",
            rating:5,
            review:"very good pencil"
        }
    ]
})