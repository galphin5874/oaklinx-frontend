import Loading from './Loading';
import { ForumSkeleton } from './ForumSkeleton/ForumSkeleton';
import { MessengerSkeleton } from './MessengerSkeleton/MessengerSkeleton';
import { PostSkeleton } from './PostSkeleton/PostSkeleton';
import { ProfileSkeleton } from './ProfileSkeleton/ProfileSkeleton';
import { RTSkeleton } from './RTSkeleton/RTSkeleton';

export default function LoadingSkeleton({component, childComponent, msg}) {
    if (component == 'forum') {
        return (
            <ForumSkeleton/>
        )
    }
    if (component == 'posts') {
        return (
            <PostSkeleton/>
        )
    }
    if (component == 'messenger') {
        return (
            <MessengerSkeleton
                component={component}
                childComponent={childComponent}/>
        )
    }
    if (component == 'profile') {
        return (
            <ProfileSkeleton
                component={component}
                childComponent={childComponent}/>
        )
    } 
    if (component == 'editor') {
        return (
            <RTSkeleton
                component={component}
                childComponent={childComponent}/>
        )
    } else {
        return (
            <Loading msg={msg}/>
        )
    }
}