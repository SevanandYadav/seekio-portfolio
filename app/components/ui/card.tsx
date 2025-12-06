interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card = ({ children, className = "", hover = false }: CardProps) => {
  return (
    <div className={`bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 ${hover ? "transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1" : ""} ${className}`}>
      {children}
    </div>
  );
};
