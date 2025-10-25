import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CreditCard, DollarSign, Users, TrendingUp, Download, Filter, LogOut } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Login from "@/components/Login";

// --- Enhanced Mock Data ---
const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

// Enhanced revenue data showing $3M+ in last 6 months
const revenueTrendBase = [
  { month: "Jan", mrr: 285000, arr: 3420000, new: 45000, churn: 12000, customers: 1240, avgDeal: 230 },
  { month: "Feb", mrr: 312000, arr: 3744000, new: 52000, churn: 15000, customers: 1360, avgDeal: 245 },
  { month: "Mar", mrr: 345000, arr: 4140000, new: 61000, churn: 18000, customers: 1490, avgDeal: 260 },
  { month: "Apr", mrr: 378000, arr: 4536000, new: 69000, churn: 21000, customers: 1620, avgDeal: 275 },
  { month: "May", mrr: 415000, arr: 4980000, new: 82000, churn: 24000, customers: 1780, avgDeal: 290 },
  { month: "Jun", mrr: 452000, arr: 5424000, new: 95000, churn: 27000, customers: 1950, avgDeal: 305 },
  { month: "Jul", mrr: 489000, arr: 5868000, new: 108000, churn: 30000, customers: 2120, avgDeal: 320 },
  { month: "Aug", mrr: 528000, arr: 6336000, new: 125000, churn: 33000, customers: 2310, avgDeal: 335 },
  { month: "Sep", mrr: 568000, arr: 6816000, new: 142000, churn: 36000, customers: 2510, avgDeal: 350 },
  { month: "Oct", mrr: 612000, arr: 7344000, new: 158000, churn: 38000, customers: 2720, avgDeal: 365 },
  { month: "Nov", mrr: 658000, arr: 7896000, new: 175000, churn: 40000, customers: 2940, avgDeal: 380 },
  { month: "Dec", mrr: 708000, arr: 8496000, new: 192000, churn: 42000, customers: 3180, avgDeal: 395 },
];

const planRevenueBase = [
  { plan: "Starter", revenue: 1680000, subscribers: 1200, avgRevenue: 1400, growth: 15.2 },
  { plan: "Growth", revenue: 2640000, subscribers: 2200, avgRevenue: 1200, growth: 22.8 },
  { plan: "Pro", revenue: 2240000, subscribers: 1450, avgRevenue: 1545, growth: 18.5 },
  { plan: "Enterprise", revenue: 1280000, subscribers: 58, avgRevenue: 22069, growth: 8.3 },
  { plan: "Custom", revenue: 680000, subscribers: 12, avgRevenue: 56667, growth: 35.7 },
];

const paymentMethodsBase = [
  { method: "Visa", value: 42, transactions: 1240, avgAmount: 2850 },
  { method: "Mastercard", value: 28, transactions: 890, avgAmount: 3200 },
  { method: "Amex", value: 15, transactions: 450, avgAmount: 4500 },
  { method: "PayPal", value: 8, transactions: 320, avgAmount: 1800 },
  { method: "Wire Transfer", value: 4, transactions: 120, avgAmount: 12500 },
  { method: "Crypto", value: 3, transactions: 95, avgAmount: 8500 },
];

const customerSegmentsBase = [
  { segment: "Startups", revenue: 850000, customers: 450, avgRevenue: 1889, growth: 25.3 },
  { segment: "SMB", revenue: 1200000, customers: 680, avgRevenue: 1765, growth: 18.7 },
  { segment: "Mid-Market", revenue: 1800000, customers: 320, avgRevenue: 5625, growth: 12.4 },
  { segment: "Enterprise", revenue: 1950000, customers: 45, avgRevenue: 43333, growth: 8.9 },
];

