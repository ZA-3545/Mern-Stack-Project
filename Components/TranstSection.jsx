import { Truck, RotateCcw, Scale, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
const TrustSection = () => {
  const features = [
    { icon: <Truck />, title: "Free Shipping", desc: "Free standard shipping on all orders over $75." },
    { icon: <RotateCcw />, title: "60-Day Returns", desc: "Changed your mind? Return unworn items within 60 days." },
    { icon: <Scale />, title: "Size Guarantee", desc: "Not the right fit? Exchange for a different size at no cost." },
    { icon: <ShieldCheck />, title: "Secure Checkout", desc: "Your payment information is encrypted and secure." },
  ];

  return (
    <section className="max-w mx-auto px-10 py-16 border-t bg-black border-gray-900">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {features.map((f, i) => (
          <div key={i} className="flex gap-4">
            <div className="bg-orange-950/30 p-4 h-fit rounded-2xl text-[#f06225]">
              {f.icon}
            </div>
            <div>
              <h4 className="font-bold text-lg mb-1">{f.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default TrustSection;