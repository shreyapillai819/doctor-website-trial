"use client"
import React,{useEffect,useState} from 'react';
import Hero from "./_components/Hero";
import CategorySearch from "./_components/CategorySearch";
import DoctorList from "./_components/DoctorList";
import GlobalApi from "./_utils/GlobalApi";
import Chat from './_components/Chat';
import runChat from "@/lib/gemini";


export default function Home() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [recentPrompts, setRecentPrompts] = useState("");
  const [displayResult, setDisplayResult] = useState(false);
  const [prevPrompts, setPrevPrompts] = useState([]);

    // paragraph delay
    const paragraphDelay = (index, newWord) => {
      setTimeout(() => {
        setResult((prev) => prev + newWord);
      }, 70 * index);
    };

  // submit 
  const submit = async (prompt) => {
    setLoading(true);
    setResult("");
    setDisplayResult(true);
    setRecentPrompts(input);

    if (input && prompt) {
      setPrevPrompts((prev) => [...prev, input]);
    }
    const response = input ? await runChat(input) : await runChat(prompt);
    const boldResponse = response.split("**");
    let newArray = "";
    for (let i = 0; i < boldResponse.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newArray += boldResponse[i];
      } else {
        newArray += "<b>" + boldResponse[i] + "</b>";
      }
    }
    let newRes = newArray.split("*").join("</br>");
    let newRes2 = newRes.split(" ");

    for (let i = 0; i < newRes2.length; i++) {
      const newWord = newRes2[i];
      paragraphDelay(i, newWord + " ");
    }
    setLoading(false);
    setInput("");
  }


  const [doctorList,setDoctorList]=useState([]);
  useEffect(()=>{
    getDoctorList();
  },[])
  const getDoctorList=()=>{
    GlobalApi.getDoctorList().then(resp=>{
      console.log(resp.data.data);
      setDoctorList(resp.data.data);
    })
  }
  return (
   <div>
    <h2>
      <Hero/>
      <CategorySearch/>
      <DoctorList doctorList={doctorList}/>
      <Chat submit={submit} setInput={setInput} input={input} result={result} loading={loading} displayResult={displayResult} recentPrompts={recentPrompts}  setPrevPrompts={setPrevPrompts}/>
    </h2>
   </div>
  );
}