const countryRevenueBase = [
  { country: "United States", revenue: 2800000, customers: 1250, avgRevenue: 2240, growth: 22.5, flag: "🇺🇸" },
  { country: "United Kingdom", revenue: 1200000, customers: 480, avgRevenue: 2500, growth: 18.3, flag: "🇬🇧" },
  { country: "Canada", revenue: 850000, customers: 320, avgRevenue: 2656, growth: 25.1, flag: "🇨🇦" },
  { country: "Germany", revenue: 720000, customers: 280, avgRevenue: 2571, growth: 15.7, flag: "🇩🇪" },
  { country: "Australia", revenue: 680000, customers: 260, avgRevenue: 2615, growth: 28.4, flag: "🇦🇺" },
  { country: "France", revenue: 520000, customers: 200, avgRevenue: 2600, growth: 12.8, flag: "🇫🇷" },
  { country: "Netherlands", revenue: 450000, customers: 180, avgRevenue: 2500, growth: 19.6, flag: "🇳🇱" },
  { country: "Japan", revenue: 380000, customers: 150, avgRevenue: 2533, growth: 16.2, flag: "🇯🇵" },
  { country: "Singapore", revenue: 320000, customers: 120, avgRevenue: 2667, growth: 31.5, flag: "🇸🇬" },
  { country: "Sweden", revenue: 280000, customers: 110, avgRevenue: 2545, growth: 14.8, flag: "🇸🇪" },
  { country: "Others", revenue: 420000, customers: 180, avgRevenue: 2333, growth: 8.9, flag: "🌍" },
];

