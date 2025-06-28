
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Users, Upload, Download, Trash2, Plus, FileText } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { useToast } from '@/hooks/use-toast';

const UploadUsers = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Mock user data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Smith',
      phone: '+1 (555) 123-4567',
      location: 'Downtown',
      dateAdded: '2024-01-15'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      phone: '+1 (555) 987-6543',
      location: 'North District',
      dateAdded: '2024-01-15'
    },
    {
      id: 3,
      name: 'Mike Davis',
      phone: '+1 (555) 555-0123',
      location: 'East District',
      dateAdded: '2024-01-14'
    },
    {
      id: 4,
      name: 'Emily Wilson',
      phone: '+1 (555) 888-9999',
      location: 'South District',
      dateAdded: '2024-01-14'
    },
    {
      id: 5,
      name: 'Robert Brown',
      phone: '+1 (555) 111-2222',
      location: 'West District',
      dateAdded: '2024-01-13'
    }
  ]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
        toast({
          title: "Invalid file type",
          description: "Please select a CSV file",
          variant: "destructive",
        });
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    console.log('Uploading file:', selectedFile.name);
    
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Upload successful",
        description: `${selectedFile.name} has been processed successfully`,
      });
      
      // Mock adding new users
      const newUsers = [
        {
          id: Date.now(),
          name: 'New User 1',
          phone: '+1 (555) 999-0000',
          location: 'Downtown',
          dateAdded: '2024-01-20'
        },
        {
          id: Date.now() + 1,
          name: 'New User 2',
          phone: '+1 (555) 999-0001',
          location: 'North District',
          dateAdded: '2024-01-20'
        }
      ];
      
      setUsers(prev => [...prev, ...newUsers]);
      setSelectedFile(null);
    }, 2000);
  };

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId));
    toast({
      title: "User removed",
      description: "User has been removed from your recipient list",
    });
  };

  const handleDownloadTemplate = () => {
    console.log('Downloading CSV template...');
    toast({
      title: "Template downloaded",
      description: "CSV template has been downloaded to your device",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Manage Recipients
            </CardTitle>
            <CardDescription>
              Upload and manage your alert recipients for {user?.agencyName}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {/* File Upload */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="csvFile">Upload CSV File</Label>
                  <Input
                    id="csvFile"
                    type="file"
                    accept=".csv"
                    onChange={handleFileSelect}
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-gray-500">
                    Upload a CSV file with columns: Name, Phone, Location
                  </p>
                </div>

                {selectedFile && (
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-blue-600" />
                          <span className="text-sm text-blue-800">{selectedFile.name}</span>
                        </div>
                        <Button
                          size="sm"
                          onClick={handleUpload}
                          disabled={isUploading}
                        >
                          {isUploading ? (
                            <>
                              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
                              Uploading...
                            </>
                          ) : (
                            <>
                              <Upload className="h-3 w-3 mr-2" />
                              Upload
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Template Download */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>CSV Template</Label>
                  <p className="text-sm text-gray-600">
                    Download our CSV template to ensure your file is formatted correctly
                  </p>
                </div>
                <Button variant="outline" onClick={handleDownloadTemplate} className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download CSV Template
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Users */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  Current Recipients
                  <Badge variant="secondary">{users.length}</Badge>
                </CardTitle>
                <CardDescription>
                  Manage your current recipient list
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Individual
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {users.map((user) => (
                <Card key={user.id} className="hover:shadow-sm transition-shadow">
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="font-medium text-sm">{user.name}</p>
                            <p className="text-xs text-gray-600">{user.phone}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {user.location}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">Added {user.dateAdded}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {users.length === 0 && (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No recipients yet</h3>
                  <p className="text-gray-600 mb-4">
                    Upload a CSV file or add individual recipients to get started
                  </p>
                  <Button variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Recipient
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UploadUsers;
