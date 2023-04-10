# <a href="https://untitled-w1r2.onrender.com/">MockCord</a>
Welcome to MockCord! MockCord is a web-based application that allows users to communicate with each other through real-time chat messaging. In the current version of the application, users are also able to create servers and channels, and become friends with each other. and The application is designed to replicate some of the features of the popular communication platform Discord. 

<img src="https://github.com/kennytram/MockCord/blob/main/frontend/assets/demo/SplashPage.gif?raw=true" width=800 height=500/>

## Technologies 
MockCord is a full-stack web application that ultitizes the followings:
- Frontend: React-Redux
- Backend: Ruby on Rails
- Database: PostgreSQL
- Icons: Material UI

## Highlighted Features

### Real-time Chat
<img src="https://github.com/kennytram/MockCord/blob/main/frontend/assets/demo/Chat.gif?raw=true" width=700 height=500/>

### Edit/Delete Message
<img src="https://github.com/kennytram/MockCord/blob/main/frontend/assets/demo/Edit-Message.gif?raw=true?raw=true" width=700 height=400/>

### Receiving Friend Requests
<img src="https://github.com/kennytram/MockCord/blob/main/frontend/assets/demo/Friend-Request.gif?raw=true" width=700 height=470/>

### Sending Friend Requests
<img src="https://github.com/kennytram/MockCord/blob/main/frontend/assets/demo/Add-Friend.gif?raw=true" width=700 height=500/>

## Highlighted Code Snippets

### Creating a Message and Broadcast it with Action Cable
```ruby
def create
    @message = Message.new(message_params)
    @message.author_id ||= current_user.id
    if @message.messageable and @message.save
        # ChannelsChannel.broadcast_to(@message.messageable, { type: "RECEIVE_MESSAGE", message: @message })
        ChannelsChannel.broadcast_to @message.messageable,
            type: "RECEIVE_MESSAGE",
            **from_template('api/messages/show', message: @message)
        render json: nil, status: :ok
    else
        render json: @message.errors.full_messages, status: 422
    end
end
```

### Updating Friend Request Status
```ruby
def update
    @friend_request = FriendRequest.find(params[:id])
    if @friend_request.update(friend_request_params)
        @sender = User.find(@friend_request.sender_id)
        @receiver = User.find(@friend_request.receiver_id)
        if @friend_request.status == "accepted"
            @dm_channel = Channel.create(name: "#{@sender.username}/#{@receiver.username}", channel_type: "private")
            ChannelSubscription.create(user_id: @friend_request.sender_id, channel_id: @dm_channel.id)
            ChannelSubscription.create(user_id: @friend_request.receiver_id, channel_id: @dm_channel.id)
        end
        FriendRequestsChannel.broadcast_to @sender,
            type: "UPDATE_FRIEND_REQUEST",
            **from_template('api/friend_requests/show', friend_request: @friend_request, current_user: @sender, dm_channel: @dm_channel)
        FriendRequestsChannel.broadcast_to @receiver,
            type: "UPDATE_FRIEND_REQUEST",
            **from_template('api/friend_requests/show', friend_request: @friend_request, current_user: @receiver, dm_channel: @dm_channel)
        # render :show
        render json: nil, status: :ok
    else
        render json: { errors: @friend_request.errors.full_messages }, status: :unprocessable_entity
    end
end
```

### Handling Possible Errors for Creating a Friend Request in Input Field
```javascript
const handleAddFriend = (e) => {
    e.preventDefault();
    if (!friendRequestInfo) return;
    setErrors([]);
    if (!friendRequestInfo.includes('#')) {
        setErrors([`We need ${friendRequestInfo}'s four digit tag so we know which one they are.`]);
        return;
    }
    const lastHashIndex = friendRequestInfo.lastIndexOf('#');
    const username = friendRequestInfo.slice(0, lastHashIndex);
    const tag = friendRequestInfo.slice(lastHashIndex + 1);
    if (/^\d+$/.test(tag)) {
    } else {
        setErrors(['Tag must be digits only']);
        return;
    }
    const friend = {
        username: username,
        tag: tag,
    }
    createSearchFriendRequest(friend).catch(function(error) {
        let errorArr = [];
        error.json().then(errorData=> {
            errorArr.push(errorData);
            setErrors(errorArr);
        }) 
    });
};
```

### Creating a Friend Request with Real-time Updates
```javascript
const friendRequestsSubscription = consumer.subscriptions.create(
    { channel: "FriendRequestsChannel", id: sessionUser.id },
    {
        received: (friendRequest) => {
            switch (friendRequest.type) {
                case "RECEIVE_FRIEND_REQUEST":
                    dispatch(receiveFriendRequest(friendRequest));
                    break;
                default:
                    break;
            }
        }
    }
);

```
## Future Features to Implement
- Implement Voice Chat Channels
- Creating an OpenAI ChatBot
- Notifications
