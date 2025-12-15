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
    <div className={cn("group h-full relative p-6 rounded-2xl glass hover:bg-[hsl(var(--primary)/.1)] transition-all duration-300 hover:scale-105 border border-white/5 cursor-pointer", className)}>
      <div className={cn("absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500", gradient)} />
      
      <div className="relative z-10">
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 bg-linear-to-br from-[hsl(var(--cold-gradient-start))] to-[hsl(var(--cold-gradient-end))]")}>
          <Icon className="w-6 h-6 text-[hsl(var(--primary))]" />
        </div>
        
        <h3 className="text-xl font-bold mb-2 text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--primary))] transition-colors">
          {title}
        </h3>
        
        <p className="text-[hsl(var(--muted-foreground))] leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;
