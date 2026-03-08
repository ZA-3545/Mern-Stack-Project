import { Star } from 'lucide-react';
import NewArrivals from './NewArrivals';
import { Link } from 'react-router-dom';

const Testimonials = () => {
  const reviews = [
    { name: "Marcus Chen", role: "Marathon Runner", text: "Step to grow  has completely transformed my running experience. The Velocity Runner Pro helped me PR by 8 minutes.", img: "https://i.pravatar.cc/150?u=marcus" },
    { name: "Emily Rodriguez", role: "Fitness Instructor", text: "I wear Step to grow shoes for all my classes. They are versatile, stylish, and most importantly, my feet never hurt.", img: "https://i.pravatar.cc/150?u=emily" },
    { name: "David Kim", role: "Sneaker Enthusiast", text: "The quality and attention to detail is unmatched. Step to grow has quickly become my go-to brand for daily wear.", img: "https://i.pravatar.cc/150?u=david" }
  ];

  return (
    <>
    <NewArrivals/>
    <section className="max-w mx-auto px-10 py-10 text-center bg-gray-950">
      <span className="bg-orange-950/40 text-orange-500 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
        Customer Love
      </span>
      <h2 className="text-4xl text-white font-bold mt-6 mb-4">What Our Customers Say</h2>
      <p className="text-gray-400 mb-16">Join thousands of happy customers who have made Step to grow their go-to brand</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.map((rev, i) => (
          <div key={i} className="bg-gray-900/40 border border-gray-800 p-8 rounded-3xl text-left hover:border-orange-500/30 transition-all">
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#f06225" color="#f06225" />)}
            </div>
            <p className="text-gray-300 italic mb-8">"{rev.text}"</p>
            <div className="flex items-center gap-4">
              <img src={rev.img} className="w-12 h-12 rounded-full border-2 border-gray-800" alt={rev.name} />
              <div>
                <h4 className="font-bold text-sm text-lime-100">{rev.name}</h4>
                <p className="text-xs text-gray-500">{rev.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
    </section>

    
  </>
  );
};

export default Testimonials;