
import React, { useState, useRef, useEffect } from 'react';
import { MembershipTier } from '../types';
import { Mic, MicOff, Send, FileUp, Sparkles, Brain, FileText, Bot, X, Zap, Loader2 } from 'lucide-react';
import { connectLiveAudio, createPcmBlob, decodeBase64, decodeAudioData, queryDocumentContent } from '../geminiService';

const AITwin: React.FC<{ tier: MembershipTier }> = ({ tier }) => {
  const [isLive, setIsLive] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [pdfBase64, setPdfBase64] = useState<string | null>(null);
  const [pdfName, setPdfName] = useState<string | null>(null);

  // Audio refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const outputNodeRef = useRef<GainNode | null>(null);
  const nextStartTimeRef = useRef(0);
  const liveSessionPromiseRef = useRef<Promise<any> | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  // PDF Ref for input
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startAudio = async () => {
    if (tier !== MembershipTier.PREMIUM) {
      alert("Upgrade to Premium for AI Twin Audio Spark!");
      return;
    }

    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const outNode = audioCtx.createGain();
      outNode.connect(audioCtx.destination);
      audioContextRef.current = audioCtx;
      outputNodeRef.current = outNode;

      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const sessionPromise = connectLiveAudio({
        onopen: () => {
          console.log("AI Twin Live Connected");
          const source = inputCtx.createMediaStreamSource(stream);
          const processor = inputCtx.createScriptProcessor(4096, 1, 1);
          processor.onaudioprocess = (e) => {
            const inputData = e.inputBuffer.getChannelData(0);
            const blob = createPcmBlob(inputData);
            sessionPromise.then((session) => {
              session.sendRealtimeInput({ media: blob });
            });
          };
          source.connect(processor);
          processor.connect(inputCtx.destination);
        },
        onmessage: async (message: any) => {
          const audioData = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
          if (audioData) {
            const bytes = decodeBase64(audioData);
            const buffer = await decodeAudioData(bytes, audioCtx, 24000, 1);
            const source = audioCtx.createBufferSource();
            source.buffer = buffer;
            source.connect(outNode);
            
            const startAt = Math.max(nextStartTimeRef.current, audioCtx.currentTime);
            source.start(startAt);
            nextStartTimeRef.current = startAt + buffer.duration;
            sourcesRef.current.add(source);
            source.onended = () => sourcesRef.current.delete(source);
          }

          if (message.serverContent?.interrupted) {
            sourcesRef.current.forEach(s => {
              try { s.stop(); } catch(e) {}
            });
            sourcesRef.current.clear();
            nextStartTimeRef.current = 0;
          }
        },
        onerror: (e: any) => console.error("Live Audio Error:", e),
        onclose: () => setIsLive(false),
      });

      liveSessionPromiseRef.current = sessionPromise;
      setIsLive(true);
    } catch (err) {
      console.error("Failed to start Audio Spark:", err);
    }
  };

  const stopAudio = async () => {
    setIsLive(false);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (liveSessionPromiseRef.current) {
      const session = await liveSessionPromiseRef.current;
      session.close();
      liveSessionPromiseRef.current = null;
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isProcessing) return;

    const userQuery = inputText;
    setMessages(prev => [...prev, { role: 'user', text: userQuery }]);
    setInputText('');
    setIsProcessing(true);

    try {
      if (pdfBase64) {
        // Query the PDF specifically
        const answer = await queryDocumentContent(pdfBase64, userQuery);
        setMessages(prev => [...prev, { role: 'ai', text: answer }]);
      } else {
        // General AI Thinking Twin logic
        setMessages(prev => [...prev, { role: 'ai', text: "Analyzing your query against your cognitive profile... (Tip: Sync a PDF to use the Neuro-Link Communicator for deep document insights!)" }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: "Synchronization error. Please retry the query." }]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setPdfName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        const base64 = dataUrl.split(',')[1];
        setPdfBase64(base64);
      };
      reader.readAsDataURL(file);
      // Reset input value to allow re-uploading the same file if cleared
      if (fileInputRef.current) fileInputRef.current.value = '';
    } else if (file) {
      alert("Please upload a valid PDF file.");
    }
  };

  const clearPdf = () => {
    setPdfBase64(null);
    setPdfName(null);
  };

  return (
    <div className="h-full flex flex-col gap-6 max-w-5xl mx-auto pb-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-indigo-600/20 rounded-[2rem] shadow-xl shadow-indigo-500/10">
            <Bot className="text-indigo-400 w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
              AI THINKING TWIN
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Cognitive-Shadow Sync: Online</p>
            </div>
          </div>
        </div>
        
        <button 
          onClick={isLive ? stopAudio : startAudio}
          className={`group flex items-center gap-3 px-8 py-4 rounded-[1.5rem] font-black transition-all shadow-2xl ${
            isLive 
            ? 'bg-red-500 hover:bg-red-600 shadow-red-500/30' 
            : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/30'
          }`}
        >
          {isLive ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5 group-hover:scale-110 transition-transform" />}
          <span className="uppercase tracking-widest text-xs">{isLive ? 'Disable Spark' : 'Audio Spark™'}</span>
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
        {/* Chat Interface */}
        <div className="lg:col-span-3 flex flex-col bg-gray-900/40 border border-gray-800 rounded-[2.5rem] overflow-hidden shadow-2xl backdrop-blur-md">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center p-12 space-y-6 opacity-30">
                <Sparkles className="w-16 h-16 text-indigo-400" />
                <div className="space-y-2">
                  <p className="text-xl font-bold text-white">Neural Synchronizer Idle</p>
                  <p className="text-sm max-w-xs">Upload a PDF to the Neuro-Link or use Audio Spark to begin your cognitive session.</p>
                </div>
              </div>
            )}
            
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
                <div className={`max-w-[85%] p-5 rounded-[1.5rem] shadow-lg ${
                  m.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-br-none' 
                  : 'bg-gray-800/80 border border-gray-700/50 text-gray-100 rounded-bl-none backdrop-blur-sm'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.text}</p>
                </div>
              </div>
            ))}
            
            {isProcessing && (
              <div className="flex justify-start">
                <div className="bg-gray-800/50 p-5 rounded-[1.5rem] border border-gray-700/50 flex items-center gap-3 text-indigo-400">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-xs font-black uppercase tracking-widest">Processing Neural Link...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-6 bg-black/20 border-t border-gray-800/50">
            {pdfName && (
              <div className="mb-4 flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-3 py-2 rounded-xl w-fit animate-in fade-in zoom-in duration-300">
                <FileText className="w-3 h-3 text-indigo-400" />
                <span className="text-[10px] font-bold text-indigo-200 uppercase tracking-wider max-w-[150px] truncate">{pdfName} (Active)</span>
                <button onClick={clearPdf} className="p-1 hover:bg-indigo-500/20 rounded-md transition-colors">
                  <X className="w-3 h-3 text-indigo-400" />
                </button>
              </div>
            )}
            <form onSubmit={handleSendMessage} className="flex gap-4">
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={pdfBase64 ? "Query the synced document..." : "Transmit thought to Twin..."}
                className="flex-1 bg-gray-800/50 border border-gray-700/50 rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-gray-600"
              />
              <button 
                type="submit" 
                disabled={isProcessing || !inputText.trim()}
                className="p-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:grayscale rounded-2xl transition-all shadow-xl shadow-indigo-500/20"
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </form>
          </div>
        </div>

        {/* Neural Tools Sidebar */}
        <div className="space-y-6">
          {/* Neuro-Link™ Module */}
          <div className="bg-gray-900/60 p-6 rounded-[2.5rem] border border-gray-800 shadow-xl overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Zap className="w-12 h-12 text-indigo-400" />
            </div>
            
            <h3 className="text-lg font-black flex items-center gap-3 mb-4 text-white uppercase tracking-tighter">
              <Brain className="w-5 h-5 text-indigo-400" /> Neuro-Link™
            </h3>
            <p className="text-[10px] text-gray-500 mb-6 font-bold uppercase tracking-widest leading-relaxed">
              Sync PDF documents to your Neuro-Fingerprint for contextual retrieval and associative mapping.
            </p>
            
            <div className="space-y-4">
              {pdfName ? (
                <div className="p-4 bg-gray-800/80 rounded-2xl border border-indigo-500/30 flex items-center justify-between group/file">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2 bg-indigo-500/10 rounded-lg">
                      <FileText className="text-indigo-400 w-4 h-4" />
                    </div>
                    <span className="text-xs truncate font-bold text-gray-200">{pdfName}</span>
                  </div>
                  <button onClick={clearPdf} className="text-gray-500 hover:text-red-400 p-1">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full aspect-square border-2 border-dashed border-gray-800 hover:border-indigo-500/50 hover:bg-indigo-500/5 rounded-[2rem] flex flex-col items-center justify-center gap-4 transition-all group/upload"
                >
                  <div className="p-5 bg-gray-800 rounded-full group-hover/upload:scale-110 transition-transform shadow-lg">
                    <FileUp className="w-8 h-8 text-indigo-400" />
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] group-hover/upload:text-indigo-400 transition-colors">Sync Document</span>
                  </div>
                </button>
              )}
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              accept="application/pdf" 
              className="hidden" 
            />
          </div>

          {/* AI Info Card */}
          <div className="bg-gradient-to-br from-indigo-950/40 to-black p-6 rounded-[2rem] border border-indigo-500/20 shadow-lg">
            <h4 className="text-xs font-black flex items-center gap-2 mb-3 text-indigo-400 uppercase tracking-widest">
              <Sparkles className="w-3 h-3" /> Cognitive Profile
            </h4>
            <p className="text-[10px] text-indigo-100/60 leading-relaxed font-medium">
              Your AI Twin is currently running in <span className="text-indigo-300">Predictive Logic Mode</span>. Audio Spark™ analysis suggests focus levels are at 84% capacity.
            </p>
            <div className="mt-4 w-full h-1 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 w-[84%] animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITwin;
