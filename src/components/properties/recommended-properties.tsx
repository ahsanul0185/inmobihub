import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { Property } from "@shared/schema";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { Home, Bed, Bath, Square, PiggyBank, Star, Info, Sparkles, Lightbulb, LucideProps, Bookmark, ArrowRight } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { usePropertyComparison } from "@/hooks/use-property-comparison";
import { useState } from "react";

type RecommendedProperty = {
  property: Property;
  reason: string;
  matchScore?: number;
};

interface RecommendedPropertiesProps {
  limit?: number;
  className?: string;
  title?: string;
}

export default function RecommendedProperties({ 
  limit = 3, 
  className = "",
  title = "AI-Powered Recommendations" 
}: RecommendedPropertiesProps) {
  const { user } = useAuth();
  const [expanded, setExpanded] = useState(false);
  
  const { data: recommendations, isLoading, error } = useQuery<RecommendedProperty[]>({
    queryKey: ["/api/properties/recommended", limit],
    queryFn: undefined, // Use default fetcher
    enabled: !!user,
  });

  const displayCount = expanded ? (recommendations?.length || 0) : limit;

  if (!user) {
    return (
      <Card className="glassmorphism-card backdrop-blur-sm bg-white/5 border border-white/10 shadow-md rounded-lg p-6">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center text-white">
            <AIIcon className="mr-2 h-5 w-5 text-blue-400" />
            {title}
          </CardTitle>
          <CardDescription className="text-white/80">
            Log in to see personalized property recommendations tailored to your preferences
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Link href="/auth">
            <Button className="mt-4 bg-[#131c28] hover:bg-[#0c1319] text-white">Log in</Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <div className={className}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex items-center text-white">
            <AIIcon className="mr-2 h-5 w-5 text-blue-400" />
            {title}
          </h2>
          <Badge variant="outline" className="animate-pulse bg-blue-900/30 border border-blue-500/30 text-blue-300">
            <Sparkles className="h-3 w-3 mr-1 text-blue-400" /> Personalizing...
          </Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(limit).fill(0).map((_, i) => (
            <Card key={i} className="overflow-hidden relative group glassmorphism-card backdrop-blur-sm bg-white/5 border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg z-10"></div>
              <Skeleton className="h-48 w-full bg-gray-700/50" />
              <CardHeader>
                <Skeleton className="h-5 w-3/4 mb-2 bg-gray-700/50" />
                <Skeleton className="h-4 w-1/2 bg-gray-700/50" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-3 bg-gray-700/50" />
                <Skeleton className="h-4 w-5/6 mb-3 bg-gray-700/50" />
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <Skeleton className="h-4 w-full bg-gray-700/50" />
                  <Skeleton className="h-4 w-full bg-gray-700/50" />
                  <Skeleton className="h-4 w-full bg-gray-700/50" />
                  <Skeleton className="h-4 w-full bg-gray-700/50" />
                </div>
              </CardContent>
              <CardFooter>
                <Skeleton className="h-9 w-full bg-gray-700/50" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error || !recommendations || recommendations.length === 0) {
    return (
      <Card className={`glassmorphism-card backdrop-blur-sm bg-white/5 border border-white/10 shadow-md rounded-lg p-6 ${className}`}>
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center text-white">
            <AIIcon className="mr-2 h-5 w-5 text-blue-400" />
            {title}
          </CardTitle>
          <CardDescription className="text-white/80">
            {error 
              ? "Unable to load recommendations at this time. Please try again later." 
              : "No recommendations available yet. Browse more properties to get personalized suggestions."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <Lightbulb className="h-12 w-12 text-blue-300 mb-4" />
            <h3 className="text-lg font-medium mb-2 text-white">How recommendations work</h3>
            <p className="text-sm text-white/70 mb-4">
              Our AI analyzes your search history, favorited properties, and browsing patterns to suggest properties that match your preferences.
            </p>
            <Link href="/search">
              <Button variant="outline" className="mt-2 border-white/20 text-white hover:bg-white/10">
                Explore Properties <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  const hasMoreRecommendations = recommendations.length > limit;

  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center text-white">
          <AIIcon className="mr-2 h-5 w-5 text-blue-400" />
          {title}
        </h2>
        <Badge variant="outline" className="bg-blue-900/30 border border-blue-500/30 text-blue-300">
          <Sparkles className="h-3 w-3 mr-1 text-blue-400" /> Personalized for you
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.slice(0, displayCount).map((rec) => (
          <RecommendedPropertyCard key={rec.property.id} recommendation={rec} />
        ))}
      </div>
      
      {hasMoreRecommendations && (
        <div className="flex justify-center mt-6">
          <Button 
            variant="outline" 
            onClick={() => setExpanded(!expanded)}
            className="group border-white/20 text-white hover:bg-white/10"
          >
            {expanded ? (
              <>Show Less <ArrowRight className="ml-2 h-4 w-4 rotate-90 group-hover:-translate-y-1 transition-transform" /></>
            ) : (
              <>Show More <ArrowRight className="ml-2 h-4 w-4 -rotate-90 group-hover:translate-y-1 transition-transform" /></>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}

function AIIcon(props: LucideProps) {
  return (
    <div className="relative">
      <Sparkles {...props} />
      <div className="absolute inset-0 animate-ping opacity-30 duration-1000">
        <Sparkles {...props} />
      </div>
    </div>
  );
}

function RecommendedPropertyCard({ recommendation }: { recommendation: RecommendedProperty }) {
  const { property, reason, matchScore = 0.8 } = recommendation;
  const { addToCompare, isInComparison } = usePropertyComparison();
  const mainImage = property.images && property.images.length > 0 ? property.images[0] : "/placeholder-property.jpg";
  const isAlreadyInComparison = isInComparison(property.id);

  // Extract key highlights from the reason
  const highlights = reason.split('. ').filter(s => s.trim().length > 0).slice(0, 2);
  
  // Format match score as percentage
  const matchScorePercentage = Math.round(matchScore * 100);

  // Calculate days since listing
  const daysSinceListing = property.createdAt 
    ? Math.floor((new Date().getTime() - new Date(property.createdAt).getTime()) / (1000 * 3600 * 24))
    : null;

  return (
    <Card className="overflow-hidden h-full flex flex-col glassmorphism-card backdrop-blur-sm bg-white/5 border border-white/10 hover:shadow-lg transition-all duration-300 group relative">
      {/* Animated gradient highlight on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg z-0"></div>

      <div className="relative h-48 overflow-hidden">
        <img 
          src={mainImage} 
          alt={property.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Top badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {daysSinceListing !== null && daysSinceListing <= 7 && (
            <Badge className="bg-green-500 hover:bg-green-600">New</Badge>
          )}
        </div>
        
        <div className="absolute top-2 right-2 flex gap-2">
          {property.isPremium && (
            <Badge className="bg-amber-500 hover:bg-amber-600">Premium</Badge>
          )}
        </div>
        
        {/* AI recommendation badge */}
        <div className="absolute bottom-2 left-2 flex gap-2">
          <Badge variant="outline" className="bg-white/80 backdrop-blur-sm border-blue-200 text-xs px-2 py-1">
            <Sparkles className="h-3 w-3 mr-1 text-blue-500" /> AI Recommended
          </Badge>
          <Badge 
            variant="outline" 
            className={`bg-white/80 backdrop-blur-sm text-xs px-2 py-1 ${
              matchScorePercentage >= 90 ? 'border-green-300 text-green-700' : 
              matchScorePercentage >= 80 ? 'border-blue-300 text-blue-700' : 
              'border-amber-300 text-amber-700'
            }`}
          >
            <Star className="h-3 w-3 mr-1 fill-current" /> {matchScorePercentage}% Match
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-2 relative z-10">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold line-clamp-1 text-white">{property.title}</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full hover:bg-blue-100/50">
                  <Info className="h-4 w-4 text-blue-500" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs p-4">
                <h4 className="font-medium mb-2">Why we recommend this property</h4>
                <div className="mb-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-blue-600 font-medium">Match Score</span>
                    <span className="text-xs font-bold">{matchScorePercentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                    <div 
                      className={`h-full rounded-full ${
                        matchScorePercentage >= 90 ? 'bg-green-500' : 
                        matchScorePercentage >= 80 ? 'bg-blue-500' : 
                        'bg-amber-500'
                      }`} 
                      style={{ width: `${matchScorePercentage}%` }}
                    ></div>
                  </div>
                </div>
                <p className="text-sm">{reason}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardDescription className="flex items-center text-sm text-white/80">
          <PiggyBank className="h-4 w-4 mr-1 inline" />
          <span className="font-medium text-white">{formatPrice(property.price)}</span>
          
          {property.squareFeet > 0 && (
            <span className="ml-2 text-xs text-white/60">
              (${Math.round(property.price / property.squareFeet)}/sq.ft)
            </span>
          )}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-2 flex-grow relative z-10">
        {/* AI insights */}
        <div className="mb-3 p-2 bg-blue-900/30 rounded-md border border-blue-500/30 backdrop-blur-sm">
          <div className="flex items-start space-x-2">
            <AIIcon className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="w-full">
              <div className="flex justify-between items-center mb-1">
                <h4 className="text-xs font-medium text-blue-300">Smart Match</h4>
                <div className="flex items-center">
                  <div 
                    className={`h-2 w-12 rounded-full mr-1 ${
                      matchScorePercentage >= 90 ? 'bg-gradient-to-r from-blue-400 to-green-400' : 
                      matchScorePercentage >= 80 ? 'bg-gradient-to-r from-blue-400 to-blue-600' : 
                      'bg-gradient-to-r from-amber-400 to-amber-600'
                    }`}
                  >
                    <div 
                      className="h-full rounded-full bg-white" 
                      style={{ width: `${100 - matchScorePercentage}%`, opacity: 0.7 }}
                    ></div>
                  </div>
                  <span className="text-[10px] font-medium text-white">
                    {matchScorePercentage}%
                  </span>
                </div>
              </div>
              <ul className="space-y-1">
                {highlights.map((highlight, idx) => (
                  <li key={idx} className="text-xs text-white/80 flex items-start">
                    <span className="inline-block w-3 flex-shrink-0">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Property features */}
        <div className="grid grid-cols-2 gap-2 mt-3">
          <div className="flex items-center text-sm text-white/80">
            <Home className="h-4 w-4 mr-1 flex-shrink-0" />
            <span className="truncate">{property.propertyType}</span>
          </div>
          <div className="flex items-center text-sm text-white/80">
            <Bed className="h-4 w-4 mr-1 flex-shrink-0" />
            <span>{property.bedrooms} {property.bedrooms === 1 ? 'bed' : 'beds'}</span>
          </div>
          <div className="flex items-center text-sm text-white/80">
            <Bath className="h-4 w-4 mr-1 flex-shrink-0" />
            <span>{property.bathrooms} {property.bathrooms === 1 ? 'bath' : 'baths'}</span>
          </div>
          <div className="flex items-center text-sm text-white/80">
            <Square className="h-4 w-4 mr-1 flex-shrink-0" />
            <span>{property.squareFeet.toLocaleString()} sqft</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 gap-2 relative z-10">
        <Link href={`/property/${property.id}`} className="flex-1">
          <Button 
            className="w-full" 
            variant="default"
          >
            View Details
          </Button>
        </Link>
        
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "flex-shrink-0 border-white/20 text-white hover:bg-white/10",
            isAlreadyInComparison ? "bg-blue-900/50 text-blue-300 border-blue-500/50" : ""
          )}
          onClick={() => addToCompare(property.id)}
          disabled={isAlreadyInComparison}
          title={isAlreadyInComparison ? "Already in comparison" : "Add to comparison"}
        >
          {isAlreadyInComparison ? (
            <Bookmark className="h-4 w-4 fill-current" />
          ) : (
            <Bookmark className="h-4 w-4" />
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}