const transactionsBase = Array.from({ length: 50 }, (_, i) => {
  const companies = [
    // Technology & Software (Realistic names)
    "Acme Corp", "GlobalTech Solutions", "DataFlow Inc", "CloudScale Systems", "AI Dynamics",
    "NextGen Labs", "Quantum Innovations", "FutureWorks", "SmartTech", "DigitalEdge",
    "CyberTech Global", "InnovationHub", "TechVentures", "DataDriven Corp", "CloudFirst",
    "AI Innovations", "NextWave Tech", "Digital Solutions", "TechForward", "Innovation Labs",
    
    // Healthcare & Medical
    "MediCare Systems", "HealthTech Solutions", "BioInnovations", "MediFlow", "CareTech",
    "HealthFirst", "MediScale", "BioTech Solutions", "HealthHub", "MediTech",
    "Regional Medical", "City Hospital", "Health Partners", "MediGroup", "CareFirst",
    
    // Financial Services
    "FinanceFlow", "BankTech Solutions", "FinTech Innovations", "CapitalTech", "MoneyFlow",
    "FinanceFirst", "BankScale", "FinTech Solutions", "CapitalHub", "MoneyTech",
    "Metro Bank", "City Financial", "Capital Partners", "Investment Group", "Wealth Management",
    
    // Education & Training
    "EduTech Solutions", "LearningHub", "EducationFlow", "TeachTech", "StudyScale",
    "EduFirst", "LearningTech", "EducationHub", "TeachFlow", "StudyTech",
    "University Systems", "Learning Academy", "Education Center", "Training Institute", "Knowledge Base",
    
    // Retail & E-commerce
    "RetailTech", "ShopFlow", "CommerceHub", "StoreTech", "MarketScale",
    "RetailFirst", "ShopTech", "CommerceFlow", "StoreHub", "MarketTech",
    "Metro Retail", "City Stores", "Shopping Center", "Market Place", "Retail Group",
    
    // Manufacturing & Industrial
    "Industrial Solutions", "ManufacturingTech", "ProductionFlow", "FactoryTech", "IndustrialHub",
    "ManufacturingFirst", "ProductionTech", "FactoryFlow", "IndustrialScale", "ManufacturingHub",
    "Global Manufacturing", "Production Systems", "Industrial Group", "Factory Solutions", "Manufacturing Corp",
    
    // Consulting & Professional Services
    "Consulting Solutions", "ProfessionalTech", "AdvisoryFlow", "ConsultingHub", "ProfessionalScale",
    "AdvisoryFirst", "ConsultingTech", "ProfessionalFlow", "AdvisoryHub", "ConsultingScale",
    "Strategic Partners", "Business Solutions", "Professional Group", "Advisory Services", "Consulting Corp",
    
    // Real Estate & Construction
    "RealEstate Solutions", "ConstructionTech", "PropertyFlow", "RealEstateHub", "ConstructionScale",
    "PropertyFirst", "RealEstateTech", "ConstructionFlow", "PropertyHub", "RealEstateScale",
    "Metro Properties", "City Construction", "Property Group", "Building Solutions", "Real Estate Corp",
    
    // Media & Entertainment
    "MediaTech Solutions", "EntertainmentFlow", "MediaHub", "EntertainmentTech", "MediaScale",
    "EntertainmentFirst", "MediaFlow", "EntertainmentHub", "MediaTech", "EntertainmentScale",
    "Creative Studios", "Media Group", "Entertainment Corp", "Digital Media", "Content Solutions",
    
    // Transportation & Logistics
    "Logistics Solutions", "TransportTech", "ShippingFlow", "LogisticsHub", "TransportScale",
    "ShippingFirst", "LogisticsTech", "TransportFlow", "ShippingHub", "LogisticsScale",
    "Global Shipping", "Transport Group", "Logistics Corp", "Delivery Solutions", "Transportation Hub"
  ];
  
  const plans = ["Starter", "Growth", "Pro", "Enterprise", "Custom"];
  const planAmounts = [99, 299, 799, 2499, 9999];
  const statuses = ["Paid", "Paid", "Paid", "Paid", "Paid", "Paid", "Paid", "Refunded", "Pending"];
  const methods = ["Visa", "Mastercard", "Amex", "PayPal", "Wire Transfer", "Crypto"];
  const countries = [
    "United States", "United Kingdom", "Canada", "Germany", "Australia", 
    "France", "Netherlands", "Japan", "Singapore", "Sweden"
  ];
  const countryFlags = ["🇺🇸", "🇬🇧", "🇨🇦", "🇩🇪", "🇦🇺", "🇫🇷", "🇳🇱", "🇯🇵", "🇸🇬", "🇸🇪"];
  
  // Customer names for different industries
  const customerNames = [
    // Technology & Software
    "Alex Thompson", "Sarah Chen", "Michael Rodriguez", "Emma Wilson", "David Kim",
    "Lisa Zhang", "James Anderson", "Maria Garcia", "Robert Taylor", "Jennifer Lee",
    
    // Healthcare & Medical
    "Dr. Sarah Johnson", "Dr. Michael Brown", "Dr. Emily Davis", "Dr. James Wilson", "Dr. Lisa Martinez",
    "Dr. Robert Anderson", "Dr. Jennifer Taylor", "Dr. David Garcia", "Dr. Maria Rodriguez", "Dr. Alex Thompson",
    
    // Financial Services
    "John Smith", "Sarah Williams", "Michael Jones", "Emily Brown", "David Miller",
    "Lisa Davis", "James Garcia", "Maria Rodriguez", "Robert Martinez", "Jennifer Anderson",
    
    // Education & Training
    "Prof. Sarah Johnson", "Prof. Michael Brown", "Prof. Emily Davis", "Prof. James Wilson", "Prof. Lisa Martinez",
    "Dr. Robert Anderson", "Dr. Jennifer Taylor", "Dr. David Garcia", "Dr. Maria Rodriguez", "Dr. Alex Thompson",
    
    // Retail & E-commerce
    "Alex Thompson", "Sarah Chen", "Michael Rodriguez", "Emma Wilson", "David Kim",
    "Lisa Zhang", "James Anderson", "Maria Garcia", "Robert Taylor", "Jennifer Lee",
    
    // Manufacturing & Industrial
    "John Smith", "Sarah Williams", "Michael Jones", "Emily Brown", "David Miller",
    "Lisa Davis", "James Garcia", "Maria Rodriguez", "Robert Martinez", "Jennifer Anderson",
    
    // Consulting & Professional Services
    "Alex Thompson", "Sarah Chen", "Michael Rodriguez", "Emma Wilson", "David Kim",
    "Lisa Zhang", "James Anderson", "Maria Garcia", "Robert Taylor", "Jennifer Lee",
    
    // Real Estate & Construction
    "John Smith", "Sarah Williams", "Michael Jones", "Emily Brown", "David Miller",
    "Lisa Davis", "James Garcia", "Maria Rodriguez", "Robert Martinez", "Jennifer Anderson",
    
    // Media & Entertainment
    "Alex Thompson", "Sarah Chen", "Michael Rodriguez", "Emma Wilson", "David Kim",
    "Lisa Zhang", "James Anderson", "Maria Garcia", "Robert Taylor", "Jennifer Lee",
    
    // Transportation & Logistics
    "John Smith", "Sarah Williams", "Michael Jones", "Emily Brown", "David Miller",
    "Lisa Davis", "James Garcia", "Maria Rodriguez", "Robert Martinez", "Jennifer Anderson"
  ];
  
  const planIndex = i % 5;
  const statusIndex = i % 9;
  const methodIndex = i % 6;
  const countryIndex = i % 10;
  const customerNameIndex = i % customerNames.length;
  
  return {
    id: `TXN-${2025000 + i}`,
    customer: companies[i % companies.length],
    customerName: customerNames[customerNameIndex],
    plan: plans[planIndex],
    amount: planAmounts[planIndex],
    status: statuses[statusIndex],
    date: `2025-${String((i % 12) + 1).padStart(2, "0")}-${String((i % 28) + 1).padStart(2, "0")}`,
    method: methods[methodIndex],
    country: countries[countryIndex],
    countryFlag: countryFlags[countryIndex],
    region: ["North America", "Europe", "Asia", "South America", "Australia"][i % 5],
    industry: ["Technology", "Healthcare", "Finance", "Education", "Retail", "Manufacturing", "Consulting", "Real Estate", "Media", "Transportation"][i % 10],
    dealSize: planAmounts[planIndex],
    salesRep: ["Sarah Chen", "Mike Rodriguez", "Alex Johnson", "Emma Wilson", "David Kim"][i % 5],
  };
});

