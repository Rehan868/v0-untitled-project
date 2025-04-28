import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  AlertCircle,
  ArrowRight,
  BadgePercent,
  Building2,
  Cloud,
  CreditCard,
  Globe,
  Lock,
  Mail,
  Plus,
  Save,
  User,
  Users
} from 'lucide-react';
import UserRoleManagement from '@/components/settings/UserRoleManagement';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { fetchProperties, fetchRoomTypes } from '@/services/api';

const Settings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('general');
  
  // Form states
  const [companyName, setCompanyName] = useState('HotelManager Co.');
  const [companyEmail, setCompanyEmail] = useState('info@hotelmanager.com');
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');
  const [currencyFormat, setCurrencyFormat] = useState('USD');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [autoCheckout, setAutoCheckout] = useState(true);
  
  // More advanced settings form states
  const [defaultCheckInTime, setDefaultCheckInTime] = useState('14:00');
  const [defaultCheckOutTime, setDefaultCheckOutTime] = useState('11:00');
  const [taxRate, setTaxRate] = useState('7.5');
  const [reminderDays, setReminderDays] = useState('1');

  // State for managing dialogs
  const [isPropertyDialogOpen, setIsPropertyDialogOpen] = useState(false);
  const [isRoomTypeDialogOpen, setIsRoomTypeDialogOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [editingRoomType, setEditingRoomType] = useState(null);

  const [properties, setProperties] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const data = await fetchProperties();
        setProperties(data);
      } catch (error) {
        console.error('Error loading properties:', error);
      }
    };

    const loadRoomTypes = async () => {
      try {
        const data = await fetchRoomTypes();
        setRoomTypes(data);
      } catch (error) {
        console.error('Error loading room types:', error);
      }
    };

    loadProperties();
    loadRoomTypes();
  }, []);

  const handleAddProperty = () => {
    setEditingProperty(null);
    setIsPropertyDialogOpen(true);
  };

  const handleEditProperty = (property) => {
    setEditingProperty(property);
    setIsPropertyDialogOpen(true);
  };

  const handleAddRoomType = () => {
    setEditingRoomType(null);
    setIsRoomTypeDialogOpen(true);
  };

  const handleEditRoomType = (roomType) => {
    setEditingRoomType(roomType);
    setIsRoomTypeDialogOpen(true);
  };
  
  const handleSaveGeneral = () => {
    toast({
      title: "Settings Saved",
      description: "Your general settings have been updated successfully.",
    });
  };
  
  const handleSaveProperty = () => {
    toast({
      title: "Property Settings Saved",
      description: "Your property settings have been updated successfully.",
    });
  };
  
  const handleSaveNotifications = () => {
    toast({
      title: "Notification Settings Saved",
      description: "Your notification preferences have been updated.",
    });
  };
  
  const handleSaveUsers = () => {
    toast({
      title: "User Settings Saved",
      description: "User access settings have been updated successfully.",
    });
  };
  
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your application preferences and configuration</p>
      </div>
      
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab} 
        className="space-y-8"
      >
        <div className="bg-card border rounded-md p-1 sticky top-[72px] z-30 bg-background/95 backdrop-blur-sm">
          <TabsList className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 h-auto w-full">
            <TabsTrigger value="general" className="flex justify-start px-3 py-2 h-auto">
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span>General</span>
                </div>
                <span className="text-xs text-muted-foreground">Basic settings</span>
              </div>
            </TabsTrigger>
            
            <TabsTrigger value="property" className="flex justify-start px-3 py-2 h-auto">
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  <span>Properties</span>
                </div>
                <span className="text-xs text-muted-foreground">Location settings</span>
              </div>
            </TabsTrigger>
            
            <TabsTrigger value="notifications" className="flex justify-start px-3 py-2 h-auto">
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>Notifications</span>
                </div>
                <span className="text-xs text-muted-foreground">Email, SMS</span>
              </div>
            </TabsTrigger>
            
            <TabsTrigger value="users" className="flex justify-start px-3 py-2 h-auto">
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Users</span>
                </div>
                <span className="text-xs text-muted-foreground">Access control</span>
              </div>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure the basic settings for your hotel management system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input 
                      id="company-name" 
                      value={companyName} 
                      onChange={(e) => setCompanyName(e.target.value)} 
                    />
                    <p className="text-sm text-muted-foreground">
                      This will appear on all invoices and emails
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company-email">Company Email</Label>
                    <Input 
                      id="company-email" 
                      type="email" 
                      value={companyEmail} 
                      onChange={(e) => setCompanyEmail(e.target.value)} 
                    />
                    <p className="text-sm text-muted-foreground">
                      This email will be used for system notifications
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="date-format">Date Format</Label>
                    <Select 
                      value={dateFormat} 
                      onValueChange={setDateFormat}
                    >
                      <SelectTrigger id="date-format">
                        <SelectValue placeholder="Select date format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select 
                      value={currencyFormat} 
                      onValueChange={setCurrencyFormat}
                    >
                      <SelectTrigger id="currency">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                        <SelectItem value="CAD">CAD (C$)</SelectItem>
                        <SelectItem value="AUD">AUD (A$)</SelectItem>
                        <SelectItem value="JPY">JPY (¥)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">System Behavior</h3>
                
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically send email notifications for bookings and check-ins
                    </p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-checkout">Automatic Checkout</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically check out guests at the scheduled checkout time
                    </p>
                  </div>
                  <Switch
                    id="auto-checkout"
                    checked={autoCheckout}
                    onCheckedChange={setAutoCheckout}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="default-checkin">Default Check-in Time</Label>
                    <Input 
                      id="default-checkin" 
                      type="time" 
                      value={defaultCheckInTime} 
                      onChange={(e) => setDefaultCheckInTime(e.target.value)} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="default-checkout">Default Check-out Time</Label>
                    <Input 
                      id="default-checkout" 
                      type="time" 
                      value={defaultCheckOutTime} 
                      onChange={(e) => setDefaultCheckOutTime(e.target.value)} 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="tax-rate">Default Tax Rate (%)</Label>
                    <Input 
                      id="tax-rate" 
                      type="number" 
                      value={taxRate} 
                      onChange={(e) => setTaxRate(e.target.value)} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reminder-days">Reminder Days</Label>
                    <Input 
                      id="reminder-days" 
                      type="number" 
                      value={reminderDays} 
                      onChange={(e) => setReminderDays(e.target.value)} 
                    />
                    <p className="text-sm text-muted-foreground">
                      Days before check-in to send reminder emails
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <div className="px-6 py-4 flex justify-end gap-4 border-t">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleSaveGeneral} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>
                Configure backups and data export options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Automated Backups</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    The system automatically backs up your data every day at midnight.
                  </p>
                  <Select defaultValue="daily">
                    <SelectTrigger>
                      <SelectValue placeholder="Backup frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Data Export</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Export your system data in various formats.
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline">Export as CSV</Button>
                    <Button variant="outline">Export as JSON</Button>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border rounded-md bg-amber-50">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                  <div>
                    <h4 className="font-medium text-amber-800">Data Retention Policy</h4>
                    <p className="text-sm text-amber-700 mt-1">
                      By default, the system retains booking data for 7 years. Audit logs are kept for 2 years.
                      You can modify these settings in the security tab.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="property" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Property Management</CardTitle>
              <CardDescription>
                Configure your hotel properties and locations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Active Properties</h3>
                
                <div className="rounded-md border overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left font-medium p-3">Name</th>
                        <th className="text-left font-medium p-3">Address</th>
                        <th className="text-left font-medium p-3">Rooms</th>
                        <th className="text-right font-medium p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {properties.map((property) => (
                        <tr key={property.id} className="border-t">
                          <td className="p-3 font-medium">{property.name}</td>
                          <td className="p-3">{property.address}</td>
                          <td className="p-3">{property.rooms}</td>
                          <td className="p-3 text-right">
                            <Button size="sm" variant="ghost" onClick={() => handleEditProperty(property)}>Edit</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <Button onClick={handleAddProperty}>Add New Property</Button>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Room Types & Pricing</h3>
                
                <div className="rounded-md border overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left font-medium p-3">Room Type</th>
                        <th className="text-left font-medium p-3">Base Rate</th>
                        <th className="text-left font-medium p-3">Max Occupancy</th>
                        <th className="text-right font-medium p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {roomTypes.map((roomType, index) => (
                        <tr key={index} className="border-t">
                          <td className="p-3 font-medium">{roomType.type}</td>
                          <td className="p-3">${roomType.rate}</td>
                          <td className="p-3">{roomType.capacity}</td>
                          <td className="p-3 text-right">
                            <Button size="sm" variant="ghost" onClick={() => handleEditRoomType(roomType)}>Edit</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <Button onClick={handleAddRoomType}>Add Room Type</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Property Dialog */}
        <Dialog open={isPropertyDialogOpen} onOpenChange={setIsPropertyDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingProperty ? 'Edit Property' : 'Add Property'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Label htmlFor="property-name">Property Name</Label>
              <Input id="property-name" defaultValue={editingProperty?.name || ''} />

              <Label htmlFor="property-address">Address</Label>
              <Input id="property-address" defaultValue={editingProperty?.address || ''} />

              <Label htmlFor="property-rooms">Number of Rooms</Label>
              <Input id="property-rooms" type="number" defaultValue={editingProperty?.rooms || ''} />
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <Button variant="outline" onClick={() => setIsPropertyDialogOpen(false)}>Cancel</Button>
              <Button>Save</Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Room Type Dialog */}
        <Dialog open={isRoomTypeDialogOpen} onOpenChange={setIsRoomTypeDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingRoomType ? 'Edit Room Type' : 'Add Room Type'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Label htmlFor="room-type">Room Type</Label>
              <Input id="room-type" defaultValue={editingRoomType?.type || ''} />

              <Label htmlFor="base-rate">Base Rate</Label>
              <Input id="base-rate" type="number" defaultValue={editingRoomType?.rate || ''} />

              <Label htmlFor="max-occupancy">Max Occupancy</Label>
              <Input id="max-occupancy" type="number" defaultValue={editingRoomType?.occupancy || ''} />
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <Button variant="outline" onClick={() => setIsRoomTypeDialogOpen(false)}>Cancel</Button>
              <Button>Save</Button>
            </div>
          </DialogContent>
        </Dialog>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Templates</CardTitle>
              <CardDescription>
                Configure the email and SMS templates sent to guests
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-4">
                  <h3 className="text-lg font-medium">Email Templates</h3>
                  <div className="rounded-md border overflow-hidden divide-y">
                    <div className="p-3 flex items-center justify-between hover:bg-muted/50">
                      <div className="font-medium">Booking Confirmation</div>
                      <Button size="sm" variant="ghost" className="flex items-center gap-1">
                        Edit <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                    <div className="p-3 flex items-center justify-between hover:bg-muted/50">
                      <div className="font-medium">Check-in Reminder</div>
                      <Button size="sm" variant="ghost" className="flex items-center gap-1">
                        Edit <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                    <div className="p-3 flex items-center justify-between hover:bg-muted/50">
                      <div className="font-medium">Check-out Reminder</div>
                      <Button size="sm" variant="ghost" className="flex items-center gap-1">
                        Edit <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                    <div className="p-3 flex items-center justify-between hover:bg-muted/50">
                      <div className="font-medium">Thank You</div>
                      <Button size="sm" variant="ghost" className="flex items-center gap-1">
                        Edit <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                    <div className="p-3 flex items-center justify-between hover:bg-muted/50">
                      <div className="font-medium">Cancellation</div>
                      <Button size="sm" variant="ghost" className="flex items-center gap-1">
                        Edit <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 space-y-4">
                  <h3 className="text-lg font-medium">SMS Templates</h3>
                  <div className="rounded-md border overflow-hidden divide-y">
                    <div className="p-3 flex items-center justify-between hover:bg-muted/50">
                      <div className="font-medium">Booking Confirmation</div>
                      <Button size="sm" variant="ghost" className="flex items-center gap-1">
                        Edit <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                    <div className="p-3 flex items-center justify-between hover:bg-muted/50">
                      <div className="font-medium">Check-in Reminder</div>
                      <Button size="sm" variant="ghost" className="flex items-center gap-1">
                        Edit <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                    <div className="p-3 flex items-center justify-between hover:bg-muted/50">
                      <div className="font-medium">Check-out Reminder</div>
                      <Button size="sm" variant="ghost" className="flex items-center gap-1">
                        Edit <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Button variant="outline">Add SMS Template</Button>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Template Variables</h3>
                <p className="text-sm text-muted-foreground">
                  Use these variables in your templates to insert dynamic content:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="border rounded-md p-3">
                    <code className="text-sm font-mono">{'{{guest_name}}'}</code>
                    <p className="text-xs text-muted-foreground mt-1">Guest's full name</p>
                  </div>
                  <div className="border rounded-md p-3">
                    <code className="text-sm font-mono">{'{{booking_ref}}'}</code>
                    <p className="text-xs text-muted-foreground mt-1">Booking reference</p>
                  </div>
                  <div className="border rounded-md p-3">
                    <code className="text-sm font-mono">{'{{check_in_date}}'}</code>
                    <p className="text-xs text-muted-foreground mt-1">Check-in date</p>
                  </div>
                  <div className="border rounded-md p-3">
                    <code className="text-sm font-mono">{'{{check_out_date}}'}</code>
                    <p className="text-xs text-muted-foreground mt-1">Check-out date</p>
                  </div>
                  <div className="border rounded-md p-3">
                    <code className="text-sm font-mono">{'{{room_type}}'}</code>
                    <p className="text-xs text-muted-foreground mt-1">Room type name</p>
                  </div>
                  <div className="border rounded-md p-3">
                    <code className="text-sm font-mono">{'{{room_number}}'}</code>
                    <p className="text-xs text-muted-foreground mt-1">Room number</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email-sender">Sender Email</Label>
                    <Input id="email-sender" defaultValue="bookings@hotelmanager.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-reply-to">Reply-to Email</Label>
                    <Input id="email-reply-to" defaultValue="support@hotelmanager.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-footer">Email Footer Text</Label>
                  <Textarea 
                    id="email-footer" 
                    defaultValue="HotelManager Inc. | 123 Hotel St, Miami, FL | (555) 123-4567" 
                    rows={2}
                  />
                </div>
              </div>
            </CardContent>
            <div className="px-6 py-4 flex justify-end gap-4 border-t">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleSaveNotifications} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Notification Settings
              </Button>
            </div>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Notification Events</CardTitle>
              <CardDescription>
                Configure when notifications are sent
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label>Booking Confirmation</Label>
                    <p className="text-sm text-muted-foreground">
                      Send an email when a booking is created or modified
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label>Check-in Reminder</Label>
                    <p className="text-sm text-muted-foreground">
                      Send a reminder before guest arrival
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label>Check-out Reminder</Label>
                    <p className="text-sm text-muted-foreground">
                      Send a reminder on the day of departure
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label>Post-stay Thank You</Label>
                    <p className="text-sm text-muted-foreground">
                      Send a thank you email after checkout
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label>Cancellation Notice</Label>
                    <p className="text-sm text-muted-foreground">
                      Send an email when a booking is cancelled
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label>Staff Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Send email notifications to staff for new bookings and changes
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-6">
          <UserRoleManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
