import React, { useState, useEffect, useRef } from 'react';
import DashboardOverview from './DashboardOverview';
import OrdersView from './OrdersView';
import InboxView from './InboxView';
import AdminSettings from './AdminSettings';
import QuoteDetailModal from './QuoteDetailModal';
import NewOrderModal from './NewOrderModal';
import { authApi } from '../../services/api';
import '../../styles/studio.css';
import useDialog from '../../hooks/useDialog';

const tabs = [
 ['dashboard','Overview','Your studio, at a glance.'],
 ['orders','Consultations','Every client starts with a conversation.'],
 ['inbox','Messages','Keep the conversation personal.'],
 ['settings','Studio settings','The details behind your day.'],
];
export default function AdminLayout({ user, onLogout, onBackToSite }) {
 const sidebar = useRef(null);
 const [tab,setTab]=useState('dashboard');
 const [drawer,setDrawer]=useState(false);
 const [quote,setQuote]=useState(null);
 const [create,setCreate]=useState(false);
 const [revision,setRevision]=useState(0);
 useDialog(sidebar, () => setDrawer(false), drawer);
 const active=tabs.find(t=>t[0]===tab);
 const navigate=id=>{setTab(id);setDrawer(false);};
 useEffect(()=>{const handle=e=>{if(e.key==='Escape')setDrawer(false);};window.addEventListener('keydown',handle);return()=>window.removeEventListener('keydown',handle);},[]);
 const updated=q=>{setQuote(q._deleted?null:q);setRevision(n=>n+1);};
 return <div className="rb-admin rb-admin-shell">
  {drawer&&<button className="rb-drawer-backdrop" aria-label="Close navigation" onClick={()=>setDrawer(false)}/>}
  <aside ref={sidebar} className={'rb-admin-sidebar '+(drawer?'is-open':'')}>
   <div><div className="rb-sidebar-brand"><span className="rb-logo">rose browsz<span>STUDIO MANAGEMENT</span></span><button className="rb-drawer-close" onClick={()=>setDrawer(false)}>Close</button></div><p className="rb-eyebrow">YOUR WORKSPACE</p><nav aria-label="Studio navigation">{tabs.map(([id,label],i)=><button key={id} aria-current={tab===id?'page':undefined} onClick={()=>navigate(id)}><span>{String(i+1).padStart(2,'0')}</span>{label}<span aria-hidden="true">↗</span></button>)}</nav></div>
   <div className="rb-sidebar-bottom"><span className="rb-eyebrow">A LITTLE ORDER. MORE ROOM TO CREATE.</span><button onClick={onBackToSite}>View the website ↗</button><div><span className="rb-avatar">JJ</span><span>{user?.name || 'Jessica (Jess)'}<small>Studio administrator</small></span></div><button className="rb-signout" onClick={async()=>{await authApi.logout();onLogout();}}>Sign out</button></div>
  </aside>
  <div className="rb-admin-workspace"><header className="rb-admin-topbar"><button className="rb-admin-menu" aria-expanded={drawer} onClick={()=>setDrawer(true)}>Menu</button><span>THE STUDIO / {active[1].toUpperCase()}</span><button onClick={onBackToSite}>Public website ↗</button></header>
   <main className="rb-admin-main"><div className="rb-admin-heading"><div><p className="rb-eyebrow">ROSE BROWSZ & BEAUTY ACADEMY</p><h1>{active[1]}</h1><p>{active[2]}</p></div>{tab!=='settings'&&<button className="rb-button" onClick={()=>setCreate(true)}>New consultation +</button>}</div>
    <div className="rb-enter" key={tab}>
     {tab==='dashboard'&&<DashboardOverview revision={revision} onNavigateTab={navigate} onSelectQuote={setQuote}/>}
     {tab==='orders'&&<OrdersView revision={revision} onSelectQuote={setQuote}/>}
     {tab==='inbox'&&<InboxView revision={revision} onOpenFullQuote={setQuote}/>}
     {tab==='settings'&&<AdminSettings/>}
    </div>
   </main>
   <footer className="rb-admin-footer">ROSE BROWSZ / STUDIO MANAGEMENT<span>Roseville, California</span></footer>
  </div>
  {quote&&<QuoteDetailModal quote={quote} onClose={()=>setQuote(null)} onUpdate={updated}/>}
  {create&&<NewOrderModal isOpen onClose={()=>setCreate(false)} onCreated={()=>{setCreate(false);setRevision(n=>n+1);}}/>}
 </div>;
}
