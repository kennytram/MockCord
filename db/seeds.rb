# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    DmSubscription.destroy_all
    DirectMessage.destroy_all
    Channel.destroy_all
    ServerSubscription.destroy_all
    Server.destroy_all
    User.destroy_all
    
    
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('servers')
    ApplicationRecord.connection.reset_pk_sequence!('channels')
    ApplicationRecord.connection.reset_pk_sequence!('friend_requests')
    ApplicationRecord.connection.reset_pk_sequence!('messages')
    ApplicationRecord.connection.reset_pk_sequence!('server_subscriptions')
    ApplicationRecord.connection.reset_pk_sequence!('channels_subscriptions')
  
    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    User.create!(
      username: 'Demo-lition', 
      email: 'demo@user.io', 
      password: 'password'
    )

    User.create!(
      username: 'Demo-nstration', 
      email: 'demo@user.io', 
      password: 'password'
    )

    

    # More users
    20.times do 
      User.create!({
        username: Faker::Internet.unique.username(specifier: 3),
        email: Faker::Internet.unique.email,
        password: 'password'
      }) 
    end

    50.times do 
      test = Server.create!({
        name: Faker::Lorem.word,
        owner_id: rand(1..20)
      }) 
      ServerSubscription.create!(user_id: test.owner_id, server_id: test.id)
      Channel.create!({
        name: "general",
        server_id: test.id
      })
    end

    100.times do 
      Channel.create!({
        name: Faker::Lorem.word,
        server_id: rand(1..50)
      }) 
    end

    50.times do 
      ServerSubscription.create!({
        user_id: rand(3..20),
        server_id: rand(2..50)
      }) 
    end

    27.times do 
      ServerSubscription.create!({
        user_id: 1,
        server_id: rand(1..50)
      }) 
    end

    27.times do 
      ServerSubscription.create!({
        user_id: 2,
        server_id: rand(1..50)
      }) 
    end

    ServerSubscription.create!({
      user_id: 1,
      server_id: 1
    })

    ServerSubscription.create!({
      user_id: 2,
      server_id: 1
    })
  
    puts "Done!"
end