import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';
import {
  ShoppingBag,
  LayoutDashboard,
  Shirt,
  Package,
  Users,
  ClipboardList,
  BarChart3,
} from 'lucide-react';
import api from './services/api';

function CustomerLayout() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-stone-200">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link to="/" className="text-2xl font-bold tracking-[0.2em]">
            CLOTHIQUE
          </Link>

          <div className="flex items-center gap-6 text-sm">
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/account">Account</Link>
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <Outlet />
      </main>

      <footer className="border-t border-stone-200 px-6 py-8 text-center text-sm text-stone-500">
        © {new Date().getFullYear()} Clothique. All rights reserved.
      </footer>
    </div>
  );
}

function AdminLayout() {
  const menu = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Products', path: '/admin/products', icon: Shirt },
    { label: 'Categories', path: '/admin/categories', icon: Package },
    { label: 'Inventory', path: '/admin/inventory', icon: ClipboardList },
    { label: 'Orders', path: '/admin/orders', icon: ShoppingBag },
    { label: 'Customers', path: '/admin/customers', icon: Users },
    { label: 'Reports', path: '/admin/reports', icon: BarChart3 },
  ];

  return (
    <div className="flex min-h-screen bg-stone-100">
      <aside className="w-64 bg-neutral-950 p-6 text-white">
        <Link to="/admin" className="text-xl font-bold tracking-widest">
          CLOTHIQUE
        </Link>

        <p className="mb-8 mt-2 text-xs text-stone-400">ADMINISTRATION</p>

        <nav className="space-y-2">
          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-stone-300 hover:bg-neutral-800 hover:text-white"
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          to="/"
          className="mt-10 block text-sm text-stone-400 hover:text-white"
        >
          View Store
        </Link>
      </aside>

      <main className="flex-1 p-8">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm text-stone-500">Clothique Management</p>
            <h1 className="text-2xl font-bold">Admin Panel</h1>
          </div>

          <span className="rounded-full bg-white px-4 py-2 text-sm">
            Administrator
          </span>
        </header>

        <Outlet />
      </main>
    </div>
  );
}

function Home() {
  const [apiStatus, setApiStatus] = useState('Checking...');

  useEffect(() => {
    api
      .get('/health')
      .then((response) => {
        setApiStatus(response.data.database);
      })
      .catch(() => {
        setApiStatus('Disconnected');
      });
  }, []);

  return (
    <section>
      <div className="rounded-2xl bg-stone-100 px-8 py-20 text-center">
        <p className="mb-4 text-xs tracking-[0.4em] text-stone-500">
          THE NEW CLOTHING EXPERIENCE
        </p>

        <h1 className="text-4xl font-bold md:text-6xl">
          STYLE THAT DEFINES YOU.
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-stone-600">
          Discover your style with Clothique. Explore clothing collections
          designed for your everyday lifestyle.
        </p>

        <Link
          to="/shop"
          className="mt-8 inline-block bg-neutral-950 px-8 py-4 text-sm text-white hover:bg-neutral-700"
        >
          EXPLORE COLLECTION
        </Link>
      </div>

      <div className="mt-8 rounded-xl border border-stone-200 p-5">
        <h2 className="font-semibold">System Connection</h2>
        <p className="mt-2 text-sm text-stone-600">
          Backend and database status: {apiStatus}
        </p>
      </div>
    </section>
  );
}

function Placeholder({ title }) {
  return (
    <div className="rounded-xl bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mt-3 text-stone-500">
        This module will be implemented in the next development phase.
      </p>
    </div>
  );
}

function AdminDashboard() {
  const statistics = [
    'Total Sales',
    'Total Orders',
    'Total Customers',
    'Low Stock Products',
  ];

  return (
    <div>
      <h2 className="mb-6 text-xl font-semibold">Overview</h2>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {statistics.map((item) => (
          <div key={item} className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-stone-500">{item}</p>
            <p className="mt-3 text-3xl font-bold">—</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
        <h3 className="font-semibold">Sales Analytics</h3>
        <p className="mt-3 text-sm text-stone-500">
          Sales chart will be connected to real database records during the
          analytics phase.
        </p>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<CustomerLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Placeholder title="Shop" />} />
          <Route path="/cart" element={<Placeholder title="Shopping Cart" />} />
          <Route path="/checkout" element={<Placeholder title="Checkout" />} />
          <Route path="/account" element={<Placeholder title="My Account" />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route
            path="products"
            element={<Placeholder title="Product Management" />}
          />
          <Route
            path="categories"
            element={<Placeholder title="Category Management" />}
          />
          <Route
            path="inventory"
            element={<Placeholder title="Inventory Management" />}
          />
          <Route
            path="orders"
            element={<Placeholder title="Order Management" />}
          />
          <Route
            path="customers"
            element={<Placeholder title="Customer Management" />}
          />
          <Route
            path="reports"
            element={<Placeholder title="Sales Reports" />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
