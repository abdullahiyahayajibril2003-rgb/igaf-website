import React, { useState, useEffect } from 'react';
import { 
  X, 
  Lock, 
  Check, 
  Save, 
  ShieldCheck, 
  AlertCircle, 
  RefreshCw, 
  Phone, 
  MapPin, 
  Bell, 
  Tag, 
  KeyRound, 
  LogOut, 
  FileText, 
  Users, 
  Search, 
  Trash2, 
  MessageCircle, 
  UserPlus, 
  Edit3, 
  CheckCircle2, 
  Clock, 
  Filter,
  DollarSign
} from 'lucide-react';
import { CompanyInfo, QuoteRequest, QuoteStatus, SystemUser } from '../types';
import { getCompanyInfo, saveCompanyInfo, DEFAULT_COMPANY_INFO } from '../data/company';
import { PRODUCTS } from '../data/products';
import { getStoredQuotes, saveQuotes, getStoredUsers, saveUsers } from '../data/quotesAndUsers';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInfoUpdated?: (newInfo: CompanyInfo) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose, onInfoUpdated }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(getCompanyInfo());
  const [activeTab, setActiveTab] = useState<'quotes' | 'users' | 'contact' | 'announcement' | 'prices'>('quotes');
  const [isSaved, setIsSaved] = useState(false);

  // Quotes Management State
  const [quotesList, setQuotesList] = useState<QuoteRequest[]>([]);
  const [quoteSearchQuery, setQuoteSearchQuery] = useState('');
  const [quoteStatusFilter, setQuoteStatusFilter] = useState<string>('All');
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);

  // Users Management State
  const [usersList, setUsersList] = useState<SystemUser[]>([]);
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUserForm, setNewUserForm] = useState<{
    name: string;
    email: string;
    phone: string;
    role: SystemUser['role'];
    state: string;
  }>({
    name: '',
    email: '',
    phone: '',
    role: 'Customer / Client',
    state: 'Nasarawa State',
  });

  useEffect(() => {
    if (isOpen) {
      setCompanyInfo(getCompanyInfo());
      setQuotesList(getStoredQuotes());
      setUsersList(getStoredUsers());
      setIsSaved(false);
      setErrorMsg('');
    }
  }, [isOpen]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === 'admin' || passcode.trim() === 'igaf2026' || passcode.trim() === '1234') {
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Invalid admin passcode. Default access key is: igaf2026');
    }
  };

  const handleSaveCompanyInfo = (e: React.FormEvent) => {
    e.preventDefault();
    saveCompanyInfo(companyInfo);
    if (onInfoUpdated) {
      onInfoUpdated(companyInfo);
    }
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleResetCompanyInfo = () => {
    if (window.confirm('Reset all company settings to default values?')) {
      saveCompanyInfo(DEFAULT_COMPANY_INFO);
      setCompanyInfo(DEFAULT_COMPANY_INFO);
      if (onInfoUpdated) {
        onInfoUpdated(DEFAULT_COMPANY_INFO);
      }
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

  const updatePriceOverride = (productId: string, priceStr: string) => {
    setCompanyInfo(prev => ({
      ...prev,
      priceEstimatesOverride: {
        ...(prev.priceEstimatesOverride || {}),
        [productId]: priceStr
      }
    }));
  };

  // QUOTE MANAGEMENT HANDLERS
  const handleUpdateQuoteStatus = (quoteId: string, newStatus: QuoteStatus) => {
    const updated = quotesList.map(q => q.id === quoteId ? { ...q, status: newStatus } : q);
    setQuotesList(updated);
    saveQuotes(updated);
    if (selectedQuote && selectedQuote.id === quoteId) {
      setSelectedQuote({ ...selectedQuote, status: newStatus });
    }
  };

  const handleUpdateQuoteNotes = (quoteId: string, notes: string) => {
    const updated = quotesList.map(q => q.id === quoteId ? { ...q, adminNotes: notes } : q);
    setQuotesList(updated);
    saveQuotes(updated);
  };

  const handleDeleteQuote = (quoteId: string) => {
    if (window.confirm('Are you sure you want to delete this price quote request?')) {
      const updated = quotesList.filter(q => q.id !== quoteId);
      setQuotesList(updated);
      saveQuotes(updated);
      if (selectedQuote?.id === quoteId) {
        setSelectedQuote(null);
      }
    }
  };

  // USER MANAGEMENT HANDLERS
  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserForm.name || !newUserForm.phone) return;

    const createdUser: SystemUser = {
      id: `usr-${Date.now()}`,
      name: newUserForm.name,
      email: newUserForm.email || 'N/A',
      phone: newUserForm.phone,
      role: newUserForm.role,
      state: newUserForm.state,
      status: 'Active',
      createdAt: new Date().toISOString(),
    };

    const updated = [createdUser, ...usersList];
    setUsersList(updated);
    saveUsers(updated);

    setNewUserForm({
      name: '',
      email: '',
      phone: '',
      role: 'Customer / Client',
      state: 'Nasarawa State',
    });
    setIsAddingUser(false);
  };

  const handleToggleUserStatus = (userId: string) => {
    const updated = usersList.map(u => u.id === userId ? { ...u, status: u.status === 'Active' ? ('Inactive' as const) : ('Active' as const) } : u);
    setUsersList(updated);
    saveUsers(updated);
  };

  const handleDeleteUser = (userId: string) => {
    if (window.confirm('Are you sure you want to remove this user?')) {
      const updated = usersList.filter(u => u.id !== userId);
      setUsersList(updated);
      saveUsers(updated);
    }
  };

  // Filtered Quotes
  const filteredQuotes = quotesList.filter(q => {
    if (quoteStatusFilter !== 'All' && q.status !== quoteStatusFilter) return false;
    if (quoteSearchQuery.trim()) {
      const term = quoteSearchQuery.toLowerCase();
      return (
        q.fullName.toLowerCase().includes(term) ||
        q.refCode.toLowerCase().includes(term) ||
        q.phoneNumber.includes(term) ||
        q.productName.toLowerCase().includes(term) ||
        q.companyName.toLowerCase().includes(term)
      );
    }
    return true;
  });

  // Filtered Users
  const filteredUsers = usersList.filter(u => {
    if (userSearchQuery.trim()) {
      const term = userSearchQuery.toLowerCase();
      return (
        u.name.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term) ||
        u.phone.includes(term) ||
        u.role.toLowerCase().includes(term) ||
        u.state.toLowerCase().includes(term)
      );
    }
    return true;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div 
        className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden border border-emerald-900/20 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-emerald-950 text-white p-4 sm:p-5 flex items-center justify-between border-b border-emerald-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-600/30 text-orange-400 flex items-center justify-center border border-orange-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">IGAF Admin Control Panel</h3>
              <p className="text-xs text-emerald-300">Quote Requests, Users & Store Settings</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={() => {
                  setIsAuthenticated(false);
                  setPasscode('');
                }}
                className="text-xs font-bold text-orange-300 hover:text-white bg-emerald-900/80 hover:bg-orange-600 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 border border-emerald-700/80"
                title="Log Out Admin"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Log Out</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="text-emerald-300 hover:text-white bg-emerald-900 hover:bg-emerald-800 p-2 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {!isAuthenticated ? (
            /* Login Form */
            <form onSubmit={handleLogin} className="max-w-md mx-auto py-8 space-y-6 text-center">
              <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-100 text-emerald-900 flex items-center justify-center shadow-inner">
                <Lock className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h4 className="text-xl font-extrabold text-slate-900">Admin Security Passcode</h4>
                <p className="text-xs text-slate-500">
                  Authorized access for managing machinery price quotes, customer records, and store settings.
                </p>
              </div>

              <div className="space-y-3 text-left">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Secret Admin Access Key
                </label>
                <div className="relative">
                  <KeyRound className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Enter passcode (Default: igaf2026)"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-11 pr-4 py-3 text-sm font-semibold text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                    autoFocus
                  />
                </div>
                {errorMsg && (
                  <p className="text-xs text-red-600 flex items-center gap-1 font-semibold">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {errorMsg}
                  </p>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-sm py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Authenticate & Enter Admin Portal</span>
                </button>
              </div>

              <div className="p-3 bg-slate-100 rounded-xl text-[11px] text-slate-500 border border-slate-200">
                <span className="font-bold text-slate-700">Access Key:</span> <code className="bg-white px-2 py-0.5 rounded text-orange-600 font-bold border border-slate-200">igaf2026</code> or <code className="bg-white px-2 py-0.5 rounded text-orange-600 font-bold border border-slate-200">admin</code>
              </div>
            </form>
          ) : (
            /* Authenticated Admin Workspace */
            <div className="space-y-6">
              
              {/* Tab Navigation Menu */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-200 scrollbar-none">
                <button
                  type="button"
                  onClick={() => setActiveTab('quotes')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all shrink-0 ${
                    activeTab === 'quotes'
                      ? 'bg-emerald-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 text-orange-400" />
                  <span>Price Quote Requests</span>
                  <span className="bg-orange-500 text-white text-[10px] px-2 py-0.2 rounded-full font-bold">
                    {quotesList.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('users')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all shrink-0 ${
                    activeTab === 'users'
                      ? 'bg-emerald-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Users className="w-3.5 h-3.5 text-orange-400" />
                  <span>Registered Users / Clients</span>
                  <span className="bg-emerald-700 text-white text-[10px] px-2 py-0.2 rounded-full font-bold">
                    {usersList.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('contact')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all shrink-0 ${
                    activeTab === 'contact'
                      ? 'bg-emerald-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Store Contact & Info</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('announcement')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all shrink-0 ${
                    activeTab === 'announcement'
                      ? 'bg-emerald-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>Header Announcement</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('prices')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all shrink-0 ${
                    activeTab === 'prices'
                      ? 'bg-emerald-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Tag className="w-3.5 h-3.5" />
                  <span>Price Tags</span>
                </button>
              </div>

              {/* TAB 1: MACHINERY PRICE QUOTE REQUESTS */}
              {activeTab === 'quotes' && (
                <div className="space-y-4">
                  
                  {/* Top Search & Status Filters */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                    
                    {/* Search Input */}
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={quoteSearchQuery}
                        onChange={(e) => setQuoteSearchQuery(e.target.value)}
                        placeholder="Search by client, ref code, or machine..."
                        className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs font-semibold focus:outline-none focus:border-emerald-600"
                      />
                      {quoteSearchQuery && (
                        <button
                          onClick={() => setQuoteSearchQuery('')}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                        >
                          ✕
                        </button>
                      )}
                    </div>

                    {/* Status Filter Pills */}
                    <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none text-xs">
                      <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 mr-1" />
                      {['All', 'New', 'Contacted', 'Quoted', 'Completed', 'Cancelled'].map((st) => (
                        <button
                          key={st}
                          onClick={() => setQuoteStatusFilter(st)}
                          className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all shrink-0 ${
                            quoteStatusFilter === st
                              ? 'bg-emerald-800 text-white shadow-xs'
                              : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>

                  </div>

                  {/* Quotes List Table / Cards */}
                  {filteredQuotes.length === 0 ? (
                    <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300 space-y-2">
                      <FileText className="w-10 h-10 text-slate-400 mx-auto" />
                      <h5 className="font-bold text-slate-700 text-sm">No Quote Requests Found</h5>
                      <p className="text-xs text-slate-500">No price quotes match your current filter criteria.</p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                      {filteredQuotes.map((quote) => {
                        const statusColors: Record<QuoteStatus, string> = {
                          New: 'bg-orange-100 text-orange-800 border-orange-200',
                          Contacted: 'bg-blue-100 text-blue-800 border-blue-200',
                          Quoted: 'bg-purple-100 text-purple-800 border-purple-200',
                          Completed: 'bg-emerald-100 text-emerald-800 border-emerald-200',
                          Cancelled: 'bg-slate-100 text-slate-600 border-slate-200',
                        };

                        const isSelected = selectedQuote?.id === quote.id;

                        const waMsg = encodeURIComponent(
                          `Hello ${quote.fullName},\n\nThis is IBRAHIMAWA GLOBAL AND FARM (IGAF) LIMITED regarding your quotation request *${quote.refCode}* for *${quote.quantity}x ${quote.productName}*.\n\nWe would like to share the official price quote and delivery terms.`
                        );

                        return (
                          <div 
                            key={quote.id}
                            className={`p-4 rounded-2xl border transition-all space-y-3 ${
                              isSelected 
                                ? 'bg-emerald-50/50 border-emerald-500 shadow-sm' 
                                : 'bg-white border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            
                            {/* Card Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                              <div className="flex items-center gap-2">
                                <span className="font-extrabold text-xs text-emerald-900 bg-emerald-100 px-2.5 py-0.5 rounded-md">
                                  {quote.refCode}
                                </span>
                                <span className="text-[11px] text-slate-400 font-medium">
                                  {new Date(quote.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </span>
                              </div>

                              <div className="flex items-center gap-2">
                                {/* Status Selector */}
                                <select
                                  value={quote.status}
                                  onChange={(e) => handleUpdateQuoteStatus(quote.id, e.target.value as QuoteStatus)}
                                  className={`text-xs font-extrabold px-2.5 py-1 rounded-lg border focus:outline-none ${statusColors[quote.status]}`}
                                >
                                  <option value="New">STATUS: New Request</option>
                                  <option value="Contacted">STATUS: Contacted</option>
                                  <option value="Quoted">STATUS: Quoted Sent</option>
                                  <option value="Completed">STATUS: Completed / Delivered</option>
                                  <option value="Cancelled">STATUS: Cancelled</option>
                                </select>

                                <button
                                  onClick={() => handleDeleteQuote(quote.id)}
                                  className="text-slate-400 hover:text-red-600 p-1 rounded transition-colors"
                                  title="Delete Quote Request"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            {/* Main Details */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                              
                              <div>
                                <span className="text-slate-400 font-bold uppercase text-[10px] block">Client Info</span>
                                <p className="font-bold text-slate-900">{quote.fullName}</p>
                                <p className="text-slate-600 text-[11px]">{quote.companyName}</p>
                                <p className="text-orange-600 font-bold text-[11px]">{quote.phoneNumber}</p>
                                {quote.email && <p className="text-slate-500 text-[11px] truncate">{quote.email}</p>}
                              </div>

                              <div>
                                <span className="text-slate-400 font-bold uppercase text-[10px] block">Requested Machine</span>
                                <p className="font-bold text-emerald-900">{quote.productName}</p>
                                <p className="text-slate-700 font-medium text-[11px]">Quantity: <strong className="text-orange-600">{quote.quantity} Unit(s)</strong></p>
                                <p className="text-slate-500 text-[11px]">{quote.state} ({quote.deliveryOption})</p>
                              </div>

                              <div className="space-y-1.5 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                                <span className="text-slate-400 font-bold uppercase text-[10px] block">Admin Notes / Quote Remarks</span>
                                <input
                                  type="text"
                                  defaultValue={quote.adminNotes || ''}
                                  onBlur={(e) => handleUpdateQuoteNotes(quote.id, e.target.value)}
                                  placeholder="Type internal note & press enter/blur..."
                                  className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1 text-[11px] font-medium text-slate-800 focus:outline-none focus:border-emerald-600"
                                />
                              </div>

                            </div>

                            {quote.message && (
                              <p className="text-[11px] text-slate-600 bg-amber-50/80 p-2 rounded-lg border border-amber-200 italic">
                                &quot;{quote.message}&quot;
                              </p>
                            )}

                            {/* Contact Action Bar */}
                            <div className="flex items-center justify-end gap-2 pt-1 border-t border-slate-100">
                              <a
                                href={`tel:${quote.phoneNumber}`}
                                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg font-bold text-[11px] flex items-center gap-1.5 transition-colors"
                              >
                                <Phone className="w-3 h-3 text-orange-400" />
                                <span>Call Client</span>
                              </a>

                              <a
                                href={`https://wa.me/${quote.phoneNumber.replace(/^0/, '234')}?text=${waMsg}`}
                                target="_blank"
                                rel="noreferrer"
                                className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-bold text-[11px] flex items-center gap-1.5 transition-colors"
                              >
                                <MessageCircle className="w-3 h-3" />
                                <span>Send Quote on WhatsApp</span>
                              </a>
                            </div>

                          </div>
                        );
                      })}
                    </div>
                  )}

                </div>
              )}

              {/* TAB 2: REGISTERED USERS & CLIENTS */}
              {activeTab === 'users' && (
                <div className="space-y-4">
                  
                  {/* Top Actions Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={userSearchQuery}
                        onChange={(e) => setUserSearchQuery(e.target.value)}
                        placeholder="Search users by name, email, phone, or role..."
                        className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs font-semibold focus:outline-none focus:border-emerald-600"
                      />
                    </div>

                    <button
                      onClick={() => setIsAddingUser(!isAddingUser)}
                      className="bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs px-4 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1.5 shrink-0"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>{isAddingUser ? 'Close Form' : 'Register New User'}</span>
                    </button>
                  </div>

                  {/* Add User Form */}
                  {isAddingUser && (
                    <form onSubmit={handleAddUser} className="bg-emerald-950 text-white p-5 rounded-2xl space-y-4 animate-fadeIn border border-emerald-800">
                      <h4 className="font-extrabold text-sm text-orange-400 flex items-center gap-2">
                        <UserPlus className="w-4 h-4" />
                        <span>Register New Staff or Client Record</span>
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-slate-900">
                        <div>
                          <label className="block text-[11px] font-bold text-emerald-200 mb-1">Full Name *</label>
                          <input
                            type="text"
                            required
                            value={newUserForm.name}
                            onChange={(e) => setNewUserForm({ ...newUserForm, name: e.target.value })}
                            placeholder="e.g. Garba Usman"
                            className="w-full bg-white border rounded-xl px-3 py-1.5 text-xs font-semibold"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-emerald-200 mb-1">Phone Number *</label>
                          <input
                            type="tel"
                            required
                            value={newUserForm.phone}
                            onChange={(e) => setNewUserForm({ ...newUserForm, phone: e.target.value })}
                            placeholder="e.g. 08012345678"
                            className="w-full bg-white border rounded-xl px-3 py-1.5 text-xs font-semibold"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-emerald-200 mb-1">Email Address</label>
                          <input
                            type="email"
                            value={newUserForm.email}
                            onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
                            placeholder="e.g. user@gmail.com"
                            className="w-full bg-white border rounded-xl px-3 py-1.5 text-xs font-semibold"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-emerald-200 mb-1">User Role</label>
                          <select
                            value={newUserForm.role}
                            onChange={(e) => setNewUserForm({ ...newUserForm, role: e.target.value as SystemUser['role'] })}
                            className="w-full bg-white border rounded-xl px-3 py-1.5 text-xs font-extrabold"
                          >
                            <option value="Customer / Client">Customer / Client</option>
                            <option value="Sales Manager">Sales Manager</option>
                            <option value="Inventory Staff">Inventory Staff</option>
                            <option value="Admin">Admin</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setIsAddingUser(false)}
                          className="px-4 py-2 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-extrabold shadow-md"
                        >
                          Save User Record
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Users Table / Grid */}
                  <div className="space-y-2 max-h-[450px] overflow-y-auto pr-1">
                    {filteredUsers.map((user) => (
                      <div 
                        key={user.id}
                        className="p-3.5 bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-sm ${
                            user.role === 'Admin' ? 'bg-orange-100 text-orange-700' :
                            user.role === 'Sales Manager' ? 'bg-blue-100 text-blue-700' :
                            'bg-emerald-100 text-emerald-800'
                          }`}>
                            {user.name.charAt(0).toUpperCase()}
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <h5 className="font-extrabold text-slate-900 text-xs sm:text-sm">{user.name}</h5>
                              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                                user.role === 'Admin' ? 'bg-orange-600 text-white' :
                                user.role === 'Sales Manager' ? 'bg-blue-700 text-white' :
                                'bg-slate-200 text-slate-700'
                              }`}>
                                {user.role}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-0.5">
                              <span className="text-orange-600 font-bold">{user.phone}</span>
                              <span>&bull;</span>
                              <span>{user.email}</span>
                              <span>&bull;</span>
                              <span>{user.state}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 justify-end">
                          <button
                            onClick={() => handleToggleUserStatus(user.id)}
                            className={`px-3 py-1 rounded-lg text-[11px] font-extrabold transition-all ${
                              user.status === 'Active'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : 'bg-slate-100 text-slate-500 border border-slate-300'
                            }`}
                          >
                            {user.status === 'Active' ? 'Active Status' : 'Inactive'}
                          </button>

                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
                            title="Remove User"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}

              {/* TAB 3: CONTACT & SHOWROOM SETTINGS */}
              {activeTab === 'contact' && (
                <form onSubmit={handleSaveCompanyInfo} className="space-y-4">
                  <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-orange-500" />
                    <span>Company Name & Primary Contact Info</span>
                  </h4>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700">Company Name</label>
                    <input
                      type="text"
                      value={companyInfo.companyName}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, companyName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700">Primary Phone / WhatsApp</label>
                      <input
                        type="text"
                        value={companyInfo.phonePrimary}
                        onChange={(e) => setCompanyInfo({ ...companyInfo, phonePrimary: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700">Secondary Sales Hotline</label>
                      <input
                        type="text"
                        value={companyInfo.phoneSecondary}
                        onChange={(e) => setCompanyInfo({ ...companyInfo, phoneSecondary: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700">Company Email Address</label>
                      <input
                        type="email"
                        value={companyInfo.email}
                        onChange={(e) => setCompanyInfo({ ...companyInfo, email: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700">Working Hours</label>
                      <input
                        type="text"
                        value={companyInfo.workingHours}
                        onChange={(e) => setCompanyInfo({ ...companyInfo, workingHours: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700">Store Address</label>
                      <input
                        type="text"
                        value={companyInfo.address}
                        onChange={(e) => setCompanyInfo({ ...companyInfo, address: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700">City</label>
                      <input
                        type="text"
                        value={companyInfo.city}
                        onChange={(e) => setCompanyInfo({ ...companyInfo, city: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700">State & Country</label>
                      <input
                        type="text"
                        value={companyInfo.state}
                        onChange={(e) => setCompanyInfo({ ...companyInfo, state: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={handleResetCompanyInfo}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Reset to Default</span>
                    </button>

                    <div className="flex items-center gap-3">
                      {isSaved && (
                        <span className="text-xs text-emerald-600 font-extrabold flex items-center gap-1 animate-fadeIn">
                          <Check className="w-4 h-4" />
                          Changes Saved!
                        </span>
                      )}
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-md transition-all"
                      >
                        <Save className="w-4 h-4 text-orange-400" />
                        <span>Save Store Settings</span>
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* TAB 4: ANNOUNCEMENT BANNER */}
              {activeTab === 'announcement' && (
                <form onSubmit={handleSaveCompanyInfo} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                      <Bell className="w-4 h-4 text-orange-500" />
                      <span>Top Header Announcement Bar</span>
                    </h4>
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                      <input
                        type="checkbox"
                        checked={companyInfo.showAnnouncement}
                        onChange={(e) => setCompanyInfo({ ...companyInfo, showAnnouncement: e.target.checked })}
                        className="w-4 h-4 text-emerald-800 rounded focus:ring-emerald-700"
                      />
                      <span>Show Banner on Website</span>
                    </label>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700">Announcement Message</label>
                    <textarea
                      rows={3}
                      value={companyInfo.announcement}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, announcement: e.target.value })}
                      placeholder="Enter broadcast notice for website visitors..."
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-medium text-slate-900"
                    />
                  </div>

                  <div className="p-3 bg-emerald-950 text-white rounded-xl text-xs space-y-1">
                    <span className="text-orange-400 font-bold uppercase text-[10px] tracking-wider">Live Preview:</span>
                    <p className="text-emerald-100 font-medium italic">&quot;{companyInfo.announcement}&quot;</p>
                  </div>

                  <div className="pt-4 border-t border-slate-200 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-md transition-all"
                    >
                      <Save className="w-4 h-4 text-orange-400" />
                      <span>Save Announcement</span>
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 5: PRICE TAGS */}
              {activeTab === 'prices' && (
                <form onSubmit={handleSaveCompanyInfo} className="space-y-4">
                  <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-orange-500" />
                    <span>Update Machinery Price Tags / Price Estimates</span>
                  </h4>

                  <p className="text-xs text-slate-500">
                    Set customized price estimates for specific items. Leave empty to use default factory estimate.
                  </p>

                  <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                    {PRODUCTS.map((prod) => {
                      const currentVal = companyInfo.priceEstimatesOverride?.[prod.id] || '';
                      return (
                        <div key={prod.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <img src={prod.mainImage} alt={prod.name} className="w-10 h-10 object-cover rounded-lg border border-slate-300 shrink-0" />
                            <div className="min-w-0">
                              <h5 className="font-bold text-xs text-slate-900 truncate">{prod.name}</h5>
                              <span className="text-[10px] text-slate-500">{prod.category}</span>
                            </div>
                          </div>
                          <div className="w-full sm:w-48 shrink-0">
                            <input
                              type="text"
                              value={currentVal}
                              onChange={(e) => updatePriceOverride(prod.id, e.target.value)}
                              placeholder={prod.priceEstimate || 'e.g. ₦1,450,000'}
                              className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-bold text-emerald-900 focus:outline-none focus:border-emerald-600"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-4 border-t border-slate-200 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-md transition-all"
                    >
                      <Save className="w-4 h-4 text-orange-400" />
                      <span>Save Price Tags</span>
                    </button>
                  </div>
                </form>
              )}

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
