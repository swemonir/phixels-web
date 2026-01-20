import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CreditCard, TrendingUp, Activity, Calendar, ShoppingBag, Heart, MessageCircle, MapPin, Star, User, Bell, Search, Menu, Home, PieChart, Plus, Image as ImageIcon, MoreHorizontal, Navigation, Clock, ChevronRight, ArrowUpRight, Wallet, ShieldCheck } from 'lucide-react';
export function PortfolioTeaser() {
  const targetRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const {
    scrollYProgress
  } = useScroll({
    target: targetRef
  });
  const x = useTransform(scrollYProgress, [0, 1], ['1%', '-50%']);
  // Handle header visibility on scroll
  useMotionValueEvent(scrollYProgress, 'change', latest => {
    const currentScrollY = latest;
    if (currentScrollY > lastScrollY && currentScrollY > 0.1) {
      setHeaderVisible(false);
    } else {
      setHeaderVisible(true);
    }
    setLastScrollY(currentScrollY);
  });
  const apps = [{
    type: 'FinTech',
    color: 'bg-blue-600',
    content: <div className="flex flex-col h-full bg-white text-gray-900 font-sans">
          {/* Header */}
          <div className="px-6 pt-6 pb-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" alt="User" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="text-xs text-gray-500 font-medium">
                  Good Morning
                </div>
                <div className="font-bold text-sm text-gray-900">
                  Alex Morgan
                </div>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center relative">
              <Bell size={18} className="text-gray-600" />
              <div className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></div>
            </div>
          </div>

          {/* Card */}
          <div className="px-6 mb-6">
            <div className="bg-gray-900 rounded-2xl p-6 text-white shadow-xl shadow-gray-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/20 rounded-full blur-xl -ml-10 -mb-10 pointer-events-none" />

              <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                  <div className="text-xs text-gray-400 mb-1 font-medium tracking-wide">
                    TOTAL BALANCE
                  </div>
                  <div className="text-3xl font-bold tracking-tight">
                    $24,562.00
                  </div>
                </div>
                <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
                  <Wallet size={20} className="text-white" />
                </div>
              </div>

              <div className="flex justify-between items-end relative z-10">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-red-500/80"></div>
                    <div className="w-6 h-6 rounded-full bg-yellow-500/80"></div>
                  </div>
                  <span className="text-sm font-medium text-gray-300">
                    **** 4582
                  </span>
                </div>
                <div className="text-xs font-medium bg-white/20 px-2 py-1 rounded text-white">
                  VISA
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="px-6 mb-8">
            <div className="flex justify-between">
              {[{
            icon: ArrowUpRight,
            label: 'Send'
          }, {
            icon: Plus,
            label: 'Top-up'
          }, {
            icon: ShieldCheck,
            label: 'Request'
          }, {
            icon: MoreHorizontal,
            label: 'More'
          }].map((item, i) => <div key={i} className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer">
                    <item.icon size={22} strokeWidth={1.5} />
                  </div>
                  <span className="text-xs font-medium text-gray-600">
                    {item.label}
                  </span>
                </div>)}
            </div>
          </div>

          {/* Transactions */}
          <div className="flex-1 bg-gray-50 rounded-t-[2rem] px-6 pt-8">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-bold text-lg text-gray-900">Transactions</h4>
              <span className="text-xs font-semibold text-blue-600 cursor-pointer">
                View All
              </span>
            </div>
            <div className="space-y-4">
              {[{
            name: 'Netflix Subscription',
            cat: 'Entertainment',
            amount: '-$12.99',
            icon: 'N',
            bg: 'bg-red-100',
            text: 'text-red-600'
          }, {
            name: 'Spotify Premium',
            cat: 'Music',
            amount: '-$9.99',
            icon: 'S',
            bg: 'bg-green-100',
            text: 'text-green-600'
          }, {
            name: 'Salary Deposit',
            cat: 'Income',
            amount: '+$3,200',
            icon: '$',
            bg: 'bg-blue-100',
            text: 'text-blue-600'
          }, {
            name: 'Uber Rides',
            cat: 'Transport',
            amount: '-$24.50',
            icon: 'U',
            bg: 'bg-black',
            text: 'text-white'
          }].map((tx, i) => <div key={i} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl ${tx.bg} ${tx.text} flex items-center justify-center text-lg font-bold shadow-sm`}>
                      {tx.icon}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900 mb-0.5">
                        {tx.name}
                      </div>
                      <div className="text-xs text-gray-500 font-medium">
                        {tx.cat}
                      </div>
                    </div>
                  </div>
                  <div className={`text-sm font-bold ${tx.amount.startsWith('+') ? 'text-green-600' : 'text-gray-900'}`}>
                    {tx.amount}
                  </div>
                </div>)}
            </div>
          </div>
        </div>
  }, {
    type: 'Health',
    color: 'bg-emerald-600',
    content: <div className="flex flex-col h-full bg-slate-50 text-gray-900 font-sans">
          <div className="px-6 pt-6 pb-2 flex justify-between items-center">
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                THURSDAY, 24 OCT
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Health Overview
              </h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center overflow-hidden">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" alt="User" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="px-6 py-6">
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
              <div className="min-w-[140px] p-5 rounded-3xl bg-white shadow-sm border border-slate-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                    <Activity size={20} />
                  </div>
                  <span className="text-xs font-bold text-gray-400">STEPS</span>
                </div>
                <div className="font-bold text-2xl text-gray-900 mb-1">
                  6,234
                </div>
                <div className="text-xs text-gray-500 font-medium">
                  Goal: 10,000
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full mt-3 overflow-hidden">
                  <div className="w-[62%] h-full bg-orange-500 rounded-full"></div>
                </div>
              </div>

              <div className="min-w-[140px] p-5 rounded-3xl bg-white shadow-sm border border-slate-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-500">
                    <Clock size={20} />
                  </div>
                  <span className="text-xs font-bold text-gray-400">SLEEP</span>
                </div>
                <div className="font-bold text-2xl text-gray-900 mb-1">
                  7h 20m
                </div>
                <div className="text-xs text-gray-500 font-medium">
                  Deep: 2h 15m
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full mt-3 overflow-hidden">
                  <div className="w-[85%] h-full bg-purple-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-lg text-gray-900">
                Next Appointment
              </h4>
            </div>
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex gap-4 items-center relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-500"></div>
              <div className="bg-emerald-50 p-3 rounded-2xl text-center min-w-[60px]">
                <div className="text-xs font-bold text-emerald-600 mb-0.5">
                  OCT
                </div>
                <div className="font-bold text-xl text-gray-900">24</div>
              </div>
              <div className="flex-1">
                <div className="font-bold text-base text-gray-900">
                  Dr. Sarah Wilson
                </div>
                <div className="text-xs text-gray-500 font-medium mb-2">
                  Cardiologist • Heart Center
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
                  <Clock size={12} /> 10:00 AM - 11:00 AM
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 flex-1">
            <h4 className="font-bold text-lg text-gray-900 mb-4">
              Top Specialists
            </h4>
            <div className="space-y-3">
              {[{
            name: 'Dr. James Chen',
            role: 'Dentist',
            rating: '4.8',
            img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop'
          }, {
            name: 'Dr. Emily White',
            role: 'Neurologist',
            rating: '4.9',
            img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop'
          }].map((doc, i) => <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                    <img src={doc.img} alt={doc.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-sm text-gray-900">
                      {doc.name}
                    </div>
                    <div className="text-xs text-gray-500 font-medium">
                      {doc.role}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                    <Star size={12} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-bold text-gray-900">
                      {doc.rating}
                    </span>
                  </div>
                </div>)}
            </div>
          </div>
        </div>
  }, {
    type: 'E-commerce',
    color: 'bg-purple-600',
    content: <div className="flex flex-col h-full bg-white text-gray-900 font-sans">
          <div className="px-6 pt-6 pb-4 flex justify-between items-center bg-white sticky top-0 z-10">
            <Menu size={24} strokeWidth={1.5} />
            <div className="font-bold text-lg tracking-widest">LUXE</div>
            <div className="relative">
              <ShoppingBag size={24} strokeWidth={1.5} />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                2
              </div>
            </div>
          </div>

          <div className="px-6 mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input type="text" className="w-full bg-gray-50 border-none rounded-full py-3 pl-12 pr-4 text-sm font-medium placeholder:text-gray-400 focus:ring-2 focus:ring-black/5" placeholder="Search collection..." />
            </div>
          </div>

          <div className="px-6 mb-8">
            <div className="h-64 bg-black rounded-[2rem] relative overflow-hidden flex items-end p-6">
              <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=800&fit=crop" alt="Fashion" className="absolute inset-0 w-full h-full object-cover opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="relative z-10 w-full">
                <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold text-white mb-3 tracking-wider">
                  NEW SEASON
                </div>
                <h3 className="text-3xl font-bold text-white mb-2 leading-tight">
                  Summer
                  <br />
                  Collection
                </h3>
                <div className="flex justify-between items-end">
                  <p className="text-white/80 text-xs font-medium">
                    Explore the new trends
                  </p>
                  <button className="bg-white text-black text-xs font-bold px-5 py-2.5 rounded-full">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 mb-6">
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
              {['All', 'Clothing', 'Shoes', 'Bags'].map((cat, i) => <button key={i} className={`px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${i === 0 ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  {cat}
                </button>)}
            </div>
          </div>

          <div className="px-6 grid grid-cols-2 gap-4 pb-6">
            {[{
          name: 'Nike Air Max',
          price: '$129.00',
          img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop'
        }, {
          name: 'Urban Jacket',
          price: '$89.00',
          img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&h=300&fit=crop'
        }].map((item, i) => <div key={i} className="group cursor-pointer">
                <div className="aspect-[4/5] bg-gray-100 rounded-2xl mb-3 relative overflow-hidden">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <button className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors">
                    <Heart size={14} />
                  </button>
                </div>
                <div className="font-bold text-sm text-gray-900 mb-0.5">
                  {item.name}
                </div>
                <div className="text-sm font-medium text-gray-500">
                  {item.price}
                </div>
              </div>)}
          </div>
        </div>
  }, {
    type: 'Social',
    color: 'bg-pink-600',
    content: <div className="flex flex-col h-full bg-black text-white font-sans">
          <div className="px-6 pt-6 pb-4 flex justify-between items-center">
            <div className="font-bold text-xl tracking-tighter bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Socially
            </div>
            <div className="flex gap-5">
              <Heart size={24} strokeWidth={1.5} />
              <div className="relative">
                <MessageCircle size={24} strokeWidth={1.5} />
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-black"></div>
              </div>
            </div>
          </div>

          <div className="pl-6 mb-6">
            <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar pr-6">
              {[{
            name: 'My Story',
            img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
            active: false
          }, {
            name: 'Sarah',
            img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
            active: true
          }, {
            name: 'Mike',
            img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
            active: true
          }, {
            name: 'Jessica',
            img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop',
            active: true
          }, {
            name: 'David',
            img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
            active: true
          }].map((story, i) => <div key={i} className="flex flex-col items-center gap-1.5 min-w-[64px]">
                  <div className={`w-16 h-16 rounded-full p-[2px] ${story.active ? 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500' : 'bg-gray-800'}`}>
                    <div className="w-full h-full rounded-full border-2 border-black overflow-hidden relative">
                      <img src={story.img} alt={story.name} className="w-full h-full object-cover" />
                      {i === 0 && <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Plus size={20} className="text-white" />
                        </div>}
                    </div>
                  </div>
                  <span className="text-[10px] font-medium text-gray-300">
                    {story.name}
                  </span>
                </div>)}
            </div>
          </div>

          <div className="flex-1 overflow-hidden relative rounded-t-[2rem] bg-gray-900/50 border-t border-white/10">
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop" alt="User" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="text-sm font-bold">jessica_design</div>
                    <div className="text-xs text-gray-400">Tokyo, Japan</div>
                  </div>
                </div>
                <MoreHorizontal size={20} className="text-gray-400" />
              </div>

              <div className="aspect-[4/5] bg-gray-800 rounded-2xl mb-4 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=800&fit=crop" alt="Post" className="w-full h-full object-cover" />
              </div>

              <div className="flex justify-between items-center mb-3">
                <div className="flex gap-4">
                  <Heart size={24} />
                  <MessageCircle size={24} />
                  <Navigation size={24} />
                </div>
                <div className="text-white/60">
                  <div className="w-5 h-6 border-2 border-white/60 rounded-sm"></div>
                </div>
              </div>

              <div className="text-sm">
                <span className="font-bold mr-2">jessica_design</span>
                Exploring the neon streets of Tokyo! 🌃 The architecture here is
                absolutely mind-blowing.
                <span className="text-gray-400 ml-1">
                  #tokyo #travel #design
                </span>
              </div>
            </div>
          </div>
        </div>
  }, {
    type: 'Food',
    color: 'bg-orange-500',
    content: <div className="flex flex-col h-full bg-white text-gray-900 font-sans">
          <div className="px-6 pt-6 pb-4 flex justify-between items-center">
            <div className="flex flex-col">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                DELIVERING TO
              </div>
              <div className="font-bold text-sm flex items-center gap-1 text-orange-500">
                Home • 123 Main St <ChevronRight size={14} />
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" alt="User" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="px-6 mb-6">
            <div className="bg-orange-500 rounded-3xl p-6 text-white relative overflow-hidden shadow-lg shadow-orange-200">
              <div className="relative z-10 w-2/3">
                <div className="font-bold text-2xl mb-2 leading-tight">
                  Free Delivery
                  <br />
                  Weekend
                </div>
                <div className="text-xs font-medium opacity-90 mb-4 bg-white/20 inline-block px-2 py-1 rounded">
                  Use Code: FREEDEL
                </div>
                <button className="bg-white text-orange-600 text-xs font-bold px-4 py-2 rounded-full shadow-sm">
                  Order Now
                </button>
              </div>
              <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-yellow-400 rounded-full opacity-20 blur-xl" />
              <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&h=200&fit=crop" alt="Pizza" className="absolute -right-2 bottom-2 w-28 h-28 object-cover rounded-full shadow-lg border-2 border-white/20" />
            </div>
          </div>

          <div className="px-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-lg text-gray-900">Categories</h4>
              <span className="text-xs font-bold text-orange-500">See All</span>
            </div>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
              {[{
            name: 'Burger',
            icon: '🍔'
          }, {
            name: 'Pizza',
            icon: '🍕'
          }, {
            name: 'Sushi',
            icon: '🍣'
          }, {
            name: 'Asian',
            icon: '🍜'
          }, {
            name: 'Taco',
            icon: '🌮'
          }].map((cat, i) => <div key={i} className="flex flex-col items-center gap-2 min-w-[70px]">
                  <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-2xl shadow-sm border border-gray-100 hover:bg-orange-50 hover:border-orange-100 transition-colors cursor-pointer">
                    {cat.icon}
                  </div>
                  <span className="text-xs font-bold text-gray-600">
                    {cat.name}
                  </span>
                </div>)}
            </div>
          </div>

          <div className="px-6 flex-1">
            <h4 className="font-bold text-lg text-gray-900 mb-4">
              Popular Near You
            </h4>
            <div className="space-y-4">
              {[{
            name: 'Burger King',
            type: 'American • Fast Food',
            rating: '4.5',
            time: '20-30 min',
            img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop'
          }, {
            name: 'Sushi Master',
            type: 'Japanese • Sushi',
            rating: '4.8',
            time: '35-45 min',
            img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=200&h=200&fit=crop'
          }].map((place, i) => <div key={i} className="flex gap-4 group cursor-pointer">
                  <div className="w-24 h-24 bg-gray-100 rounded-2xl overflow-hidden shadow-sm">
                    <img src={place.img} alt={place.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="flex-1 py-1">
                    <div className="font-bold text-base text-gray-900 mb-1">
                      {place.name}
                    </div>
                    <div className="text-xs text-gray-500 font-medium mb-2">
                      {place.type}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 bg-gray-100 px-1.5 py-0.5 rounded text-xs font-bold">
                        <Star size={10} className="fill-orange-500 text-orange-500" />
                        <span>{place.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs font-medium text-gray-400">
                        <Clock size={10} />
                        <span>{place.time}</span>
                      </div>
                    </div>
                  </div>
                </div>)}
            </div>
          </div>
        </div>
  }];
  return <section ref={targetRef} className="h-[300vh] bg-[#050505] relative">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Header with scroll hide/show */}
        <motion.div className="absolute top-10 left-4 md:left-10 z-10 max-w-xl" initial={{
        opacity: 1,
        y: 0
      }} animate={{
        opacity: headerVisible ? 1 : 0,
        y: headerVisible ? 0 : -50
      }} transition={{
        duration: 0.3,
        ease: 'easeOut'
      }}>
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-4 whitespace-nowrap">
            Featured <span className="text-gradient">Work</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-md">
            We build award-winning apps that scale. Swipe to explore our recent
            masterpieces.
          </p>
        </motion.div>

        <motion.div style={{
        x
      }} className="flex gap-12 md:gap-24 px-10 pl-[10vw] md:pl-[40vw] items-center">
          {apps.map((app, i) => <Link to="/case-studies" key={i} className="relative group cursor-pointer">
              {/* Ultra-modern Phone Frame - iPhone 15 Pro Style */}
              <div className="relative h-[65vh] w-[32vh] min-w-[280px] md:min-w-[320px] max-h-[800px] max-w-[400px]">
                {/* Outer Frame (Titanium) */}
                <div className="absolute inset-0 rounded-[3.5rem] bg-[#1a1a1a] p-[3px] shadow-[0_0_0_2px_#333,0_20px_60px_-10px_rgba(0,0,0,0.9)] group-hover:shadow-[0_0_0_2px_rgba(237,31,36,0.5),0_30px_80px_-10px_rgba(237,31,36,0.2)] transition-all duration-500">
                  {/* Inner Bezel (Black) */}
                  <div className="w-full h-full rounded-[3.3rem] bg-black p-[8px] relative overflow-hidden">
                    {/* Screen Area */}
                    <div className="w-full h-full rounded-[2.8rem] overflow-hidden relative bg-white backface-hidden">
                      {/* Dynamic Island */}
                      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[30%] h-7 bg-black rounded-full z-50 flex items-center justify-center gap-2 transition-all duration-300 group-hover:w-[35%]">
                        {/* Camera & Sensors hidden in black pill */}
                      </div>

                      {/* Status Bar Time/Icons (Mock) */}
                      <div className="absolute top-3.5 left-8 text-[10px] font-bold text-black z-40 mix-blend-difference text-white">
                        9:41
                      </div>
                      <div className="absolute top-3.5 right-8 flex gap-1 z-40 mix-blend-difference text-white">
                        <div className="w-4 h-2.5 border border-white rounded-[2px] relative">
                          <div className="absolute inset-0.5 bg-white"></div>
                        </div>
                      </div>

                      {/* App Content */}
                      <div className="w-full h-full overflow-hidden">
                        {app.content}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="absolute -left-[2px] top-24 w-[3px] h-7 bg-[#2a2a2a] rounded-l-md shadow-sm"></div>
                <div className="absolute -left-[2px] top-36 w-[3px] h-12 bg-[#2a2a2a] rounded-l-md shadow-sm"></div>
                <div className="absolute -left-[2px] top-52 w-[3px] h-12 bg-[#2a2a2a] rounded-l-md shadow-sm"></div>
                <div className="absolute -right-[2px] top-32 w-[3px] h-20 bg-[#2a2a2a] rounded-r-md shadow-sm"></div>

                {/* Reflections/Gloss */}
                <div className="absolute inset-0 rounded-[3.5rem] bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none z-50"></div>
              </div>

              {/* Label */}
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                <div className="text-2xl font-bold text-white mb-1">
                  {app.type} App
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-[color:var(--bright-red)] font-medium uppercase tracking-wider">
                  View Case Study <ArrowUpRight size={14} />
                </div>
              </div>
            </Link>)}
        </motion.div>
      </div>
    </section>;
}