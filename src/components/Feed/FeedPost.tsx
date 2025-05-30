import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { MoreHorizontal, ThumbsUp, MessageCircle, Share2, Users, Globe } from 'lucide-react';

// Data types
interface PostUser {
  name: string;
  avatarUrl: string;
  profileUrl?: string;
}

interface PostAttachmentImage {
  type: 'image' as const;
  url: string;
  alt: string;
}

interface PostAttachmentMap {
  type: 'map' as const;
  locationName: string;
  imageUrl: string; 
  address?: string; 
  contextText?: string; 
}

type PostAttachment = PostAttachmentImage | PostAttachmentMap;

type PostPrivacy = 'public' | 'friends' | 'specific_friends' | 'only_me';

export interface FeedPostProps {
  id: string;
  user: PostUser;
  time: string; 
  privacy: PostPrivacy;
  text: string; 
  attachment?: PostAttachment;
  stats: {
    likes: number;
    comments: number;
    shares: number;
  };
  className?: string;
}

const FeedPost: React.FC<FeedPostProps> = ({
  user,
  time,
  privacy,
  text,
  attachment,
  stats,
  className,
}) => {
  const PrivacyIcon = React.useMemo(() => {
    switch (privacy) {
      case 'public':
        return Globe;
      case 'friends':
      case 'specific_friends':
        return Users;
      case 'only_me':
        return Users; // Using Users icon, could be a Lock icon if preferred & available
      default:
        return Users;
    }
  }, [privacy]);

  return (
    <Card className={cn("w-full bg-card text-card-foreground shadow-sm rounded-lg", className)}>
      <CardHeader className="pb-3 px-4 pt-4">
        <div className="flex items-start space-x-3">
          <a href={user.profileUrl || '#'} className="flex-shrink-0">
            <Avatar className="w-10 h-10 border">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </a>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <a href={user.profileUrl || '#'} className="font-semibold text-sm text-foreground hover:underline">
                  {user.name}
                </a>
                <div className="text-xs text-muted-foreground flex items-center">
                  {time}
                  <span className="mx-1">·</span>
                  <PrivacyIcon className="w-3 h-3 mt-0.5" />
                </div>
              </div>
              <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:bg-secondary rounded-full">
                <MoreHorizontal className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-3 px-4">
        {text && <p className="text-sm text-foreground mb-3 whitespace-pre-wrap">{text}</p>}
        
        {attachment && (
          <div className="rounded-lg overflow-hidden border border-border">
            {attachment.type === 'image' && (
              <img src={attachment.url} alt={attachment.alt} className="w-full h-auto object-cover" />
            )}
            {attachment.type === 'map' && (
              <div>
                <img src={attachment.imageUrl} alt={attachment.locationName} className="w-full h-auto object-cover aspect-[16/9]" />
                <div className="p-3 bg-secondary/30">
                  <h3 className="font-semibold text-foreground text-sm">{attachment.locationName}</h3>
                  {attachment.address && <p className="text-xs text-muted-foreground">{attachment.address}</p>}
                  {attachment.contextText && <p className="text-xs text-muted-foreground mt-1">{attachment.contextText}</p>}
                  {/* Example: <Button variant="outline" size="sm" className="mt-2 bg-card hover:bg-secondary">Save</Button> */}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-col items-start pt-0 px-4 pb-3">
        {(stats.likes > 0 || stats.comments > 0 || stats.shares > 0) && (
          <div className="w-full flex justify-between items-center text-xs text-muted-foreground mb-2 py-2 border-b border-border">
            <div>{stats.likes > 0 && <span>{stats.likes.toLocaleString()} Likes</span>}</div>
            <div className="space-x-3">
              {stats.comments > 0 && <a href="#" className="hover:underline">{stats.comments.toLocaleString()} Comments</a>}
              {stats.shares > 0 && <a href="#" className="hover:underline">{stats.shares.toLocaleString()} Shares</a>}
            </div>
          </div>
        )}
        
        <div className="w-full grid grid-cols-3 gap-1 mt-1">
          <Button variant="ghost" className="w-full text-muted-foreground hover:bg-secondary hover:text-primary font-medium py-2">
            <ThumbsUp className="w-5 h-5 mr-2" />
            Like
          </Button>
          <Button variant="ghost" className="w-full text-muted-foreground hover:bg-secondary hover:text-primary font-medium py-2">
            <MessageCircle className="w-5 h-5 mr-2" />
            Comment
          </Button>
          <Button variant="ghost" className="w-full text-muted-foreground hover:bg-secondary hover:text-primary font-medium py-2">
            <Share2 className="w-5 h-5 mr-2" />
            Share
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default FeedPost;
