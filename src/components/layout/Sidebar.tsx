import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Newspaper,
  MessageSquare,
  PlaySquare,
  Store,
  Gamepad2,
  CalendarDays,
  Flag,
  Users2,
  ListChecks,
  HeartHandshake,
  ChevronDown,
  Settings,
  LogOut,
  UserCircle2
} from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  disabled?: boolean;
}

const mainNavigationItems: NavItem[] = [
  { href: '#/news-feed', label: 'News Feed', icon: Newspaper },
  { href: '#/messenger', label: 'Messenger', icon: MessageSquare },
  { href: '#/watch', label: 'Watch', icon: PlaySquare },
  { href: '#/marketplace', label: 'Marketplace', icon: Store },
];

const shortcutsItems: NavItem[] = [
  { href: '#/shortcuts/farmville', label: 'FarmVille 2', icon: Gamepad2 },
  // Add more shortcuts here
];

const exploreItems: NavItem[] = [
  { href: '#/explore/events', label: 'Events', icon: CalendarDays },
  { href: '#/explore/pages', label: 'Pages', icon: Flag },
  { href: '#/explore/groups', label: 'Groups', icon: Users2 },
  { href: '#/explore/friend-lists', label: 'Friend Lists', icon: ListChecks },
  { href: '#/explore/fundraisers', label: 'Fundraisers', icon: HeartHandshake },
];

const createItems: string[] = ['Ad', 'Page', 'Group', 'Event', 'Fundraiser'];

interface SidebarLinkProps {
  item: NavItem;
  isActive?: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ item, isActive }) => {
  return (
    <Button
      variant="ghost"
      className={cn(
        'w-full justify-start text-sm font-medium h-9 px-3',
        isActive ? 'bg-secondary text-primary hover:bg-secondary/90' : 'text-foreground/80 hover:bg-secondary/50 hover:text-foreground'
      )}
      asChild
      disabled={item.disabled}
    >
      <a href={item.href}>
        <item.icon className="w-4 h-4 mr-3 flex-shrink-0" />
        {item.label}
      </a>
    </Button>
  );
};

const Sidebar: React.FC = () => {
  // In a real app, activePath would come from a routing library like React Router
  const activePath = '#/news-feed'; 

  const [exploreExpanded, setExploreExpanded] = React.useState(false);

  return (
    <aside className="fixed top-0 left-0 z-10 h-screen w-64 bg-card border-r border-border flex flex-col">
      <ScrollArea className="flex-1">
        {/* Content needs padding-top to not be obscured by the fixed Header. 70px is header height. */}
        <div className="pt-[calc(70px+0.5rem)] pb-4 space-y-1 px-3"> 
          {/* User Profile Section */}
          <Button
            variant="ghost"
            className='w-full justify-start text-sm font-semibold h-auto py-2.5 px-3 mb-2 text-foreground hover:bg-secondary/50'
            asChild
          >
            <a href="#/profile/olenna-mason">
              <Avatar className="w-7 h-7 mr-3">
                {/* Using a placeholder avatar image */}
                <AvatarImage src="https://i.pravatar.cc/40?u=olennamason" alt="Olenna Mason" />
                <AvatarFallback><UserCircle2 className="w-5 h-5"/></AvatarFallback>
              </Avatar>
              Olenna Mason
            </a>
          </Button>

          {mainNavigationItems.map((item) => (
            <SidebarLink key={item.label} item={item} isActive={activePath === item.href} />
          ))}

          <Separator className="my-3" />

          <h3 className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Shortcuts</h3>
          {shortcutsItems.map((item) => (
            <SidebarLink key={item.label} item={item} isActive={activePath === item.href} />
          ))}
          <Button variant="ghost" className="w-full justify-start text-sm font-medium h-9 px-3 text-muted-foreground hover:bg-secondary/50 hover:text-foreground">
            <ChevronDown className="w-4 h-4 mr-3" />
            See More
          </Button>

          <Separator className="my-3" />

          <h3 className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Explore</h3>
          {exploreItems.slice(0, exploreExpanded ? exploreItems.length : 4).map((item) => (
            <SidebarLink key={item.label} item={item} isActive={activePath === item.href} />
          ))}
          <Button 
            variant="ghost" 
            className="w-full justify-start text-sm font-medium h-9 px-3 text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
            onClick={() => setExploreExpanded(!exploreExpanded)}
          >
            <ChevronDown className={cn("w-4 h-4 mr-3 transition-transform duration-200", exploreExpanded && "rotate-180")} />
            {exploreExpanded ? 'See Less' : 'See More'}
          </Button>

          <Separator className="my-3" />

          <h3 className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Create</h3>
          <div className="space-y-0.5 pl-3 text-sm">
            {createItems.map((item) => (
              <a key={item} href={`#/create/${item.toLowerCase().replace(' ', '-')}`} className="block text-muted-foreground hover:text-primary hover:underline py-1">
                {item}
              </a>
            ))}
          </div>
        </div>
      </ScrollArea>
      {/* Footer for Sidebar */}
      <div className="p-3 border-t border-border mt-auto space-y-1">
        <Button variant="ghost" className="w-full justify-start text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 h-9 px-3">
            <Settings className="w-4 h-4 mr-3" /> Settings
        </Button>
        <Button variant="ghost" className="w-full justify-start text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 h-9 px-3">
            <LogOut className="w-4 h-4 mr-3" /> Logout
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
