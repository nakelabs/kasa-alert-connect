
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { Send, Users, MapPin, AlertTriangle } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { useToast } from '@/hooks/use-toast';

const SendAlert = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [message, setMessage] = useState('');
  const [recipients, setRecipients] = useState('all');
  const [location, setLocation] = useState('');
  const [priority, setPriority] = useState('normal');
  const [confirmSend, setConfirmSend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      toast({
        title: "Message required",
        description: "Please enter an alert message",
        variant: "destructive",
      });
      return;
    }

    if (!confirmSend) {
      toast({
        title: "Confirmation required",
        description: "Please confirm that you want to send this alert",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    console.log('Sending alert:', {
      message,
      recipients,
      location,
      priority,
      agency: user?.agencyName
    });

    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Alert sent successfully",
        description: `Your emergency alert has been sent to ${recipients === 'all' ? 'all recipients' : 'selected recipients'}`,
      });
      
      // Reset form
      setMessage('');
      setRecipients('all');
      setLocation('');
      setPriority('normal');
      setConfirmSend(false);
    }, 2000);
  };

  const getRecipientCount = () => {
    switch (recipients) {
      case 'all': return 1247;
      case 'location': return location ? 350 : 0;
      case 'priority': return 89;
      default: return 0;
    }
  };

  const handleConfirmChange = (checked: boolean | "indeterminate") => {
    setConfirmSend(checked === true);
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5" />
              Send Emergency Alert
            </CardTitle>
            <CardDescription>
              Send SMS alerts to your recipients - {user?.agencyName}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Alert Message */}
              <div className="space-y-2">
                <Label htmlFor="message">Alert Message *</Label>
                <Textarea
                  id="message"
                  placeholder="Enter your emergency alert message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
                <p className="text-xs text-gray-500">
                  {message.length}/160 characters
                </p>
              </div>

              {/* Priority Level */}
              <div className="space-y-2">
                <Label htmlFor="priority">Priority Level</Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - General Information</SelectItem>
                    <SelectItem value="normal">Normal - Standard Alert</SelectItem>
                    <SelectItem value="high">High - Urgent Alert</SelectItem>
                    <SelectItem value="critical">Critical - Emergency</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Recipients */}
              <div className="space-y-2">
                <Label htmlFor="recipients">Recipients</Label>
                <Select value={recipients} onValueChange={setRecipients}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select recipients" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Recipients</SelectItem>
                    <SelectItem value="location">By Location</SelectItem>
                    <SelectItem value="priority">Priority Contacts Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Location Selection */}
              {recipients === 'location' && (
                <div className="space-y-2">
                  <Label htmlFor="location">Select Location</Label>
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="downtown">Downtown Area</SelectItem>
                      <SelectItem value="north">North District</SelectItem>
                      <SelectItem value="south">South District</SelectItem>
                      <SelectItem value="east">East District</SelectItem>
                      <SelectItem value="west">West District</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Recipient Count */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-blue-800">
                      This alert will be sent to <strong>{getRecipientCount().toLocaleString()}</strong> recipients
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Priority Warning */}
              {priority === 'critical' && (
                <Card className="bg-red-50 border-red-200">
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <span className="text-sm text-red-800">
                        <strong>Critical Alert:</strong> This will send an immediate high-priority message
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Confirmation */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="confirm"
                  checked={confirmSend}
                  onCheckedChange={handleConfirmChange}
                />
                <Label htmlFor="confirm" className="text-sm">
                  I confirm that I want to send this alert to {getRecipientCount().toLocaleString()} recipients
                </Label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isLoading || !message.trim() || !confirmSend}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending Alert...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Alert Now
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SendAlert;
