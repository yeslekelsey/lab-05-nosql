// Step 2: 
// use bookstore 
db = db.getSiblingDB("bookstore")

// Step 3: load authors.json
// paste your drop and insertMany commands here
db.authors.drop()
doc = JSON.parse(fs.readFileSync("authors.json", "utf8"))
db.authors.insertMany(doc)

// Step 4: load books.json
// paste your drop and insertMany commands here
db.books.drop()
doc = JSON.parse(fs.readFileSync("books.json", "utf8"))
db.books.insertMany(doc)

// Step 5: list authors and books
// paste your find commands here
db.authors.find()
db.books.find()

// Step 6: insert two new books
// paste your insert commands here
db.books.insertOne({
    "title": "The Perks of Being a Wallflower",
    "published_year": 1999,
    "author_ids": ["author_004"]
});

db.books.insertOne({
    "title": "East of Eden",
    "published_year": 1952,
    "author_ids": ["author_005"]
});

// Step 7: add missing authors
// paste your insert commands here
db.authors.insertOne({
    "_id": "author_004",
    "name": "Stephen Chbosky",
    "nationality": "American",
    "bio": {
      "short": "American author and filmmaker celebrated for poignant coming-of-age stories.",
      "long": "Stephen Chbosky is an American novelist, screenwriter, and film director. He gained widespread recognition for his bestselling 1999 epistolary novel, The Perks of Being a Wallflower. He later wrote and directed its successful 2012 film adaptation."
    }
});

db.authors.insertOne({
    "_id": "author_005",
    "name": "John Steinback",
    "nationality": "American",
    "bio": {
      "short": "Nobel-winning chronicler of working-class struggles during the Great Depression.",
      "long": "John Steinbeck was an acclaimed American author known for his realistic and sympathetic depictions of migrant workers. His landmark novels include The Grapes of Wrath, Of Mice and Men, and East of Eden."
    }
});

// Step 8: filter books by a list of authors
// paste your find command here
db.books.find({ author_ids: { $in: ["author_001", "author_004"] } })