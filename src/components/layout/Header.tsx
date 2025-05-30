import React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Facebook,
  Search,
  Home,
  Users2 as UsersIcon, // Renamed to avoid conflict if Users is used differently, Users2 is good for groups/friends general icon
  PlaySquare,
  Store,
  LayoutGrid, // For the 'Menu' or 'Apps' icon
  MessageCircle, 
  Bell, 
  UserCircle2
} from 'lucide-react';

interface HeaderActionProps {
  href?: string;
  onClick?: () => void;
  label: string;
  icon: React.ElementType;
  count?: number;
  isActive?: boolean;
  isIconOnly?: boolean;
  className?: string;
}

const HeaderAction: React.FC<HeaderActionProps> = ({ href, onClick, label, icon: Icon, count, isActive, isIconOnly, className }) => {
  const content = (
    <>
      <Icon className={cn('h-5 w-5 md:h-6 md:w-6', !isIconOnly && 'md:mr-2')} />
      {!isIconOnly && <span className="hidden md:inline text-sm font-medium">{label}</span>}
      {count !== undefined && count > 0 && (
        <Badge variant="destructive" className="absolute -top-1 -right-1.5 h-4 min-w-[16px] px-1 flex items-center justify-center text-[10px] md:h-5 md:min-w-[20px] md:px-1.5 md:text-xs">
          {count > 99 ? '99+' : count} 
        </Badge>
      )}
    </>
  );

  const commonClasses = cn(
    'relative flex items-center rounded-md p-0 text-primary-foreground/80 hover:bg-primary/80 hover:text-primary-foreground focus-visible:bg-primary/80 focus-visible:text-primary-foreground transition-colors',
    isActive ? 'bg-primary/70 text-primary-foreground after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-blue-400' : '',
    isIconOnly ? 'w-10 h-10 md:w-12 md:h-12 justify-center' : 'px-3 md:px-6 h-full',
    className
  );

  if (href) {
    return (
      <a href={href} aria-label={label} className={commonClasses}>
        {content}
      </a>
    );
  }
  return (
    <button onClick={onClick} aria-label={label} className={commonClasses}>
      {content}
    </button>
  );
};

const Header: React.FC = () => {
  // In a real app, active state would be determined by router
  const [activeNav, setActiveNav] = React.useState<string>('Home');

  return (
    <header className="fixed top-0 left-0 right-0 h-[70px] bg-primary text-primary-foreground flex items-center justify-between px-2 md:px-4 z-20 shadow-sm">
      {/* Left Section: Logo and Search */}
      <div className="flex items-center space-x-2">
        <a href="#/" aria-label="Facebook Home" className="flex-shrink-0">
          <Facebook className="h-10 w-10 text-white fill-white" />
        </a>
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary-foreground/60 pointer-events-none" />
          <Input 
            type="search" 
            placeholder="Search Facebook" 
            className="bg-primary-foreground/10 hover:bg-primary-foreground/20 focus:bg-primary-foreground/25 border-none text-primary-foreground placeholder:text-primary-foreground/60 rounded-full h-10 pl-9 pr-3 w-full md:w-56 text-sm focus:ring-0 focus:ring-offset-0"
          />
        </div>
        <Button variant="ghost" size="icon" className="sm:hidden h-10 w-10 rounded-full text-primary-foreground/80 hover:bg-primary/80">
          <Search className="h-5 w-5" />
        </Button>
      </div>

      {/* Center Section: Navigation Tabs */}
      <nav className="hidden lg:flex flex-1 justify-center items-stretch h-full max-w-xl">
        {[{label: 'Home', icon: Home, href: '#/'}, {label: 'Friends', icon: UsersIcon, href: '#/friends'}, {label: 'Watch', icon: PlaySquare, href: '#/watch'}, {label: 'Marketplace', icon: Store, href: '#/marketplace'}, {label: 'Groups', icon: UsersIcon, href: '#/groups'}].map(item => (
            <HeaderAction key={item.label} href={item.href} label={item.label} icon={item.icon} isActive={activeNav === item.label} isIconOnly={true} onClick={() => setActiveNav(item.label)} className="rounded-none md:rounded-lg flex-1 max-w-[110px] hover:bg-primary/60 data-[active=true]:after:bg-blue-500 data-[active=true]:text-blue-400" />
        ))}
      </nav>

      {/* Right Section: User Actions & Profile */}
      <div className="flex items-center space-x-1 md:space-x-2 flex-shrink-0">
        <Button variant="ghost" className="hidden xl:flex items-center space-x-2 rounded-full h-9 px-3 text-sm font-medium text-primary-foreground/90 hover:bg-primary/80 hover:text-primary-foreground">
            <Avatar className="w-7 h-7">
                <AvatarImage src="https://i.pravatar.cc/32?u=olennamason" alt="Olenna Mason" />
                <AvatarFallback className="text-xs bg-primary-foreground/20 text-primary-foreground"><UserCircle2 className="w-4 h-4" /></AvatarFallback>
            </Avatar>
            <span className="whitespace-nowrap">Olenna</span>
        </Button>
        <HeaderAction label="Menu" icon={LayoutGrid} isIconOnly={true} className="hover:bg-primary/60"/>
        <HeaderAction label="Messenger" icon={MessageCircle} count={3} isIconOnly={true} className="hover:bg-primary/60"/>
        <HeaderAction label="Notifications" icon={Bell} count={17} isIconOnly={true} className="hover:bg-primary/60"/>
        <Button variant="ghost" size="icon" asChild className="h-10 w-10 rounded-full hover:bg-primary/60">
          <a href="#/profile/olennamason" aria-label="View Profile">
            <Avatar className="w-8 h-8">
                <AvatarImage src="https://i.pravatar.cc/32?u=olennamason" alt="Olenna Mason" />
                <AvatarFallback className="text-xs bg-primary-foreground/20 text-primary-foreground"><UserCircle2 className="w-5 h-5"/></AvatarFallback>
            </Avatar>
          </a>
        </Button>
      </div>
    </header>
  );
};

export default Header;
