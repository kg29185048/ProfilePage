import { useState, useEffect } from "react";
import './App.css'
import profilePicDefault from "./pics/pexels-arts-1496372.jpg";
import insta from "./pics/5296765_camera_instagram_instagram logo_icon.png"
import git from "./pics/317712_code repository_github_repository_resource_icon.png"
import linked from "./pics/5296501_linkedin_network_linkedin logo_icon.png"
import resumeFile from "./Krish_Garg_Resume.pdf"; 

function App() {
  const defaultProfile = {
    name: "Krish Garg",
    regNo: "20243141",
    college: "Motilal Nehru National Institute of Technology",
    course: "Bachelor of Technology",
    branch: "Computer Science & Engineering",
    email: "gargkrish152@gmail.com",
    phone: "+91-8077185048",
    picture: profilePicDefault,
    skills: ["C/C++", "Front-End Development", "Competitive Programming","Data Structures", "Algorithms", "Quizzing"],
  };

  const [profile, setProfile] = useState(defaultProfile);

  useEffect(() => {
    const saved = localStorage.getItem("profileData");
    if (saved) {
      const parsed = JSON.parse(saved);
      setProfile({
        ...defaultProfile,
        ...parsed,
        picture: parsed.picture || profilePicDefault,
      });
    }
  }, []);

  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

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

  const handleSave = () => {
    localStorage.setItem("profileData", JSON.stringify(profile));
    alert("Profile saved successfully");
  };

  const EditableText = ({ field, value, className }) => (
    <span
      // contentEditable
      // suppressContentEditableWarning
      // className={`px-1 rounded hover:bg-amber-100 focus:outline-none ${className}`}
      // onBlur={(e) => handleChange(field, e.target.innerText)}
    >
      {value}
    </span>
  );

  return (
    <div className="bg-amber-600 min-h-screen">
      
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-amber-800 text-white shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-3">
          <h2 className="text-xl font-bold tracking-wide">My Portfolio</h2>
          <div className="flex gap-6">
            <a href="#about" className="hover:text-amber-300 transition">About</a>
            <a href="#skills" className="hover:text-amber-300 transition">Skills</a>
            <a href="#resume" className="hover:text-amber-300 transition">Resume</a>
            <a href="#contact" className="hover:text-amber-300 transition">Contact Me</a>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <div className="flex justify-center items-center py-10 px-4" id="about">
        <div className="bg-gradient-to-br from-orange to-amber-100 rounded-3xl shadow-2xl p-8 w-full max-w-7xl">

          {/* Header */}
          <div className="text-center border-b border-amber-200 pb-6 mb-8">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-amber-950 tracking-tight">
              <EditableText field="name" value={profile.name} />
            </h1>
            <p className="text-black mt-2 text-lg">
              <EditableText field="branch" value={profile.branch} />
            </p>
          </div>

          {/* ✅ Personal Info Section */}
          <section id="info">
            <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-center gap-10">
              
              {/* Profile Picture */}
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
          </section>

          {/* Skills Section */}
          <section id="skills" className="mt-16">
            <div className="bg-white/50 backdrop-blur-sm text-black text-lg sm:text-xl font-semibold rounded-2xl shadow-lg p-6 w-full hover:shadow-xl transition">
              <p className="mb-6 text-center text-amber-700 tracking-wide">SKILLS</p>
              <div className="flex flex-wrap justify-center gap-[30px]">
                {profile.skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="px-6 py-2 bg-cyan-50 text-amber-900 rounded-xl font-medium shadow hover:scale-105 transition-transform duration-300"
                    //contentEditable
                    //suppressContentEditableWarning
                    // onBlur={(e) => {
                    //   const updated = [...profile.skills];
                    //   updated[index] = e.target.innerText;
                    //   setProfile((prev) => ({ ...prev, skills: updated }));
                    // }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Resume Section */}
          <section id="resume" className="mt-16">
            <div className="bg-white/50 backdrop-blur-sm text-black text-lg sm:text-xl font-semibold rounded-2xl shadow-lg p-6 w-full hover:shadow-xl transition text-center">
              <p className="mb-6 text-amber-700 tracking-wide">RESUME</p>
              
              {/* View and Download Buttons */}
              <div className="flex justify-center gap-6">
                <a href={resumeFile} target="_blank" rel="noopener noreferrer" 
                   className="px-6 py-2 bg-amber-700 text-white rounded-xl shadow hover:bg-amber-800 transition">
                  View Resume
                </a>
                <a href={resumeFile} download="Krish_Garg_Resume.pdf" 
                   className="px-6 py-2 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition">
                  Download Resume
                </a>
              </div>

              {/* Embedded Resume Preview */}
              <div className="mt-8 w-full h-[600px]">
                <iframe 
                  src={resumeFile} 
                  title="Resume Preview" 
                  className="w-full h-full rounded-xl shadow-md border border-amber-200"
                />
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="mt-16">
            <div className="bg-white/50 backdrop-blur-sm text-black text-lg sm:text-xl font-semibold rounded-2xl shadow-lg p-6 w-full hover:shadow-xl transition">
              <p className="mb-6 text-center text-amber-700 tracking-wide">CONTACT ME</p>
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
          </section>

          {/* Save Button */}
          {/* <div className="mt-8 flex justify-center">
            <button 
              onClick={handleSave} 
              className="px-6 py-2 bg-amber-700 text-white font-bold rounded-xl shadow-md hover:bg-amber-800 hover:shadow-lg transition"
            >
              Save Changes
            </button>
          </div> */}

        </div>
      </div>
    </div>
  );
}

export default App;
