'use client';

import React, { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, ChevronDown, Menu, Search, Send, SendIcon, User, UserCircle, Users } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AdminAuthPage from './admin-auth-page';
import { ScrollArea } from "@/components/ui/scroll-area"

interface User {
  name: string
  email: string
}

type AdminPanelProps = {
  onLogin: (username: string, password: string) => void;
  onSignup: (username: string, password: string) => void;
};

interface Message {
  id: number
  sender: string
  content: string
  timestamp: string
}

export function AdminPanel({ onLogin, onSignup }: AdminPanelProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'Alice', content: 'Hi, I\'m having trouble with the check-in system.', timestamp: '10:30 AM' },
    { id: 2, sender: 'Admin', content: 'What seems to be the problem, Alice?', timestamp: '10:32 AM' },
    { id: 3, sender: 'Alice', content: 'It\'s not recognizing my location.', timestamp: '10:33 AM' },
  ])


  const handleLogin = (username: string, password: string) => {
    // Perform login logic here
    // If login is successful, update the state variable
    setIsLoggedIn(true);
  };
  const [activeChat, setActiveChat] = useState(0); // Index of the active chat
  const [newMessage, setNewMessage] = useState('');

  const chatTabs = [
    { id: 0, name: 'Admin-Employee Communication', messages: [{id: 1, sender: 'Admin', content: 'Hello Employee!', timestamp: '12:00 PM'}] },
    { id: 1, name: 'HR Support', messages: [{id: 2, sender: 'HR', content: 'Need assistance?', timestamp: '1:00 PM'}] },
    { id: 2, name: 'Tech Support', messages: [{id: 3, sender: 'Tech', content: 'System issue?', timestamp: '2:00 PM'}] }
  ];
  const currentChat = chatTabs[activeChat];

  function handleSendMessage(event: FormEvent<HTMLFormElement>): void {
    throw new Error('Function not implemented.');
  }

  // const handleSendMessage = (e) => {
  //   e.preventDefault();
  //   // Logic to handle sending the message
  //   console.log(newMessage);
  //   setNewMessage('');
  // };


  return (
    <div>
      {isLoggedIn ? (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="hidden w-64 bg-white shadow-md lg:block">
        <div className="flex h-20 items-center justify-center border-b">
        <h1 className="text-[40px] font-bold text-gray-800 font-samarkan">E-Upasthiti</h1>
        </div>
        <nav className="mt-6">
          <Button
            variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
            className={`w-full justify-start text-ellipsis ${activeTab === 'dashboard' ? 'text-white' : 'text-black'}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </Button>
          <Button
            variant={activeTab === 'employees' ? 'default' : 'ghost'}
            className={`w-full justify-start ${activeTab === 'employees' ? 'text-white' : 'text-black'}`}
            onClick={() => setActiveTab('employees')}
          >
            Employees
          </Button>
          <Button
            variant={activeTab === 'locations' ? 'default' : 'ghost'}
            className={`w-full justify-start ${activeTab === 'locations' ? 'text-white' : 'text-black'}`}
            onClick={() => setActiveTab('locations')}
          >
            Locations
          </Button>
          <Button
            variant={activeTab === 'chatbox' ? 'default' : 'ghost'}
            className={`w-full justify-start ${activeTab === 'chatbox' ? 'text-white' : 'text-black'}`}
            onClick={() => setActiveTab('chatbox')}
          >
            Chatbox
          </Button>
          <Button
            variant={activeTab === 'settings' ? 'default' : 'ghost'}
            className={`w-full justify-start ${activeTab === 'settings' ? 'text-white' : 'text-black'}`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </Button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-20 items-center justify-between border-b bg-white px-6">
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-6 w-6" />
          </Button>
          <div className="flex items-center">
            <Input
              className="mr-4 w-64"
              placeholder="Search..."
              type="search"
            />
            <Button variant="ghost" size="icon">
              <Bell className="h-6 w-6 text-black" />
            </Button>
          </div>
          <div className="flex items-center">
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt="CEO" />
              <AvatarFallback >CEO</AvatarFallback>
            </Avatar>
            <div className="ml-4">
              <p className="text-sm text-black font-medium">John Doe</p>
              <p className="text-xs text-black">CEO</p>
            </div>
            <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {activeTab === 'dashboard' && (
            <>
              <h1 className="mb-6 text-3xl font-bold text-gray-900">Dashboard</h1>
              
              {/* Metrics */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,234</div>
                    <p className="text-xs text-muted-foreground">+20 from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg. Working Hours</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">7.5 hrs</div>
                    <p className="text-xs text-muted-foreground">+0.3 hrs from last week</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">On-Time Check-ins</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">95%</div>
                    <p className="text-xs text-muted-foreground">+5% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Remote Check-ins</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
                      <rect width="7" height="5" x="7" y="7" rx="1" />
                      <rect width="7" height="5" x="10" y="12" rx="1" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">30%</div>
                    <p className="text-xs text-muted-foreground">+2% from yesterday</p>
                  </CardContent>
                </Card>
              </div>

              {/* Employee Attendance Table */}
              <h2 className="mb-4 mt-8 text-2xl font-bold text-primary">Recent Attendance</h2>
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Check-In Time</TableHead>
                      <TableHead>Check-Out Time</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Total Hours</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Alice Johnson</TableCell>
                      <TableCell>09:00 AM</TableCell>
                      <TableCell>05:30 PM</TableCell>
                      <TableCell>Main Office</TableCell>
                      <TableCell>8.5 hrs</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Bob Smith</TableCell>
                      <TableCell>08:45 AM</TableCell>
                      <TableCell>04:45 PM</TableCell>
                      <TableCell>Remote</TableCell>
                      <TableCell>8 hrs</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Carol Williams</TableCell>
                      <TableCell>09:15 AM</TableCell>
                      <TableCell>06:00 PM</TableCell>
                      <TableCell>Branch Office</TableCell>
                      <TableCell>8.75 hrs</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Card>

              {/* Map View Placeholder */}
              <h2 className="mb-4 mt-8 text-2xl font-bold text-primary">Employee Locations</h2>
              <Card className="h-96 w-full bg-gray-200">
                <div className="flex h-full items-center justify-center">
                  <p className="text-gray-500">Map View Placeholder</p>
                </div>
              </Card>
            </>
          )}

          {activeTab === 'employees' && (
            <>
              <h1 className="mb-6 text-3xl font-bold text-gray-900">Employees</h1>
              
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Employee Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between mb-4">
                    <Input className="w-64" placeholder="Search employees..." />
                    <Button>Add New Employee</Button>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Alice Johnson</TableCell>
                        <TableCell>Software Engineer</TableCell>
                        <TableCell>Engineering</TableCell>
                        <TableCell>Active</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                          <Button variant="outline" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Bob Smith</TableCell>
                        <TableCell>Product Manager</TableCell>
                        <TableCell>Product</TableCell>
                        <TableCell>Active</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                          <Button variant="outline" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Carol Williams</TableCell>
                        <TableCell>UX Designer</TableCell>
                        <TableCell>Design</TableCell>
                        <TableCell>On Leave</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                          <Button variant="outline" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === 'locations' && (
            <>
              <h1 className="mb-6 text-3xl font-bold text-gray-900">Locations</h1>
              
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Location Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between mb-4">
                    <Input className="w-64" placeholder="Search locations..." />
                    <Button>Add New Location</Button>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Employees</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Main Office</TableCell>
                        <TableCell>123 Main St, City, Country</TableCell>
                        <TableCell>150</TableCell>
                        <TableCell>Active</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                          <Button variant="outline" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Branch Office</TableCell>
                        <TableCell>456 Elm St, Town, Country</TableCell>
                        <TableCell>50</TableCell>
                        <TableCell>Active</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                          <Button variant="outline" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Remote Hub</TableCell>
                        <TableCell>789 Oak St, Village, Country</TableCell>
                        <TableCell>25</TableCell>
                        <TableCell>Under Construction</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                          <Button variant="outline" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === 'settings' && (
            <>
              <h1 className="mb-6 text-3xl font-bold text-gray-900">Settings</h1>
              
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="company-name">Company Name</Label>
                      <Input id="company-name" defaultValue="GeoAttendance Inc." />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="timezone">Default Timezone</Label>
                      <Select defaultValue="utc">
                        <SelectTrigger id="timezone">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="utc">UTC</SelectItem>
                          <SelectItem value="est">Eastern Time</SelectItem>
                          <SelectItem value="pst">Pacific Time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notifications">Email Notifications</Label>
                      <Switch id="notifications" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Attendance Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="geofence-radius">Geofence Radius (meters)</Label>
                      <Input id="geofence-radius" type="number" defaultValue="200" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="check-in-reminder">Check-in Reminder</Label>
                      <Select defaultValue="15">
                        <SelectTrigger id="check-in-reminder">
                          <SelectValue placeholder="Select reminder time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5 minutes</SelectItem>
                          <SelectItem value="10">10 minutes</SelectItem>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="data-retention">Data Retention Period</Label>
                      <Select defaultValue="90">
                        <SelectTrigger id="data-retention">
                          <SelectValue placeholder="Select retention period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 days</SelectItem>
                          <SelectItem value="60">60 days</SelectItem>
                          <SelectItem value="90">90 days</SelectItem>
                          <SelectItem value="180">180 days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button>Save All Settings</Button>
            </>
          )}
          {activeTab === 'chatbox' && (
            <>
              <div className="flex">
      {/* Side tab for chat switching */}
      <div className="w-1/4 h-[618px] rounded-2xl shadow-md border p-4 bg-white ">
        <h2 className="mb-4 text-black font-bold">Chats</h2>
        <ul>
          {chatTabs.map((chat) => (
            <li
              key={chat.id}
              className={`cursor-pointer p-2 mb-2 rounded-md ${activeChat === chat.id ? 'bg-black font-bold' : 'bg-zinc-600'}`}
              onClick={() => setActiveChat(chat.id)}
            >
              {chat.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Chatbox Area */}
      <div className="w-3/4 p-4">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">Chatbox</h1>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{currentChat.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] w-full rounded-md border p-4">
              {currentChat.messages.map((message) => (
                <div key={message.id} className="mb-4">
                  <div className="flex items-start">
                    <Avatar className="mr-2">
                      <AvatarFallback>{message.sender[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{message.sender}</p>
                      <p>{message.content}</p>
                      <p className="text-sm text-gray-500">{message.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
            <form onSubmit={handleSendMessage} className="mt-4 flex">
              <Input
                type="text"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-grow mr-2"
              />
              <Button type="submit">
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>

            </>
          )}

        </main>
      </div>
    </div>
    ) : (
      <AdminAuthPage onLogin={handleLogin} onSignup={() => {}} />
    )}
  </div>
  )
}

export default AdminPanel;