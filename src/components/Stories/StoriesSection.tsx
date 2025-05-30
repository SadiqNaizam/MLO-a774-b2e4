import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlusCircle, Archive, Settings, ChevronRight } from 'lucide-react';

// Data type for individual story items displayed in the section
interface StoryItemData {
  id: string;
  userName: string;
  userAvatarUrl: string;
  profileUrl?: string; 
  viewed?: boolean; 
}

// Dummy data for story items
const storyItemsData: StoryItemData[] = [
  { id: 's_item1', userName: 'Jane Doe', userAvatarUrl: 'https://picsum.photos/seed/sitem1avatar/40/40', profileUrl: '#', viewed: false },
  { id: 's_item2', userName: 'John Smith', userAvatarUrl: 'https://picsum.photos/seed/sitem2avatar/40/40', profileUrl: '#', viewed: true },
  { id: 's_item3', userName: 'Alice Brown', userAvatarUrl: 'https://picsum.photos/seed/sitem3avatar/40/40', profileUrl: '#', viewed: false },
];

interface StoriesSectionProps {
  className?: string;
  onAddStoryClick?: () => void;
  onArchiveClick?: () => void;
  onSettingsClick?: () => void;
  onViewStoryClick?: (storyId: string) => void;
  onSeeAllStoriesClick?: () => void; 
}

// Internal StoryItem component
const StoryItem: React.FC<{item: StoryItemData, onClick?: (id: string) => void}> = ({ item, onClick }) => {
  return (
    <button 
      className="flex items-center space-x-3 p-2 hover:bg-secondary rounded-lg w-full text-left transition-colors duration-150"
      onClick={() => onClick?.(item.id)}
      aria-label={`View ${item.userName}'s story`}
    >
      <Avatar className={cn("w-9 h-9 border-2 flex-shrink-0", item.viewed ? "border-muted-foreground/30" : "border-primary")}>
        <AvatarImage src={item.userAvatarUrl} alt={item.userName} />
        <AvatarFallback>{item.userName.substring(0,1).toUpperCase()}</AvatarFallback>
      </Avatar>
      <span className={cn("text-sm truncate", item.viewed ? "text-muted-foreground" : "text-foreground font-medium")}>{item.userName}</span>
    </button>
  );
};

const StoriesSection: React.FC<StoriesSectionProps> = ({ 
  className,
  onAddStoryClick,
  onArchiveClick,
  onSettingsClick,
  onViewStoryClick,
  onSeeAllStoriesClick
}) => {
  const hasStoriesToList = storyItemsData.length > 0;

  return (
    <Card className={cn("w-full bg-card text-card-foreground shadow-sm rounded-lg", className)}>
      <CardHeader className="pb-2 pt-4 px-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-semibold">Stories</CardTitle>
          <div className="flex items-center">
            <Button variant="link" size="sm" className="text-xs text-primary hover:text-primary/90 px-1 py-0 h-auto font-medium" onClick={onArchiveClick}>
              Archive
            </Button>
            <span className="text-xs text-muted-foreground mx-1">·</span>
            <Button variant="link" size="sm" className="text-xs text-primary hover:text-primary/90 px-1 py-0 h-auto font-medium" onClick={onSettingsClick}>
              Settings
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4 space-y-3">
        <button 
            className="flex items-center space-x-3 py-2 hover:bg-secondary rounded-lg w-full text-left transition-colors duration-150 px-2"
            onClick={onAddStoryClick}
            aria-label="Add to your story"
        >
          <div 
            className="w-10 h-10 rounded-full border-2 border-muted-foreground/20 text-primary bg-secondary/50 flex items-center justify-center flex-shrink-0"
          >
            <PlusCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-foreground">Add to Your Story</h3>
            <CardDescription className="text-xs">
              Share a photo, video or write something.
            </CardDescription>
          </div>
        </button>

        {hasStoriesToList && (
          <div className="pt-3 border-t border-border space-y-1">
            {storyItemsData.slice(0,3).map((story) => (
              <StoryItem key={story.id} item={story} onClick={onViewStoryClick} />
            ))}
            {storyItemsData.length > 3 && onSeeAllStoriesClick && (
                 <Button variant="ghost" className="w-full justify-start text-sm text-primary hover:text-primary/90 hover:bg-secondary mt-1 px-2" onClick={onSeeAllStoriesClick}>
                    See All Stories <ChevronRight className="w-4 h-4 ml-auto" />
                </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StoriesSection;
