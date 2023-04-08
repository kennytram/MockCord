import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import './FriendMessageToolBar.css';

function FriendMessageToolBar({loaded}) {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users);
    const { channelId } = useParams();
    const friendRequests = useSelector(state => state.friendRequests);
    const dmChannel = useSelector(state => state.channels[channelId]);
    const dmChannelName = dmChannel && dmChannel.name ? dmChannel.name.split('/') : null;
    const sessionUser = useSelector(state => state.session.user);
    if (loaded) {
        return (
            <div className="top-bar">
                <ul className="top-left-side">
                    <li>
                        <div className="top-main-header">
                            <AlternateEmailIcon className="top-main-icon email" />
                            {dmChannelName && sessionUser ? sessionUser.username === dmChannelName[0] ? dmChannelName[1] : dmChannelName[0] : ""}

                            {dmChannel && Object.keys(dmChannel.dmMembers).length && Object.keys(users).length > 0 && sessionUser && Object.values(dmChannel.dmMembers).map(member => {
                                if (member.id !== sessionUser.id) {
                                    return (
                                        <div key={member.id} className={users[member.id].isOnline ? `user-status-bubble ${users[member.id].status}` : `user-status-bubble invisible`}>
                                            <div className={users[member.id].isOnline ? `user-status-bubble-inner ${users[member.id].status}` : `user-status-bubble-inner invisible`}></div>
                                        </div>
                                    );
                                } else {
                                    return null;
                                }
                            }
                            )}
                        </div>
                    </li>
                    <li className="top-bar-divider" />
                </ul>
                {/* <ul className="top-right-side tooltips">
                <li><PhoneInTalkIcon /></li>
                <li><VideocamIcon /></li>
                <li><PushPinIcon sx={{ rotate: '45deg', translate: '0 3px' }} /></li>
                <li><PersonAddAlt1Icon /></li>
                <li><AccountCircleIcon /></li>
                <li>
                    <input className="searchbar-mini" type="text" disabled value="Search" />
                </li>
                <li><InboxIcon /></li>
                <li><HelpIcon /></li>
            </ul> */}
            </div>
        )
    }
    else {
        if (loaded) {
            return (
                <div className="top-bar">
                    <ul className="top-left-side">
                        <li>
                            <div className="top-main-header">
                                <AlternateEmailIcon className="top-main-icon email" />
                                {dmChannelName && sessionUser ? sessionUser.username === dmChannelName[0] ? dmChannelName[1] : dmChannelName[0] : ""}
                            
                                {dmChannel && Object.keys(dmChannel.dmMembers).length && Object.keys(users).length > 0 && sessionUser && Object.values(dmChannel.dmMembers).map(member => {
                                    if (member.id !== sessionUser.id) {
                                        return (
                                            <div key={member.id} className={users[member.id].isOnline ? `user-status-bubble ${users[member.id].status}` : `user-status-bubble invisible`}>
                                                <div className={users[member.id].isOnline ? `user-status-bubble-inner ${users[member.id].status}` : `user-status-bubble-inner invisible`}></div>
                                            </div>
                                        );
                                    } else {
                                        return null;
                                    }
                                }
                                )}
                            </div>
                        </li>
                        <li className="top-bar-divider" />
                    </ul>
                    {/* <ul className="top-right-side tooltips">
                        <li><PhoneInTalkIcon /></li>
                        <li><VideocamIcon /></li>
                        <li><PushPinIcon sx={{ rotate: '45deg', translate: '0 3px' }} /></li>
                        <li><PersonAddAlt1Icon /></li>
                        <li><AccountCircleIcon /></li>
                        <li>
                            <input className="searchbar-mini" type="text" disabled value="Search" />
                        </li>
                        <li><InboxIcon /></li>
                        <li><HelpIcon /></li>
                    </ul> */}
                </div>
            )
        }
        else {
            return (
                <div className="top-bar">
                    <ul className="top-left-side">
                        <li>
                            <div className="top-main-header">
                                <AlternateEmailIcon className="top-main-icon email" />
                            </div>
                        </li>
                        <li className="top-bar-divider" />
                    </ul>
                </div>
            )
        }
    }
}
export default FriendMessageToolBar;