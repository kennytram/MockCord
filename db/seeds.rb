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
  Message.destroy_all
  ChannelSubscription.destroy_all
  Channel.destroy_all
  ServerSubscription.destroy_all
  Server.destroy_all
  User.destroy_all
  
  
  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')
  ApplicationRecord.connection.reset_pk_sequence!('servers')
  ApplicationRecord.connection.reset_pk_sequence!('channels')
  ApplicationRecord.connection.reset_pk_sequence!('server_subscriptions')
  ApplicationRecord.connection.reset_pk_sequence!('channel_subscriptions')
  ApplicationRecord.connection.reset_pk_sequence!('friend_requests')
  ApplicationRecord.connection.reset_pk_sequence!('messages')

  puts "Creating users..."

  User.create!({username: 'Kenny', email: 'kenny@user.io', password: 'password', status: 'online', tag: '1080'})
  
  User.create!({username: 'Demo-lition', email: 'Demo-lition@user.io', password: 'password', status: 'online', tag: '1641'})

  User.create!({username: 'Demo-nstration', email: 'Demo-nstration@user.io', password: 'password',status: 'online',tag: '4842'})

  User.create!({username: 'Demo-graphics', email: 'Demo-graphics@user.io', password: 'password', status: 'online',tag: '9643'})

  User.create!({username: 'HelloWorld', email: 'H3110W041D@user.io', password: 'password', status: 'online', tag: '0989'})

  puts "Creating a server..."

  Server.create!({name: 'Demo Server',owner_id: 1})
  
  puts "Create server subscriptions..."
  ServerSubscription.create!(user_id: 1, server_id: 1)
  ServerSubscription.create!(user_id: 2, server_id: 1)
  ServerSubscription.create!(user_id: 3, server_id: 1)
  ServerSubscription.create!(user_id: 4, server_id: 1)
  ServerSubscription.create!(user_id: 5, server_id: 1)

  puts "Creating channels..."
  Channel.create!({
    name: "general",
    server_id: 1
  })


  puts "Creating friend requests..."
  FriendRequest.create!(sender_id: 1, receiver_id: 2, status: 'accepted')
  FriendRequest.create!(sender_id: 1, receiver_id: 3, status: 'accepted')
  FriendRequest.create!(sender_id: 1, receiver_id: 4, status: 'accepted')
  FriendRequest.create!(sender_id: 1, receiver_id: 5, status: 'accepted')

  FriendRequest.create!(sender_id: 2, receiver_id: 3, status: 'accepted')
  FriendRequest.create!(sender_id: 2, receiver_id: 4, status: 'accepted')

  FriendRequest.create!(sender_id: 3, receiver_id: 5, status: 'accepted')

  FriendRequest.create!(sender_id: 4, receiver_id: 5, status: 'accepted')


  puts "Creating DM channels..."
  Channel.create!({
    name: "Kenny/Demo-lition"
  })
  Channel.create!({
    name: "Kenny/Demo-nstration"
  })
  Channel.create!({
    name: "Kenny/Demo-graphics"
  })
  Channel.create!({
    name: "Kenny/HelloWorld"
  })

  ChannelSubscription.create!(user_id: 1, channel_id: 2)
  ChannelSubscription.create!(user_id: 2, channel_id: 2)
  ChannelSubscription.create!(user_id: 1, channel_id: 3)
  ChannelSubscription.create!(user_id: 3, channel_id: 3)
  ChannelSubscription.create!(user_id: 1, channel_id: 4)
  ChannelSubscription.create!(user_id: 4, channel_id: 4)
  ChannelSubscription.create!(user_id: 1, channel_id: 5)
  ChannelSubscription.create!(user_id: 5, channel_id: 5)

  Channel.create!({
    name: "Demo-lition/Demo-nstration"
  })
  Channel.create!({
    name: "Demo-lition/Demo-graphics"
  })

  ChannelSubscription.create!(user_id: 2, channel_id: 6)
  ChannelSubscription.create!(user_id: 2, channel_id: 7)
  ChannelSubscription.create!(user_id: 3, channel_id: 6)
  ChannelSubscription.create!(user_id: 4, channel_id: 7)

  Channel.create!({
    name: "Demo-nstration/HelloWorld"
  })
  Channel.create!({
    name: "Demo-graphics/HelloWorld"
  })

  ChannelSubscription.create!(user_id: 3, channel_id: 8)
  ChannelSubscription.create!(user_id: 5, channel_id: 8)
  ChannelSubscription.create!(user_id: 4, channel_id: 9)
  ChannelSubscription.create!(user_id: 5, channel_id: 9)

  puts "Done!"
end