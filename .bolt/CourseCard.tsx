import { Clock, Star, Users } from 'lucide-react';

interface CourseCardProps {
  title: string;
  description: string;
  image: string;
  duration: string;
  students: number;
  rating: number;
  price: number;
}

export default function CourseCard({
  title,
  description,
  image,
  duration,
  students,
  rating,
  price,
}: CourseCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-bold text-blue-700 mb-2">{title}</h3> {/* Blue color for title */}
        <p className="text-gray-800 mb-4">{description}</p> {/* Text color changed to gray-800 for better contrast */}
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            <span className="text-sm">{duration}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <Users className="w-4 h-4 mr-1" />
            <span className="text-sm">{students} students</span>
          </div>
          <div className="flex items-center text-red-500"> {/* Red color for rating */}
            <Star className="w-4 h-4 mr-1 fill-current" />
            <span className="text-sm">{rating}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">${price}</span> {/* Blue color for price */}
          <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"> {/* Red color for button */}
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
}
