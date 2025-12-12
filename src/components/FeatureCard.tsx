import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  className?: string;
}

const FeatureCard = ({ icon: Icon, title, description, gradient, className }: FeatureCardProps) => {
  return (
    <div className={cn("group relative p-6 rounded-2xl glass hover:bg-white/10 transition-all duration-300 hover:scale-105 border border-white/5", className)}>
      <div className={cn("absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500", gradient)} />
      
      <div className="relative z-10">
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110", gradient)}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        
        <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;
