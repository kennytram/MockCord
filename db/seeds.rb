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
    Channel.destroy_all
    Member.destroy_all
    Server.destroy_all
    User.destroy_all
    
    
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('servers')
    ApplicationRecord.connection.reset_pk_sequence!('members')
    ApplicationRecord.connection.reset_pk_sequence!('channels')
  
    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    User.create!(
      username: 'Demo-lition', 
      email: 'demo@user.io', 
      password: 'password'
    )

    User.create!(
      username: 'demo1', 
      email: 'demo1@user.io', 
      password: 'password'
    )

    User.create!(
      username: 'demo2', 
      email: 'demo2@user.io', 
      password: 'password'
    )

    puts "Creating servers..."
    Server.create!(
      name: "server1",
      owner_id: 1
    )
    Server.create!(
      name: "server2",
      owner_id: 1
    )
    Server.create!(
      name: "server3",
      owner_id: 2
    )

    puts "Creating members..."
    Member.create!(
      user_id: 1,
      server_id: 1
    )
    Member.create!(
      user_id: 1,
      server_id: 2
    )
    Member.create!(
      user_id: 2,
      server_id: 3
    )

    puts "Creating channels..."
    Channel.create!(
      name: "channel1",
      server_id: 1
    )
    Channel.create!(
      name: "channel2",
      server_id: 1
    )
    Channel.create!(
      name: "channel3",
      server_id: 1
    )
    Channel.create!(
      name: "channel4",
      server_id: 2
    )
    Channel.create!(
      name: "channel5",
      server_id: 2
    )

    # More users
    10.times do 
      User.create!({
        username: Faker::Internet.unique.username(specifier: 3),
        email: Faker::Internet.unique.email,
        password: 'password'
      }) 
    end
  
    puts "Done!"
  end