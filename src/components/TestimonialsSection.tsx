import React from "react";
import { Star, User } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sahil Kumar",
      role: "Web Developer",
      comment: "EzyShare has been a lifesaver for sharing files with clients quickly without the hassle of accounts and passwords.",
      rating: 5
    },
    {
      name: "M.kumail",
      role: "Freelance Developer",
      comment: "The QR code feature makes sending large design files to clients incredibly simple. Great security with the PIN protection too!",
      rating: 5
    },
    {
      name: "Anees Akram",
      role: "Project Manager",
      comment: "My team uses EzyShare daily. The simplicity and security are perfect for our fast-paced environment.",
      rating: 4
    }
  ];

  return (
    <section className="bg-white py-16 overflow-hidden">
      <div className="section-container">
        <h2 className="section-title text-center">What Our Users Say</h2>
        <p className="section-subtitle text-center">
          Join thousands of satisfied users who trust EzyShare for their file sharing needs.
        </p>
        
        <div className="flex flex-col md:flex-row gap-8 mt-12 stagger-animation">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="testimonial-card flex-1 animate-fade-in"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-ezyshare-timberwolf/30 w-12 h-12 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-ezyshare-blackOlive" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-ezyshare-eerieBlack">{testimonial.name}</h4>
                    <p className="text-sm text-ezyshare-blackOlive/70">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-ezyshare-flame text-ezyshare-flame" />
                  ))}
                </div>
              </div>
              
              <blockquote className="text-ezyshare-blackOlive text-left italic border-l-2 border-ezyshare-timberwolf pl-4">
                "{testimonial.comment}"
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
