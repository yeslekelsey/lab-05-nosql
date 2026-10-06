#!/usr/bin/env python3
import os
import logging
from pymongo import MongoClient

# Logging
logging.basicConfig(level=logging.INFO, format="%(message)s")
log = logging.getLogger(__name__)

# Read URL, Username, and Password
URL = os.getenv('MONGODB_ATLAS_URL')
USER = os.getenv('MONGODB_ATLAS_USER')
PWD = os.getenv('MONGODB_ATLAS_PWD')

def main():
    """Prints a list of all authors and their books and publication years."""
    try:
        # Connect to MongoDB Atlas 
        client = MongoClient(
            URL,
            username=USER,
            password=PWD,
            connectTimeoutMS=2000,
            retryWrites=True
        )
        #Select bookstore database
        database = client["bookstore"]

        #Lookup the author id from books collection 
        pipeline = [
            {
                "$lookup": {
                    "from": "books",
                    "localField": "_id",
                    "foreignField": "author_ids",
                    "as": "books"
                }
            },
            {
                "$sort": {"name": 1}
            }
        ]
        #List number of authors
        authors = list(database.authors.aggregate(pipeline))
        print(f"Authors: {len(authors)}\n")

        #Print every author's books and publication dates
        for author in authors:
            print(f"\n{author['name']}")
            for book in author.get("books", []):
                print(f"  - {book['title']} ({book['published_year']})")

        logging.info("\nSuccessfully printed list of authors and their books.")
    except Exception as error:
        logging.error("Error: could not print list of authors and books: %s", error)
        raise


if __name__ == "__main__":
    main()