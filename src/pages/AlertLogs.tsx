
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { FileText, Search, Filter, Download, CheckCircle, Clock, XCircle, MessageSquare } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';

const AlertLogs = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  // Mock data for alert logs
  const alertLogs = [
    {
      id: 1,
      message: 'Severe weather warning - Stay indoors until further notice',
      recipient: '+1 (555) 123-4567',
      status: 'delivered',
      reply: 'Received, staying safe',
      sentAt: '2024-01-20 14:30',
      deliveredAt: '2024-01-20 14:31'
    },
    {
      id: 2,
      message: 'Emergency evacuation drill scheduled for tomorrow 10 AM',
      recipient: '+1 (555) 987-6543',
      status: 'delivered',
      reply: 'Acknowledged',
      sentAt: '2024-01-20 09:15',
      deliveredAt: '2024-01-20 09:16'
    },
    {
      id: 3,
      message: 'Road closure on Main Street due to emergency maintenance',
      recipient: '+1 (555) 555-0123',
      status: 'failed',
      reply: null,
      sentAt: '2024-01-20 08:45',
      deliveredAt: null
    },
    {
      id: 4,
      message: 'Test alert - Please acknowledge receipt',
      recipient: '+1 (555) 888-9999',
      status: 'pending',
      reply: null,
      sentAt: '2024-01-20 16:20',
      deliveredAt: null
    },
    {
      id: 5,
      message: 'All clear - Emergency situation resolved',
      recipient: '+1 (555) 111-2222',
      status: 'delivered',
      reply: 'Thank you for the update',
      sentAt: '2024-01-19 18:00',
      deliveredAt: '2024-01-19 18:01'
    },
    {
      id: 6,
      message: 'Health advisory - Boil water notice in effect',
      recipient: '+1 (555) 333-4444',
      status: 'delivered',
      reply: null,
      sentAt: '2024-01-19 12:30',
      deliveredAt: '2024-01-19 12:31'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Delivered</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Failed</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const filteredLogs = alertLogs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.recipient.includes(searchTerm) ||
                         (log.reply && log.reply.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || log.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleExport = () => {
    console.log('Exporting alert logs...');
    // In a real app, this would generate and download a CSV file
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Alert Logs
            </CardTitle>
            <CardDescription>
              View and manage alert messages sent by {user?.agencyName}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search messages, phone numbers, or replies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" onClick={handleExport}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {filteredLogs.map((log) => (
                <Card key={log.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-4">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-3">
                          {getStatusIcon(log.status)}
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 mb-1">
                              {log.message}
                            </p>
                            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600">
                              <span>To: {log.recipient}</span>
                              <span>Sent: {log.sentAt}</span>
                              {log.deliveredAt && (
                                <span>Delivered: {log.deliveredAt}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {log.reply && (
                          <div className="bg-gray-50 rounded-lg p-3 ml-7">
                            <div className="flex items-center gap-2 mb-1">
                              <MessageSquare className="h-3 w-3 text-gray-500" />
                              <span className="text-xs font-medium text-gray-700">Reply:</span>
                            </div>
                            <p className="text-xs text-gray-600">{log.reply}</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {getStatusBadge(log.status)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredLogs.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No alerts found</h3>
                  <p className="text-gray-600">
                    {searchTerm || statusFilter !== 'all' 
                      ? 'Try adjusting your search or filters'
                      : 'You haven\'t sent any alerts yet'
                    }
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AlertLogs;
