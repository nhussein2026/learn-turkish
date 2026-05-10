/** @jsxImportSource preact */
import { useState } from 'preact/hooks';

export default function YamlGenerator() {
  const [data, setData] = useState({
    id: '',
    turkish: '',
    pos: 'verb',
    cefr: 'A1',
    en: '',
    ar: '',
    root: '',
  });

  const [copyStatus, setCopyStatus] = useState('Copy YAML');

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const yaml = `id: ${data.id || 'slug-here'}
turkish: ${data.turkish}
pos: ${data.pos}
cefr: ${data.cefr}
translations:
  en: "${data.en}"
  ar: "${data.ar}"
root: "${data.root}"
relatedWords: []
tags: []
categories: []
morphology:
  root: "${data.root || data.turkish.replace('mek', '').replace('mak', '')}"
  suffixExamples: []
exampleSentences: []
meta:
  contributor: "anonymous"
  verified: false
  lastUpdated: "${new Date().toISOString().split('T')[0]}"`;

  const handleCopy = () => {
    navigator.clipboard.writeText(yaml);
    setCopyStatus('✓ Copied!');
    setTimeout(() => setCopyStatus('Copy YAML'), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Form */}
      <div className="glass-card p-6 space-y-4">
        <h2 className="text-xl font-bold mb-4">Word Details</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Turkish Form</label>
            <input 
              name="turkish" 
              value={data.turkish} 
              onInput={handleChange} 
              className="input w-full" 
              placeholder="e.g. gelmek"
            />
          </div>
          <div>
            <label className="label">ID (Slug)</label>
            <input 
              name="id" 
              value={data.id} 
              onInput={handleChange} 
              className="input w-full" 
              placeholder="e.g. gelmek"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Part of Speech</label>
            <select name="pos" value={data.pos} onChange={handleChange} className="input w-full">
              <option value="verb">Verb</option>
              <option value="noun">Noun</option>
              <option value="adjective">Adjective</option>
              <option value="adverb">Adverb</option>
              <option value="conjunction">Conjunction</option>
              <option value="pronoun">Pronoun</option>
            </select>
          </div>
          <div>
            <label className="label">CEFR Level</label>
            <select name="cefr" value={data.cefr} onChange={handleChange} className="input w-full">
              {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map(l => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="label">English Translation</label>
          <input 
            name="en" 
            value={data.en} 
            onInput={handleChange} 
            className="input w-full" 
            placeholder="to come"
          />
        </div>

        <div>
          <label className="label">Arabic Translation</label>
          <input 
            name="ar" 
            value={data.ar} 
            onInput={handleChange} 
            className="input w-full text-right" 
            dir="rtl"
            placeholder="يأتي"
          />
        </div>

        <div>
          <label className="label">Root Form</label>
          <input 
            name="root" 
            value={data.root} 
            onInput={handleChange} 
            className="input w-full" 
            placeholder="gel"
          />
        </div>
      </div>

      {/* Output */}
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">YAML Preview</h2>
          <button onClick={handleCopy} className="btn btn-primary px-4 py-2 text-sm">
            {copyStatus}
          </button>
        </div>
        <pre className="flex-1 p-6 rounded-2xl bg-slate-900 text-slate-300 font-mono text-sm overflow-auto border border-white/10 shadow-xl">
          {yaml}
        </pre>
      </div>
    </div>
  );
}
