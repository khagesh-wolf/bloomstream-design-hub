// Supabase API Client - replaces SQLite backend
import { supabase } from './supabase';

// Categories API
export const categoriesApi = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order', { ascending: true });
    if (error) throw error;
    return data || [];
  },
  create: async (category: any) => {
    const { data, error } = await supabase
      .from('categories')
      .insert(category)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
  update: async (id: string, category: any) => {
    const { data, error } = await supabase
      .from('categories')
      .update(category)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
  delete: async (id: string) => {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },
};

// Menu Items API
export const menuApi = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },
  create: async (item: any) => {
    const { data, error } = await supabase
      .from('menu_items')
      .insert(item)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
  update: async (id: string, item: any) => {
    const { data, error } = await supabase
      .from('menu_items')
      .update(item)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
  delete: async (id: string) => {
    const { error } = await supabase
      .from('menu_items')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },
};

// Orders API
export const ordersApi = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },
  create: async (order: any) => {
    const { data, error } = await supabase
      .from('orders')
      .insert(order)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
  updateStatus: async (id: string, status: string) => {
    const updateData: any = { status };
    if (status === 'completed') {
      updateData.completed_at = new Date().toISOString();
    }
    const { data, error } = await supabase
      .from('orders')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
};

// Bills API
export const billsApi = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('bills')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },
  create: async (bill: any) => {
    const { data, error } = await supabase
      .from('bills')
      .insert(bill)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
  pay: async (id: string, paymentMethod: string) => {
    const { data, error } = await supabase
      .from('bills')
      .update({ 
        payment_method: paymentMethod, 
        paid_at: new Date().toISOString(),
        status: 'paid'
      })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
};

// Customers API
export const customersApi = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },
  getByPhone: async (phone: string) => {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('phone', phone)
      .maybeSingle();
    if (error) throw error;
    return data;
  },
  upsert: async (customer: any) => {
    const { data, error } = await supabase
      .from('customers')
      .upsert(customer, { onConflict: 'phone' })
      .select()
      .single();
    if (error) throw error;
    return data;
  },
};

// Staff API
export const staffApi = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('staff')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },
  create: async (staff: any) => {
    const { data, error } = await supabase
      .from('staff')
      .insert(staff)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
  update: async (id: string, staff: any) => {
    const { data, error } = await supabase
      .from('staff')
      .update(staff)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
  delete: async (id: string) => {
    const { error } = await supabase
      .from('staff')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },
};

// Settings API
export const settingsApi = {
  get: async () => {
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .maybeSingle();
    if (error) throw error;
    return data || {};
  },
  update: async (settings: any) => {
    // Check if settings row exists
    const { data: existing } = await supabase
      .from('settings')
      .select('id')
      .maybeSingle();
    
    if (existing) {
      const { data, error } = await supabase
        .from('settings')
        .update(settings)
        .eq('id', existing.id)
        .select()
        .single();
      if (error) throw error;
      return data;
    } else {
      const { data, error } = await supabase
        .from('settings')
        .insert(settings)
        .select()
        .single();
      if (error) throw error;
      return data;
    }
  },
};

// Expenses API
export const expensesApi = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },
  create: async (expense: any) => {
    const { data, error } = await supabase
      .from('expenses')
      .insert(expense)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
  delete: async (id: string) => {
    const { error } = await supabase
      .from('expenses')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },
};

// Waiter Calls API
export const waiterCallsApi = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('waiter_calls')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },
  create: async (call: any) => {
    const { data, error } = await supabase
      .from('waiter_calls')
      .insert(call)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
  acknowledge: async (id: string) => {
    const { data, error } = await supabase
      .from('waiter_calls')
      .update({ acknowledged_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
  dismiss: async (id: string) => {
    const { error } = await supabase
      .from('waiter_calls')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },
};

// Transactions API
export const transactionsApi = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },
  create: async (transaction: any) => {
    const { data, error } = await supabase
      .from('transactions')
      .insert(transaction)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
};

// Health check - always returns true for Supabase
export const checkBackendHealth = async (): Promise<boolean> => {
  try {
    // Simple query to check connection
    const { error } = await supabase.from('categories').select('id').limit(1);
    return !error;
  } catch {
    return false;
  }
};

// For compatibility - no manual URL setting needed with Supabase
export const getApiBaseUrl = () => import.meta.env.VITE_SUPABASE_URL || '';
export const setApiBaseUrl = () => {};
export const isAccessingViaMdns = () => false;
export const getMdnsFallbackIp = () => null;
export const setMdnsFallbackIp = () => {};
export const clearMdnsFallbackIp = () => {};
