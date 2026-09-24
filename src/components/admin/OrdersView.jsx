import React, { useState, useEffect } from 'react';
import { quotesApi } from '../../services/api';
import { Status } from './DashboardOverview';
const statuses=[['all','All requests'],['pending','Awaiting review'],['in_review','In review'],['quoted','Estimate sent'],['completed','Completed'],['archived','Archived']];
export default function OrdersView({ revision, onSelectQuote }) {
 const [quotes,setQuotes]=useState([]),[status,setStatus]=useState('all'),[search,setSearch]=useState(''),[loading,setLoading]=useState(true),[error,setError]=useState(''),[page,setPage]=useState(0),[retry,setRetry]=useState(0);
 useEffect(()=>{let live=true;setLoading(true);setError('');const timer=setTimeout(()=>quotesApi.getQuotes({status,search,limit:30,offset:page*30}).then(r=>{if(live)setQuotes(r.quotes||[]);}).catch(()=>{if(live){setQuotes([]);setError('Unable to load consultations. Please retry.');}}).finally(()=>{if(live)setLoading(false);}),200);return()=>{live=false;clearTimeout(timer);};},[status,search,page,revision,retry]);
 return <section className="rb-admin-panel"><div className="rb-record-toolbar"><label className="rb-search">Search consultations<input type="search" placeholder="Client, treatment, or reference" value={search} onChange={e=>{setSearch(e.target.value);setPage(0);}}/></label><label>Status<select value={status} onChange={e=>{setStatus(e.target.value);setPage(0);}}>{statuses.map(([id,label])=><option value={id} key={id}>{label}</option>)}</select></label></div>
 {error&&<p className="rb-error" role="alert">{error} <button onClick={()=>setRetry(n=>n+1)}>Retry</button></p>}
 {loading?<p className="rb-admin-empty" role="status">Loading consultations…</p>:quotes.length?<div className="rb-records">{quotes.map(q=><button className="rb-record" key={q.id} onClick={()=>onSelectQuote(q)}><span className="rb-avatar">{q.name?.slice(0,1)||'C'}</span><span><strong>{q.name}</strong><small>{q.detailedService||q.serviceCategory}</small><small>{q.email}</small></span><span className="rb-record-date">{new Date(q.createdAt).toLocaleDateString(undefined,{month:'short',day:'numeric'})}</span><Status value={q.status}/><span aria-hidden="true">↗</span></button>)}</div>:!error&&<div className="rb-admin-empty"><h3>No requests here yet.</h3><p>Try another search or status, or create a new consultation.</p></div>}
 <footer className="rb-pagination"><button disabled={page===0||loading} onClick={()=>setPage(p=>p-1)}>← Previous</button><span>Page {page+1}</span><button disabled={quotes.length<30||loading} onClick={()=>setPage(p=>p+1)}>Next →</button></footer>
 </section>;
}
