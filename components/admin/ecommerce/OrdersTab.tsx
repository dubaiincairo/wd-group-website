'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/components/admin/ToastProvider';
import { EcommerceOrderRecord, EcommerceOrderStatus } from '@/lib/admin/types';
import { 
  Search, 
  Filter, 
  Eye, 
  MapPin, 
  CheckSquare, 
  Square, 
  FileSpreadsheet, 
  Printer, 
  RefreshCw, 
  Check, 
  ChevronLeft, 
  ChevronRight,
  Truck,
  Building2,
  Calendar
} from 'lucide-react';

interface OrdersTabProps {
  orders: EcommerceOrderRecord[];
  onSelectOrder: (order: EcommerceOrderRecord) => void;
  onUpdateStatus: (orderId: string, newStatus: EcommerceOrderStatus) => void;
  onBulkUpdateStatus: (orderIds: string[], newStatus: EcommerceOrderStatus) => void;
}

export default function OrdersTab({
  orders,
  onSelectOrder,
  onUpdateStatus,
  onBulkUpdateStatus,
}: OrdersTabProps) {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  const { showToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [paymentFilter, setPaymentFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // Bulk Selection State
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch = 
        order.orderRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.phone.includes(searchQuery) ||
        order.city.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      const matchesPayment = paymentFilter === 'all' || order.paymentMethod === paymentFilter;
      const matchesType = typeFilter === 'all' || order.orderType === typeFilter;

      return matchesSearch && matchesStatus && matchesPayment && matchesType;
    });
  }, [orders, searchQuery, statusFilter, paymentFilter, typeFilter]);

  // Paginated Slices
  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / itemsPerPage));
  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredOrders.slice(start, start + itemsPerPage);
  }, [filteredOrders, currentPage]);

  const handleSelectAll = () => {
    if (selectedIds.length === paginatedOrders.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedOrders.map((o) => o.id));
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleBulkStatusChange = (status: EcommerceOrderStatus) => {
    if (selectedIds.length === 0) return;
    onBulkUpdateStatus(selectedIds, status);
    setSelectedIds([]);
    showToast(
      isAr 
        ? `تم تحديث حالة ${selectedIds.length} طلب بنجاح` 
        : `Updated ${selectedIds.length} orders successfully`, 
      'success'
    );
  };

  const handleExportSelected = () => {
    const targetOrders = orders.filter((o) => selectedIds.includes(o.id));
    if (targetOrders.length === 0) return;
    const headers = ['Order Ref,Customer,Email,Phone,City,Order Type,Payment,Status,Total SAR,Date'];
    const rows = targetOrders.map((o) =>
      `"${o.orderRef}","${o.customerName}","${o.email}","${o.phone}","${o.city}","${o.orderType}","${o.paymentMethod}","${o.status}",${o.totalAmount},"${o.createdAt}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `selected-orders-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(isAr ? 'تم تصدير الطلبات المحددة' : 'Exported selected orders', 'success');
  };

  const getStatusBadge = (status: EcommerceOrderStatus) => {
    switch (status) {
      case 'confirmed':
        return {
          label: isAr ? 'مؤكد ومعتمد' : 'Confirmed',
          bg: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
        };
      case 'in_production':
        return {
          label: isAr ? 'قيد التصنيع بالمصنع' : 'In Production',
          bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30 animate-pulse',
        };
      case 'ready_for_dispatch':
        return {
          label: isAr ? 'جاهز للشحن الفندقي' : 'Ready for Dispatch',
          bg: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
        };
      case 'out_for_delivery':
        return {
          label: isAr ? 'خارج للتوصيل والتركيب' : 'Out for Delivery',
          bg: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
        };
      case 'delivered':
        return {
          label: isAr ? 'تم التسليم والتركيب' : 'Delivered & Assembled',
          bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
        };
      case 'cancelled':
        return {
          label: isAr ? 'ملغي' : 'Cancelled',
          bg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
        };
      default:
        return {
          label: isAr ? 'في انتظار الدفع' : 'Pending Payment',
          bg: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/30',
        };
    }
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Filters & Search Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder={isAr ? 'بحث برقم الطلب، العميل، الهاتف...' : 'Search order, name, phone, city...'}
            className="w-full pl-9 pr-4 rtl:pl-4 rtl:pr-9 py-2.5 rounded-xl bg-[#141721] border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-[#C9A86A]"
          />
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 rtl:left-auto rtl:right-3 top-3" />
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full px-3 py-2.5 rounded-xl bg-[#141721] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C9A86A]"
        >
          <option value="all">{isAr ? 'كافة الحالات (All Statuses)' : 'All Statuses'}</option>
          <option value="pending_payment">{isAr ? 'في انتظار الدفع' : 'Pending Payment'}</option>
          <option value="confirmed">{isAr ? 'مؤكد ومعتمد' : 'Confirmed'}</option>
          <option value="in_production">{isAr ? 'قيد التصنيع بالمصنع' : 'In Production'}</option>
          <option value="ready_for_dispatch">{isAr ? 'جاهز للشحن الفندقي' : 'Ready for Dispatch'}</option>
          <option value="delivered">{isAr ? 'تم التسليم والتركيب' : 'Delivered'}</option>
          <option value="cancelled">{isAr ? 'ملغي' : 'Cancelled'}</option>
        </select>

        {/* Payment Filter */}
        <select
          value={paymentFilter}
          onChange={(e) => {
            setPaymentFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full px-3 py-2.5 rounded-xl bg-[#141721] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C9A86A]"
        >
          <option value="all">{isAr ? 'كافة وسائل الدفع' : 'All Payment Methods'}</option>
          <option value="mada_cards">Mada / Credit Cards</option>
          <option value="apple_pay">Apple Pay</option>
          <option value="tabby">Tabby (4 Installments)</option>
          <option value="tamara">Tamara (3/4 Installments)</option>
          <option value="bank_transfer">Corporate Bank Transfer</option>
          <option value="b2b_po">B2B Purchase Order (PO)</option>
        </select>

        {/* Customer Type */}
        <select
          value={typeFilter}
          onChange={(e) => {
            setTypeFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full px-3 py-2.5 rounded-xl bg-[#141721] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C9A86A]"
        >
          <option value="all">{isAr ? 'كافة أنواع المشترين' : 'All Customer Types'}</option>
          <option value="retail">{isAr ? 'سكني وفردي (Residential)' : 'Residential'}</option>
          <option value="b2b">{isAr ? 'مشاريع وفنادق (B2B / Hospitality)' : 'B2B / Hospitality'}</option>
        </select>
      </div>

      {/* 2. Bulk Action Bar (when rows are selected) */}
      {selectedIds.length > 0 && (
        <div className="p-3.5 rounded-2xl bg-[#C9A86A]/10 border border-[#C9A86A]/30 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 font-mono text-[#C9A86A] font-bold">
            <CheckSquare className="w-4 h-4" />
            <span>
              {isAr ? `${selectedIds.length} طلبات محددة` : `${selectedIds.length} orders selected`}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-zinc-400 text-[11px]">{isAr ? 'تحديث الحالة جماعياً:' : 'Bulk Status:'}</span>
            <button
              onClick={() => handleBulkStatusChange('confirmed')}
              className="px-2.5 py-1 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 font-mono"
            >
              {isAr ? 'تأكيد' : 'Confirm'}
            </button>
            <button
              onClick={() => handleBulkStatusChange('in_production')}
              className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-mono"
            >
              {isAr ? 'إرسال للمصنع' : 'Send to CNC'}
            </button>
            <button
              onClick={() => handleBulkStatusChange('ready_for_dispatch')}
              className="px-2.5 py-1 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 font-mono"
            >
              {isAr ? 'جاهز للشحن' : 'Ready Dispatch'}
            </button>

            <button
              onClick={handleExportSelected}
              className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono flex items-center gap-1.5"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>CSV</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. Main Orders Table */}
      <div className="glass-card rounded-2xl border border-white/10 bg-[#0F1117]/90 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-zinc-400 font-mono uppercase text-[10px]">
                <th className="py-3.5 px-4 w-10">
                  <button onClick={handleSelectAll} className="text-zinc-400 hover:text-white">
                    {selectedIds.length === paginatedOrders.length && paginatedOrders.length > 0 ? (
                      <CheckSquare className="w-4 h-4 text-[#C9A86A]" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="py-3.5 px-4">{isAr ? 'رقم الطلب والتاريخ' : 'Order Ref & Date'}</th>
                <th className="py-3.5 px-4">{isAr ? 'العميل والمدينة' : 'Client & City'}</th>
                <th className="py-3.5 px-4">{isAr ? 'نوع الطلب' : 'Type'}</th>
                <th className="py-3.5 px-4">{isAr ? 'القطع المشتراة' : 'Items'}</th>
                <th className="py-3.5 px-4">{isAr ? 'موعد التسليم' : 'Delivery Target'}</th>
                <th className="py-3.5 px-4">{isAr ? 'طريقة الدفع' : 'Payment'}</th>
                <th className="py-3.5 px-4">{isAr ? 'الإجمالي (ر.س)' : 'Total (SAR)'}</th>
                <th className="py-3.5 px-4">{isAr ? 'حالة الطلب' : 'Status'}</th>
                <th className="py-3.5 px-4 text-center">{isAr ? 'معاينة' : 'Action'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {paginatedOrders.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-zinc-500">
                    {isAr ? 'لم يتم العثور على أي طلبات مطابقة.' : 'No matching orders found.'}
                  </td>
                </tr>
              ) : (
                paginatedOrders.map((order) => {
                  const badge = getStatusBadge(order.status);
                  const isSelected = selectedIds.includes(order.id);

                  return (
                    <tr
                      key={order.id}
                      onClick={() => onSelectOrder(order)}
                      className={`hover:bg-white/[0.04] transition-colors cursor-pointer group ${
                        isSelected ? 'bg-white/[0.02]' : ''
                      }`}
                    >
                      <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => handleToggleSelect(order.id)}
                          className="text-zinc-400 hover:text-white"
                        >
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-[#C9A86A]" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>
                      </td>

                      <td className="py-3.5 px-4 font-mono">
                        <span className="text-[#C9A86A] font-bold block group-hover:underline">
                          {order.orderRef}
                        </span>
                        <span className="text-[10px] text-zinc-500">
                          {new Date(order.createdAt).toLocaleDateString(isAr ? 'ar-SA' : 'en-GB')}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="text-white font-semibold block truncate max-w-[160px]">
                          {order.customerName}
                        </span>
                        <span className="text-[10px] text-zinc-400 flex items-center gap-1 font-mono">
                          <MapPin className="w-3 h-3 text-[#C9A86A]" />
                          <span>{order.city}</span>
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          order.orderType === 'b2b'
                            ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                            : 'bg-blue-500/10 text-blue-300 border border-blue-500/30'
                        }`}>
                          {order.orderType === 'b2b' ? 'B2B Project' : 'Residential'}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5">
                          {order.items.slice(0, 2).map((item, idx) => (
                            <div key={idx} className="relative w-8 h-8 rounded-lg overflow-hidden border border-white/10 shrink-0">
                              <Image
                                src={item.image}
                                alt={item.nameEn}
                                fill
                                className="object-cover"
                                unoptimized
                              />
                            </div>
                          ))}
                          {order.items.length > 2 && (
                            <span className="text-[10px] font-mono text-zinc-400">
                              +{order.items.length - 2}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-[11px] text-zinc-300">
                        <span className="block text-emerald-400 font-semibold">{order.deliveryDate}</span>
                        <span className="text-[10px] text-zinc-500 uppercase">{order.timeSlot}</span>
                      </td>

                      <td className="py-3.5 px-4 font-mono">
                        <span className="text-[11px] text-zinc-300 uppercase block font-semibold">
                          {order.paymentMethod.replace('_', ' ')}
                        </span>
                        <span className={`text-[9px] uppercase px-1.5 py-0.2 rounded ${
                          order.paymentStatus === 'paid' ? 'text-emerald-400' : 'text-amber-400'
                        }`}>
                          {order.paymentStatus}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-mono font-extrabold text-[#C9A86A]">
                        {order.totalAmount.toLocaleString('en-US')}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold border inline-block ${badge.bg}`}>
                          {badge.label}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectOrder(order);
                          }}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-[#C9A86A] text-zinc-400 hover:text-[#08090C] transition-colors cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* 4. Numbered Pagination Bar */}
        <div className="p-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
          <span className="text-zinc-400">
            {isAr 
              ? `عرض ${paginatedOrders.length} من إجمالي ${filteredOrders.length} طلباً` 
              : `Showing ${paginatedOrders.length} of ${filteredOrders.length} orders`}
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg bg-white/5 text-zinc-400 hover:text-white disabled:opacity-30 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPage(num)}
                className={`w-7 h-7 rounded-lg transition-all cursor-pointer ${
                  currentPage === num
                    ? 'bg-[#C9A86A] text-[#08090C] font-bold'
                    : 'bg-white/5 text-zinc-400 hover:text-white'
                }`}
              >
                {num}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg bg-white/5 text-zinc-400 hover:text-white disabled:opacity-30 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4 rtl:rotate-180" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
