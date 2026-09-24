import React, { useState } from 'react';
import { authApi } from '../../services/api';
import '../../styles/studio.css';

export default function AdminLogin({ onLoginSuccess, onBackToSite }) {
  const [password,setPassword]=useState('');
  const [visible,setVisible]=useState(false);
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState('');
  const submit=async e=>{
    e.preventDefault(); setBusy(true); setError('');
    try {
      const result=await authApi.login(password);
      if(!result.success || !result.token) throw new Error('Sign-in was not completed.');
      onLoginSuccess({name:'Jessica (Jess)',role:'Studio Administrator'});
    } catch(err) { setError(err.status===401?'That password was not recognised. Please try again.':'Unable to connect to the studio. Please try again.'); }
    finally {setBusy(false);}
  };
  return <div className="rb-admin rb-login">
    <div className="rb-login-art"><img src="/images/nano-strokes.jpg" alt="Detail of carefully shaped brows"/><div><p className="rb-eyebrow">THE SPACE BEHIND THE BEAUTY</p><h1>Your studio.<br/><em>Beautifully managed.</em></h1></div></div>
    <main className="rb-login-panel"><button className="rb-text-link" onClick={onBackToSite}>← Back to the website</button><div className="rb-login-form"><span className="rb-logo">rose browsz<span>STUDIO MANAGEMENT</span></span><p className="rb-eyebrow">WELCOME BACK</p><h2>A little order.<br/><em>More room to create.</em></h2><p>Sign in to manage consultations, client messages, and your studio.</p><form onSubmit={submit}><label htmlFor="studio-password">Studio password</label><div className="rb-password"><input id="studio-password" type={visible?'text':'password'} autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} required/><button type="button" aria-pressed={visible} onClick={()=>setVisible(!visible)}>{visible?'Hide':'Show'}</button></div>{error&&<p className="rb-error" role="alert">{error}</p>}<button type="submit" className="rb-button" disabled={busy}>{busy?'Signing in…':'Enter the studio ↗'}</button></form><small>Authorised studio access only.</small></div><span className="rb-login-bottom">ROSEVILLE, CALIFORNIA / ROSE BROWSZ</span></main>
  </div>;
}
