import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import gsap from 'gsap';

// Core Components
import AdminSidebar from './AdminSidebar.jsx';
import AdminStats from './AdminStats.jsx';
import AdminProductsTable from './AdminProductsTable.jsx';
import AdminCatalog from './AdminCatalog.jsx';
import AdminOrdersTable from './AdminOrdersTable.jsx';
import AdminCustomersTable from './AdminCustomersTable.jsx';
import AdminMarketing from './AdminMarketing.jsx';
import AdminReviews from './AdminReviews.jsx';
import AdminProductEditor from './AdminProductEditor.jsx';
import AdminSettings from './AdminSettings.jsx';

// Shared Components
import AdminHeader from './Parts/AdminHeader';
import AdminMessages from './Parts/AdminMessages';

// Actions
import { updateSettings } from '../../store';
import { DollarSign, ShoppingCart, Package, Activity } from 'lucide-react';

const AdminPanel = ({
    onBack, initialProducts, onProductsChange, messages,
    orders, onOrdersChange, onDeleteReview
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

    useEffect(() => {
        gsap.fromTo(contentRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 });
    }, [activeTab]);

    const stats = useMemo(() => {
        if (!orders || !initialProducts) return { cards: [], breakdown: {} };
        const delivered = orders.filter(o => o.status === 'Livré');
        const totalRevenue = delivered.reduce((acc, o) => acc + (Number(o.finalTotal) || Number(o.amount) || 0), 0);
        const totalStock = initialProducts.reduce((acc, p) => acc + (Number(p.stock) || 0), 0);
        const lowStockCount = initialProducts.filter(p => (p.stock || 0) > 0 && (p.stock || 0) <= 5).length;
        const smartphoneStock = initialProducts.filter(p => p.category === 'Smartphones').reduce((acc, p) => acc + (Number(p.stock) || 0), 0);

        return {
            cards: [
                { label: "Revenu Total", value: `${totalRevenue.toLocaleString()} DH`, icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-500/10" },
                { label: "Commandes", value: (orders.length || 0).toString(), icon: ShoppingCart, color: "text-blue-500", bg: "bg-blue-500/10" },
                { label: "Stock Total", value: (totalStock || 0).toString(), icon: Package, color: "text-orange-500", bg: "bg-orange-500/10" },
                { label: "Alertes Stock", value: (lowStockCount || 0).toString(), icon: Activity, color: "text-rose-500", bg: "bg-rose-500/10" }
            ],
            breakdown: {
                smartphoneStock,
                otherStock: totalStock - smartphoneStock,
                lowStockProducts: [...initialProducts].sort((a, b) => (a.stock || 0) - (b.stock || 0)).slice(0, 5)
            }
        };
    }, [orders, initialProducts]);

    const openEditor = (p = null) => {
        setEditingProduct(p || {
            title: '', category: 'Smartphones', brand: '', price: 0, oldPrice: 0,
            stock: 10, image: '', isNew: true, specs: {}, technicalSpecs: {},
            description: '', promoExpiresAt: '', variations: { storage: [], colors: [] }
        });
        setIsEditorOpen(true);
    };

    const handleSaveProduct = () => {
        if (!editingProduct?.title) return;
        const finalP = { ...editingProduct, isOutOfStock: (editingProduct.stock || 0) <= 0 };
        if (editingProduct.id) {
            onProductsChange(initialProducts.map(p => p.id === editingProduct.id ? finalP : p));
        } else {
            onProductsChange([...initialProducts, { ...finalP, id: Date.now(), rating: 5, reviews: 0 }]);
        }
        setIsEditorOpen(false);
    };

    const updateField = (f, v) => setEditingProduct({ ...editingProduct, [f]: v });
    const addSpec = () => setEditingProduct({ ...editingProduct, specs: { ...editingProduct.specs, "Nouveau": "Valeur" } });
    const removeSpec = (k) => {
        const n = { ...editingProduct.specs }; delete n[k];
        setEditingProduct({ ...editingProduct, specs: n });
    };

    const modVariation = (type, action, index, val) => {
        let n = [...(editingProduct.variations?.[type] || [])];
        if (action === 'add') n.push(type === 'storage' ? { name: 'Nouveau', stock: 10 } : 'Nouveau');
        else if (action === 'update') n[index] = val;
        else if (action === 'remove') n.splice(index, 1);
        setEditingProduct({ ...editingProduct, variations: { ...editingProduct.variations, [type]: n } });
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex font-sans selection:bg-blue-600/10">
            <AdminSidebar
                activeTab={activeTab} setActiveTab={setActiveTab} onBack={onBack}
                isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}
            />

            <main className="flex-1 p-4 lg:p-10 h-screen overflow-y-auto custom-scrollbar relative">
                <div className="max-w-7xl mx-auto space-y-10 relative z-10">
                    <AdminHeader
                        activeTab={activeTab}
                        setIsSidebarOpen={setIsSidebarOpen}
                        notifications={notifications}
                        isNotificationsOpen={isNotificationsOpen}
                        setIsNotificationsOpen={setIsNotificationsOpen}
                        setActiveTab={setActiveTab}
                        unreadCount={unreadCount}
                        openEditor={openEditor}
                    />

                    <div ref={contentRef} className="px-2">
                        {activeTab === 'dashboard' && <AdminStats stats={stats.cards} breakdown={stats.breakdown} />}
                        {activeTab === 'products' && (
                            <AdminProductsTable products={initialProducts} onEdit={openEditor} onDelete={(id) => onProductsChange(initialProducts.filter(p => p.id !== id))} />
                        )}
                        {activeTab === 'catalog' && <AdminCatalog />}
                        {activeTab === 'orders' && <AdminOrdersTable orders={orders} onStatusChange={onOrdersChange} />}
                        {activeTab === 'customers' && <AdminCustomersTable orders={orders} />}
                        {activeTab === 'marketing' && <AdminMarketing />}
                        {activeTab === 'reviews' && <AdminReviews products={initialProducts} onDeleteReview={onDeleteReview} />}
                        {activeTab === 'messages' && <AdminMessages messages={messages} />}
                        {activeTab === 'settings' && <AdminSettings settings={settings} onSave={(s) => dispatch(updateSettings(s))} />}
                    </div>
                </div>
            </main>

            <AdminProductEditor
                isOpen={isEditorOpen} product={editingProduct} allProducts={initialProducts}
                onClose={() => setIsEditorOpen(false)} onSave={handleSaveProduct}
                onUpdateField={updateField} onAddSpec={addSpec} onRemoveSpec={removeSpec}
                onAddVariation={(t) => modVariation(t, 'add')}
                onUpdateVariation={(t, i, v) => modVariation(t, 'update', i, v)}
                onRemoveVariation={(t, i) => modVariation(t, 'remove', i)}
            />
        </div>
    );
};

export default AdminPanel;

