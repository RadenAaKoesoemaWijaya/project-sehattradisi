import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  image: string;
  rating: number;
  review: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  image,
  rating,
  review,
}) => {
  return (
    <div className="card hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="h-12 w-12 rounded-full overflow-hidden mr-3">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold">{name}</h3>
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={`${
                    i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        <p className="text-gray-600 italic">"{review}"</p>
      </div>
    </div>
  );
};

export default TestimonialCard;