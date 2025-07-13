import { useState } from "react";
import { useNavigate } from "react-router";
function App() {
  const navigate = useNavigate();
  const [name,setName] = useState("");
  const handlesubmit = () => {
    if (name.trim() === "") {
      alert("Please enter your name");
    } else {
      setName(name);
      navigate(`/next/${name}`);
    }
  };
  return (
    <div className="min-h-screen fixed flex justify-center gap-y-2 flex-col animated-bg">
      <div className="flex w-100 h-100 mt-20 items-center flex-col">
        <h1 className="text-white text-4xl font-bold transition-all hover:text-yellow-200 ease-in-out animate-bounce-custom">
          Welcome to the Game
        </h1>
        <h1 className="text-4xl text-grey-200 flex justify-center mt-7 font-bold shadow-2xl shadow-blue-900">
          Matcher
        </h1>
        <p className="text-grey-200 mt-10 text-xl flex justify-center">
          From : Vaibhav Khandelwal
        </p>
      </div>
      <div className="mt-10 flex flex-col justify-center items-center">
        <input
          type="text"
          placeholder="Enter your name . . ."
          className="p-2 rounded-xl text-black text-2xl border-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="mt-4 p-2 rounded-xl bg-blue-800 w-1/6 text-white hover:translate-y-1 hover:bg-blue-600 transition-all duration-300 ease-in-out text-2xl font-bold" onClick={handlesubmit}>
          Submit
        </button>
      </div>
      <div className="flex flex-wrap mt-50 animate-spin">
        <span className="h-10 w-10 rounded-full bg-red-400 mr-60 mt-40"></span>
        <span className="h-10 w-10 rounded-full bg-green-400 mr-80 mb-40"></span>
        <span className="h-10 w-10 rounded-full bg-pink-400 mr-50 ml-240"></span>
        <span className="h-10 w-10 rounded-full bg-yellow-400 ml-120 mt-30"></span>
        <span className="h-10 w-10 rounded-full bg-blue-400 ml-180 mr-30"></span>
      </div>
    </div>
  );
}

export default App;