const monthlyMetrics = [
  { month: "Jan", newCustomers: 45, churnedCustomers: 12, netGrowth: 33, avgDealSize: 2300 },
  { month: "Feb", newCustomers: 52, churnedCustomers: 15, netGrowth: 37, avgDealSize: 2450 },
  { month: "Mar", newCustomers: 61, churnedCustomers: 18, netGrowth: 43, avgDealSize: 2600 },
  { month: "Apr", newCustomers: 69, churnedCustomers: 21, netGrowth: 48, avgDealSize: 2750 },
  { month: "May", newCustomers: 82, churnedCustomers: 24, netGrowth: 58, avgDealSize: 2900 },
  { month: "Jun", newCustomers: 95, churnedCustomers: 27, netGrowth: 68, avgDealSize: 3050 },
  { month: "Jul", newCustomers: 108, churnedCustomers: 30, netGrowth: 78, avgDealSize: 3200 },
  { month: "Aug", newCustomers: 125, churnedCustomers: 33, netGrowth: 92, avgDealSize: 3350 },
  { month: "Sep", newCustomers: 142, churnedCustomers: 36, netGrowth: 106, avgDealSize: 3500 },
  { month: "Oct", newCustomers: 158, churnedCustomers: 38, netGrowth: 120, avgDealSize: 3650 },
  { month: "Nov", newCustomers: 175, churnedCustomers: 40, netGrowth: 135, avgDealSize: 3800 },
  { month: "Dec", newCustomers: 192, churnedCustomers: 42, netGrowth: 150, avgDealSize: 3950 },
];

