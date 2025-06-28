
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Users, Send, MessageSquare, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';

const Dashboard = () => {
  const { user } = useAuth();

  // Mock data - in a real app, this would come from an API
  const stats = {
    totalUsers: 1247,
    alertsSent: 89,
    repliesReceived: 56,
    deliveryRate: 98.5
  };

  const recentAlerts = [
    {
      id: 1,
      message: 'Severe weather warning - Stay indoors until further notice',
      recipients: 450,
      sent: '2 hours ago',
      status: 'delivered'
    },
    {
      id: 2,
      message: 'Emergency evacuation drill scheduled for tomorrow 10 AM',
      recipients: 1200,
      sent: '1 day ago',
      status: 'delivered'
    },
    {
      id: 3,
      message: 'Road closure on Main Street due to emergency maintenance',
      recipients: 800,
      sent: '2 days ago',
      status: 'delivered'
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <Card className="gradient-bg text-white">
          <CardHeader>
            <CardTitle className="text-2xl">
              Welcome, {user?.agencyName}
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
              <p className="text-xs text-purple-600">Response rate: {((stats.repliesReceived / stats.alertsSent) * 100).toFixed(1)}%</p>
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
            <div className="space-y-4">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      {alert.message}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <span>Sent to {alert.recipients} recipients</span>
                      <span>{alert.sent}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-xs font-medium">Delivered</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <Link to="/alert-logs">
                <Button variant="outline" className="w-full">
                  View All Alert Logs
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
