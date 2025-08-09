import React, { useState, useEffect } from 'react';
import {Shield, User, Calendar,Key,Clock,Eye,BarChart3,Lock,Unlock,AlertTriangle,CheckCircle,AlertCircle,Activity,Users,Database,Zap}from'lucide-react';

const UserSecurityDashboard = () => {
  const [users, setUsers] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  // API data from your table
  const apiData = [
    {
      id: 1,
      humanUser: "Foo Bar1",
      createDate: "Oct 1 2020",
      passwordChangedDate: "Oct 1 2021",
      lastAccessDate: "Jan 4 2025",
      mfaEnabled: "Yes",
    },
    {
      id: 2,
      humanUser: "Foo1 Bar1", 
      createDate: "Sep 20 2019",
      passwordChangedDate: "Sep 22 2019",
      lastAccessDate: "Feb 8 2025",
      mfaEnabled: "No",
    },
    {
      id: 3,
      humanUser: "Foo2 Bar2",
      createDate: "Feb 3 2022", 
      passwordChangedDate: "Feb 3 2022",
      lastAccessDate: "Feb 12 2025",
      mfaEnabled: "No",
    },
    {
      id: 4,
      humanUser: "Foo3 Bar3",
      createDate: "Mar 7 2023",
      passwordChangedDate: "Mar 10 2023", 
      lastAccessDate: "Jan 3 2022",
      mfaEnabled: "Yes",
    },
    {
      id: 5,
      humanUser: "Foo Bar4",
      createDate: "Apr 8 2018",
      passwordChangedDate: "Apr 12 2020",
      lastAccessDate: "Oct 4 2022", 
      mfaEnabled: "No",
    }
  ];

  // Simulate REST API call
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1200));
      setUsers(apiData);
      setLoading(false);
    };

    fetchUserData();
  }, []);

  // Update current time every second 
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); // Update every second 
    return () => clearInterval(interval);
  }, []);

  // Calculate days difference
  const calculateDaysDifference = (pastDateStr) => {
    const pastDate = new Date(pastDateStr + " UTC");
    const now = new Date();
    
    // Set both dates to UTC midnight 
    const pastUTC = new Date(Date.UTC(pastDate.getFullYear(), pastDate.getMonth(), pastDate.getDate()));
    const nowUTC = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
    
    const diffTime = nowUTC.getTime() - pastUTC.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    console.log(`Calculating days for ${pastDateStr}: Past=${pastUTC.toDateString()}, Now=${nowUTC.toDateString()}, Days=${diffDays}`);
    
    return Math.max(0, diffDays);
  };

  // Get status styling
  const getPasswordStatus = (days) => {
    if (days > 1095) return { 
      color: 'text-red-600', 
      bg: 'bg-red-50', 
      border: 'border-red-200', 
      badge: 'bg-red-100 text-red-800',
      label: 'Critical' 
    };
    if (days > 365) return { 
      color: 'text-orange-600', 
      bg: 'bg-orange-50', 
      border: 'border-orange-200', 
      badge: 'bg-orange-100 text-orange-800',
      label: 'High Risk' 
    };
    if (days > 90) return { 
      color: 'text-yellow-600', 
      bg: 'bg-yellow-50', 
      border: 'border-yellow-200', 
      badge: 'bg-yellow-100 text-yellow-800',
      label: 'Warning' 
    };
    return { 
      color: 'text-emerald-600', 
      bg: 'bg-emerald-50', 
      border: 'border-emerald-200', 
      badge: 'bg-emerald-100 text-emerald-800',
      label: 'Good' 
    };
  };

  const getAccessStatus = (days) => {
    if (days > 1095) return { 
      color: 'text-red-600', 
      bg: 'bg-red-50', 
      border: 'border-red-200', 
      badge: 'bg-red-100 text-red-800',
      label: 'Inactive' 
    };
    if (days > 365) return { 
      color: 'text-orange-600', 
      bg: 'bg-orange-50', 
      border: 'border-orange-200', 
      badge: 'bg-orange-100 text-orange-800',
      label: 'Very Stale' 
    };
    if (days > 30) return { 
      color: 'text-yellow-600', 
      bg: 'bg-yellow-50', 
      border: 'border-yellow-200', 
      badge: 'bg-yellow-100 text-yellow-800',
      label: 'Stale' 
    };
    if (days > 7) return { 
      color: 'text-blue-600', 
      bg: 'bg-blue-50', 
      border: 'border-blue-200', 
      badge: 'bg-blue-100 text-blue-800',
      label: 'Recent' 
    };
    return { 
      color: 'text-emerald-600', 
      bg: 'bg-emerald-50', 
      border: 'border-emerald-200', 
      badge: 'bg-emerald-100 text-emerald-800',
      label: 'Active' 
    };
  };

  // Generate user 
  const getUserAvatar = (name) => {
    const initials = name.split(' ').map(n => n[0]).join('');
    const colors = [
      'bg-gradient-to-br from-blue-500 to-blue-600',
      'bg-gradient-to-br from-purple-500 to-purple-600',
      'bg-gradient-to-br from-pink-500 to-pink-600',
      'bg-gradient-to-br from-indigo-500 to-indigo-600',
      'bg-gradient-to-br from-teal-500 to-teal-600',
    ];
    const colorIndex = name.length % colors.length;
    return { initials, color: colors[colorIndex] };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Zap className="w-6 h-6 text-blue-600 animate-pulse" />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-slate-700">Loading Security Data</h3>
            <p className="text-slate-500">Fetching user information...</p>
          </div>
        </div>
      </div>
    );
  }

  const stats = { critical: 0, warning: 0, good: 0, noMFA: 0 };
  users.forEach(user => {
    const passwordDays = calculateDaysDifference(user.passwordChangedDate);
    const passwordStatus = getPasswordStatus(passwordDays);
    if (passwordStatus.label === 'Critical') stats.critical++;
    else if (passwordStatus.label === 'Warning' || passwordStatus.label === 'High Risk') stats.warning++;
    else stats.good++;
    if (user.mfaEnabled === 'No') stats.noMFA++;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-lg mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Security Dashboard
          </h1>
          
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-6">
            Monitor user access patterns, password security, and multi-factor authentication compliance
          </p>

          <div className="inline-flex items-center space-x-2 text-sm text-slate-500 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
            <Activity className="w-4 h-4" />
            <span>Live data • Current Date: {currentDate.toLocaleDateString('en-US')} • Updated {currentDate.toLocaleTimeString('en-US', { timeStyle: 'medium' })}</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { 
              label: 'Critical Issues', 
              value: stats.critical, 
              icon: AlertCircle, 
              color: 'red',
              bg: 'bg-gradient-to-br from-red-50 to-red-100',
              iconBg: 'bg-red-500'
            },
            { 
              label: 'Warnings', 
              value: stats.warning, 
              icon: AlertTriangle, 
              color: 'amber',
              bg: 'bg-gradient-to-br from-amber-50 to-amber-100',
              iconBg: 'bg-amber-500'
            },
            { 
              label: 'Secure Users', 
              value: stats.good, 
              icon: CheckCircle, 
              color: 'emerald',
              bg: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
              iconBg: 'bg-emerald-500'
            },
            { 
              label: 'No MFA', 
              value: stats.noMFA, 
              icon: Unlock, 
              color: 'slate',
              bg: 'bg-gradient-to-br from-slate-50 to-slate-100',
              iconBg: 'bg-slate-500'
            }
          ].map(({ label, value, icon: Icon, color, bg, iconBg }) => (
            <div key={label} className={`${bg} rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-white/20`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">{label}</p>
                  <p className={`text-3xl font-bold ${
                    color === 'red' ? 'text-red-600' :
                    color === 'amber' ? 'text-amber-600' :
                    color === 'emerald' ? 'text-emerald-600' :
                    'text-slate-600'
                  }`}>{value}</p>
                </div>
                <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center shadow-sm`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-8 py-6">
            <div className="flex items-center space-x-3">
              <Database className="w-6 h-6 text-blue-400" />
              <div>
                <h2 className="text-xl font-semibold text-white">User Security Report</h2>
                <p className="text-slate-300 text-sm">Real-time security metrics and access patterns</p>
              </div>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50/80 backdrop-blur-sm border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>User</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Created</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    <div className="flex items-center space-x-2">
                      <Key className="w-4 h-4" />
                      <span>Password Changed</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>Password Age</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    <div className="flex items-center space-x-2">
                      <Eye className="w-4 h-4" />
                      <span>Last Access</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="w-4 h-4" />
                      <span>Access Age</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4" />
                      <span>MFA</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((user) => {
                  const passwordDays = calculateDaysDifference(user.passwordChangedDate);
                  const accessDays = calculateDaysDifference(user.lastAccessDate);
                  const passwordStatus = getPasswordStatus(passwordDays);
                  const accessStatus = getAccessStatus(accessDays);
                  const avatar = getUserAvatar(user.humanUser);
                  
                  const isHighRisk = passwordStatus.label === 'Critical' || accessStatus.label === 'Inactive';
                  
                  return (
                    <tr 
                      key={user.id} 
                      className={`hover:bg-slate-50/80 transition-all duration-200 ${
                        isHighRisk ? 'bg-red-50/50 border-l-4 border-red-400' : ''
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-sm ${avatar.color}`}>
                              {avatar.initials}
                            </div>
                            {isHighRisk && (
                              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                                <AlertTriangle className="w-2.5 h-2.5 text-white" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900">{user.humanUser}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-600">
                          {new Date(user.createDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short', 
                            day: 'numeric'
                          })}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-600">
                          {new Date(user.passwordChangedDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short', 
                            day: 'numeric'
                          })}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex flex-col space-y-1">
                          <span className={`text-lg font-bold ${passwordStatus.color}`}>
                            {passwordDays} days
                          </span>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${passwordStatus.badge}`}>
                            {passwordStatus.label}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-600">
                          {new Date(user.lastAccessDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short', 
                            day: 'numeric'
                          })}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex flex-col space-y-1">
                          <span className={`text-lg font-bold ${accessStatus.color}`}>
                            {accessDays} days
                          </span>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${accessStatus.badge}`}>
                            {accessStatus.label}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm font-medium border ${
                          user.mfaEnabled === 'Yes' 
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-200' 
                            : 'bg-red-100 text-red-800 border-red-200'
                        }`}>
                          {user.mfaEnabled === 'Yes' ? 
                            <Lock className="w-3.5 h-3.5" /> : 
                            <Unlock className="w-3.5 h-3.5" />
                          }
                          <span>{user.mfaEnabled}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="bg-slate-50/80 backdrop-blur-sm px-8 py-4 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
              <div className="flex items-center space-x-6 text-sm text-slate-600">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span className="font-medium">{users.length} Total Users</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4" />
                  <span>Updated {currentDate.toLocaleTimeString('en-US', { timeStyle: 'medium' })}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-xs">
                <div className="flex items-center space-x-1.5">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-slate-600">High Risk</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span className="text-slate-600">Warning</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-slate-600">Secure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSecurityDashboard;