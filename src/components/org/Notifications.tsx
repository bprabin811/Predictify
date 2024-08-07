'use client';
import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import moment from 'moment';

const NotificationsCard: React.FC = () => {
  const [notifications, setNotifications] = useState([
    {
      notification_id: '1',
      title: 'Route Update',
      message: 'Route for vehicle ID 1234 has been updated.',
      timestamp: '2024-07-01T08:30:00Z',
      type: 'info',
      status: 'unread',
    },
    {
      notification_id: '2',
      title: 'Vehicle Maintenance Required',
      message: 'Vehicle ID 5678 requires maintenance.',
      timestamp: '2024-07-01T09:00:00Z',
      type: 'warning',
      status: 'unread',
    },
    {
      notification_id: '3',
      title: 'New Dispatch Assigned',
      message: 'New dispatch assigned to driver ID 9101.',
      timestamp: '2024-07-01T09:30:00Z',
      type: 'info',
      status: 'read',
    },
    {
      notification_id: '4',
      title: 'Traffic Alert',
      message: 'Heavy traffic reported on route 32.',
      timestamp: '2024-07-01T10:00:00Z',
      type: 'alert',
      status: 'unread',
    },
    {
      notification_id: '5',
      title: 'Delivery Completed',
      message: 'Delivery for order ID 1122 completed successfully.',
      timestamp: '2024-07-01T10:30:00Z',
      type: 'success',
      status: 'read',
    },
  ]);

  return (
    <div className="">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={'outline'}
            className="p-2 w-full flex items-center justify-start gap-4 border rounded-md cursor-pointer">
            <Bell size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="flex flex-col gap-2">
          <CardHeader className="pb-3 ">
            <div className="flex items-center justify-between w-full">
              <CardTitle>Notifications</CardTitle>
              <Button variant={'link'}>See all</Button>
            </div>
            <CardDescription>View the most recent notifications here. </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-1">
            {notifications.slice(0, 5).map((notification) => (
              <div
                key={notification.notification_id}
                className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
                <div
                  className={`w-10 h-10 flex rounded-full ${
                    notification.type === 'alert'
                      ? 'bg-red-500'
                      : notification.type === 'success'
                      ? 'bg-green-500'
                      : notification.type === 'info'
                      ? 'bg-blue-500'
                      : 'bg-yellow-500'
                  } bg-opacity-25 items-center justify-center`}>
                  {notification.title[0]}
                </div>

                <div className="space-y-1 flex items-start flex-col">
                  <p className="text-sm font-medium leading-none">{notification.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {notification.message.length > 50
                      ? `${notification.message.slice(0, 50)}...`
                      : notification.message}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {moment(notification.timestamp).fromNow()}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NotificationsCard;
