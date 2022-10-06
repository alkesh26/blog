---
title: Rails ActiveRecord select method adds the ability to receive hash values
description: Rails ActiveRecord select method adds the ability to use a hash with columns and aliases inside the select method keeping it similar to the where clause.
date: 2022-09-05
hashtags: ["rails", "rubyonrails"]
categories: "rails, rubyonrails"
---

Rails ActiveRecord **#select** is one of the fundamental methods
to fetch the model attributes when querying on a table.

It is served in two ways:

* It takes a block, that gets executed like **Array#select**.
  For e.g.,

  ```ruby
  Post.all.select{ |post| post.title.include?('Rails') }
  ```

  The above code will first fetch all the posts from the database.
  Then the select command will iterate through all the posts and extract
  the ones which contain the title **Rails**.
  The above code returns an array of post objects.

* When used on a model, it works as the SELECT statement for the query
  to fetch particular fields.
  For e.g.,

  ```ruby
  Post.select(:title, :description)

  => SELECT \"posts\".\"title\", \"posts\".\"description\" FROM \"posts\"
  ```

When working on multiple tables using **joins**, or **includes**,
we can select fields of different tables as below:

```ruby
Post
  .joins(:comments)
  .select(
    'posts.id as post_id, posts.title as post_tile,
    comments.id as comment_id, comments.body as comment_body'
  )
```

### Before

As seen above, we had to write and pass an SQL statement to the select
method when working with associated tables.
This is not similar to what we do when using the **where** clause.

```ruby
Post
  .joins(:comments)
  .where(
    comments: {
      author_id: 1
    }
  )

# OR

Post
  .joins(:comments)
  .where(
    'comments.author_id = ?', 1
  )
```

The **where** method accepts a hash and can process SQL statements too.
If we try to pass a hash to the select method, it will raise an error as below:

```ruby
Post
  .joins(:comments)
  .select(
    { comments: { id: :comment_id, body: :comment_body } }
  )

Arel::Visitors::UnsupportedVisitError: Unsupported argument type: Hash. Construct an Arel node instead.
```

### After

To reduce efforts of writing raw SQL statements and keeping things
consistent across Rails query methods,
[ActiveRecord::QueryMethods#select** allows accepting hash](https://github.com/rails/rails/pull/45612).

The hash values can be an array of field attributes of the associated model
as below:

```ruby
Post
  .joins(:comments)
  .select(
    { comments: [:id, :body] }
  )
```

We can also pass a hash of fields and aliases as below:

```ruby
Post
  .joins(:comments)
  .select(
    { comments: {id: :comment_id, body: :comment_body } }
  )
```

To know more about this feature, please check this
[Pull Request](https://github.com/rails/rails/pull/45612).
