import { ArrowRightIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import v1 from './robo1.mp4';
import portfolioData from './data.json';

export default function PortfolioPage() {
  const [inputValue, setInputValue] = useState('');
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchResponse = (query) => {
    query = query.toLowerCase();
    
    if (query.includes("projects")) {
      return portfolioData.projects.map(p => `${p.name}: ${p.description} (Link: ${p.link})`).join("\n\n");
    } else if (query.includes("education")) {
      return portfolioData.education.map(e => `${e.degree} at ${e.institution} (${e.year})`).join("\n");
    } else if (query.includes("experience")) {
      return portfolioData.experience.map(e => `${e.role} at ${e.company}: ${e.responsibilities.join(" ")}`).join("\n\n");
    } else if (query.includes("skills")) {
      return `Languages: ${portfolioData.skills.languages.join(", ")}.\nTechnologies: ${portfolioData.skills.technologies.join(", ")}.\nPractices: ${portfolioData.skills.development_practices.join(", ")}.`;
    } else if (query.includes("contact")) {
      return `Email: ${portfolioData.contact.email}\nPhone: ${portfolioData.contact.phone}\nLinkedIn: ${portfolioData.contact.linkedin}`;
    } else {
      return "I'm sorry, I don't have that information yet. Try asking about projects, education, experience, or skills.";
    }
  };

  const handleSend = () => {
    if (inputValue.trim() === '') return;
    
    const userMessage = { sender: 'user', text: inputValue };
    setChat([...chat, userMessage]);
    setInputValue('');
    setLoading(true);

    setTimeout(() => {
      const botMessage = { sender: 'bot', text: fetchResponse(inputValue) };
      setChat(prevChat => [...prevChat, botMessage]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="h-screen w-screen bg-[#13005A] flex items-center overflow-hidden">
      <div className="flex-1 text-left max-w-2xl w-full px-16">
        <div className="space-y-6">
          <h3 className="text-[#10F3A7] text-2xl md:text-3xl lg:text-4xl font-medium">Hey There</h3>
          <h1 className="text-[#10F3A7] text-4xl md:text-5xl lg:text-6xl font-bold">Welcome to Adarsh Salve</h1>
          <h2 className="text-[#10F3A7] text-3xl md:text-4xl lg:text-5xl font-semibold">Portfolio</h2>

          <div className="flex space-x-4 mt-8">
            <a href="#about" className="text-[#10F3A7] hover:text-white transition-colors">About</a>
            <a href="#projects" className="text-[#10F3A7] hover:text-white transition-colors">Projects</a>
            <a href="#contact" className="text-[#10F3A7] hover:text-white transition-colors">Contact us</a>
          </div>

          <div className="mt-8 h-48 overflow-y-auto bg-white/10 p-4 rounded-lg">
            {chat.map((msg, index) => (
              <p key={index} className={`text-sm p-2 rounded ${msg.sender === 'user' ? 'text-[#10F3A7] text-right' : 'text-white'}`}>
                {msg.text}
              </p>
            ))}
            {loading && <p className="text-white">AI is typing...</p>}
          </div>

          <div className="flex items-center mt-4 bg-white/20 rounded-lg pr-2">
            <input 
              type="text"
              placeholder="Ask Anything"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-grow bg-[#AF9393] text-[#10F3A7] placeholder-[#000000]/70 px-4 py-3 rounded-lg focus:outline-none"
            />
            <button onClick={handleSend} className="bg-[#C0ABAB] text-[#100D23] p-2 rounded-full">
              <ArrowRightIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <video autoPlay loop muted className="w-[80%] max-w-2xl rounded-lg shadow-lg">
          <source src={v1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
