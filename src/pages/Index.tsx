import React from 'react';
import MainAppLayout from '@/components/layout/MainAppLayout';
import FeedPost, { FeedPostProps } from '@/components/Feed/FeedPost';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  PenSquare, 
  Images,       // For "Photo/Video Album"
  Video,        // For "Live Video"
  List,         // For "List" action below input
  ImagePlus,    // For "Photo/Video" action below input
  Tags          // For "Tag Friends" action below input
} from 'lucide-react';

// Dummy user for the "Create Post" section
const currentUser = {
  name: 'Olenna Mason',
  avatarUrl: 'https://i.pravatar.cc/40?u=olennamason',
  profileUrl: '#/profile/olenna-mason'
};

// Dummy data for feed posts
const feedPostsData: FeedPostProps[] = [
  {
    id: 'post1',
    user: { name: 'Julia Fillory', avatarUrl: 'https://i.pravatar.cc/40?u=juliafillory', profileUrl: '#/profile/juliafillory' },
    time: '2 hrs ago',
    privacy: 'friends' as const,
    text: 'Checking out some new stores downtown! This place has the best coffee ☕ and such a cozy atmosphere. Perfect for a rainy day read. 📖',
    attachment: {
      type: 'image' as const,
      url: 'https://picsum.photos/seed/feedimage1/580/420',
      alt: 'Cozy cafe interior with a cup of coffee on a wooden table.',
    },
    stats: { likes: 125, comments: 18, shares: 5 },
  },
  {
    id: 'post2',
    user: { name: 'Bryan Durand', avatarUrl: 'https://i.pravatar.cc/40?u=bryandurand', profileUrl: '#/profile/bryandurand' },
    time: '5 hrs ago',
    privacy: 'public' as const,
    text: 'Just visited Raleigh, North Carolina. What a beautiful city! Loved the historic architecture and vibrant atmosphere. Definitely recommend the Art Museum and the State Capitol tour.',
    attachment: {
      type: 'map' as const,
      locationName: 'Raleigh, North Carolina',
      imageUrl: 'https://picsum.photos/seed/mapraleigh/580/320',
      address: 'City - United States',
      contextText: 'Bryan Durand and 2 others have been here',
    },
    stats: { likes: 230, comments: 45, shares: 12 },
  },
  {
    id: 'post3',
    user: { name: 'Alex Green', avatarUrl: 'https://i.pravatar.cc/40?u=alexgreen', profileUrl: '#/profile/alexgreen' },
    time: '1 day ago',
    privacy: 'public' as const,
    text: 'Excited to announce I\'m starting a new project! It involves machine learning and sustainable energy. Aiming to build a predictive model for solar panel efficiency based on weather patterns. More details to come soon. #innovation #ai #sustainability #cleanenergy 🌍💡',
    stats: { likes: 88, comments: 22, shares: 9 },
  },
  {
    id: 'post4',
    user: { name: 'Sophia Chen', avatarUrl: 'https://i.pravatar.cc/40?u=sophiachen', profileUrl: '#/profile/sophiachen' },
    time: '3 days ago',
    privacy: 'friends' as const,
    text: 'My new puppy is finally home! Everyone, meet Leo. 🐾 Isn\'t he adorable?\nHe\'s a golden retriever and already loves chasing his tail. Can\'t wait for all our adventures together! Any puppy training tips are welcome! 👇',
    attachment: {
        type: 'image' as const,
        url: 'https://picsum.photos/seed/puppy_leo/580/700',
        alt: 'A cute golden retriever puppy playing in the grass.',
    },
    stats: { likes: 540, comments: 150, shares: 25 },
  }
];

const IndexPage: React.FC = () => {
  // Placeholder action for create post interactions
  const handleCreatePostAction = (actionType: string) => {
    // In a real app, this would open a dialog or navigate
    console.log(`Initiate "${actionType}" action...`);
  };

  return (
    <MainAppLayout>
      <div className="max-w-xl mx-auto w-full space-y-4">
        {/* Create Post Section */}
        <Card className="shadow-sm overflow-hidden rounded-lg">
          <CardHeader className="p-0 border-b border-border">
            <div className="flex">
              <Button 
                variant="ghost" 
                className="flex-1 justify-center text-sm font-medium h-auto py-3 px-2 text-primary rounded-none border-b-2 border-primary" 
                onClick={() => handleCreatePostAction('Make Post')}
              >
                <PenSquare className="w-5 h-5 mr-2" /> Make Post
              </Button>
              <Button 
                variant="ghost" 
                className="flex-1 justify-center text-sm font-medium h-auto py-3 px-2 text-muted-foreground hover:bg-secondary hover:text-foreground rounded-none"
                onClick={() => handleCreatePostAction('Photo/Video Album')}
              >
                <Images className="w-5 h-5 mr-2 text-green-500" /> Photo/Video Album
              </Button>
              <Button 
                variant="ghost" 
                className="flex-1 justify-center text-sm font-medium h-auto py-3 px-2 text-muted-foreground hover:bg-secondary hover:text-foreground rounded-none"
                onClick={() => handleCreatePostAction('Live Video')}
              >
                <Video className="w-5 h-5 mr-2 text-red-500" /> Live Video
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-3 pt-4">
            <div className="flex items-center space-x-3">
              <a href={currentUser.profileUrl} className="flex-shrink-0">
                <Avatar className="w-10 h-10 border">
                  <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                  <AvatarFallback>{currentUser.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              </a>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-left text-muted-foreground bg-secondary/30 hover:bg-secondary/60 rounded-full h-10 px-4 text-base"
                onClick={() => handleCreatePostAction(`What's on your mind input click`)}
              >
                What's on your mind, {currentUser.name.split(' ')[0]}?
              </Button>
            </div>
          </CardContent>
          <Separator />
          <CardFooter className="p-0">
            <div className="flex justify-around items-center w-full">
              <Button 
                variant="ghost" 
                className="text-muted-foreground hover:bg-secondary flex-1 py-3 rounded-none"
                onClick={() => handleCreatePostAction('List option')}
              >
                <List className="w-5 h-5 mr-2 text-blue-500" /> List
              </Button>
              <Button 
                variant="ghost" 
                className="text-muted-foreground hover:bg-secondary flex-1 py-3 rounded-none"
                onClick={() => handleCreatePostAction('Photo/Video option')}
              >
                <ImagePlus className="w-5 h-5 mr-2 text-green-500" /> Photo/Video
              </Button>
              <Button 
                variant="ghost" 
                className="text-muted-foreground hover:bg-secondary flex-1 py-3 rounded-none"
                onClick={() => handleCreatePostAction('Tag Friends option')}
              >
                <Tags className="w-5 h-5 mr-2 text-indigo-500" /> Tag Friends
              </Button>
            </div>
          </CardFooter>
        </Card>

        {/* Feed Posts */}
        {feedPostsData.map((post) => (
          <FeedPost
            key={post.id}
            id={post.id}
            user={post.user}
            time={post.time}
            privacy={post.privacy}
            text={post.text}
            attachment={post.attachment}
            stats={post.stats}
          />
        ))}
      </div>
    </MainAppLayout>
  );
};

export default IndexPage;
