import { useState, useEffect } from "react";
import './App.css'
import profilePicDefault from "./pics/pexels-arts-1496372.jpg";
import insta from "./pics/5296765_camera_instagram_instagram logo_icon.png"
import git from "./pics/317712_code repository_github_repository_resource_icon.png"
import linked from "./pics/5296501_linkedin_network_linkedin logo_icon.png"

function App() {
  // Default profile data
  const defaultProfile = {
    name: "Krish Garg",
    regNo: "20243141",
    college: "Motilal Nehru National Institute of Technology",
    course: "Bachelor of Technology",
    branch: "Computer Science & Engineering",
    email: "gargkrish152@gmail.com",
    phone: "+91-8077185048",
    picture: profilePicDefault, // default picture
  };

  const [profile, setProfile] = useState(defaultProfile);

  useEffect(() => {
    const saved = localStorage.getItem("profileData");
    if (saved) {
      const parsed = JSON.parse(saved);
      setProfile({
        ...defaultProfile,
        ...parsed,
        picture: parsed.picture || profilePicDefault, // fallback to default
      });
    }
  }, []);


  // Handle text change
  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  // Handle profile picture change
  const handlePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, picture: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Save profile to localStorage
  const handleSave = () => {
    localStorage.setItem("profileData", JSON.stringify(profile));
    alert("Profile saved successfully ✅");
  };

  // Editable text component
  const EditableText = ({ field, value, className }) => (
    <span
      contentEditable
      suppressContentEditableWarning
      className={`px-1 rounded hover:bg-amber-100 focus:outline-none ${className}`}
      onBlur={(e) => handleChange(field, e.target.innerText)}
    >
      {value}
    </span>
  );

  return (
    <div className="bg-amber-600 min-h-screen flex justify-center items-center py-10 px-4">
      
      {/* Main Container */}
      <div className="bg-gradient-to-br from-orange to-amber-100 rounded-3xl shadow-2xl p-8 w-full max-w-6xl">
        
        {/* Header */}
        <div className="text-center border-b border-amber-200 pb-6 mb-8">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-amber-950 tracking-tight">
            <EditableText field="name" value={profile.name} />
          </h1>
          <p className="text-black mt-2 text-lg">
            <EditableText field="branch" value={profile.branch} />
          </p>
        </div>

        {/* Profile + Info Section */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-center gap-10">
          
          {/* Profile Section */}
          <div className="flex flex-col items-center text-center space-y-4">
            <img 
              src={profile.picture} 
              alt="Profile" 
              className="w-40 h-40 sm:w-56 sm:h-56 lg:w-72 lg:h-72 rounded-full border-4 border-amber-700 shadow-md hover:scale-105 transition-transform duration-300"
            />
            <label className="mt-2 cursor-pointer text-sm bg-amber-700 text-white px-4 py-1 rounded-md hover:bg-amber-800 transition">
              Change Picture
              <input 
                type="file" 
                accept="image/*" 
                className="hidden"
                onChange={handlePicChange}
              />
            </label>
          </div>

          {/* Info Card */}
          <div className="bg-white/50 backdrop-blur-sm text-black text-lg sm:text-xl font-medium rounded-2xl shadow-lg p-6 w-full lg:w-2/3 hover:shadow-2xl transition">
            <ul className="space-y-3">
              <li><span className="font-bold text-amber-700">Reg.No.:</span> <EditableText field="regNo" value={profile.regNo} /></li>
              <li><span className="font-bold text-amber-700">College:</span> <EditableText field="college" value={profile.college} /></li>
              <li><span className="font-bold text-amber-700">Course:</span> <EditableText field="course" value={profile.course} /></li>
              <li><span className="font-bold text-amber-700">Branch:</span> <EditableText field="branch" value={profile.branch} /></li>
              <li><span className="font-bold text-amber-700">Email:</span> <EditableText field="email" value={profile.email} /></li>
              <li><span className="font-bold text-amber-700">Phone:</span> <EditableText field="phone" value={profile.phone} /></li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-10 bg-white/50 backdrop-blur-sm text-black text-lg sm:text-xl font-semibold rounded-2xl shadow-lg p-6 w-full hover:shadow-xl transition">
          <p className="mb-6 text-center text-amber-700 tracking-wide">FOLLOW ON</p>
          <div className="flex justify-center gap-10">
            <a href="https://www.instagram.com/krrrrishhhhhhhh._/" target="_blank" rel="noopener noreferrer">
              <img src={insta} alt="Instagram" className="w-12 h-12 hover:scale-110 transition-transform duration-300" />
            </a>
            <a href="https://github.com/kg29185048" target="_blank" rel="noopener noreferrer">
              <img src={git} alt="Github" className="w-12 h-12 hover:scale-110 transition-transform duration-300" />
            </a>
            <a href="https://www.linkedin.com/in/krish-garg-9b21382a0/" target="_blank" rel="noopener noreferrer">
              <img src={linked} alt="LinkedIn" className="w-12 h-12 hover:scale-110 transition-transform duration-300" />
            </a>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-center">
          <button 
            onClick={handleSave} 
            className="px-6 py-2 bg-amber-700 text-white font-bold rounded-xl shadow-md hover:bg-amber-800 hover:shadow-lg transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
