import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addNotification } from '../../store/slices/notificationsSlice';
import {
  MapPin, Phone, Mail, Send,
  Linkedin, Twitter, Instagram, Youtube,
  MessageSquare, ChevronRight, Clock, ShieldCheck, Globe
} from 'lucide-react';

const Contact = ({ onBack, onSendMessage }) => {
  const settings = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Support Technique',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSendMessage) {
      onSendMessage(formData);

      // Simulate Admin Notification
      dispatch(addNotification({
        type: 'message',
        title: 'Nouveau Message',
        message: `${formData.name} a envoyé un message : ${formData.subject}`,
        link: '/admin/messages'
      }));

      alert("Chokran! Message dyalk t-sift l-admin, ghadi n-jawbok f-a9rab wa9t.");
      setFormData({ name: '', email: '', subject: 'Support Technique', message: '' });
    } else {
      alert("Message envoyé ! Notre équipe vous contactera sous peu.");
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-10 animate-fade-up">

      {/* Technical Breadcrumbs */}
      <nav className="flex items-center gap-2 mb-10">
        <button onClick={onBack} className="text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-[0.2em] text-[8px] font-black">System.Root</button>
        <ChevronRight className="h-2.5 w-2.5 text-slate-300" />
        <span className="text-slate-900 dark:text-white font-black uppercase tracking-[0.2em] text-[8px]">Access.Support</span>
      </nav>

      {/* High-Density Heading Area */}
      <div className="mb-12 space-y-4">
        <div className="inline-flex items-center px-3 py-1 bg-blue-600/10 border border-blue-600/10 rounded-md">
          <Globe className="size-3 text-blue-600 mr-2" />
          <span className="text-[8px] font-black text-blue-600 uppercase tracking-widest text-[8px]">Global Support Active</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white uppercase leading-none font-display">
          Support Technique Console
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-[13px] max-w-2xl leading-relaxed font-medium">
          Assistance de classe mondiale pour vos appareils Elite. Nos experts au Maroc sont disponibles pour résoudre vos problèmes techniques en temps réel.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* Left Column: Technical Contact Tiles */}
        <div className="lg:col-span-5 space-y-4">

          <div className="grid grid-cols-1 gap-3">
            {/* Physical Store Console Tile */}
            <div className="flex items-center gap-5 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:border-blue-500/30 transition-all group">
              <div className="bg-slate-50 dark:bg-slate-800 p-3.5 rounded-xl text-slate-400 group-hover:text-blue-600 transition-colors shadow-inner">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-0.5">
                  <h3 className="font-black text-slate-900 dark:text-white text-[11px] uppercase tracking-widest">Physical Hub</h3>
                  <span className="text-[7px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1.5">
                    <Clock className="size-2.5" /> 9h - 20h
                  </span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-[10px] font-medium leading-tight">{settings.address}</p>
              </div>
            </div>

            {/* Direct Assistance Console Tile */}
            <div className="flex items-center gap-5 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:border-blue-500/30 transition-all group">
              <div className="bg-slate-50 dark:bg-slate-800 p-3.5 rounded-xl text-slate-400 group-hover:text-emerald-500 transition-colors shadow-inner">
                <Phone className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-black text-slate-900 dark:text-white text-[11px] uppercase tracking-widest mb-0.5">Assistance Directe</h3>
                <div className="flex gap-4">
                  <p className="text-slate-500 dark:text-slate-400 text-[10px] font-bold">Ventes: +212 522 90 90 90</p>
                  <p className="text-slate-500 dark:text-slate-400 text-[10px] font-bold">Support: {settings.phone}</p>
                </div>
              </div>
            </div>

            {/* Inquiries Console Tile */}
            <div className="flex items-center gap-5 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:border-blue-500/30 transition-all group">
              <div className="bg-slate-50 dark:bg-slate-800 p-3.5 rounded-xl text-slate-400 group-hover:text-indigo-500 transition-colors shadow-inner">
                <Mail className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-black text-slate-900 dark:text-white text-[11px] uppercase tracking-widest mb-0.5">Email Protocol</h3>
                <p className="text-slate-500 dark:text-slate-400 text-[10px] font-bold">{settings.email}</p>
              </div>
            </div>
          </div>

          {/* Guarantee Badges */}
          <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/50 flex items-center justify-around">
            <div className="flex flex-col items-center gap-2">
              <ShieldCheck className="size-5 text-blue-600 opacity-50" />
              <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest">Verified Support</span>
            </div>
            <div className="w-px h-8 bg-slate-200 dark:bg-slate-800" />
            <div className="flex flex-col items-center gap-2">
              <Send className="size-5 text-emerald-500 opacity-50" />
              <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest">Fast Response</span>
            </div>
          </div>

          {/* Compact Social Grid */}
          <div className="pt-4">
            <p className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Social Integration</p>
            <div className="flex gap-3">
              {[
                { icon: Linkedin, label: 'IN' },
                { icon: Twitter, label: 'TW' },
                { icon: Instagram, label: 'IG' },
                { icon: Youtube, label: 'YT' }
              ].map((social) => (
                <a key={social.label} href="#" className="group flex flex-col items-center gap-2">
                  <div className="size-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center transition-all group-hover:bg-blue-600 group-hover:text-white group-hover:-translate-y-1 shadow-sm font-black text-[10px]">
                    <social.icon className="size-4" />
                  </div>
                  <span className="text-[7px] font-black uppercase tracking-widest text-slate-400 group-hover:text-blue-600 transition-colors">{social.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Console Form */}
        <div className="lg:col-span-7">
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 md:p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-50 dark:border-slate-800">
              <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <MessageSquare className="h-5 w-5 text-white" />
              </div>
              <div className="space-y-0.5">
                <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Transmission Hub</h2>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Secure Communication Protocol Active</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 text-[9px]">Nom Complet</label>
                  <input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 focus:border-blue-600 focus:bg-white dark:focus:bg-slate-900 transition-all outline-none font-bold text-slate-900 dark:text-white text-[11px]"
                    placeholder="E.g. Ahmed Benani"
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 text-[9px]">Email Address</label>
                  <input
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 focus:border-blue-600 focus:bg-white dark:focus:bg-slate-900 transition-all outline-none font-bold text-slate-900 dark:text-white text-[11px]"
                    placeholder="ahmed@techzone.ma"
                    type="email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 text-[9px]">Subject Header</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-5 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 focus:border-blue-600 focus:bg-white dark:focus:bg-slate-900 transition-all outline-none font-black text-slate-900 dark:text-white appearance-none cursor-pointer text-[11px] uppercase"
                >
                  <option>Support Technique</option>
                  <option>Demande de Devis (Entreprise)</option>
                  <option>Suivi de Commande</option>
                  <option>Garantie & S.A.V</option>
                  <option>Autre Inquiry</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 text-[9px]">Transmission Message</label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-5 py-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 focus:border-blue-600 focus:bg-white dark:focus:bg-slate-900 transition-all outline-none resize-none font-bold text-slate-900 dark:text-white text-[11px]"
                  placeholder="Details concerning your inquiry..."
                  rows={4}
                ></textarea>
              </div>

              <button
                className="w-full bg-slate-900 dark:bg-blue-600 hover:bg-blue-600 text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-lg shadow-slate-900/10 transition-all active:scale-[0.98]"
                type="submit"
              >
                <span>Execute Transmission</span>
                <Send className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-8 flex items-center justify-center gap-2">
              <span className="size-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
                Response latency: 2-4 hours business window
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
