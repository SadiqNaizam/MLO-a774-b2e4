import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, X } from 'lucide-react';

interface GroupMemberPreview {
  id: string;
  avatarUrl: string;
  name: string; 
}

interface GroupCardData {
  id: string;
  coverImageUrl: string;
  name: string;
  handle?: string; 
  memberCount: number;
  membersPreview: GroupMemberPreview[];
}

const initialSuggestedGroupsData: GroupCardData[] = [
  {
    id: 'group1',
    coverImageUrl: 'https://picsum.photos/seed/madmencover/300/100',
    name: 'Mad Men Fans',
    handle: 'MADdicts',
    memberCount: 6195,
    membersPreview: [
      { id: 'm1', avatarUrl: 'https://picsum.photos/seed/member1/40/40', name: 'Don D.' },
      { id: 'm2', avatarUrl: 'https://picsum.photos/seed/member2/40/40', name: 'Peggy O.' },
      { id: 'm3', avatarUrl: 'https://picsum.photos/seed/member3/40/40', name: 'Roger S.' },
      { id: 'm4', avatarUrl: 'https://picsum.photos/seed/member4/40/40', name: 'Joan H.' },
      { id: 'm5', avatarUrl: 'https://picsum.photos/seed/member5/40/40', name: 'Pete C.' },
    ],
  },
  {
    id: 'group2',
    coverImageUrl: 'https://picsum.photos/seed/dextercover/300/100',
    name: 'Dexter - Crime Enthusiasts',
    memberCount: 6984,
    membersPreview: [
      { id: 'd1', avatarUrl: 'https://picsum.photos/seed/memberA/40/40', name: 'Dexter M.' },
      { id: 'd2', avatarUrl: 'https://picsum.photos/seed/memberB/40/40', name: 'Debra M.' },
      { id: 'd3', avatarUrl: 'https://picsum.photos/seed/memberC/40/40', name: 'Angel B.' },
      { id: 'd4', avatarUrl: 'https://picsum.photos/seed/memberD/40/40', name: 'Rita B.' },
    ],
  },
];

interface SuggestedGroupsProps {
  className?: string;
  onSeeAllClick?: () => void;
  onJoinGroup?: (groupId: string) => void;
  onDismissGroup?: (groupId: string) => void;
}

interface GroupCardProps {
  group: GroupCardData;
  onJoin: (groupId: string) => void;
  onDismiss: (groupId: string) => void;
}

const GroupCardComponent: React.FC<GroupCardProps> = ({ group, onJoin, onDismiss }) => {
  return (
    <div className="rounded-lg overflow-hidden border border-border bg-card shadow-sm">
      <div className="relative h-24 bg-muted group">
        <img src={group.coverImageUrl} alt={`${group.name} cover`} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
        <div className="absolute bottom-[-12px] left-3 flex items-center">
          {group.membersPreview.slice(0, 4).map((member, index) => (
            <Avatar key={member.id} className={cn(
              "w-7 h-7 border-2 border-card bg-background",
              index > 0 && "-ml-2.5" 
            )}>
              <AvatarImage src={member.avatarUrl} alt={member.name} />
              <AvatarFallback>{member.name.substring(0,1).toUpperCase()}</AvatarFallback>
            </Avatar>
          ))}
        </div>
        <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-1.5 right-1.5 w-7 h-7 bg-black/40 hover:bg-black/60 text-white rounded-full transition-opacity opacity-0 group-hover:opacity-100"
            onClick={() => onDismiss(group.id)}
            aria-label="Dismiss group suggestion"
        >
            <X className="w-4 h-4" />
        </Button>
      </div>
      <div className="p-3 pt-5">
        <h4 className="font-semibold text-sm text-foreground truncate">
          {group.name} {group.handle && <span className="text-muted-foreground text-xs">({group.handle})</span>}
        </h4>
        <p className="text-xs text-muted-foreground mt-0.5">{group.memberCount.toLocaleString()} members</p>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full mt-2.5 text-sm text-primary border-primary/40 hover:border-primary hover:bg-primary/5 hover:text-primary font-medium"
          onClick={() => onJoin(group.id)}
        >
          <Plus className="w-4 h-4 mr-1.5" /> Join Group
        </Button>
      </div>
    </div>
  );
};

const SuggestedGroups: React.FC<SuggestedGroupsProps> = ({ 
  className, 
  onSeeAllClick,
  onJoinGroup = () => {},
  onDismissGroup = () => {} 
}) => {
  const [currentGroups, setCurrentGroups] = React.useState<GroupCardData[]>(initialSuggestedGroupsData);

  const handleDismiss = React.useCallback((groupId: string) => {
    setCurrentGroups(prevGroups => prevGroups.filter(g => g.id !== groupId));
    onDismissGroup(groupId);
  }, [onDismissGroup]);

  const handleJoin = React.useCallback((groupId: string) => {
    onJoinGroup(groupId);
    // Example: optimistic UI update - remove group after join attempt
    // setCurrentGroups(prevGroups => prevGroups.filter(g => g.id !== groupId)); 
  }, [onJoinGroup]);

  if (currentGroups.length === 0 && !onSeeAllClick) { // Only show empty state if See All isn't primary CTA
    return (
      <Card className={cn("w-full bg-card text-card-foreground shadow-sm p-4 text-center rounded-lg", className)}>
        <CardTitle className="text-base font-semibold">Suggested Groups</CardTitle>
        <p className="text-sm text-muted-foreground mt-2">No more group suggestions for now.</p>
      </Card>
    );
  }
  
  return (
    <Card className={cn("w-full bg-card text-card-foreground shadow-sm rounded-lg", className)}>
      <CardHeader className="pb-3 pt-4 px-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-semibold">Suggested Groups</CardTitle>
          {onSeeAllClick && (
            <Button variant="link" size="sm" className="text-xs text-primary hover:text-primary/90 px-1 font-medium" onClick={onSeeAllClick}>
              See All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4 space-y-3">
        {currentGroups.slice(0, 2).map((group) => ( // Show limited groups, e.g., 2
          <GroupCardComponent 
            key={group.id} 
            group={group}
            onJoin={handleJoin}
            onDismiss={handleDismiss}
          />
        ))}
        {currentGroups.length === 0 && onSeeAllClick && (
             <p className="text-sm text-muted-foreground text-center py-4">No current suggestions. Try "See All".</p>
        )}
      </CardContent>
    </Card>
  );
};

export default SuggestedGroups;
