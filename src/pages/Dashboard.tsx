
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Users, Send, MessageSquare, TrendingUp, Clock, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';

const Dashboard = () => {
  const { user } = useAuth();

  // TODO: Replace with actual API calls
  const stats = {
    totalUsers: 0,
    alertsSent: 0,
    repliesReceived: 0,
    deliveryRate: 0
  };

  const recentAlerts: any[] = []; // TODO: Fetch from API

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <Card className="gradient-bg text-white">
          <CardHeader>
            <CardTitle className="text-2xl">
              Welcome, {user?.agencyName || 'Agency'}
            </CardTitle>
            <CardDescription className="text-blue-100">
              Your emergency alert management dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Link to="/send-alert">
                <Button variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Send className="mr-2 h-4 w-4" />
                  Send New Alert
                </Button>
              </Link>
              <Link to="/upload-users">
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Users
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="stat-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Recipients</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-700">{stats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-blue-600">Active users in your system</p>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Alerts Sent</CardTitle>
              <Send className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">{stats.alertsSent}</div>
              <p className="text-xs text-green-600">This month</p>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Replies Received</CardTitle>
              <MessageSquare className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-700">{stats.repliesReceived}</div>
              <p className="text-xs text-purple-600">Response rate: {stats.alertsSent > 0 ? ((stats.repliesReceived / stats.alertsSent) * 100).toFixed(1) : 0}%</p>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Delivery Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-700">{stats.deliveryRate}%</div>
              <p className="text-xs text-orange-600">Average delivery success</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Alerts
            </CardTitle>
            <CardDescription>
              Your latest emergency alert messages
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentAlerts.length === 0 ? (
              <div className="text-center py-12">
                <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No alerts sent yet</h3>
                <p className="text-gray-600 mb-4">
                  Start by sending your first emergency alert
                </p>
                <Link to="/send-alert">
                  <Button>
                    <Send className="mr-2 h-4 w-4" />
                    Send Your First Alert
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {/* TODO: Render actual alert data */}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
