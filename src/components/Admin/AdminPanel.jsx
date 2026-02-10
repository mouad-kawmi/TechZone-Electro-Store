
import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
    Plus, DollarSign, ShoppingCart, Package, Activity, Search, Filter, RefreshCcw,
    Terminal, Zap, ShieldCheck, Cpu, ChevronRight, LayoutDashboard, Menu, Mail,
    Trash2, CheckCircle, User, Calendar, ExternalLink, Bell, X
} from 'lucide-react';
import AdminSidebar from './AdminSidebar.jsx';
import AdminStats from './AdminStats.jsx';
import AdminProductsTable from './AdminProductsTable.jsx';
import AdminOrdersTable from './AdminOrdersTable.jsx';
import AdminCustomersTable from './AdminCustomersTable.jsx';
import AdminMarketing from './AdminMarketing.jsx';
import AdminReviews from './AdminReviews.jsx';
import AdminProductEditor from './AdminProductEditor.jsx';
import AdminSettings from './AdminSettings.jsx';
import AdminCatalog from './AdminCatalog.jsx';
import gsap from 'gsap';
import { useDispatch, useSelector } from 'react-redux';
import { updateSettings, markAsRead, deleteMessage, markNotificationRead, clearNotifications } from '../../store';

const AdminPanel = ({
    onBack, initialProducts, onProductsChange, messages,
    onMessagesChange, orders, onOrdersChange, storeSettings, onSettingsChange, onDeleteReview
}) => {
    const dispatch = useDispatch();
    const settings = useSelector(state => state.settings);
    const { notifications } = useSelector(state => state.notifications);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

    const contentRef = useRef(null);
    const unreadCount = notifications?.filter(n => !n.read).length || 0;

    // Tab Transition
    useEffect(() => {
        gsap.fromTo(contentRef.current,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
        );
    }, [activeTab]);

    // ... (rest of stats calculation)
    const stats = useMemo(() => {
        if (!orders || !initialProducts) return { cards: [], breakdown: { smartphoneStock: 0, otherStock: 0 } };

        const totalRevenue = orders
            .filter(o => o.status === 'Livré')
            .reduce((acc, o) => acc + (Number(o.finalTotal) || Number(o.amount) || 0), 0);
        const totalOrders = orders.length;
        const totalStock = initialProducts.reduce((acc, p) => acc + (Number(p.stock) || 0), 0);
        const lowStockCount = initialProducts.filter(p => (p.stock || 0) > 0 && (p.stock || 0) <= 5).length;

        // Categorized Stock Breakdown
        const smartphoneStock = initialProducts
            .filter(p => p.category === 'Smartphones')
            .reduce((acc, p) => acc + (Number(p.stock) || 0), 0);

        const otherStock = totalStock - smartphoneStock;

        return {
            cards: [
                { label: "Revenu Total", value: `${totalRevenue.toLocaleString()} DH`, icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-500/10" },
                { label: "Commandes", value: (totalOrders || 0).toString(), icon: ShoppingCart, color: "text-blue-500", bg: "bg-blue-500/10" },
                { label: "Stock Total", value: (totalStock || 0).toString(), icon: Package, color: "text-orange-500", bg: "bg-orange-500/10" },
                { label: "Alertes Stock", value: (lowStockCount || 0).toString(), icon: Activity, color: "text-rose-500", bg: "bg-rose-500/10" }
            ],
            breakdown: { smartphoneStock, otherStock }
        };
    }, [orders, initialProducts]);

    const handleUpdateStock = (productId, newStock) => {
        onProductsChange(initialProducts.map(p =>
            p.id === productId ? { ...p, stock: Math.max(0, newStock), isOutOfStock: newStock <= 0 } : p
        ));
    };

    const openEditor = (product = null) => {
        setEditingProduct(product || {
            title: '', category: 'Smartphones', brand: '', price: 0, oldPrice: 0,
            stock: 10, image: '', isNew: true, specs: {}, technicalSpecs: {},
            description: '', promoExpiresAt: ''
        });
        setIsEditorOpen(true);
    };

    const handleSaveProduct = () => {
        if (!editingProduct?.title) return;
        const finalProduct = { ...editingProduct, isOutOfStock: (editingProduct.stock || 0) <= 0 };
        if (editingProduct.id) {
            onProductsChange(initialProducts.map(p => p.id === editingProduct.id ? finalProduct : p));
        } else {
            const newProd = { ...finalProduct, id: Date.now(), rating: 5, reviews: 0 };
            onProductsChange([...initialProducts, newProd]);
        }
        setIsEditorOpen(false);
    };

    const updateField = (field, value) => setEditingProduct({ ...editingProduct, [field]: value });
    const addSpec = () => setEditingProduct({ ...editingProduct, specs: { ...editingProduct.specs, "Nouvelle Propriété": "Valeur" } });
    const removeSpec = (key) => {
        const newSpecs = { ...editingProduct.specs };
        delete newSpecs[key];
        setEditingProduct({ ...editingProduct, specs: newSpecs });
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex font-sans selection:bg-blue-600/10">
            <AdminSidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onBack={onBack}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <main className="flex-1 p-4 lg:p-10 h-screen overflow-y-auto custom-scrollbar relative">
                <div className="max-w-7xl mx-auto space-y-10 relative z-10">
                    {/* Header */}
                    <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setIsSidebarOpen(true)}
                                    className="lg:hidden size-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-xl flex items-center justify-center shadow-sm"
                                >
                                    <Menu className="size-5" />
                                </button>

                                <div>
                                    <div className="flex items-center gap-2 mb-1.5 font-bold uppercase tracking-widest text-[8px] text-slate-400">
                                        <span className="size-1.5 bg-blue-500 rounded-full"></span>
                                        Système Connecté
                                    </div>
                                    <h1 className="text-2xl lg:text-3xl font-bold text-slate-950 dark:text-white uppercase tracking-tight font-display">
                                        {activeTab}
                                    </h1>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            {/* Notifications Bell */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                                    className="relative size-12 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-sm"
                                >
                                    <Bell className="size-5" />
                                    {unreadCount > 0 && (
                                        <span className="absolute -top-1 -right-1 size-5 bg-rose-500 text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-white dark:border-slate-950">
                                            {unreadCount > 9 ? '9+' : unreadCount}
                                        </span>
                                    )}
                                </button>

                                {/* Notifications Dropdown */}
                                {isNotificationsOpen && (
                                    <>
                                        <div className="fixed inset-0 z-40" onClick={() => setIsNotificationsOpen(false)}></div>
                                        <div className="absolute right-0 top-14 w-80 md:w-96 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-2xl z-50 overflow-hidden animate-in slide-in-from-top-2">
                                            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/50">
                                                <h3 className="font-bold text-slate-900 dark:text-white uppercase tracking-tight text-xs">Notifications</h3>
                                                {notifications?.length > 0 && (
                                                    <button onClick={() => dispatch(clearNotifications())} className="text-[10px] font-bold text-slate-400 hover:text-rose-500 uppercase tracking-widest transition-colors">
                                                        Tout effacer
                                                    </button>
                                                )}
                                            </div>
                                            <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                                                {!notifications || notifications.length === 0 ? (
                                                    <div className="p-8 text-center space-y-3">
                                                        <div className="size-12 rounded-full bg-slate-50 dark:bg-slate-800 mx-auto flex items-center justify-center text-slate-300">
                                                            <Bell className="size-5" />
                                                        </div>
                                                        <p className="text-xs text-slate-400 font-medium">Aucune notification pour le moment</p>
                                                    </div>
                                                ) : (
                                                    notifications.map(n => (
                                                        <div
                                                            key={n.id}
                                                            onClick={() => {
                                                                if (!n.read) dispatch(markNotificationRead(n.id));
                                                                if (n.link) {
                                                                    // Navigate to link logic here if needed, or just switch tab
                                                                    if (n.link === '/admin/orders') setActiveTab('orders');
                                                                    if (n.link === '/admin/reviews') setActiveTab('reviews');
                                                                    if (n.link === '/admin/messages') setActiveTab('messages');
                                                                    setIsNotificationsOpen(false);
                                                                }
                                                            }}
                                                            className={`p-4 border-b border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer flex gap-4 ${!n.read ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''}`}
                                                        >
                                                            <div className={`mt-1 size-2 rounded-full shrink-0 ${!n.read ? 'bg-blue-500' : 'bg-slate-200 dark:bg-slate-700'}`}></div>
                                                            <div className="space-y-1">
                                                                <h4 className={`text-sm ${!n.read ? 'font-bold text-slate-900 dark:text-white' : 'font-medium text-slate-600 dark:text-slate-400'}`}>
                                                                    {n.title}
                                                                </h4>
                                                                <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">{n.message}</p>
                                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-2">
                                                                    {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            <button
                                onClick={() => openEditor()}
                                className="bg-slate-950 dark:bg-blue-600 text-white px-6 h-12 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-3 shadow-xl hover:bg-blue-600 dark:hover:bg-blue-500 transition-all active:scale-95"
                            >
                                <Plus className="size-4" />
                                Nouveau Produit
                            </button>
                        </div>
                    </header>

                    <div ref={contentRef} className="px-2">
                        {activeTab === 'dashboard' && <AdminStats stats={stats.cards} breakdown={stats.breakdown} />}
                        {activeTab === 'products' && (
                            <AdminProductsTable
                                products={initialProducts}
                                onEdit={openEditor}
                                onDelete={(id) => onProductsChange(initialProducts.filter(p => p.id !== id))}
                            />
                        )}
                        {activeTab === 'catalog' && (
                            <AdminCatalog />
                        )}

                        {activeTab === 'orders' && <AdminOrdersTable orders={orders} onStatusChange={onOrdersChange} />}
                        {activeTab === 'customers' && <AdminCustomersTable orders={orders} />}
                        {activeTab === 'marketing' && <AdminMarketing />}
                        {activeTab === 'reviews' && <AdminReviews products={initialProducts} onDeleteReview={onDeleteReview} />}
                        {activeTab === 'messages' && (
                            <div className="space-y-6">
                                {messages && messages.length > 0 ? (
                                    <div className="grid gap-4">
                                        {messages.map((msg) => (
                                            <div
                                                key={msg.id}
                                                className={`group relative bg-white dark:bg-slate-900 p-5 md:p-6 rounded-3xl border transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 ${msg.read
                                                    ? 'border-slate-200 dark:border-white/5 opacity-80'
                                                    : 'border-blue-500/30 dark:border-blue-500/20 shadow-sm shadow-blue-500/5'
                                                    }`}
                                            >
                                                {/* Status Badge */}
                                                {!msg.read && (
                                                    <div className="absolute -top-2 -right-2 flex">
                                                        <span className="relative flex h-3 w-3">
                                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                                                        </span>
                                                    </div>
                                                )}

                                                <div className="flex flex-col gap-5">
                                                    {/* Header: Subject & Actions */}
                                                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                                                        <div className="space-y-1.5 flex-1 min-w-0">
                                                            <div className="flex items-center gap-2">
                                                                <h3 className="font-bold text-slate-950 dark:text-white text-lg md:text-xl leading-tight truncate">
                                                                    {msg.subject}
                                                                </h3>
                                                                {!msg.read && (
                                                                    <span className="bg-blue-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest hidden sm:inline-block">
                                                                        Nouveau
                                                                    </span>
                                                                )}
                                                            </div>

                                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] md:text-xs">
                                                                <div className="flex items-center gap-2 text-blue-600 font-bold">
                                                                    <User className="size-3.5" />
                                                                    <span className="truncate max-w-[120px] md:max-w-none">{msg.name}</span>
                                                                </div>
                                                                <div className="flex items-center gap-2 text-slate-500">
                                                                    <Mail className="size-3.5" />
                                                                    <span className="truncate max-w-[150px] md:max-w-none">{msg.email}</span>
                                                                </div>
                                                                <div className="flex items-center gap-2 text-slate-400 ml-auto sm:ml-0 font-medium">
                                                                    <Calendar className="size-3.5" />
                                                                    <span>{new Date(msg.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Actions */}
                                                        <div className="flex items-center gap-2 w-full sm:w-auto justify-end sm:justify-start border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-100 dark:border-white/5">
                                                            {!msg.read && (
                                                                <button
                                                                    onClick={() => dispatch(markAsRead(msg.id))}
                                                                    className="flex-1 sm:flex-none h-10 px-4 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 transition-all flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest"
                                                                    title="Marquer comme lu"
                                                                >
                                                                    <CheckCircle className="size-4" />
                                                                    <span className="sm:hidden lg:inline">Lu</span>
                                                                </button>
                                                            )}
                                                            <a
                                                                href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                                                                className="flex-1 sm:flex-none h-10 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-950 hover:text-white dark:hover:bg-white dark:hover:text-slate-950 transition-all flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest"
                                                            >
                                                                <ExternalLink className="size-4" />
                                                                <span className="sm:hidden lg:inline">Répondre</span>
                                                            </a>
                                                            <button
                                                                onClick={() => dispatch(deleteMessage(msg.id))}
                                                                className="size-10 rounded-xl bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-600 hover:text-white transition-all flex items-center justify-center"
                                                                title="Supprimer"
                                                            >
                                                                <Trash2 className="size-4" />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* Message Content */}
                                                    <div className="relative">
                                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500/20 to-transparent rounded-full hidden md:block"></div>
                                                        <p className="md:pl-6 text-slate-700 dark:text-slate-300 text-sm md:text-base leading-relaxed whitespace-pre-wrap font-medium">
                                                            {msg.message}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-white dark:bg-slate-900/50 rounded-[3rem] border border-slate-200 dark:border-white/5 py-32 text-center space-y-8 shadow-sm">
                                        <div className="relative mx-auto size-24">
                                            <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20"></div>
                                            <div className="relative size-24 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-white/5 flex items-center justify-center text-blue-600 shadow-xl">
                                                <Mail className="size-10 animate-bounce" />
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <h3 className="text-2xl font-bold text-slate-950 dark:text-white font-display uppercase tracking-tight">Votre boîte est vide</h3>
                                            <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] max-w-xs mx-auto font-bold leading-relaxed">
                                                Aucun message client pour le moment. Restez à l'écoute !
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'settings' && (
                            <AdminSettings
                                settings={settings}
                                onSave={(newSettings) => dispatch(updateSettings(newSettings))}
                            />
                        )}
                    </div>
                </div>
            </main>

            <AdminProductEditor
                isOpen={isEditorOpen}
                product={editingProduct}
                allProducts={initialProducts}
                onClose={() => setIsEditorOpen(false)}
                onSave={handleSaveProduct}
                onUpdateField={updateField}
                onAddSpec={addSpec}
                onRemoveSpec={removeSpec}
            />
        </div>
    );
};

export default AdminPanel;