const COLORS = ["#2563eb", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6", "#0ea5e9"]; // Tailwind palette

function formatCurrency(n) {
  return n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function downloadCSV(rows, filename = "export.csv") {
  const header = Object.keys(rows[0]).join(",");
  const body = rows
    .map((r) => Object.values(r)
      .map((v) => typeof v === "string" && v.includes(",") ? `"${v.replaceAll('"', '""')}"` : v)
      .join(","))
    .join("\n");
  const csv = header + "\n" + body;
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export default function SpeaksifyPaymentsDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [range, setRange] = useState("12m");
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState("all");

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      const authStatus = sessionStorage.getItem('speaksify_authenticated');
      const user = sessionStorage.getItem('speaksify_user');
      const loginTime = sessionStorage.getItem('speaksify_login_time');
      
      if (authStatus === 'true' && user === 'admin@speaksify.com' && loginTime) {
        const now = Date.now();
        const sessionTimeout = 24 * 60 * 60 * 1000; // 24 hours
        if ((now - parseInt(loginTime)) < sessionTimeout) {
          setIsAuthenticated(true);
        } else {
          // Session expired, clear data
          sessionStorage.removeItem('speaksify_authenticated');
          sessionStorage.removeItem('speaksify_user');
          sessionStorage.removeItem('speaksify_login_time');
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setIsLoading(false);
  };

  const handleLogout = () => {
    // Clear all session data
    sessionStorage.removeItem('speaksify_authenticated');
    sessionStorage.removeItem('speaksify_user');
    sessionStorage.removeItem('speaksify_login_time');
    setIsAuthenticated(false);
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-blue-50/30 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 grid place-items-center text-white font-bold text-2xl shadow-lg mx-auto mb-4">
            S
          </div>
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-600 mt-4">Loading dashboard...</p>
        </motion.div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  // Filtered trend by range
  const revenueTrend = useMemo(() => {
    if (range === "3m") return revenueTrendBase.slice(-3);
    if (range === "6m") return revenueTrendBase.slice(-6);
    return revenueTrendBase;
  }, [range]);

  const planRevenue = useMemo(() => planRevenueBase, []);
  const paymentMethods = useMemo(() => paymentMethodsBase, []);
  const customerSegments = useMemo(() => customerSegmentsBase, []);
  const countryRevenue = useMemo(() => countryRevenueBase, []);
  const monthlyMetricsData = useMemo(() => monthlyMetrics, []);

  const transactions = useMemo(() => {
    let list = [...transactionsBase];
    if (planFilter !== "all") list = list.filter((t) => t.plan.toLowerCase() === planFilter);
    if (search) list = list.filter((t) =>
      t.customer.toLowerCase().includes(search.toLowerCase()) ||
      t.customerName.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.salesRep.toLowerCase().includes(search.toLowerCase())
    );
    return list;
  }, [planFilter, search]);

  const totals = useMemo(() => {
    const latest = revenueTrend[revenueTrend.length - 1];
    const mrr = latest.mrr;
    const arr = latest.arr;
    const newM = revenueTrend.reduce((a, b) => a + b.new, 0);
    const churn = revenueTrend.reduce((a, b) => a + b.churn, 0);
    const growthRate = ((revenueTrend[revenueTrend.length - 1].mrr - revenueTrend[0].mrr) / revenueTrend[0].mrr) * 100;
    return { mrr, arr, newM, churn, growthRate };
  }, [revenueTrend]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Enhanced Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-20 backdrop-blur-md bg-white/80 border-b border-slate-200/50 shadow-sm"
      >
        <div className="mx-auto max-w-7xl px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div 
              className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 grid place-items-center text-white font-bold shadow-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              S
            </motion.div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold leading-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Speaksify Payments Dashboard
              </h1>
              <p className="text-sm text-slate-600 -mt-1 flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                AI voice agent SaaS · Real-time revenue insights
                <span className="ml-4 px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                  admin@speaksify.com
                </span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              className="gap-2 bg-white hover:bg-blue-50 border-slate-200 hover:border-blue-300 shadow-sm" 
              onClick={() => downloadCSV(transactions, "transactions.csv")}
            >
              <Download className="h-4 w-4" /> Export CSV
            </Button>
            <Button 
              variant="outline" 
              className="gap-2 bg-white hover:bg-red-50 border-slate-200 hover:border-red-300 shadow-sm text-red-600 hover:text-red-700" 
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" /> Logout
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Enhanced Controls */}
      <div className="mx-auto max-w-7xl px-4 py-6">
        <Card className="shadow-lg border-0 bg-gradient-to-r from-white to-slate-50/50">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="px-4 py-2 bg-emerald-50 text-emerald-700 border-emerald-200 font-medium">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
                  Live Data
                </Badge>
                <div className="text-sm text-slate-600 font-medium">Updated just now</div>
              </div>
              <div className="flex-1" />
              <div className="flex items-center gap-4">
                <div className="text-sm text-slate-700 font-medium">Time Range:</div>
                <div className="flex rounded-xl border border-slate-200 overflow-hidden bg-white shadow-sm">
                  {[
                    { v: "3m", label: "3M" },
                    { v: "6m", label: "6M" },
                    { v: "12m", label: "12M" },
                  ].map((r) => (
                    <button
                      key={r.v}
                      onClick={() => setRange(r.v)}
                      className={`px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-slate-50 ${
                        range === r.v 
                          ? "bg-blue-50 text-blue-700 border-blue-200" 
                          : "text-slate-600 hover:text-slate-800"
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
                <div className="hidden md:flex items-center gap-2 text-slate-600">
                  <Filter className="w-4 h-4" />
                  <span className="text-sm font-medium">Filters</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced KPI Cards */}
      <div className="mx-auto max-w-7xl px-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard 
          icon={<DollarSign className="w-5 h-5" />} 
          title="Monthly Recurring Revenue" 
          value={formatCurrency(totals.mrr)} 
          delta={`↑ ${totals.growthRate.toFixed(1)}% YoY`}
          gradient="from-blue-500 to-blue-600"
        />
        <StatCard 
          icon={<TrendingUp className="w-5 h-5" />} 
          title="Annual Recurring Revenue" 
          value={formatCurrency(totals.arr)} 
          delta="Projected"
          gradient="from-emerald-500 to-emerald-600"
        />
        <StatCard 
          icon={<Users className="w-5 h-5" />} 
          title="New Revenue (12m)" 
          value={formatCurrency(totals.newM)} 
          delta="Gross new"
          gradient="from-purple-500 to-purple-600"
        />
        <StatCard 
          icon={<CreditCard className="w-5 h-5" />} 
          title="Churned Revenue (12m)" 
          value={formatCurrency(totals.churn)} 
          delta="Gross churn" 
          negative
          gradient="from-rose-500 to-rose-600"
        />
      </div>

      {/* Enhanced Charts Section */}
      <div className="mx-auto max-w-7xl px-4 mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Trend - Enhanced */}
        <Card className="lg:col-span-2 shadow-lg border-0 bg-gradient-to-br from-white to-blue-50/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Revenue Trend Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueTrend} margin={{ left: 0, right: 10 }}>
                <defs>
                  <linearGradient id="mrr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="new" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} tick={{ fontSize: 12 }} />
                <Tooltip 
                  formatter={(v, name) => [formatCurrency(v), name]}
                  labelStyle={{ color: '#374151' }}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Area type="monotone" dataKey="mrr" name="MRR" stroke="#3b82f6" fill="url(#mrr)" strokeWidth={3} />
                <Area type="monotone" dataKey="new" name="New MRR" stroke="#10b981" fill="url(#new)" strokeWidth={2} />
                <Line type="monotone" dataKey="churn" name="Churn" stroke="#ef4444" strokeWidth={2} dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue by Plan - Enhanced */}
        <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-emerald-50/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              Revenue by Plan
            </CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={planRevenue} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="plan" tick={{ fontSize: 11 }} />
                <YAxis tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} tick={{ fontSize: 11 }} />
                <Tooltip 
                  formatter={(v, name) => [formatCurrency(v), name]}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="revenue" radius={[8,8,0,0]}>
                  {planRevenue.map((_, idx) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Payment Methods - Enhanced */}
        <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-purple-50/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              Payment Methods
            </CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip 
                  formatter={(value, name) => [`${value}%`, name]}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Pie 
                  data={paymentMethods} 
                  dataKey="value" 
                  nameKey="method" 
                  innerRadius={60} 
                  outerRadius={100} 
                  paddingAngle={5}
                  stroke="white"
                  strokeWidth={2}
                >
                  {paymentMethods.map((_, idx) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Customer Segments */}
        <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-orange-50/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              Customer Segments
            </CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={customerSegments} layout="horizontal" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} tick={{ fontSize: 11 }} />
                <YAxis dataKey="segment" type="category" tick={{ fontSize: 11 }} />
                <Tooltip 
                  formatter={(v, name) => [formatCurrency(v), name]}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="revenue" radius={[0,8,8,0]}>
                  {customerSegments.map((_, idx) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Net Revenue Growth */}
        <Card className="lg:col-span-2 shadow-lg border-0 bg-gradient-to-br from-white to-cyan-50/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
              Net Revenue Growth (MRR − Churn)
            </CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueTrend} margin={{ left: 0, right: 10 }}>
                <defs>
                  <linearGradient id="net" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} tick={{ fontSize: 12 }} />
                <Tooltip 
                  formatter={(v, name) => [formatCurrency(v), name]}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  name="Net Revenue" 
                  dataKey={(d) => d.mrr - d.churn} 
                  stroke="#06b6d4" 
                  fill="url(#net)" 
                  strokeWidth={3}
                  dot={{ fill: '#06b6d4', strokeWidth: 2, r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Country-wise Earnings Section */}
      <div className="mx-auto max-w-7xl px-4 mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Country Revenue Chart */}
        <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-indigo-50/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              Country-wise Revenue Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={countryRevenue.slice(0, 8)} layout="horizontal" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} tick={{ fontSize: 11 }} />
                <YAxis dataKey="country" type="category" tick={{ fontSize: 11 }} />
                <Tooltip 
                  formatter={(v, name) => [formatCurrency(v), name]}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="revenue" radius={[0,8,8,0]}>
                  {countryRevenue.slice(0, 8).map((_, idx) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Country Revenue Pie Chart */}
        <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-teal-50/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
              Revenue by Country (Top 8)
            </CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip 
                  formatter={(value, name) => [formatCurrency(value), name]}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Pie 
                  data={countryRevenue.slice(0, 8)} 
                  dataKey="revenue" 
                  nameKey="country" 
                  innerRadius={60} 
                  outerRadius={100} 
                  paddingAngle={5}
                  stroke="white"
                  strokeWidth={2}
                >
                  {countryRevenue.slice(0, 8).map((_, idx) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Country Performance Table */}
      <div className="mx-auto max-w-7xl px-4 mt-6">
        <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-violet-50/30">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold text-slate-800 flex items-center gap-2">
              <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
              Country Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                    <Th className="font-semibold text-slate-700">Country</Th>
                    <Th className="font-semibold text-slate-700">Revenue</Th>
                    <Th className="font-semibold text-slate-700">Customers</Th>
                    <Th className="font-semibold text-slate-700">Avg Revenue</Th>
                    <Th className="font-semibold text-slate-700">Growth</Th>
                    <Th className="font-semibold text-slate-700">Market Share</Th>
                  </tr>
                </thead>
                <tbody>
                  {countryRevenue.map((country, i) => {
                    const totalRevenue = countryRevenue.reduce((sum, c) => sum + c.revenue, 0);
                    const marketShare = ((country.revenue / totalRevenue) * 100).toFixed(1);
                    
                    return (
                      <motion.tr 
                        key={country.country} 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        className={`${i % 2 ? "bg-white" : "bg-slate-50/30"} hover:bg-blue-50/50 transition-colors border-b border-slate-100`}
                      >
                        <Td className="font-medium text-slate-900 flex items-center gap-2">
                          <span className="text-lg">{country.flag}</span>
                          {country.country}
                        </Td>
                        <Td className="font-semibold text-slate-900">{formatCurrency(country.revenue)}</Td>
                        <Td className="text-slate-600">{country.customers.toLocaleString()}</Td>
                        <Td className="text-slate-600">{formatCurrency(country.avgRevenue)}</Td>
                        <Td>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            country.growth > 20 ? "bg-emerald-50 text-emerald-700" :
                            country.growth > 15 ? "bg-blue-50 text-blue-700" :
                            country.growth > 10 ? "bg-amber-50 text-amber-700" :
                            "bg-rose-50 text-rose-700"
                          }`}>
                            ↑ {country.growth}%
                          </span>
                        </Td>
                        <Td className="text-slate-600 font-medium">{marketShare}%</Td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Transactions Table */}
      <div className="mx-auto max-w-7xl px-4 mt-8">
        <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-slate-50/30">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                Transaction Analytics
              </CardTitle>
              <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-2 text-sm text-slate-600">
                  <span className="font-medium">Plan Filter:</span>
                  <div className="flex rounded-xl border overflow-hidden bg-white">
                    {[{v:"all", label:"All"}, {v:"starter", label:"Starter"}, {v:"growth", label:"Growth"}, {v:"pro", label:"Pro"}, {v:"enterprise", label:"Enterprise"}, {v:"custom", label:"Custom"}].map(o => (
                      <button 
                        key={o.v} 
                        onClick={() => setPlanFilter(o.v)} 
                        className={`px-3 py-1.5 text-sm hover:bg-slate-50 transition-colors ${planFilter===o.v?"bg-blue-50 text-blue-700 font-medium border-blue-200":"text-slate-600"}`}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </div>
                <Input 
                  placeholder="Search by company, customer, ID, or sales rep..." 
                  className="w-64 bg-white border-slate-200 focus:border-blue-300 focus:ring-blue-200" 
                  value={search} 
                  onChange={(e) => setSearch(e.target.value)} 
                />
                <Button 
                  variant="outline" 
                  className="gap-2 bg-white hover:bg-blue-50 border-slate-200 hover:border-blue-300" 
                  onClick={() => downloadCSV(transactions, "filtered-transactions.csv")}
                >
                  <Download className="h-4 w-4" /> Export CSV
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                    <Th className="font-semibold text-slate-700">Transaction ID</Th>
                    <Th className="font-semibold text-slate-700">Company</Th>
                    <Th className="font-semibold text-slate-700">Customer</Th>
                    <Th className="font-semibold text-slate-700">Plan</Th>
                    <Th className="font-semibold text-slate-700">Amount</Th>
                    <Th className="font-semibold text-slate-700">Status</Th>
                    <Th className="font-semibold text-slate-700">Method</Th>
                    <Th className="font-semibold text-slate-700">Country</Th>
                    <Th className="font-semibold text-slate-700">Sales Rep</Th>
                    <Th className="font-semibold text-slate-700">Date</Th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((t, i) => (
                    <motion.tr 
                      key={t.id} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: i * 0.02 }}
                      className={`${i % 2 ? "bg-white" : "bg-slate-50/30"} hover:bg-blue-50/50 transition-colors border-b border-slate-100`}
                    >
                      <Td className="font-medium text-slate-900">{t.id}</Td>
                      <Td className="font-medium text-slate-800">{t.customer}</Td>
                      <Td className="text-slate-700 font-medium">{t.customerName}</Td>
                      <Td>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                          t.plan === "Starter" ? "bg-blue-50 text-blue-700 border-blue-200" :
                          t.plan === "Growth" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                          t.plan === "Pro" ? "bg-purple-50 text-purple-700 border-purple-200" :
                          t.plan === "Enterprise" ? "bg-orange-50 text-orange-700 border-orange-200" :
                          "bg-pink-50 text-pink-700 border-pink-200"
                        }`}>
                          {t.plan}
                        </span>
                      </Td>
                      <Td className="font-semibold text-slate-900">{formatCurrency(t.amount)}</Td>
                      <Td>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                          t.status === "Paid" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : 
                          t.status === "Pending" ? "bg-amber-50 text-amber-700 border-amber-200" :
                          "bg-rose-50 text-rose-700 border-rose-200"
                        }`}>
                          {t.status}
                        </span>
                      </Td>
                      <Td className="text-slate-600">{t.method}</Td>
                      <Td className="text-slate-600 flex items-center gap-1">
                        <span className="text-sm">{t.countryFlag}</span>
                        {t.country}
                      </Td>
                      <Td className="text-slate-600">{t.salesRep}</Td>
                      <Td className="tabular-nums text-slate-500">{t.date}</Td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <footer className="mx-auto max-w-7xl px-4 py-10 text-xs text-slate-500">
        © {new Date().getFullYear()} Speaksify — Demo data for UI preview.
      </footer>
    </div>
  );
}

function StatCard({ icon, title, value, delta, negative, gradient }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.4 }}
      whileHover={{ y: -2 }}
      className="group"
    >
      <Card className={`shadow-lg border-0 bg-gradient-to-br ${gradient || 'from-white to-slate-50'} hover:shadow-xl transition-all duration-300`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-medium text-slate-700 flex items-center gap-3">
            <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 text-slate-700 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
              {icon}
            </span>
            <span className="leading-tight">{title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold tracking-tight text-slate-900 mb-1">{value}</div>
          <p className={`text-sm font-medium ${negative ? "text-rose-600" : "text-emerald-600"}`}>
            {delta}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function Th({ children }) {
  return <th className="px-4 py-3 text-xs font-semibold text-slate-500 tracking-wide">{children}</th>;
}

function Td({ children, className = "" }) {
  return <td className={`px-4 py-3 ${className}`}>{children}</td>;
}
