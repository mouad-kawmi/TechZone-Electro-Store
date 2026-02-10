
import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
    Plus, DollarSign, ShoppingCart, Package, Activity, Search, Filter, RefreshCcw,
    Terminal, Zap, ShieldCheck, Cpu, ChevronRight, LayoutDashboard, Menu, Mail
} from 'lucide-react';
import AdminSidebar from './Admin/AdminSidebar.jsx';
import AdminStats from './Admin/AdminStats.jsx';
import AdminProductsTable from './Admin/AdminProductsTable.jsx';
import AdminOrdersTable from './Admin/AdminOrdersTable.jsx';
import AdminCustomersTable from './Admin/AdminCustomersTable.jsx';
import AdminMarketing from './Admin/AdminMarketing.jsx';
import AdminReviews from './Admin/AdminReviews.jsx';
import AdminProductEditor from './Admin/AdminProductEditor.jsx';
import gsap from 'gsap';

const AdminPanel = ({
    onBack, initialProducts, onProductsChange, messages,
    onMessagesChange, orders, onOrdersChange, storeSettings, onSettingsChange, onDeleteReview
}) => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const contentRef = useRef(null);

    // Tab Transition
    useEffect(() => {
        gsap.fromTo(contentRef.current,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
        );
    }, [activeTab]);

    const stats = useMemo(() => {
        const totalRevenue = orders
            .filter(o => o.status === 'Livré')
            .reduce((acc, o) => acc + (o.finalTotal || o.amount || 0), 0);
        const totalOrders = orders.length;
        const totalStock = initialProducts.reduce((acc, p) => acc + (p.stock || 0), 0);
        const lowStockCount = initialProducts.filter(p => p.stock > 0 && p.stock <= 5).length;

        // Categorized Stock Breakdown
        const smartphoneStock = initialProducts
            .filter(p => p.category === 'Smartphones')
            .reduce((acc, p) => acc + (p.stock || 0), 0);

        const otherStock = totalStock - smartphoneStock;

        return {
            cards: [
                { label: "Revenu Total", value: `${totalRevenue.toLocaleString()} DH`, icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-500/10" },
                { label: "Commandes", value: totalOrders.toString(), icon: ShoppingCart, color: "text-blue-500", bg: "bg-blue-500/10" },
                { label: "Stock Total", value: totalStock.toString(), icon: Package, color: "text-orange-500", bg: "bg-orange-500/10" },
                { label: "Alertes Stock", value: lowStockCount.toString(), icon: Activity, color: "text-rose-500", bg: "bg-rose-500/10" }
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
                            <button className="size-12 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-colors shadow-sm">
                                <RefreshCcw className="size-4" />
                            </button>
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

                        {activeTab === 'orders' && <AdminOrdersTable orders={orders} onStatusChange={onOrdersChange} />}
                        {activeTab === 'customers' && <AdminCustomersTable />}
                        {activeTab === 'marketing' && <AdminMarketing />}
                        {activeTab === 'reviews' && <AdminReviews products={initialProducts} onDeleteReview={onDeleteReview} />}
                        {activeTab === 'messages' && (
                            <div className="space-y-6">
                                {messages && messages.length > 0 ? (
                                    <div className="grid gap-4">
                                        {messages.map((msg) => (
                                            <div key={msg.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <h3 className="font-bold text-slate-900 dark:text-white text-lg">{msg.subject}</h3>
                                                        <div className="flex gap-3 text-xs text-slate-500 mt-1">
                                                            <span className="font-semibold text-blue-600">{msg.name}</span>
                                                            <span>•</span>
                                                            <span>{msg.email}</span>
                                                            <span>•</span>
                                                            <span>{new Date(msg.date).toLocaleDateString()}</span>
                                                        </div>
                                                    </div>
                                                    {!msg.read && (
                                                        <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                                                            Nouveau
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                                                    {msg.message}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-white dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-white/5 py-32 text-center space-y-6 shadow-sm">
                                        <div className="size-20 bg-blue-50 dark:bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto text-blue-600">
                                            <Mail className="size-10" />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-xl font-bold text-slate-950 dark:text-white uppercase font-display">Aucun Message</h3>
                                            <p className="text-xs text-slate-400 uppercase tracking-widest max-w-sm mx-auto">
                                                Votre boîte de réception est vide pour le moment.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <AdminProductEditor
                isOpen={isEditorOpen}
                product={editingProduct}
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

